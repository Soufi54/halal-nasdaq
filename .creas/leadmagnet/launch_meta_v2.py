#!/usr/bin/env python3
"""
Lance la campagne Meta V2 — hook lead magnet 'Détecte une arnaque en 30 sec'.
Pointe vers https://muslimfinance.net/checklist
Réutilise les créas statiques B (CTR 2.61%) et C (CTR 2.13%) du précédent run
+ ajoute 1 nouveau statique 'Détecte une arnaque' généré via gpt-image-1.

Objectif : trafic (LINK_CLICKS, optim default), pixel Lead capturé via worker
Budget 30€ sur 5 jours (lifetime), audience FR 25-50, intérêts finance + audience custom
"""
import os
import sys
import json
import time
import pathlib
from datetime import datetime, timedelta, timezone
import requests

ROOT = pathlib.Path(__file__).resolve().parent
EBOOK_DIR = ROOT.parent / "ebook"
STATIC_DIR = EBOOK_DIR / "static"
STATE_FILE = ROOT / "meta_v2_state.json"

# Reuse Meta creds
ENV_QV = pathlib.Path.home() / ".config/quran-vinyl/stripe-test.env"
TOKEN = None
for line in ENV_QV.read_text().splitlines():
    if line.startswith("META_USER_TOKEN="):
        TOKEN = line.split("=", 1)[1].strip().strip('"').strip("'")
        break
if not TOKEN:
    sys.exit("META_USER_TOKEN introuvable")

API = "https://graph.facebook.com/v22.0"
AD_ACCOUNT = "act_346605029347825"
PAGE_ID = "1039152282625969"          # Muslim Finance
PIXEL_ID = "1986901548880799"         # px_ebook_halal (réutilise — capte aussi /checklist)
LANDING_URL = "https://muslimfinance.net/checklist?utm_source=meta&utm_campaign=checklist_v2&utm_content={ad_name}"

PRIMARY_TEXT = (
    "Validus. OneCoin. Copy trading « halal ». Formations à 1 500 €. MLM crypto.\n\n"
    "Tu as eu raison de tout refuser. Mais quelques questions auraient suffi à savoir avant.\n\n"
    "Guide gratuit : la checklist 8 questions pour détecter une arnaque déguisée en investissement halal en 30 secondes.\n\n"
    "+ bonus : 10 actions halal AAOIFI à mettre en watchlist 2026.\n\n"
    "PDF immédiat par email. Aucun paiement, aucune CB demandée."
)
HEADLINE = "Détecte une arnaque type Validus en 30 secondes"
DESCRIPTION = "Checklist 8 questions + watchlist 10 actions halal. Gratuit."

CTA = {"type": "DOWNLOAD", "value": {"link": LANDING_URL.replace("{ad_name}", "main")}}

# Reuse Static B + C from previous campaign (best CTR), upload fresh under new names
REUSE_STATICS = [
    ("static_B.png", "StaticB-RiribaPauvre", "static_b_riba_pauvre"),
    ("static_C.png", "StaticC-PatrimoineRefuse", "static_c_patrimoine_refuse"),
]

# === State ===
def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"hashes": {}, "ad_ids": {}}

def save_state(s):
    STATE_FILE.write_text(json.dumps(s, indent=2, ensure_ascii=False))

