#!/usr/bin/env python3
"""
Agent posting X @muslimfinance_ avec validation Telegram.

Workflow :
1. Lit la queue de tweets (~/work/halal-nasdaq/.creas/leadmagnet/tweets_queue.json)
2. Si tweet du jour disponible, l'envoie via bot Telegram à Chaker pour validation
3. Attend la réponse :
   - "ok" / "/yes" / "/post" → publie sur X via tweet.py
   - "skip" / "/no" / "/skip" → marque skipped, passe au suivant
   - timeout 1h → garde en pending, retry demain
4. Log dans ~/work/halal-nasdaq/.tweet_log.json

Usage:
  python3 agent_post_x.py              # process today's tweet
  python3 agent_post_x.py --init       # initialize queue from tweets_drafts.md
  python3 agent_post_x.py --dry-run    # show what would happen, no Telegram, no post
"""

import json
import os
import re
import sys
import time
import pathlib
import urllib.parse
from datetime import datetime, timezone
import requests

ROOT = pathlib.Path(__file__).resolve().parent
HALAL_NASDAQ = ROOT.parent
DRAFTS_FILE = HALAL_NASDAQ / ".creas/leadmagnet/tweets_drafts.md"
QUEUE_FILE = HALAL_NASDAQ / ".creas/leadmagnet/tweets_queue.json"
LOG_FILE = HALAL_NASDAQ / ".tweet_log.json"

# Telegram bot creds
TG_CONFIG = pathlib.Path.home() / ".claude/telegram-bot/config.json"
tg_config = json.loads(TG_CONFIG.read_text())
TG_TOKEN = tg_config["telegram_token"]
TG_CHAT_ID = tg_config["allowed_user_ids"][0]


# ============ Queue management ============

def parse_drafts_md():
    """Parse tweets_drafts.md and extract tweets in publishing order."""
    text = DRAFTS_FILE.read_text()
    # Each tweet is under "## Tweet N" header, body in blockquote (lines starting with "> ")
    tweets = []
    current = None
    for line in text.splitlines():
        m = re.match(r"^## Tweet (\d+)\s+—\s+(.+?)(?:\s+\(.*?\))?\s*$", line)
        if m:
            if current:
                tweets.append(current)
            current = {"id": int(m.group(1)), "title": m.group(2).strip(), "body": [], "header": line}
            continue
        if current and line.startswith("> "):
            current["body"].append(line[2:])
        elif current and line.startswith(">"):
            current["body"].append(line[1:].strip())
    if current:
        tweets.append(current)

    # Join body lines, strip trailing whitespace
    for t in tweets:
        body = "\n".join(t["body"]).strip()
        # Clean blockquote breaks
        body = re.sub(r"\n{3,}", "\n\n", body)
        t["text"] = body
    return tweets


def init_queue():
    tweets = parse_drafts_md()
    queue = []
    for t in tweets:
        queue.append({
            "id": t["id"],
            "title": t["title"],
            "text": t["text"],
            "status": "pending",  # pending | sent_validation | approved | skipped | posted | failed
            "created_at": datetime.now(timezone.utc).isoformat(),
            "validation_msg_id": None,
            "validated_at": None,
            "posted_at": None,
            "tweet_id": None,
            "tweet_url": None,
        })
    QUEUE_FILE.parent.mkdir(parents=True, exist_ok=True)
    QUEUE_FILE.write_text(json.dumps(queue, ensure_ascii=False, indent=2))
    print(f"Initialized queue with {len(queue)} tweets at {QUEUE_FILE}")
    return queue


def load_queue():
    if not QUEUE_FILE.exists():
        return init_queue()
    return json.loads(QUEUE_FILE.read_text())


def save_queue(queue):
    QUEUE_FILE.write_text(json.dumps(queue, ensure_ascii=False, indent=2))


# ============ Telegram ============

