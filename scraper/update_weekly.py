"""
Mise a jour hebdomadaire des indices halal.
Pipeline : scrape poids → scrape halal status → build indices → commit + push.

Usage: python scraper/update_weekly.py
Doit etre lance depuis la racine du repo halal-nasdaq.
"""

import json
import re
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path

REPO_DIR = Path(__file__).parent.parent
SCRAPER_DIR = REPO_DIR / "scraper"
DATA_DIR = REPO_DIR / "data"
WEB_SRC = REPO_DIR / "web" / "src"


def run(description: str, cmd: list[str], cwd: Path = REPO_DIR) -> bool:
    """Execute une commande et affiche le resultat."""
    print(f"\n{'='*60}")
    print(f"  {description}")
    print(f"{'='*60}")
    result = subprocess.run(cmd, cwd=str(cwd), capture_output=True, text=True)
    if result.stdout:
        # Limiter la sortie pour les logs
        lines = result.stdout.strip().split("\n")
        for line in lines[:20]:
            print(f"  {line}")
        if len(lines) > 20:
            print(f"  ... ({len(lines) - 20} lignes supplementaires)")
    if result.returncode != 0:
        print(f"  ERREUR (code {result.returncode})")
        if result.stderr:
            print(f"  {result.stderr[:500]}")
        return False
    print(f"  OK")
    return True


