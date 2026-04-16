"""
Construit l'indice S&P 500 Halal.

La date affichee correspond a la fraicheur reelle des donnees scrapees,
PAS a la date du build.
"""

import json
import sys
from pathlib import Path

# Reutiliser la logique de qualite de build_index
sys.path.insert(0, str(Path(__file__).parent))
from build_index import compute_data_date, MAX_ERROR_PCT, MAX_STALE_DAYS

DATA_DIR = Path(__file__).parent.parent / "data"
WEIGHTS_FILE = DATA_DIR / "sp500_weights.json"
HALAL_FILE = DATA_DIR / "sp500_halal_status.json"
OUTPUT = DATA_DIR / "halal_sp500.json"


def main():
    holdings = json.loads(WEIGHTS_FILE.read_text(encoding="utf-8"))
    halal_data = json.loads(HALAL_FILE.read_text(encoding="utf-8"))

    # Verifier la qualite des donnees
    data_date, quality = compute_data_date(halal_data)

    if quality["error_pct"] > MAX_ERROR_PCT:
        print(f"ERREUR : {quality['errors']}/{quality['total']} tickers en error/unknown "
              f"({quality['error_pct']}% > seuil {MAX_ERROR_PCT}%)", file=sys.stderr)
        sys.exit(1)

    if quality.get("oldest_age_days", 0) > MAX_STALE_DAYS:
        print(f"ERREUR : donnees perimees ({quality['oldest_age_days']}j > seuil {MAX_STALE_DAYS}j) — arret.", file=sys.stderr)
        sys.exit(1)

    # Marquer stale si > 3 jours
    if quality.get("oldest_age_days", 0) > 3:
        quality["stale"] = True
    else:
        quality["stale"] = False

    print(f"  Qualite donnees : {quality['total'] - quality['errors']}/{quality['total']} OK, "
          f"date={data_date} (source={quality['date_source']})")

    status_map = {item["ticker"]: item for item in halal_data}

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

    excluded.extend(doubtful_holdings)
    included = halal_holdings

    total_w = sum(h["weight"] for h in included)
    ratio = 100.0 / total_w

    for h in included:
        h["original_weight"] = h["weight"]
        h["halal_weight"] = round(h["weight"] * ratio, 4)

    included.sort(key=lambda h: h["halal_weight"], reverse=True)
    for i, h in enumerate(included, 1):
        h["halal_rank"] = i

    excluded_weight = sum(h["weight"] for h in excluded)

    result = {
        "date": data_date,
        "stats": {
            "total_sp500": len(holdings),
            "included": len(included),
            "excluded": len(excluded),
            "halal_count": len(halal_holdings),
            "doubtful_count": len(doubtful_holdings),
            "excluded_weight_pct": round(excluded_weight, 2),
            "data_quality": quality,
        },
        "holdings": included,
        "excluded": excluded,
    }

    OUTPUT.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"S&P 500 Halal — {data_date}")
    print(f"  Incluses : {len(included)} halal")
    print(f"  Exclues  : {len(excluded)} ({len(excluded)-len(doubtful_holdings)} not_halal + {len(doubtful_holdings)} doubtful)")
    print(f"  Poids exclu : {excluded_weight:.2f}%")
    print(f"\nTop 10 :")
    for h in included[:10]:
        print(f"  {h['halal_rank']:>3}. {h['ticker']:<6} {h['halal_weight']:>6.2f}%  (orig {h['original_weight']:.2f}%)")


if __name__ == "__main__":
    main()
