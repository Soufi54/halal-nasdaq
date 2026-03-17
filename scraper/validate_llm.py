"""
Validation LLM : compare le scraping programmatique avec l'analyse Claude
sur un echantillon aleatoire de tickers.
"""

import json
import random
import sys
from pathlib import Path

import requests
from bs4 import BeautifulSoup

DATA_DIR = Path(__file__).parent.parent / "data"
HALAL_FILE = DATA_DIR / "halal_status.json"
VALIDATION_FILE = DATA_DIR / "validation_report.json"

SAMPLE_SIZE = 10

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}


def fetch_raw_html(ticker: str) -> str:
    """Recupere le HTML brut de la page Zoya pour un ticker."""
    url = f"https://zoya.finance/stocks/{ticker}"
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    # Extraire le texte pertinent (pas les scripts/styles)
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()
    return soup.get_text(separator="\n", strip=True)[:3000]


def main():
    if not HALAL_FILE.exists():
        print(f"ERREUR : {HALAL_FILE} introuvable", file=sys.stderr)
        sys.exit(1)

    halal_data = json.loads(HALAL_FILE.read_text())

    # Echantillon stratifie : prendre des halal, doubtful et not_halal
    by_status = {}
    for item in halal_data:
        by_status.setdefault(item["status"], []).append(item)

    sample = []
    for status, items in by_status.items():
        n = min(4, len(items))
        sample.extend(random.sample(items, n))

    random.shuffle(sample)
    sample = sample[:SAMPLE_SIZE]

    print(f"Validation LLM sur {len(sample)} tickers echantillonnes :")
    print("(Le texte brut est sauvegarde pour analyse manuelle ou Claude)\n")

    validations = []
    for item in sample:
        ticker = item["ticker"]
        print(f"  Fetching {ticker}...")
        try:
            raw_text = fetch_raw_html(ticker)
            validations.append({
                "ticker": ticker,
                "scraped_status": item["status"],
                "raw_text_excerpt": raw_text[:1500],
            })
        except Exception as e:
            print(f"    ERREUR : {e}")
            validations.append({
                "ticker": ticker,
                "scraped_status": item["status"],
                "error": str(e),
            })

    VALIDATION_FILE.write_text(json.dumps(validations, indent=2, ensure_ascii=False))
    print(f"\nSauvegarde dans {VALIDATION_FILE}")
    print("Analyser ce fichier avec Claude pour confirmer la coherence des statuts.")


if __name__ == "__main__":
    main()