def tg_send(text, reply_markup=None):
    """Send a Telegram message to Chaker. Returns message_id."""
    payload = {
        "chat_id": TG_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    if reply_markup:
        payload["reply_markup"] = json.dumps(reply_markup)
    r = requests.post(f"https://api.telegram.org/bot{TG_TOKEN}/sendMessage",
                      json=payload, timeout=20)
    r.raise_for_status()
    return r.json()["result"]["message_id"]


def tg_get_updates(offset=None):
    """Poll Telegram for new messages from Chaker."""
    params = {"timeout": 0, "limit": 50}
    if offset:
        params["offset"] = offset
    r = requests.get(f"https://api.telegram.org/bot{TG_TOKEN}/getUpdates",
                     params=params, timeout=15)
    r.raise_for_status()
    return r.json().get("result", [])


def request_validation(tweet):
    """Send tweet to Chaker for approval. Returns message_id."""
    body = (
        f"<b>📤 Tweet à valider</b> (id {tweet['id']})\n"
        f"<i>{tweet['title']}</i>\n\n"
        f"━━━━━━━━━━━\n"
        f"<pre>{escape_html(tweet['text'])}</pre>\n"
        f"━━━━━━━━━━━\n\n"
        f"Caractères: {len(tweet['text'])}\n\n"
        f"<b>Réponds :</b>\n"
        f"• <code>ok</code> → publie sur X\n"
        f"• <code>skip</code> → passe au suivant\n"
        f"• <code>edit: nouveau texte...</code> → publie avec ce texte"
    )
    return tg_send(body)


def escape_html(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def wait_for_response(after_msg_id, timeout_sec=3600):
    """Poll Telegram for Chaker's response. Returns (action, text) or (None, None) on timeout."""
    deadline = time.time() + timeout_sec
    last_update_id = None
    while time.time() < deadline:
        try:
            updates = tg_get_updates(last_update_id)
        except Exception as e:
            print(f"  tg poll error: {e}")
            time.sleep(5)
            continue
        for u in updates:
            last_update_id = u["update_id"] + 1
            msg = u.get("message") or {}
            if msg.get("chat", {}).get("id") != TG_CHAT_ID:
                continue
            # Only consider messages sent AFTER our validation request
            if msg.get("date", 0) * 1000 < (after_msg_id or 0):
                continue
            text = (msg.get("text") or "").strip().lower()
            if not text:
                continue
            if text in ("ok", "yes", "/yes", "/post", "post", "go", "/go"):
                return ("approve", None)
            if text in ("skip", "no", "/no", "/skip", "non"):
                return ("skip", None)
            if text.startswith("edit:") or text.startswith("/edit "):
                new_text = text.split(":", 1)[-1].strip() if ":" in text else text.split(" ", 1)[-1].strip()
                return ("edit", new_text)
        time.sleep(8)
    return (None, None)


# ============ X posting ============

def post_to_x(text, dry_run=False):
    """Post tweet via the existing tweet.py API wrapper. Returns (tweet_id, url) or raise."""
    if dry_run:
        print(f"  [DRY-RUN] would post:\n{text}\n")
        return ("dry-run-id", "https://twitter.com/dry-run")
    sys.path.insert(0, str(ROOT))
    try:
        from tweet import post_tweet
    except Exception as e:
        # fallback: try tweet_browser
        from tweet_browser import post_tweet  # type: ignore
    result = post_tweet(text)
    if isinstance(result, dict):
        tid = result.get("id") or result.get("tweet_id")
        url = result.get("url") or (f"https://twitter.com/muslimfinance_/status/{tid}" if tid else None)
        return (tid, url)
    return (str(result), None)


# ============ Main ============

def find_next_pending(queue):
    for t in queue:
        if t["status"] == "pending":
            return t
    return None


def already_posted_today(queue):
    today = datetime.now(timezone.utc).date()
    for t in queue:
        if t["status"] == "posted" and t.get("posted_at"):
            if datetime.fromisoformat(t["posted_at"]).date() == today:
                return t
    return None


def log_action(action, tweet, extra=None):
    log = []
    if LOG_FILE.exists():
        try: log = json.loads(LOG_FILE.read_text())
        except Exception: log = []
    log.append({
        "ts": datetime.now(timezone.utc).isoformat(),
        "action": action,
        "tweet_id": tweet["id"],
        "title": tweet["title"],
        **(extra or {}),
    })
    LOG_FILE.write_text(json.dumps(log, ensure_ascii=False, indent=2))


def main():
    dry_run = "--dry-run" in sys.argv
    if "--init" in sys.argv:
        init_queue()
        return

    queue = load_queue()

    # Guard: max 1 post per 24h (avoid double-posts)
    posted = already_posted_today(queue)
    if posted and not dry_run:
        print(f"Already posted today: '{posted['title']}' (id {posted['id']})")
        return

    nxt = find_next_pending(queue)
    if not nxt:
        print("No pending tweets in queue.")
        return

    print(f"Next tweet: #{nxt['id']} — {nxt['title']}")
    if dry_run:
        print(f"\n{nxt['text']}\n")
        print(f"Chars: {len(nxt['text'])}")
        print("[DRY-RUN] would request Telegram validation, no real action.")
        return

    # Send to Telegram for validation
    msg_id = request_validation(nxt)
    nxt["status"] = "sent_validation"
    nxt["validation_msg_id"] = msg_id
    save_queue(queue)
    print(f"Sent validation request (msg_id={msg_id}), waiting up to 1h for OK/SKIP/EDIT...")

    action, edited = wait_for_response(msg_id, timeout_sec=3600)
    if action is None:
        tg_send(f"⏰ Timeout 1h sans réponse pour tweet #{nxt['id']}. Resté en pending, relance demain.")
        nxt["status"] = "pending"
        save_queue(queue)
        log_action("timeout", nxt)
        return

    if action == "skip":
        nxt["status"] = "skipped"
        nxt["validated_at"] = datetime.now(timezone.utc).isoformat()
        save_queue(queue)
        log_action("skipped", nxt)
        tg_send(f"⏭️ Tweet #{nxt['id']} skipped.")
        return

    if action == "edit":
        nxt["text"] = edited
        print(f"  edited text: {edited}")

    nxt["validated_at"] = datetime.now(timezone.utc).isoformat()
    save_queue(queue)

    # Post
    try:
        tweet_id, tweet_url = post_to_x(nxt["text"], dry_run=False)
        nxt["status"] = "posted"
        nxt["posted_at"] = datetime.now(timezone.utc).isoformat()
        nxt["tweet_id"] = tweet_id
        nxt["tweet_url"] = tweet_url
        save_queue(queue)
        log_action("posted", nxt, {"tweet_id": tweet_id, "tweet_url": tweet_url})
        tg_send(f"✅ Tweet #{nxt['id']} publié.\n{tweet_url or 'URL non récupérée'}")
    except Exception as e:
        nxt["status"] = "failed"
        save_queue(queue)
        log_action("failed", nxt, {"error": str(e)})
        tg_send(f"❌ Échec publication tweet #{nxt['id']}.\nErreur : <code>{escape_html(str(e))}</code>\nVérifie browser_login.py + tokens X.")


if __name__ == "__main__":
    main()
