"""
Construit l'indice NASDAQ 100 Halal a partir des poids et du statut halal.
Entree : data/nasdaq100_weights.json + data/halal_status.json
Sortie : data/halal_nasdaq100.json
"""

import json
import sys
from datetime import date
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
WEIGHTS_FILE = DATA_DIR / "nasdaq100_weights.json"
HALAL_FILE = DATA_DIR / "halal_status.json"
OUTPUT = DATA_DIR / "halal_nasdaq100.json"


def main():
    if not WEIGHTS_FILE.exists():
        print(f"ERREUR : {WEIGHTS_FILE} introuvable", file=sys.stderr)
        sys.exit(1)
    if not HALAL_FILE.exists():
        print(f"ERREUR : {HALAL_FILE} introuvable", file=sys.stderr)
        sys.exit(1)

    holdings = json.loads(WEIGHTS_FILE.read_text())
    halal_data = json.loads(HALAL_FILE.read_text())

    # Index statut par ticker
    status_map = {item["ticker"]: item for item in halal_data}

    # Separer halal vs exclues
    halal_holdings = []
    excluded = []
    doubtful_holdings = []

    for h in holdings:
        ticker = h["ticker"]
        halal_info = status_map.get(ticker, {"status": "unknown"})
        h["halal_status"] = halal_info["status"]
        h["interest_pct"] = halal_info.get("interest_pct")

        if halal_info["status"] == "halal":
            halal_holdings.append(h)
        elif halal_info["status"] == "doubtful":
            doubtful_holdings.append(h)
        else:
            excluded.append(h)

    # Les "doubtful" sont consideres halal par Zoya (investissables)
    # On les inclut dans l'indice avec un flag
    included = halal_holdings + doubtful_holdings

    # Redistribuer les poids pro-rata
    total_included_weight = sum(h["weight"] for h in included)
    if total_included_weight == 0:
        print("ERREUR : aucune action halal trouvee", file=sys.stderr)
        sys.exit(1)

    ratio = 100.0 / total_included_weight

    for h in included:
        h["original_weight"] = h["weight"]
        h["halal_weight"] = round(h["weight"] * ratio, 4)

    # Trier par poids halal decroissant
    included.sort(key=lambda h: h["halal_weight"], reverse=True)

    # Re-rank
    for i, h in enumerate(included, 1):
        h["halal_rank"] = i

    # Stats
    total_original = sum(h["original_weight"] for h in included)
    total_halal = sum(h["halal_weight"] for h in included)
    excluded_weight = sum(h["weight"] for h in excluded)

    result = {
        "date": date.today().isoformat(),
        "stats": {
            "total_nasdaq100": len(holdings),
            "included": len(included),
            "excluded": len(excluded),
            "halal_count": len(halal_holdings),
            "doubtful_count": len(doubtful_holdings),
            "excluded_weight_pct": round(excluded_weight, 2),
            "included_weight_pct": round(total_original, 2),
        },
        "holdings": included,
        "excluded": excluded,
    }

    OUTPUT.write_text(json.dumps(result, indent=2, ensure_ascii=False))

    print(f"NASDAQ 100 Halal — {date.today().isoformat()}")
    print(f"  Actions incluses : {len(included)} ({len(halal_holdings)} halal + {len(doubtful_holdings)} doubtful)")
    print(f"  Actions exclues  : {len(excluded)} (poids original : {excluded_weight:.2f}%)")
    print(f"  Poids redistribue : {total_halal:.2f}%")
    print(f"\nTop 10 :")
    for h in included[:10]:
        flag = " [D]" if h["halal_status"] == "doubtful" else ""
        print(f"  {h['halal_rank']:>3}. {h['ticker']:<6} {h['halal_weight']:>6.2f}%  (orig {h['original_weight']:.2f}%){flag}")

    print(f"\nExclues ({len(excluded)}) :")
    for h in excluded:
        print(f"  - {h['ticker']:<6} {h['weight']:>5.2f}%  {h['company']} ({h['halal_status']})")

    print(f"\nSauvegarde dans {OUTPUT}")


if __name__ == "__main__":
    main()