# === Fal AI helpers (for new creative) ===
def fal_key():
    env = pathlib.Path.home() / "work/claude-automation/content-factory/.env"
    for line in env.read_text().splitlines():
        if line.startswith("FAL_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None

def gen_checklist_static():
    """Génère 1 nouvelle image statique pour le hook 'Détecte une arnaque en 30 sec'."""
    out = STATIC_DIR / "static_checklist.png"
    if out.exists():
        print(f"  reuse existing {out}")
        return out
    fk = fal_key()
    if not fk:
        print("  FAL_KEY missing, skip new creative gen")
        return None
    prompt = (
        "Editorial vertical poster, 4:5 aspect ratio (1024x1536). "
        "Dark moody scene: a warm walnut wooden table seen from 3/4 above, "
        "with a single dark navy hardcover book closed at the bottom, "
        "next to a small clear glass of mint tea on a copper saucer. "
        "Soft window light from upper left casts leaf shadows on the wood. "
        "Background fades to near-black at top (deep negative space). "
        "Warm amber-brown-black palette, slight film grain, magazine editorial mood, "
        "shallow depth of field, no people, no faces. "
        "Across the upper half (the dark negative space), bold typography rendered "
        "DIRECTLY ONTO THE IMAGE in clean serif font (Playfair Display Black style), "
        "color near-white, perfectly centered, with strong line breaks as specified. "
        "All text MUST be in correct French with proper accents. "
        "Above the main text, a tiny gold-colored uppercase label reads exactly: "
        "MUSLIMFINANCE.NET (very small, letter-spaced, top center).\n\n"
        "MAIN TEXT (large serif, 3 lines):\n"
        "Détecte une arnaque\n"
        "type Validus\n"
        "en 30 secondes.\n\n"
        "Below the main text, a thin gold underline, then small line in gold reads: "
        "-> guide PDF gratuit"
    )
    r = requests.post(
        "https://queue.fal.run/fal-ai/gpt-image-1/text-to-image",
        headers={"Authorization": f"Key {fk}", "Content-Type": "application/json"},
        json={"prompt": prompt, "image_size": "1024x1536", "num_images": 1,
              "quality": "high", "output_format": "png"},
        timeout=30
    )
    if not r.ok:
        print(f"  fal submit failed: {r.status_code} {r.text[:200]}")
        return None
    enq = r.json()
    deadline = time.time() + 240
    while time.time() < deadline:
        s = requests.get(enq["status_url"], headers={"Authorization": f"Key {fk}"}, timeout=20).json()
        if s.get("status") == "COMPLETED":
            result = requests.get(enq["response_url"], headers={"Authorization": f"Key {fk}"}, timeout=20).json()
            img_url = result["images"][0]["url"]
            from urllib.request import urlopen
            with urlopen(img_url) as resp, open(out, "wb") as f:
                f.write(resp.read())
            print(f"  generated {out}")
            return out
        if s.get("status") == "FAILED":
            print(f"  fal failed: {s}")
            return None
        time.sleep(4)
    return None

# === Meta API helpers ===
def fb_post(path, data, files=None):
    data = dict(data)
    data["access_token"] = TOKEN
    r = requests.post(f"{API}/{path}", data=data, files=files, timeout=60)
    if not r.ok:
        print(f"ERROR POST {path}\n  data={ {k:v for k,v in data.items() if k!='access_token'} }\n  -> {r.status_code} {r.text}", file=sys.stderr)
        r.raise_for_status()
    return r.json()

def upload_image(path: pathlib.Path):
    print(f"  upload {path.name}...")
    with open(path, "rb") as f:
        r = requests.post(
            f"{API}/{AD_ACCOUNT}/adimages",
            data={"access_token": TOKEN},
            files={"filename": (path.name, f, "image/png")},
            timeout=120,
        )
    r.raise_for_status()
    img = next(iter(r.json()["images"].values()))
    return img["hash"]

# === Pipeline ===
def main():
    state = load_state()

    # 1. Generate the new 'detecte arnaque' static if missing
    print("[1/6] Generating new checklist static (if needed)...")
    checklist_img = gen_checklist_static()

    # 2. Upload all statics (re-upload to ensure fresh hash on this account)
    print("\n[2/6] Uploading statics...")
    images = []
    if checklist_img and checklist_img.exists():
        images.append((checklist_img, "Checklist-DetecteArnaque", "static_checklist"))
    for fname, label, slug in REUSE_STATICS:
        p = STATIC_DIR / fname
        if p.exists():
            images.append((p, label, slug))
    for img_path, label, slug in images:
        if slug in state["hashes"]:
            print(f"  reuse hash for {slug}")
            continue
        state["hashes"][slug] = upload_image(img_path)
        save_state(state)

    # 3. Create campaign
    print("\n[3/6] Creating campaign (PAUSED)...")
    if "campaign_id" not in state:
        res = fb_post(f"{AD_ACCOUNT}/campaigns", {
            "name": "MF-LeadMagnet-2026-05-V2",
            "objective": "OUTCOME_TRAFFIC",
            "status": "PAUSED",
            "special_ad_categories": "[]",
            "buying_type": "AUCTION",
            "is_adset_budget_sharing_enabled": "false",
        })
        state["campaign_id"] = res["id"]
        save_state(state)
        print(f"  campaign_id={res['id']}")
    else:
        print(f"  reuse {state['campaign_id']}")

    # 4. Create ad set
    print("\n[4/6] Creating ad set...")
    if "adset_id" not in state:
        now = datetime.now(timezone.utc)
        start = now + timedelta(minutes=5)
        end = start + timedelta(days=5)
        targeting = {
            "geo_locations": {"countries": ["FR"]},
            "age_min": 25,
            "age_max": 50,
            "locales": [5],  # French
            "flexible_spec": [{
                "interests": [
                    {"id": "6003388314512", "name": "Investissement (affaires et finance)"},
                    {"id": "6003446239080", "name": "Investissement immobilier"},
                    {"id": "6805911679779", "name": "Investing and trading"},
                ],
            }],
            "publisher_platforms": ["facebook", "instagram"],
            "facebook_positions": ["feed", "story"],
            "instagram_positions": ["stream", "story", "reels", "explore"],
            "device_platforms": ["mobile", "desktop"],
            "targeting_automation": {"advantage_audience": 0},
        }
        res = fb_post(f"{AD_ACCOUNT}/adsets", {
            "name": "MF-LeadMagnet-AdSet-FR-25-50",
            "campaign_id": state["campaign_id"],
            "status": "PAUSED",
            "lifetime_budget": "3000",  # 30€
            "billing_event": "IMPRESSIONS",
            "optimization_goal": "LINK_CLICKS",
            "bid_strategy": "LOWEST_COST_WITHOUT_CAP",
            "start_time": start.isoformat(),
            "end_time": end.isoformat(),
            "targeting": json.dumps(targeting),
            "destination_type": "WEBSITE",
        })
        state["adset_id"] = res["id"]
        save_state(state)
        print(f"  adset_id={res['id']}")
    else:
        print(f"  reuse {state['adset_id']}")

    # 5. Create creatives + ads (1 per image)
    print("\n[5/6] Creating creatives + ads...")
    for img_path, label, slug in images:
        creative_key = f"creative_{slug}"
        ad_key = f"ad_{slug}"
        if ad_key in state.get("ad_ids", {}):
            print(f"  reuse ad {slug}")
            continue
        if creative_key not in state:
            url_with_utm = LANDING_URL.replace("{ad_name}", slug)
            creative = {
                "name": f"MF-LeadMagnet-Creative-{label}",
                "object_story_spec": json.dumps({
                    "page_id": PAGE_ID,
                    "link_data": {
                        "image_hash": state["hashes"][slug],
                        "link": url_with_utm,
                        "message": PRIMARY_TEXT,
                        "name": HEADLINE,
                        "description": DESCRIPTION,
                        "call_to_action": {"type": "DOWNLOAD", "value": {"link": url_with_utm}},
                    },
                }),
            }
            res = fb_post(f"{AD_ACCOUNT}/adcreatives", creative)
            state[creative_key] = res["id"]
            save_state(state)
            print(f"  creative {slug}={res['id']}")
        # Ad (PAUSED initially)
        res = fb_post(f"{AD_ACCOUNT}/ads", {
            "name": f"MF-LeadMagnet-Ad-{label}",
            "adset_id": state["adset_id"],
            "creative": json.dumps({"creative_id": state[creative_key]}),
            "status": "PAUSED",
        })
        state.setdefault("ad_ids", {})[ad_key] = res["id"]
        save_state(state)
        print(f"  ad {slug}={res['id']}")

    # 6. Summary
    print(f"\n=== Setup terminé ===")
    print(f"Campaign : {state['campaign_id']}")
    print(f"Ad Set   : {state['adset_id']}")
    print(f"Ads      : {state.get('ad_ids', {})}")
    print(f"\nReview URL: https://adsmanager.facebook.com/adsmanager/manage/campaigns?act={AD_ACCOUNT.replace('act_','')}&selected_campaign_ids={state['campaign_id']}")

    if "--activate" in sys.argv:
        print("\n[ACTIVATE] Setting status=ACTIVE on campaign + adset + ads...")
        fb_post(state["campaign_id"], {"status": "ACTIVE"})
        fb_post(state["adset_id"], {"status": "ACTIVE"})
        for k, ad_id in state.get("ad_ids", {}).items():
            fb_post(ad_id, {"status": "ACTIVE"})
        print("  -> campagne ACTIVE")


if __name__ == "__main__":
    main()
