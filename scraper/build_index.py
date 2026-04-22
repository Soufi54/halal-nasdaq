"""
Construit l'indice NASDAQ 100 Halal a partir des poids et du statut halal.
Entree : data/nasdaq100_weights.json + data/halal_status.json
Sortie : data/halal_nasdaq100.json

La date affichee correspond a la fraicheur reelle des donnees scrapees,
PAS a la date du build. Si le scraping a echoue, la date reste ancienne.
"""

import json
import sys
from collections import Counter
from datetime import date, datetime, timezone
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
WEIGHTS_FILE = DATA_DIR / "nasdaq100_weights.json"
HALAL_FILE = DATA_DIR / "halal_status.json"
OUTPUT = DATA_DIR / "halal_nasdaq100.json"

# Seuils de qualite des donnees
MAX_ERROR_PCT = 10  # Max % de tickers en error/unknown avant alerte
MAX_STALE_DAYS = 14  # Donnees de plus de 14 jours = perimees


def compute_data_date(halal_data: list[dict]) -> tuple[str, dict]:
    """Calcule la date reelle des donnees a partir des scraped_at.

    Retourne (date_iso, quality_stats).
    La date = la plus recente date de scrape commune (mode).
    Si aucune date, fallback sur date.today() avec un warning.
    """
    scraped_dates = []
    errors = 0
    missing_dates = 0

    for item in halal_data:
        status = item.get("status", "unknown")
        if status in ("error", "unknown"):
            errors += 1
        ts = item.get("scraped_at")
        if not ts:
            missing_dates += 1
            continue
        try:
            dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
            scraped_dates.append(dt.date().isoformat())
        except Exception:
            missing_dates += 1

    total = len(halal_data)
    error_pct = round(errors / total * 100, 1) if total else 100

    quality = {
        "total": total,
        "errors": errors,
        "error_pct": error_pct,
        "missing_dates": missing_dates,
    }

    if not scraped_dates:
        quality["date_source"] = "fallback_today"
        quality["stale"] = True
        print("ERREUR : aucun scraped_at dans les donnees — on ne peut pas garantir la fraicheur.", file=sys.stderr)
        print("ARRET : refus de publier sans date de scrape verifiable.", file=sys.stderr)
        sys.exit(1)

    # Utiliser la date la plus frequente (mode)
    date_counts = Counter(scraped_dates)
    most_common_date = date_counts.most_common(1)[0][0]
    oldest_date = min(scraped_dates)

    quality["date_source"] = "scraped_at"
    quality["most_common_date"] = most_common_date
    quality["oldest_entry"] = oldest_date

    # Verifier peremption
    oldest_dt = datetime.fromisoformat(oldest_date)
    age_days = (datetime.now(timezone.utc).date() - oldest_dt.date()).days
    quality["oldest_age_days"] = age_days

    return most_common_date, quality


def main():
    if not WEIGHTS_FILE.exists():
        print(f"ERREUR : {WEIGHTS_FILE} introuvable", file=sys.stderr)
        sys.exit(1)
    if not HALAL_FILE.exists():
        print(f"ERREUR : {HALAL_FILE} introuvable", file=sys.stderr)
        sys.exit(1)

    holdings = json.loads(WEIGHTS_FILE.read_text(encoding="utf-8"))
    halal_data = json.loads(HALAL_FILE.read_text(encoding="utf-8"))

    # Verifier la qualite des donnees
    data_date, quality = compute_data_date(halal_data)

    if quality["error_pct"] > MAX_ERROR_PCT:
        print(f"ERREUR : {quality['errors']}/{quality['total']} tickers en error/unknown "
              f"({quality['error_pct']}% > seuil {MAX_ERROR_PCT}%)", file=sys.stderr)
        print("Les donnees scrapees sont de mauvaise qualite. Verifier le scraper.", file=sys.stderr)
        sys.exit(1)

    if quality.get("oldest_age_days", 0) > MAX_STALE_DAYS:
        print(f"ERREUR : donnees les plus anciennes datent de {quality['oldest_age_days']} jours "
              f"(seuil {MAX_STALE_DAYS}j) — donnees perimees, arret.", file=sys.stderr)
        sys.exit(1)

    # Marquer les donnees comme stale si > 8 jours (visible sur le frontend)
    # Le scraper rafraichit tous les 7 jours (REFRESH_MAX_AGE_DAYS), donc seuil = 8j
    if quality.get("oldest_age_days", 0) > 8:
        quality["stale"] = True
    else:
        quality["stale"] = False

    print(f"  Qualite donnees : {quality['total'] - quality['errors']}/{quality['total']} OK, "
          f"date={data_date} (source={quality['date_source']})")

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

    # Les "doubtful" sont exclus de l'indice (approche stricte)
    excluded.extend(doubtful_holdings)
    included = halal_holdings

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
        "date": data_date,
        "stats": {
            "total_nasdaq100": len(holdings),
            "included": len(included),
            "excluded": len(excluded),
            "halal_count": len(halal_holdings),
            "doubtful_count": len(doubtful_holdings),
            "excluded_weight_pct": round(excluded_weight, 2),
            "included_weight_pct": round(total_original, 2),
            "data_quality": quality,
        },
        "holdings": included,
        "excluded": excluded,
    }

    OUTPUT.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"NASDAQ 100 Halal — {data_date}")
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