def main():
    today = date.today().isoformat()
    print(f"Mise a jour hebdomadaire HalalNASDAQ — {today}")
    print(f"Repo : {REPO_DIR}")

    python = sys.executable

    # Etape 1 : Scrape NASDAQ 100 weights
    if not run("Scrape NASDAQ 100 (SlickCharts)", [python, str(SCRAPER_DIR / "scrape_nasdaq.py")]):
        print("ARRET : echec scrape NASDAQ 100")
        sys.exit(1)

    # Etape 2 : Scrape S&P 500 weights
    if not run("Scrape S&P 500 (SlickCharts)", [python, str(SCRAPER_DIR / "scrape_sp500.py")]):
        print("ARRET : echec scrape S&P 500")
        sys.exit(1)

    # Etape 3 : Scrape halal status NASDAQ via Playwright (JS-rendered, Zoya SPA)
    # Remplace scrape_halal.py qui ne marche plus depuis que Zoya est devenu SPA.
    # Respecte data/manual_overrides.json pour les tickers flagges manuellement.
    scrape_ok = True
    if not run("Scrape statut halal NASDAQ 100 (Zoya, Playwright)", [
        python, str(SCRAPER_DIR / "scrape_halal_playwright.py"),
        str(DATA_DIR / "nasdaq100_weights.json"),
        str(DATA_DIR / "halal_status.json"),
    ]):
        print("ERREUR : echec scrape halal NASDAQ")
        scrape_ok = False

    # Etape 4 : Scrape halal status S&P 500 via Playwright
    if not run("Scrape statut halal S&P 500 (Zoya, Playwright)", [
        python, str(SCRAPER_DIR / "scrape_halal_playwright.py"),
        str(DATA_DIR / "sp500_weights.json"),
        str(DATA_DIR / "sp500_halal_status.json"),
    ]):
        print("ERREUR : echec scrape halal S&P 500")
        scrape_ok = False

    if not scrape_ok:
        print("\nARRET : le scraping halal a echoue. On ne publie PAS de donnees potentiellement perimees.")
        print("Les donnees existantes restent en place avec leur date originale.")
        sys.exit(1)

    # Etape 5 : Build index NASDAQ 100
    if not run("Build indice NASDAQ 100 Halal", [python, str(SCRAPER_DIR / "build_index.py")]):
        print("ARRET : echec build indice NASDAQ")
        sys.exit(1)

    # Etape 6 : Build index S&P 500
    if not run("Build indice S&P 500 Halal", [python, str(SCRAPER_DIR / "build_sp500_index.py")]):
        print("ARRET : echec build indice S&P 500")
        sys.exit(1)

    # Etape 7 : Sauvegarder le snapshot historique
    if not run("Sauvegarde snapshot historique", [python, str(SCRAPER_DIR / "save_history.py")]):
        print("WARNING : echec sauvegarde historique — on continue")

    # Etape 8 : Backtest historique (yfinance)
    if not run("Backtest historique (yfinance)", [python, str(SCRAPER_DIR / "backtest.py")]):
        print("WARNING : echec backtest — on continue")

    # Etape 9 : Copier les donnees dans web/src pour le build Next.js
    print("\nCopie des donnees dans web/src...")
    shutil.copy2(DATA_DIR / "halal_nasdaq100.json", WEB_SRC / "data.json")
    shutil.copy2(DATA_DIR / "halal_sp500.json", WEB_SRC / "sp500-data.json")
    shutil.copy2(DATA_DIR / "history.json", WEB_SRC / "history.json")
    if (DATA_DIR / "backtest.json").exists():
        shutil.copy2(DATA_DIR / "backtest.json", WEB_SRC / "backtest.json")
    print("  OK")

    # Etape 10 : Mettre a jour les meta descriptions (OG/Twitter) avec les vrais chiffres
    nasdaq_data = json.loads((DATA_DIR / "halal_nasdaq100.json").read_text(encoding="utf-8"))
    sp500_data = json.loads((DATA_DIR / "halal_sp500.json").read_text(encoding="utf-8"))
    n_count = nasdaq_data["stats"]["included"]
    s_count = sp500_data["stats"]["included"]

    layout_fr = WEB_SRC / "app" / "layout.tsx"
    layout_en = WEB_SRC / "app" / "en" / "layout.tsx"

    for layout_path in [layout_fr, layout_en]:
        if layout_path.exists():
            content = layout_path.read_text(encoding="utf-8")
            content = re.sub(r"NASDAQ 100 Halal\s*:\s*\d+ actions", f"NASDAQ 100 Halal : {n_count} actions", content)
            content = re.sub(r"S&P 500 Halal\s*:\s*\d+ actions", f"S&P 500 Halal : {s_count} actions", content)
            content = re.sub(r"NASDAQ 100 Halal:\s*\d+ stocks", f"NASDAQ 100 Halal: {n_count} stocks", content)
            content = re.sub(r"S&P 500 Halal:\s*\d+ stocks", f"S&P 500 Halal: {s_count} stocks", content)
            layout_path.write_text(content, encoding="utf-8")
    print(f"  Meta descriptions mises a jour : NASDAQ {n_count}, S&P {s_count}")

    # Etape 11 : Verifier s'il y a des changements
    result = subprocess.run(
        ["git", "status", "--porcelain", "data/", "web/src/data.json", "web/src/sp500-data.json", "web/src/backtest.json", "web/src/app/layout.tsx", "web/src/app/en/layout.tsx"],
        cwd=str(REPO_DIR), capture_output=True, text=True
    )
    if not result.stdout.strip():
        print("\nAucun changement dans les donnees — rien a pousser.")
        return

    # Etape 12 : Commit + push
    print(f"\nChangements detectes — commit + push...")
    subprocess.run(["git", "add", "data/", "web/src/data.json", "web/src/sp500-data.json", "web/src/history.json", "web/src/backtest.json", "web/src/app/layout.tsx", "web/src/app/en/layout.tsx"], cwd=str(REPO_DIR))

    # Message de commit avec les stats
    msg = (
        f"Mise a jour hebdo {today} — "
        f"NASDAQ {nasdaq_data['stats']['included']}/{nasdaq_data['stats']['total_nasdaq100']} halal, "
        f"S&P {sp500_data['stats']['included']}/{sp500_data['stats']['total_sp500']} halal"
    )

    if not run("Git commit", ["git", "commit", "-m", msg]):
        print("ARRET : echec commit")
        sys.exit(1)

    if not run("Git push", ["git", "push"]):
        print("ARRET : echec push — verifier les credentials git")
        sys.exit(1)

    print(f"\nMise a jour terminee. GitHub Actions va deployer automatiquement.")


if __name__ == "__main__":
    main()
