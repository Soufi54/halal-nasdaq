#!/usr/bin/env python3
"""
Genere 3 visuels statiques Meta (1080x1350 portrait Feed) pour la campagne SMA v1.

Angles :
1. visuel_1_livret_a.png    — Peur / inflation
2. visuel_2_perf.png        — Performance +18 728 EUR PV latente
3. visuel_3_secret.png      — Secret / anti-banque

Usage :
    source ~/work/halal-nasdaq/.creas/leadmagnet/.venv/bin/activate
    python3 gen_visuels.py
"""
import pathlib
import shutil
from PIL import Image, ImageDraw, ImageFont

# ── Config ────────────────────────────────────────────────────────────────
OUT_DIR = pathlib.Path(__file__).parent / "visuels"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Copies dans le repo web + vault Attachments
WEB_DIR = pathlib.Path.home() / "work/halal-nasdaq/web/public/img/sma"
VAULT_ATT = pathlib.Path(
    "/Users/memmadichaker/Library/CloudStorage/OneDrive-Personal/"
    "Applications/Remotely Sync/SecondCerveau/Attachments/muslimfinance"
)
WEB_DIR.mkdir(parents=True, exist_ok=True)
VAULT_ATT.mkdir(parents=True, exist_ok=True)

W, H = 1080, 1350   # Meta Feed portrait

# Palette (identique ebook v2)
DARK   = (28, 25, 23)     # #1c1917
GOLD   = (201, 166, 98)   # #c9a662
GOLD_D = (160, 124, 58)   # #a07c3a
IVORY  = (250, 250, 247)  # #fafaf7
STONE  = (247, 243, 235)  # #f7f3eb
GREY   = (87, 83, 78)     # #57534e
LIGHT  = (168, 162, 158)  # #a8a29e
RED    = (185, 28, 28)    # #b91c1c
AMBER  = (254, 243, 199)  # #fef3c7

# Fonts (fallback si pas dispo)
def load_font(size: int, bold: bool = False):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    if bold:
        candidates = [
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/System/Library/Fonts/HelveticaNeueBold.ttf",
            "/Library/Fonts/Arial Bold.ttf",
        ] + candidates
    for c in candidates:
        p = pathlib.Path(c)
        if p.exists():
            try:
                return ImageFont.truetype(str(p), size)
            except Exception:
                pass
    return ImageFont.load_default()


def wrap_text(draw, text, font, max_width):
    """Wrap text to fit max_width."""
    words = text.split()
    lines = []
    current = []
    for w in words:
        test = " ".join(current + [w])
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current.append(w)
        else:
            if current:
                lines.append(" ".join(current))
            current = [w]
    if current:
        lines.append(" ".join(current))
    return lines


def draw_wrapped(draw, xy, text, font, fill, max_width, line_height=None):
    """Draw wrapped text at xy top-left. Returns bottom y."""
    lines = wrap_text(draw, text, font, max_width)
    x, y = xy
    if line_height is None:
        bbox = draw.textbbox((0, 0), "Ag", font=font)
        line_height = int((bbox[3] - bbox[1]) * 1.2)
    for ln in lines:
        draw.text((x, y), ln, font=font, fill=fill)
        y += line_height
    return y


def brand_footer(draw, y=None):
    """Add brand footer + URL."""
    if y is None:
        y = H - 120
    draw.line([(80, y), (W-80, y)], fill=GOLD, width=2)
    f_brand = load_font(28, bold=True)
    f_url = load_font(24)
    draw.text((80, y+20), "MUSLIMFINANCE.NET", font=f_brand, fill=GOLD)
    draw.text((80, y+56), "Ebook \"Halal & patrimoine\" — sortie 22 juillet 2026", font=f_url, fill=IVORY)


