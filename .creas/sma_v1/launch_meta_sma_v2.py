#!/usr/bin/env python3
"""
Lance la campagne Meta SMA v2 — ebook "Halal & patrimoine" sortie 5 août 2026.
Pointe vers https://muslimfinance.net/ebook/v2 (lead gen waitlist, aucun paiement).

Créatives : 3 statiques (livret A, perf perso, anti-banque) + carrousel Nvidia 6 slides.
Budget 30 EUR lifetime sur 7 jours, audience FR 25-50, intérêts finance.
Créé PAUSED par défaut ; --activate pour passer ACTIVE.

Usage :
    source ../leadmagnet/.venv/bin/activate
    python3 launch_meta_sma_v2.py [--activate]
"""
import sys
import json
import pathlib
from datetime import datetime, timedelta, timezone
import requests

ROOT = pathlib.Path(__file__).resolve().parent
VISUELS = ROOT / "visuels"
STATE_FILE = ROOT / "sma_v2_state.json"

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
LANDING = "https://muslimfinance.net/ebook/v2?utm_source=meta&utm_campaign=ebook_v2_aout&utm_content={slug}"

PRIMARY_TEXT = (
    "Portefeuille perso Trade Republic : +18 728 EUR de plus-value latente en 2 ans, "
    "sur des titres filtrés AAOIFI. Résultat personnel, dans un marché haussier — "
    "pas une promesse de gains.\n\n"
    "Le 5 août, je publie la méthode complète : screening AAOIFI expliqué simplement, "
    "protocole de conformité courtier en 4 règles, plans d'épargne hadj/mariage/maison "
    "sans crédit riba, et les réflexes pour détecter les arnaques type Validus.\n\n"
    "Inscris-toi maintenant : tu reçois l'ebook à 29 EUR à la sortie "
    "(au lieu de 63 EUR prix public). Aucun paiement aujourd'hui."
)
HEADLINE = "Halal & patrimoine — sortie 5 août"
DESCRIPTION = "47 pages. 29 EUR à la sortie pour les inscrits."

STATICS = [
    ("visuel_1_livret_a.png", "Static-LivretA", "static_livret_a"),
    ("visuel_2_perf.png", "Static-PerfPerso", "static_perf"),
    ("visuel_3_secret.png", "Static-AntiBanque", "static_secret"),
]
CAROUSEL = [(f"carousel_nvidia_{i}.png", f"carousel_nvidia_{i}") for i in range(1, 7)]


def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"hashes": {}, "ad_ids": {}}


def save_state(s):
    STATE_FILE.write_text(json.dumps(s, indent=2, ensure_ascii=False))


def fb_post(path, data):
    data = dict(data)
    data["access_token"] = TOKEN
    r = requests.post(f"{API}/{path}", data=data, timeout=60)
    if not r.ok:
        print(f"ERROR POST {path}\n  -> {r.status_code} {r.text}", file=sys.stderr)
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
    return next(iter(r.json()["images"].values()))["hash"]


