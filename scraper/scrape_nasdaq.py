"""
Scrape NASDAQ 100 holdings (tickers + poids) depuis SlickCharts.
Sortie : data/nasdaq100_weights.json
"""

import json
import re
import sys
from pathlib import Path

import requests
from bs4 import BeautifulSoup

DATA_DIR = Path(__file__).parent.parent / "data"
OUTPUT = DATA_DIR / "nasdaq100_weights.json"

URL = "https://www.slickcharts.com/nasdaq100"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}


def scrape_nasdaq100() -> list[dict]:
    """Scrape les poids du NASDAQ 100 depuis SlickCharts."""
    resp = requests.get(URL, headers=HEADERS, timeout=30)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")

    # La table principale contient les colonnes :
    # #, Company, Symbol, Weight, Price, Chg, % Chg
    table = soup.find("table", class_="table")
    if not table:
        # Fallback : chercher le JSON embarque dans le script
        script_tags = soup.find_all("script")
        for script in script_tags:
            if script.string and "nasdaq100List" in script.string:
                match = re.search(r"nasdaq100List\s*=\s*(\[.*?\]);", script.string, re.DOTALL)
                if match:
                    return json.loads(match.group(1))
        raise ValueError("Impossible de trouver les donnees NASDAQ 100 sur la page")

    rows = table.find("tbody").find_all("tr")
    holdings = []

    for row in rows:
        cells = row.find_all("td")
        if len(cells) < 4:
            continue

        rank = int(cells[0].get_text(strip=True))
        company = cells[1].get_text(strip=True)
        ticker = cells[2].get_text(strip=True)
        weight_str = cells[3].get_text(strip=True).replace("%", "").replace(",", ".")

        try:
            weight = float(weight_str)
        except ValueError:
            continue

        holdings.append({
            "rank": rank,
            "company": company,
            "ticker": ticker,
            "weight": weight,
        })

    return holdings


def main():
    print(f"Scraping NASDAQ 100 depuis {URL}...")
    holdings = scrape_nasdaq100()

    if not holdings:
        print("ERREUR : aucune donnee recuperee", file=sys.stderr)
        sys.exit(1)

    total_weight = sum(h["weight"] for h in holdings)
    print(f"OK : {len(holdings)} actions, poids total = {total_weight:.2f}%")

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(holdings, indent=2, ensure_ascii=False))
    print(f"Sauvegarde dans {OUTPUT}")

    # Afficher le top 10
    print("\nTop 10 :")
    for h in holdings[:10]:
        print(f"  {h['rank']:>3}. {h['ticker']:<6} {h['weight']:>6.2f}%  {h['company']}")


if __name__ == "__main__":
    main()