# ── Visuel 1 — Peur / Livret A ────────────────────────────────────────────
def build_visuel_1():
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)

    # Top gold accent bar
    draw.rectangle([(0, 0), (W, 8)], fill=GOLD)

    # Brand label top
    f_brand_top = load_font(24, bold=True)
    draw.text((80, 40), "MUSLIMFINANCE.NET", font=f_brand_top, fill=GOLD)

    # Big number: -4.5 %
    f_huge = load_font(220, bold=True)
    draw.text((80, 140), "-4,5 %", font=f_huge, fill=RED)

    # Subtext
    f_sub = load_font(38, bold=True)
    draw.text((80, 400), "Ce que ton Livret A", font=f_sub, fill=IVORY)
    draw.text((80, 450), "t'a fait perdre en 2024.", font=f_sub, fill=IVORY)

    # Explanation
    f_body = load_font(30)
    y = draw_wrapped(draw, (80, 540),
        "Rendement : +3,0 %. Inflation : +4,5 %. "
        "Perte reelle de pouvoir d'achat : -1,5 % / an.",
        f_body, LIGHT, W-160)

    # Divider
    draw.line([(80, 700), (W-80, 700)], fill=GOLD, width=2)

    # Callout
    f_call_h = load_font(42, bold=True)
    draw.text((80, 740), "La solution halal existe.", font=f_call_h, fill=GOLD)

    f_call = load_font(28)
    y = draw_wrapped(draw, (80, 820),
        "Le guide muslimfinance.net (14 EUR) explique la "
        "methode pour transformer 300 EUR/mois en portefeuille "
        "halal AAOIFI. Sans banque islamique. Sans conseiller. "
        "Sans credit.",
        f_call, IVORY, W-160, line_height=42)

    # CTA button
    btn_x, btn_y, btn_w, btn_h = 80, H-260, W-160, 90
    draw.rounded_rectangle([(btn_x, btn_y), (btn_x+btn_w, btn_y+btn_h)],
                           radius=12, fill=GOLD)
    f_cta = load_font(34, bold=True)
    txt = "Je reserve ma place - 29 EUR sortie"
    bbox = draw.textbbox((0, 0), txt, font=f_cta)
    tw = bbox[2] - bbox[0]
    draw.text((btn_x + (btn_w-tw)//2, btn_y+24), txt, font=f_cta, fill=DARK)

    # Footer
    brand_footer(draw, y=H-140)

    return img


# ── Visuel 2 — Performance +18 728 EUR ────────────────────────────────────
def build_visuel_2():
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)

    draw.rectangle([(0, 0), (W, 8)], fill=GOLD)

    f_brand_top = load_font(24, bold=True)
    draw.text((80, 40), "MUSLIMFINANCE.NET — MON COMPTE PERSO", font=f_brand_top, fill=GOLD)

    # Small subtitle
    f_kicker = load_font(28)
    draw.text((80, 110), "Portefeuille Trade Republic — 100 % halal AAOIFI", font=f_kicker, fill=LIGHT)

    # Huge number
    f_huge = load_font(150, bold=True)
    draw.text((80, 180), "+18 728 EUR", font=f_huge, fill=GOLD)

    f_sub = load_font(34)
    draw.text((80, 360), "de plus-value latente en 2 ans", font=f_sub, fill=IVORY)

    # Top holdings mini-table
    f_line = load_font(30, bold=True)
    f_num  = load_font(30, bold=True)

    holdings = [
        ("NVIDIA",     "+2 492 EUR"),
        ("ARM (ADR)",  "+2 821 EUR"),
        ("AMD",        "+1 985 EUR"),
        ("Micron",     "+1 792 EUR"),
        ("ASML",       "+1 764 EUR"),
        ("TSMC",       "+1 421 EUR"),
        ("Advantest",  "+1 425 EUR"),
        ("Broadcom",   "+1 095 EUR"),
    ]

    y = 470
    row_h = 62
    for name, gain in holdings:
        draw.line([(80, y), (W-80, y)], fill=(60, 55, 50), width=1)
        draw.text((100, y+12), name, font=f_line, fill=IVORY)
        # right-align gain
        bbox = draw.textbbox((0, 0), gain, font=f_num)
        gw = bbox[2] - bbox[0]
        draw.text((W-80-gw-20, y+12), gain, font=f_num, fill=GOLD)
        y += row_h

    # Divider
    draw.line([(80, y+10), (W-80, y+10)], fill=GOLD, width=2)

    # Callout
    y += 40
    f_call = load_font(30, bold=True)
    draw.text((80, y), "Nvidia va remplacer beaucoup", font=f_call, fill=IVORY)
    draw.text((80, y+42), "d'emplois. Autant en devenir", font=f_call, fill=IVORY)
    draw.text((80, y+84), "actionnaire.", font=f_call, fill=GOLD)

    # Footer
    brand_footer(draw, y=H-140)

    return img


# ── Visuel 3 — Secret / anti-banque ───────────────────────────────────────
def build_visuel_3():
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)

    draw.rectangle([(0, 0), (W, 8)], fill=GOLD)

    f_brand_top = load_font(24, bold=True)
    draw.text((80, 40), "MUSLIMFINANCE.NET", font=f_brand_top, fill=GOLD)

    # Big hook
    f_hook = load_font(64, bold=True)
    draw.text((80, 130), "Ce que ta banque", font=f_hook, fill=IVORY)
    draw.text((80, 210), "ne te dira jamais.", font=f_hook, fill=GOLD)

    # 3 points
    y = 340
    points = [
        ("1", "Les 40 % du CAC 40 sont dans des secteurs qui vont ralentir : banques, petrole, alcool."),
        ("2", "Les 66 actions halal du NASDAQ ont battu l'indice de +85 % sur 5 ans (backtest)."),
        ("3", "Tu peux acheter NVIDIA, ASML, TSMC via Trade Republic en 3 clics. Sans CGP a 1 %/an."),
    ]
    f_num = load_font(60, bold=True)
    f_pt  = load_font(28)

    for n, txt in points:
        # Circle with number
        draw.ellipse([(80, y), (160, y+80)], outline=GOLD, width=3)
        bbox = draw.textbbox((0, 0), n, font=f_num)
        nw = bbox[2] - bbox[0]
        nh = bbox[3] - bbox[1]
        draw.text((80 + (80-nw)//2, y + (80-nh)//2 - 8), n, font=f_num, fill=GOLD)

        # Text
        y_end = draw_wrapped(draw, (200, y+12), txt, f_pt, IVORY,
                             W-280, line_height=40)
        y = max(y_end, y+80) + 30

    # Divider
    draw.line([(80, y+10), (W-80, y+10)], fill=GOLD, width=2)

    # CTA
    y += 40
    f_cta_h = load_font(34, bold=True)
    draw.text((80, y), "Guide complet 14 EUR.", font=f_cta_h, fill=GOLD)
    draw.text((80, y+46), "PDF livre immediatement.", font=f_cta_h, fill=IVORY)

    # Footer
    brand_footer(draw, y=H-140)

    return img


# ── Main ──────────────────────────────────────────────────────────────────
def save_all(img, name):
    p_local = OUT_DIR / name
    img.save(p_local, "PNG", optimize=True)
    print(f"  {name}  ({p_local.stat().st_size // 1024} KB)")

    # copy vers web
    p_web = WEB_DIR / name
    shutil.copy(p_local, p_web)
    print(f"    -> web  : {p_web}")

    # copy vers vault Attachments
    p_vault = VAULT_ATT / name
    shutil.copy(p_local, p_vault)
    print(f"    -> vault: {p_vault}")


def main():
    print("Generation visuels SMA v1...")
    save_all(build_visuel_1(), "visuel_1_livret_a.png")
    save_all(build_visuel_2(), "visuel_2_perf.png")
    save_all(build_visuel_3(), "visuel_3_secret.png")
    print("Done.")


if __name__ == "__main__":
    main()
