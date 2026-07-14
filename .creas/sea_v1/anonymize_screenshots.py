#!/usr/bin/env python3
"""
Anonymise les 3 screenshots Trade Republic de Chaker pour usage marketing.
Masque : top bar iOS (heure, wifi, batterie), badge profil "C" en haut a droite,
bouton "Rechercher" et "Transferer" en bas (pas necessaires).

Output : PNG anonymises dans :
  - .creas/sea_v1/portfolio-proof-{1,2,3}.png (source)
  - vault Attachments/muslimfinance/
  - web/public/img/portfolio-proof/ (pour landing + ebook)

Usage :
    source ~/work/halal-nasdaq/.creas/leadmagnet/.venv/bin/activate
    python3 anonymize_screenshots.py
"""
import pathlib
import shutil
from PIL import Image, ImageDraw, ImageFilter

SRC_DIR = pathlib.Path.home() / "Downloads"
OUT_DIR = pathlib.Path(__file__).parent
VAULT_ATTACHMENTS = pathlib.Path(
    "/Users/memmadichaker/Library/CloudStorage/OneDrive-Personal/"
    "Applications/Remotely Sync/SecondCerveau/Attachments/muslimfinance"
)
WEB_PROOF_DIR = pathlib.Path.home() / "work/halal-nasdaq/web/public/img/portfolio-proof"

SOURCES = [
    ("IMG_0632.PNG", "portfolio-proof-graph.png"),   # graphique + total
    ("IMG_0633.PNG", "portfolio-proof-top.png"),     # top positions (NVDA, ARM...)
    ("IMG_0634.PNG", "portfolio-proof-more.png"),    # autres positions
]


def anonymize(src_path: pathlib.Path, dst_path: pathlib.Path):
    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    draw = ImageDraw.Draw(img)

    # 1. Masquer top bar iOS (heure, wifi, batterie) — top 8% de l'image, noir
    draw.rectangle([(0, 0), (w, int(h * 0.05))], fill=(0, 0, 0))

    # 2. Masquer badge profil "C" en haut a droite (cercle top-right)
    # Zone approximative : x=[85%..99%], y=[6%..12%]
    x0 = int(w * 0.80)
    y0 = int(h * 0.06)
    x1 = int(w * 0.99)
    y1 = int(h * 0.13)
    draw.rectangle([(x0, y0), (x1, y1)], fill=(0, 0, 0))

    # 3. Masquer barre du bas (Rechercher / Transferer) — bottom 12%
    draw.rectangle([(0, int(h * 0.88)), (w, h)], fill=(0, 0, 0))

    # 4. Ajouter watermark discret "muslimfinance.net" en bas
    # (pas d'ajout — le screenshot doit rester "authentique" visuellement,
    #  le watermark ira en overlay sur la landing/ebook)

    img.save(dst_path, "PNG", optimize=True)
    print(f"  {src_path.name} -> {dst_path.name} ({dst_path.stat().st_size // 1024} KB)")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    VAULT_ATTACHMENTS.mkdir(parents=True, exist_ok=True)
    WEB_PROOF_DIR.mkdir(parents=True, exist_ok=True)

    for src_name, dst_name in SOURCES:
        src = SRC_DIR / src_name
        if not src.exists():
            print(f"MANQUE : {src}")
            continue

        # Ecrit dans OUT_DIR
        dst_local = OUT_DIR / dst_name
        anonymize(src, dst_local)

        # Copie vers vault Attachments
        vault_dst = VAULT_ATTACHMENTS / dst_name
        shutil.copy(dst_local, vault_dst)
        print(f"    -> vault : {vault_dst}")

        # Copie vers web/public
        web_dst = WEB_PROOF_DIR / dst_name
        shutil.copy(dst_local, web_dst)
        print(f"    -> web   : {web_dst}")


if __name__ == "__main__":
    main()