def main():
    state = load_state()

    print("[1/5] Upload images...")
    for fname, _label, slug in STATICS:
        if slug not in state["hashes"]:
            state["hashes"][slug] = upload_image(VISUELS / fname)
            save_state(state)
    for fname, slug in CAROUSEL:
        if slug not in state["hashes"]:
            state["hashes"][slug] = upload_image(VISUELS / fname)
            save_state(state)

    print("\n[2/5] Campaign...")
    if "campaign_id" not in state:
        res = fb_post(f"{AD_ACCOUNT}/campaigns", {
            "name": "MF-EbookV2-2026-07-SMA",
            "objective": "OUTCOME_TRAFFIC",
            "status": "PAUSED",
            "special_ad_categories": "[]",
            "buying_type": "AUCTION",
            "is_adset_budget_sharing_enabled": "false",
        })
        state["campaign_id"] = res["id"]
        save_state(state)
    print(f"  campaign_id={state['campaign_id']}")

    print("\n[3/5] Ad set...")
    if "adset_id" not in state:
        start = datetime.now(timezone.utc) + timedelta(minutes=10)
        end = start + timedelta(days=7)
        targeting = {
            "geo_locations": {"countries": ["FR"]},
            "age_min": 25,
            "age_max": 50,
            "locales": [5],
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
            "name": "MF-EbookV2-AdSet-FR-25-50",
            "campaign_id": state["campaign_id"],
            "status": "PAUSED",
            "lifetime_budget": "3000",  # 30 EUR
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
    print(f"  adset_id={state['adset_id']}")

    print("\n[4/5] Creatives + ads statiques...")
    for _fname, label, slug in STATICS:
        creative_key = f"creative_{slug}"
        ad_key = f"ad_{slug}"
        if ad_key in state.get("ad_ids", {}):
            continue
        url = LANDING.format(slug=slug)
        if creative_key not in state:
            res = fb_post(f"{AD_ACCOUNT}/adcreatives", {
                "name": f"MF-EbookV2-Creative-{label}",
                "object_story_spec": json.dumps({
                    "page_id": PAGE_ID,
                    "link_data": {
                        "image_hash": state["hashes"][slug],
                        "link": url,
                        "message": PRIMARY_TEXT,
                        "name": HEADLINE,
                        "description": DESCRIPTION,
                        "call_to_action": {"type": "SIGN_UP", "value": {"link": url}},
                    },
                }),
            })
            state[creative_key] = res["id"]
            save_state(state)
        res = fb_post(f"{AD_ACCOUNT}/ads", {
            "name": f"MF-EbookV2-Ad-{label}",
            "adset_id": state["adset_id"],
            "creative": json.dumps({"creative_id": state[creative_key]}),
            "status": "PAUSED",
        })
        state.setdefault("ad_ids", {})[ad_key] = res["id"]
        save_state(state)
        print(f"  ad {slug}={res['id']}")

    print("\n[5/5] Carrousel Nvidia...")
    if "ad_carousel_nvidia" not in state.get("ad_ids", {}):
        url = LANDING.format(slug="carousel_nvidia")
        if "creative_carousel_nvidia" not in state:
            children = [{
                "image_hash": state["hashes"][slug],
                "link": url,
                "name": HEADLINE,
                "description": DESCRIPTION,
            } for _fname, slug in CAROUSEL]
            res = fb_post(f"{AD_ACCOUNT}/adcreatives", {
                "name": "MF-EbookV2-Creative-CarouselNvidia",
                "object_story_spec": json.dumps({
                    "page_id": PAGE_ID,
                    "link_data": {
                        "link": url,
                        "message": PRIMARY_TEXT,
                        "child_attachments": children,
                        "multi_share_optimized": True,
                        "multi_share_end_card": False,
                        "call_to_action": {"type": "SIGN_UP", "value": {"link": url}},
                    },
                }),
            })
            state["creative_carousel_nvidia"] = res["id"]
            save_state(state)
        res = fb_post(f"{AD_ACCOUNT}/ads", {
            "name": "MF-EbookV2-Ad-CarouselNvidia",
            "adset_id": state["adset_id"],
            "creative": json.dumps({"creative_id": state["creative_carousel_nvidia"]}),
            "status": "PAUSED",
        })
        state.setdefault("ad_ids", {})["ad_carousel_nvidia"] = res["id"]
        save_state(state)
        print(f"  ad carousel={res['id']}")

    print("\n=== Setup terminé ===")
    print(f"Campaign : {state['campaign_id']}")
    print(f"Ad Set   : {state['adset_id']}")
    print(f"Ads      : {state.get('ad_ids', {})}")
    print(f"Review   : https://adsmanager.facebook.com/adsmanager/manage/campaigns?act={AD_ACCOUNT.replace('act_', '')}&selected_campaign_ids={state['campaign_id']}")

    if "--activate" in sys.argv:
        print("\n[ACTIVATE] status=ACTIVE campaign + adset + ads...")
        fb_post(state["campaign_id"], {"status": "ACTIVE"})
        fb_post(state["adset_id"], {"status": "ACTIVE"})
        for ad_id in state.get("ad_ids", {}).values():
            fb_post(ad_id, {"status": "ACTIVE"})
        print("  -> campagne ACTIVE (review Meta en cours)")


if __name__ == "__main__":
    main()
