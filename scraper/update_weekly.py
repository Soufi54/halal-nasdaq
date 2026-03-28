"""
Mise a jour hebdomadaire des indices halal.
Pipeline : scrape poids → scrape halal status → build indices → commit + push.

Usage: python scraper/update_weekly.py
Doit etre lance depuis la racine du repo halal-nasdaq.
"""

import json
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

    # Etape 3 : Scrape halal status NASDAQ (utilise le cache, ne re-scrape pas tout)
    if not run("Scrape statut halal NASDAQ 100 (Zoya)", [python, str(SCRAPER_DIR / "scrape_halal.py")]):
        print("WARNING : echec scrape halal NASDAQ — on continue avec les donnees existantes")

    # Etape 4 : Scrape halal status S&P 500 (utilise le cache)
    if not run("Scrape statut halal S&P 500 (Zoya)", [
        python, str(SCRAPER_DIR / "scrape_halal_batch.py"),
        str(DATA_DIR / "sp500_weights.json"),
        str(DATA_DIR / "sp500_halal_status.json"),
    ]):
        print("WARNING : echec scrape halal S&P 500 — on continue avec les donnees existantes")

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

    # Etape 8 : Copier les donnees dans web/src pour le build Next.js
    print("\nCopie des donnees dans web/src...")
    shutil.copy2(DATA_DIR / "halal_nasdaq100.json", WEB_SRC / "data.json")
    shutil.copy2(DATA_DIR / "halal_sp500.json", WEB_SRC / "sp500-data.json")
    print("  OK")

    # Etape 9 : Verifier s'il y a des changements
    result = subprocess.run(
        ["git", "status", "--porcelain", "data/", "web/src/data.json", "web/src/sp500-data.json"],
        cwd=str(REPO_DIR), capture_output=True, text=True
    )
    if not result.stdout.strip():
        print("\nAucun changement dans les donnees — rien a pousser.")
        return

    # Etape 10 : Commit + push
    print(f"\nChangements detectes — commit + push...")
    subprocess.run(["git", "add", "data/", "web/src/data.json", "web/src/sp500-data.json"], cwd=str(REPO_DIR))

    # Lire les stats pour le message de commit
    nasdaq = json.loads((DATA_DIR / "halal_nasdaq100.json").read_text(encoding="utf-8"))
    sp500 = json.loads((DATA_DIR / "halal_sp500.json").read_text(encoding="utf-8"))
    msg = (
        f"Mise a jour hebdo {today} — "
        f"NASDAQ {nasdaq['stats']['included']}/{nasdaq['stats']['total_nasdaq100']} halal, "
        f"S&P {sp500['stats']['included']}/{sp500['stats']['total_sp500']} halal"
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
