"""
Scrape le statut halal/haram de chaque ticker depuis Zoya.finance.
Entree : data/nasdaq100_weights.json
Sortie : data/halal_status.json
"""

import json
import sys
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup

DATA_DIR = Path(__file__).parent.parent / "data"
INPUT = DATA_DIR / "nasdaq100_weights.json"
OUTPUT = DATA_DIR / "halal_status.json"

BASE_URL = "https://zoya.finance/stocks"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}

# Pause entre les requetes pour ne pas se faire bloquer (secondes)
DELAY = 2.0


def get_halal_status(ticker: str) -> dict:
    """Recupere le statut halal d'un ticker depuis Zoya.finance."""
    url = f"{BASE_URL}/{ticker}"
    resp = requests.get(url, headers=HEADERS, timeout=30)

    if resp.status_code == 404:
        return {"ticker": ticker, "status": "unknown", "source": "zoya", "detail": "page introuvable"}

    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    text = soup.get_text(separator=" ", strip=True).lower()

    # Detecter le statut dans le texte de la page
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
    import re
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
    if not INPUT.exists():
        print(f"ERREUR : {INPUT} introuvable. Lance d'abord scrape_nasdaq.py", file=sys.stderr)
        sys.exit(1)

    holdings = json.loads(INPUT.read_text())
    tickers = [h["ticker"] for h in holdings]
    total = len(tickers)

    print(f"Scraping statut halal pour {total} tickers depuis Zoya.finance...")

    # Charger les resultats existants pour reprendre en cas d'interruption
    existing = {}
    if OUTPUT.exists():
        for item in json.loads(OUTPUT.read_text()):
            existing[item["ticker"]] = item

    results = []
    for i, ticker in enumerate(tickers, 1):
        if ticker in existing:
            print(f"  [{i}/{total}] {ticker} — cache ({existing[ticker]['status']})")
            results.append(existing[ticker])
            continue

        try:
            result = get_halal_status(ticker)
            results.append(result)
            print(f"  [{i}/{total}] {ticker} — {result['status']}")

            # Sauvegarde incrementale
            OUTPUT.write_text(json.dumps(results, indent=2, ensure_ascii=False))

            if i < total:
                time.sleep(DELAY)

        except Exception as e:
            print(f"  [{i}/{total}] {ticker} — ERREUR : {e}")
            results.append({"ticker": ticker, "status": "error", "source": "zoya", "detail": str(e)})

    # Stats
    halal = sum(1 for r in results if r["status"] == "halal")
    doubtful = sum(1 for r in results if r["status"] == "doubtful")
    not_halal = sum(1 for r in results if r["status"] == "not_halal")
    unknown = sum(1 for r in results if r["status"] in ("unknown", "error"))

    print(f"\nResultats : {halal} halal, {doubtful} doubtful, {not_halal} not halal, {unknown} unknown")
    print(f"Sauvegarde dans {OUTPUT}")


if __name__ == "__main__":
    main()
