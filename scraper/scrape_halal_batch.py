"""
Scrape le statut halal/haram de chaque ticker depuis Zoya.finance.
Version generique : prend un fichier de poids en entree et un fichier de sortie.

Usage:
    python scrape_halal_batch.py <input_weights.json> <output_halal_status.json>

Exemple:
    python scrape_halal_batch.py data/sp500_weights.json data/sp500_halal_status.json
"""

import json
import re
import sys
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://zoya.finance/stocks"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}

# Pause entre les requetes (secondes)
DELAY = 1.5


def get_halal_status(ticker: str) -> dict:
    """Recupere le statut halal d'un ticker depuis Zoya.finance."""
    url = f"{BASE_URL}/{ticker}"
    resp = requests.get(url, headers=HEADERS, timeout=30)

    if resp.status_code == 404:
        return {"ticker": ticker, "status": "unknown", "source": "zoya", "detail": "page introuvable"}

    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    text = soup.get_text(separator=" ", strip=True).lower()

    ticker_lower = ticker.lower()

    if f"{ticker_lower} is shariah-compliant" in text or f"{ticker_lower} is shariah compliant" in text:
        status = "halal"
    elif f"{ticker_lower} is questionable" in text:
        status = "doubtful"
    elif f"{ticker_lower} is not shariah-compliant" in text or f"{ticker_lower} is not shariah compliant" in text:
        status = "not_halal"
    else:
        status = "unknown"

    # Extraire le revenu d'interet si present
    interest_pct = None
    match = re.search(r"interest income.*?(\d+\.?\d*)%", text)
    if match:
        interest_pct = float(match.group(1))

    return {
        "ticker": ticker,
        "status": status,
        "interest_pct": interest_pct,
        "source": "zoya",
    }


def main():
    if len(sys.argv) != 3:
        print("Usage: python scrape_halal_batch.py <input_weights.json> <output_halal_status.json>")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    if not input_path.exists():
        print(f"ERREUR : {input_path} introuvable", file=sys.stderr)
        sys.exit(1)

    holdings = json.loads(input_path.read_text(encoding="utf-8"))
    tickers = [h["ticker"] for h in holdings]
    total = len(tickers)

    print(f"Scraping statut halal pour {total} tickers depuis Zoya.finance...")
    print(f"  Input  : {input_path}")
    print(f"  Output : {output_path}")
    print(f"  Delay  : {DELAY}s entre chaque requete")
    print(f"  Temps estime : ~{total * DELAY / 60:.0f} minutes\n")

    # Charger les resultats existants pour reprendre en cas d'interruption
    existing = {}
    if output_path.exists():
        for item in json.loads(output_path.read_text(encoding="utf-8")):
            existing[item["ticker"]] = item

    results = []
    for i, ticker in enumerate(tickers, 1):
        if ticker in existing:
            print(f"  [{i}/{total}] {ticker} -- cache ({existing[ticker]['status']})")
            results.append(existing[ticker])
            continue

        try:
            result = get_halal_status(ticker)
            results.append(result)
            print(f"  [{i}/{total}] {ticker} -- {result['status']}")

            # Sauvegarde incrementale
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")

            if i < total:
                time.sleep(DELAY)

        except Exception as e:
            print(f"  [{i}/{total}] {ticker} -- ERREUR : {e}")
            results.append({"ticker": ticker, "status": "error", "source": "zoya", "detail": str(e)})

    # Ecriture finale (meme si tout vient du cache)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")

    # Stats
    halal = sum(1 for r in results if r["status"] == "halal")
    doubtful = sum(1 for r in results if r["status"] == "doubtful")
    not_halal = sum(1 for r in results if r["status"] == "not_halal")
    unknown = sum(1 for r in results if r["status"] in ("unknown", "error"))

    print(f"\nResultats : {halal} halal, {doubtful} doubtful, {not_halal} not halal, {unknown} unknown")
    print(f"Sauvegarde dans {output_path}")


if __name__ == "__main__":
    main()
