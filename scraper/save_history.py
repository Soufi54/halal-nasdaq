"""
Sauvegarde un snapshot historique des indices halal.
Ajoute une ligne datee dans data/history.json a chaque execution.

Usage: python scraper/save_history.py
Appele automatiquement par update_weekly.py apres le build des indices.
"""

import json
from datetime import date
from pathlib import Path

REPO_DIR = Path(__file__).parent.parent
DATA_DIR = REPO_DIR / "data"
HISTORY_FILE = DATA_DIR / "history.json"


def main():
    today = date.today().isoformat()

    # Charger les indices actuels
    nasdaq = json.loads((DATA_DIR / "halal_nasdaq100.json").read_text(encoding="utf-8"))
    sp500 = json.loads((DATA_DIR / "halal_sp500.json").read_text(encoding="utf-8"))

    # Construire le snapshot
    snapshot = {
        "date": today,
        "nasdaq100": {
            "total": nasdaq["stats"]["total_nasdaq100"],
            "halal": nasdaq["stats"]["included"],
            "excluded": nasdaq["stats"]["excluded"],
            "doubtful": nasdaq["stats"]["doubtful_count"],
            "halal_weight_pct": round(100 - nasdaq["stats"]["excluded_weight_pct"], 2),
            "top5": [
                {"ticker": h["ticker"], "weight": round(h["halal_weight"], 2)}
                for h in nasdaq["holdings"][:5]
            ],
        },
        "sp500": {
            "total": sp500["stats"]["total_sp500"],
            "halal": sp500["stats"]["included"],
            "excluded": sp500["stats"]["excluded"],
            "doubtful": sp500["stats"]["doubtful_count"],
            "halal_weight_pct": round(100 - sp500["stats"]["excluded_weight_pct"], 2),
            "top5": [
                {"ticker": h["ticker"], "weight": round(h["halal_weight"], 2)}
                for h in sp500["holdings"][:5]
            ],
        },
    }

    # Charger l'historique existant ou creer
    if HISTORY_FILE.exists():
        history = json.loads(HISTORY_FILE.read_text(encoding="utf-8"))
    else:
        history = []

    # Eviter les doublons : remplacer si meme date
    history = [h for h in history if h["date"] != today]
    history.append(snapshot)
    history.sort(key=lambda x: x["date"])

    HISTORY_FILE.write_text(
        json.dumps(history, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    print(f"Snapshot {today} sauvegarde dans {HISTORY_FILE}")
    print(f"  NASDAQ: {snapshot['nasdaq100']['halal']}/{snapshot['nasdaq100']['total']} halal")
    print(f"  S&P:    {snapshot['sp500']['halal']}/{snapshot['sp500']['total']} halal")
    print(f"  Total snapshots: {len(history)}")


if __name__ == "__main__":
    main()
