#!/usr/bin/env python3
"""
Genere les creatives V2 pour la campagne SMA v1 :
- 2 nouveaux statiques (angle Nvidia + angle Hadj/Mariage)
- 2 carrousels 6 slides chacun (Nvidia narratif + Hadj/Mariage narratif)

Format : Feed portrait 1080x1350 (cohérent avec batch 1).

Usage :
    source ~/work/halal-nasdaq/.creas/leadmagnet/.venv/bin/activate
    python3 gen_creatives_v2.py
"""
import pathlib
import shutil
from PIL import Image, ImageDraw, ImageFont

# ── Config ────────────────────────────────────────────────────────────────
OUT_DIR = pathlib.Path(__file__).parent / "visuels"
WEB_DIR = pathlib.Path.home() / "work/halal-nasdaq/web/public/img/sma"
VAULT_ATT = pathlib.Path(
    "/Users/memmadichaker/Library/CloudStorage/OneDrive-Personal/"
    "Applications/Remotely Sync/SecondCerveau/Attachments/muslimfinance"
)
for d in (OUT_DIR, WEB_DIR, VAULT_ATT):
    d.mkdir(parents=True, exist_ok=True)

W, H = 1080, 1350

# Palette
DARK   = (28, 25, 23)
GOLD   = (201, 166, 98)
GOLD_D = (160, 124, 58)
IVORY  = (250, 250, 247)
STONE  = (247, 243, 235)
GREY   = (87, 83, 78)
LIGHT  = (168, 162, 158)
RED    = (185, 28, 28)
GREEN  = (34, 139, 34)


def load_font(size: int, bold: bool = False):
    candidates_bold = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/HelveticaNeueBold.ttf",
    ]
    candidates_regular = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for c in (candidates_bold if bold else candidates_regular):
        p = pathlib.Path(c)
        if p.exists():
            try:
                return ImageFont.truetype(str(p), size)
            except Exception:
                pass
    return ImageFont.load_default()


def wrap_text(draw, text, font, max_width):
    words = text.split()
    lines, current = [], []
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
    lines = wrap_text(draw, text, font, max_width)
    x, y = xy
    if line_height is None:
        bbox = draw.textbbox((0, 0), "Ag", font=font)
        line_height = int((bbox[3] - bbox[1]) * 1.3)
    for ln in lines:
        draw.text((x, y), ln, font=font, fill=fill)
        y += line_height
    return y


def brand_header(draw, subtitle=None):
    """Top gold bar + brand label."""
    draw.rectangle([(0, 0), (W, 8)], fill=GOLD)
    f = load_font(24, bold=True)
    draw.text((80, 40), "MUSLIMFINANCE.NET", font=f, fill=GOLD)
    if subtitle:
        f2 = load_font(22)
        draw.text((80, 78), subtitle, font=f2, fill=LIGHT)


def brand_footer(draw, y=None):
    if y is None:
        y = H - 130
    draw.line([(80, y), (W-80, y)], fill=GOLD, width=2)
    f_brand = load_font(26, bold=True)
    f_url = load_font(22)
    draw.text((80, y+18), "MUSLIMFINANCE.NET", font=f_brand, fill=GOLD)
    draw.text((80, y+52), "Ebook 29 EUR precommande (au lieu de 63) - PDF livre", font=f_url, fill=IVORY)


def slide_number(draw, num, total):
    """Pill number in top-right for carousel slides."""
    f = load_font(24, bold=True)
    txt = f"{num}/{total}"
    bbox = draw.textbbox((0, 0), txt, font=f)
    tw = bbox[2] - bbox[0]
    pill_x = W - 40 - tw - 30
    pill_y = 34
    draw.rounded_rectangle(
        [(pill_x, pill_y), (pill_x + tw + 30, pill_y + 44)],
        radius=22, fill=GOLD)
    draw.text((pill_x + 15, pill_y + 6), txt, font=f, fill=DARK)


def cta_button(draw, y, text="Precommander 29 EUR (au lieu de 63)"):
    btn_x, btn_w, btn_h = 80, W - 160, 90
    draw.rounded_rectangle(
        [(btn_x, y), (btn_x + btn_w, y + btn_h)],
        radius=14, fill=GOLD)
    f = load_font(36, bold=True)
    bbox = draw.textbbox((0, 0), text, font=f)
    tw = bbox[2] - bbox[0]
    draw.text((btn_x + (btn_w - tw) // 2, y + 25), text, font=f, fill=DARK)


# ═══════════════════════════════════════════════════════════════════════════
# STATIQUES 4 & 5
# ═══════════════════════════════════════════════════════════════════════════

def build_statique_nvidia():
    """Statique angle Nvidia va remplacer ton travail."""
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw, "IA vs Salaire")

    # Big hook
    f_hook = load_font(66, bold=True)
    draw.text((80, 150), "Nvidia va remplacer", font=f_hook, fill=IVORY)
    draw.text((80, 226), "ton travail.", font=f_hook, fill=GOLD)

    # Divider
    draw.line([(80, 320), (W-80, 320)], fill=GOLD, width=2)

    # Body
    f_body = load_font(30)
    y = draw_wrapped(draw, (80, 360),
        "Juniors dev, analystes, comptables, redacteurs, "
        "avocats juniors. Personne n'est vraiment safe.",
        f_body, LIGHT, W-160, line_height=44)

    # Twist
    f_twist = load_font(38, bold=True)
    draw.text((80, y + 30), "Autant en devenir", font=f_twist, fill=IVORY)
    draw.text((80, y + 78), "actionnaire.", font=f_twist, fill=GOLD)

    # Proof numbers
    y_proof = y + 170
    f_proof_lbl = load_font(24)
    f_proof_num = load_font(38, bold=True)
    proofs = [
        ("NVIDIA",      "+2 492 EUR"),
        ("ARM",         "+2 821 EUR"),
        ("ASML",        "+1 764 EUR"),
        ("AMD",         "+1 985 EUR"),
    ]
    for i, (lbl, num) in enumerate(proofs):
        col = i % 2
        row = i // 2
        cx = 80 + col * ((W-160) // 2)
        cy = y_proof + row * 100
        draw.text((cx, cy), lbl, font=f_proof_lbl, fill=LIGHT)
        draw.text((cx, cy + 30), num, font=f_proof_num, fill=GOLD)

    # Note
    f_note = load_font(20)
    draw.text((80, y_proof + 220),
              "Portefeuille personnel Trade Republic — 100 % halal AAOIFI",
              font=f_note, fill=LIGHT)

    # CTA
    cta_button(draw, H - 260)

    brand_footer(draw)
    return img


def build_statique_hadj():
    """Statique angle Financer hadj sans credit."""
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw, "Financer ton hadj")

    f_hook = load_font(60, bold=True)
    draw.text((80, 150), "Financer ton hadj", font=f_hook, fill=IVORY)
    draw.text((80, 220), "sans grever ton", font=f_hook, fill=IVORY)
    draw.text((80, 290), "epargne.", font=f_hook, fill=GOLD)

    # Divider
    draw.line([(80, 390), (W-80, 390)], fill=GOLD, width=2)

    # Body
    f_body = load_font(30)
    y = draw_wrapped(draw, (80, 425),
        "Cout moyen hadj (formule standard) : 8 000 EUR / personne. "
        "Voici comment le financer sur 3 a 5 ans, halal, sans credit.",
        f_body, LIGHT, W-160, line_height=44)

    # Table
    y += 30
    f_th = load_font(24, bold=True)
    f_td = load_font(30, bold=True)

    # Headers
    col1_x, col2_x, col3_x = 80, 480, 800
    draw.text((col1_x, y), "SUR", font=f_th, fill=GOLD)
    draw.text((col2_x, y), "MENSUALITE", font=f_th, fill=GOLD)
    draw.text((col3_x, y), "OBJECTIF", font=f_th, fill=GOLD)
    y += 40
    draw.line([(80, y), (W-80, y)], fill=GOLD, width=1)
    y += 20

    rows = [
        ("3 ans", "200 EUR/mois", "Hadj perso"),
        ("5 ans", "115 EUR/mois", "Hadj perso"),
        ("3 ans", "400 EUR/mois", "Hadj couple"),
        ("5 ans", "230 EUR/mois", "Hadj couple"),
    ]
    for c1, c2, c3 in rows:
        draw.text((col1_x, y), c1, font=f_td, fill=IVORY)
        draw.text((col2_x, y), c2, font=f_td, fill=GOLD)
        draw.text((col3_x, y), c3, font=f_td, fill=IVORY)
        y += 55

    # Note
    f_note = load_font(18)
    y = draw_wrapped(draw, (80, y + 20),
        "Calcul base rendement 10 % / an (conservateur, portefeuille "
        "ETF halal AAOIFI type SPWI + DEEN).",
        f_note, LIGHT, W-160, line_height=26)

    # CTA
    cta_button(draw, H - 260)
    brand_footer(draw)
    return img


# ═══════════════════════════════════════════════════════════════════════════
# CAROUSEL 1 — Nvidia va remplacer ton travail (6 slides)
# ═══════════════════════════════════════════════════════════════════════════

def carousel_nvidia_1():
    """Slide 1/6 — Hook."""
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 1, 6)

    f_hook = load_font(80, bold=True)
    draw.text((80, 350), "Dans 5 ans,", font=f_hook, fill=IVORY)
    draw.text((80, 440), "ton travail", font=f_hook, fill=IVORY)
    draw.text((80, 530), "sera remplace.", font=f_hook, fill=GOLD)

    f_sub = load_font(30)
    draw.text((80, 680), "Par une IA.", font=f_sub, fill=LIGHT)
    draw.text((80, 720), "Qui tourne sur des puces Nvidia.", font=f_sub, fill=LIGHT)

    # Swipe hint
    f_swipe = load_font(24, bold=True)
    draw.text((80, H - 210), "→ Swipe pour la solution", font=f_swipe, fill=GOLD)

    brand_footer(draw)
    return img


def carousel_nvidia_2():
    """Slide 2/6 — Jobs a risque."""
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 2, 6)

    f_title = load_font(48, bold=True)
    draw.text((80, 180), "Qui est concerne ?", font=f_title, fill=GOLD)

    draw.line([(80, 260), (W-80, 260)], fill=GOLD, width=2)

    jobs = [
        "Developpeurs juniors",
        "Analystes financiers",
        "Redacteurs, journalistes",
        "Comptables juniors",
        "Avocats juniors",
        "Chefs de projet",
        "Traducteurs",
        "Graphistes juniors",
    ]
    f_job = load_font(32, bold=True)
    y = 320
    for j in jobs:
        # Cross emoji-like
        draw.rectangle([(80, y+8), (110, y+38)], outline=RED, width=3)
        draw.line([(80, y+8), (110, y+38)], fill=RED, width=3)
        draw.line([(80, y+38), (110, y+8)], fill=RED, width=3)
        draw.text((130, y), j, font=f_job, fill=IVORY)
        y += 60

    f_swipe = load_font(24, bold=True)
    draw.text((80, H - 210), "→ Et si on inversait la logique ?", font=f_swipe, fill=GOLD)
    brand_footer(draw)
    return img


def carousel_nvidia_3():
    """Slide 3/6 — Twist logique."""
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 3, 6)

    f_hook = load_font(56, bold=True)
    draw.text((80, 280), "Autant devenir", font=f_hook, fill=IVORY)
    draw.text((80, 360), "actionnaire de", font=f_hook, fill=IVORY)
    draw.text((80, 440), "l'entreprise qui", font=f_hook, fill=IVORY)
    draw.text((80, 520), "va te remplacer.", font=f_hook, fill=GOLD)

    f_body = load_font(28)
    y = draw_wrapped(draw, (80, 700),
        "Recuperer par les dividendes et la plus-value "
        "ce que tu risques de perdre en salaire.",
        f_body, LIGHT, W-160, line_height=42)

    f_swipe = load_font(24, bold=True)
    draw.text((80, H - 210), "→ Mais c'est halal ?", font=f_swipe, fill=GOLD)
    brand_footer(draw)
    return img


def carousel_nvidia_4():
    """Slide 4/6 — Preuve chiffres."""
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 4, 6)

    f_title = load_font(40, bold=True)
    draw.text((80, 180), "Mon portefeuille perso", font=f_title, fill=GOLD)
    f_sub = load_font(24)
    draw.text((80, 230), "Trade Republic — 100 % halal AAOIFI", font=f_sub, fill=LIGHT)

    holdings = [
        ("NVIDIA",     "+2 492 EUR"),
        ("ARM (ADR)",  "+2 821 EUR"),
        ("ASML",       "+1 764 EUR"),
        ("AMD",        "+1 985 EUR"),
        ("TSMC",       "+1 421 EUR"),
        ("Micron",     "+1 792 EUR"),
        ("Broadcom",   "+1 095 EUR"),
    ]
    y = 320
    f_line = load_font(30, bold=True)
    for name, gain in holdings:
        draw.line([(80, y), (W-80, y)], fill=(60, 55, 50), width=1)
        draw.text((100, y+15), name, font=f_line, fill=IVORY)
        bbox = draw.textbbox((0, 0), gain, font=f_line)
        gw = bbox[2] - bbox[0]
        draw.text((W-80-gw-20, y+15), gain, font=f_line, fill=GOLD)
        y += 65

    draw.line([(80, y), (W-80, y)], fill=GOLD, width=2)
    y += 20
    f_total_l = load_font(28, bold=True)
    f_total_n = load_font(40, bold=True)
    draw.text((100, y+10), "TOTAL PV", font=f_total_l, fill=IVORY)
    draw.text((W-80-370, y), "+18 728 EUR", font=f_total_n, fill=GOLD)

    f_swipe = load_font(24, bold=True)
    draw.text((80, H - 210), "→ Comment tu fais pareil ?", font=f_swipe, fill=GOLD)
    brand_footer(draw)
    return img


def carousel_nvidia_5():
    """Slide 5/6 — Comment faire."""
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 5, 6)

    f_title = load_font(46, bold=True)
    draw.text((80, 180), "En 3 etapes :", font=f_title, fill=GOLD)

    draw.line([(80, 260), (W-80, 260)], fill=GOLD, width=2)

    steps = [
        ("1", "Ouvre un compte Trade Republic", "0 EUR, 3 minutes"),
        ("2", "Filtre AAOIFI (norme finance islamique)", "muslimfinance.net gratuit"),
        ("3", "Achete les 8 valeurs semi-conducteurs halal", "NVDA, ARM, ASML, AMD..."),
    ]
    y = 340
    f_num_bg = load_font(52, bold=True)
    f_step_t = load_font(30, bold=True)
    f_step_s = load_font(22)
    for n, t, s in steps:
        # Circle number
        draw.ellipse([(80, y), (160, y+80)], outline=GOLD, width=3)
        bbox = draw.textbbox((0, 0), n, font=f_num_bg)
        nw = bbox[2] - bbox[0]
        nh = bbox[3] - bbox[1]
        draw.text((80 + (80-nw)//2, y + (80-nh)//2 - 8), n, font=f_num_bg, fill=GOLD)
        # Text
        draw.text((200, y+5), t, font=f_step_t, fill=IVORY)
        draw.text((200, y+45), s, font=f_step_s, fill=LIGHT)
        y += 110

    f_swipe = load_font(24, bold=True)
    draw.text((80, H - 210), "→ La methode complete ci-dessous", font=f_swipe, fill=GOLD)
    brand_footer(draw)
    return img


def carousel_nvidia_6():
    """Slide 6/6 — CTA."""
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 6, 6)

    f_h = load_font(48, bold=True)
    draw.text((80, 220), "Le guide complet.", font=f_h, fill=IVORY)
    draw.text((80, 290), "47 pages actionnables.", font=f_h, fill=GOLD)

    draw.line([(80, 400), (W-80, 400)], fill=GOLD, width=2)

    f_body = load_font(26)
    contents = [
        "Screening AAOIFI simple",
        "Watchlist 30 actions halal 2026",
        "Comparatif Trade Republic / DEGIRO / IBKR",
        "Financer hadj / mariage / apport maison",
        "Or physique, SCPI halal, transmission",
    ]
    y = 440
    for c in contents:
        draw.text((80, y), f"·  {c}", font=f_body, fill=IVORY)
        y += 42

    # Big price
    f_price = load_font(56, bold=True)
    draw.text((80, 780), "29 EUR", font=f_price, fill=GOLD)
    f_price_ok = load_font(28)
    draw.text((300, 800), "au lieu de 63 EUR", font=f_price_ok, fill=LIGHT)
    f_price_s = load_font(22)
    draw.text((80, 855), "Precommande jusqu'au 21 juillet 2026", font=f_price_s, fill=LIGHT)
    draw.text((80, 885), "PDF livre en 2 minutes apres paiement", font=f_price_s, fill=LIGHT)

    cta_button(draw, H - 260, "Precommander 29 EUR (au lieu de 63)")
    brand_footer(draw)
    return img


# ═══════════════════════════════════════════════════════════════════════════
# CAROUSEL 2 — Financer hadj / mariage (6 slides)
# ═══════════════════════════════════════════════════════════════════════════

def carousel_hadj_1():
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 1, 6)

    f_h = load_font(70, bold=True)
    draw.text((80, 320), "Financer", font=f_h, fill=IVORY)
    draw.text((80, 400), "ton hadj.", font=f_h, fill=GOLD)

    f_sub = load_font(30)
    draw.text((80, 550), "Sans credit riba.", font=f_sub, fill=LIGHT)
    draw.text((80, 590), "Sans banque islamique.", font=f_sub, fill=LIGHT)
    draw.text((80, 630), "Sans conseiller a 1 %/an.", font=f_sub, fill=LIGHT)

    f_swipe = load_font(24, bold=True)
    draw.text((80, H - 210), "→ Combien ca coute vraiment ?", font=f_swipe, fill=GOLD)
    brand_footer(draw)
    return img


def carousel_hadj_2():
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 2, 6)

    f_h = load_font(42, bold=True)
    draw.text((80, 180), "Cout hadj depuis la France", font=f_h, fill=GOLD)
    f_s = load_font(22)
    draw.text((80, 232), "Agence agréée, formule standard 20 jours", font=f_s, fill=LIGHT)

    draw.line([(80, 290), (W-80, 290)], fill=GOLD, width=2)

    rows = [
        ("1 personne",                       "8 000 EUR"),
        ("Couple",                           "16 000 EUR"),
        ("Couple + parents (4 pers.)",       "32 000 EUR"),
        ("Famille etendue (6+)",             "48 000+ EUR"),
    ]
    y = 350
    f_lbl = load_font(28)
    f_num = load_font(36, bold=True)
    for lbl, num in rows:
        draw.line([(80, y), (W-80, y)], fill=(60, 55, 50), width=1)
        draw.text((100, y+18), lbl, font=f_lbl, fill=IVORY)
        bbox = draw.textbbox((0, 0), num, font=f_num)
        gw = bbox[2] - bbox[0]
        draw.text((W-80-gw-20, y+15), num, font=f_num, fill=GOLD)
        y += 90

    # Callout
    f_call = load_font(24)
    y = draw_wrapped(draw, (80, y+30),
        "En moyenne, une famille attend 8-12 ans avant de partir. "
        "Souvent parce que personne ne leur montre comment epargner intelligemment.",
        f_call, LIGHT, W-160, line_height=34)

    f_swipe = load_font(24, bold=True)
    draw.text((80, H - 210), "→ La methode qui change tout", font=f_swipe, fill=GOLD)
    brand_footer(draw)
    return img


def carousel_hadj_3():
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 3, 6)

    f_h = load_font(42, bold=True)
    draw.text((80, 180), "L'epargne halal automatique", font=f_h, fill=GOLD)

    draw.line([(80, 250), (W-80, 250)], fill=GOLD, width=2)

    f_body = load_font(28)
    y = draw_wrapped(draw, (80, 290),
        "Le 5 du mois, virement automatique du compte-cheque "
        "vers un compte-titres Trade Republic dedie \"hadj\". "
        "Investi automatiquement en ETF halal AAOIFI (SPWI + DEEN). "
        "TER moyen : 0,55 %. Rendement conservateur : 10 %/an.",
        f_body, IVORY, W-160, line_height=42)

    y += 30
    f_call_h = load_font(30, bold=True)
    draw.text((80, y), "Le \"pas ce mois-ci\" tue tout.", font=f_call_h, fill=GOLD)
    draw.text((80, y+42), "L'automatisation le rend impossible.", font=f_call_h, fill=IVORY)

    f_swipe = load_font(24, bold=True)
    draw.text((80, H - 210), "→ Les chiffres concrets", font=f_swipe, fill=GOLD)
    brand_footer(draw)
    return img


def carousel_hadj_4():
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 4, 6)

    f_h = load_font(38, bold=True)
    draw.text((80, 180), "Mensualite pour hadj couple", font=f_h, fill=GOLD)
    f_s = load_font(22)
    draw.text((80, 230), "16 000 EUR, ETF halal AAOIFI, rendement 10 %/an", font=f_s, fill=LIGHT)

    draw.line([(80, 290), (W-80, 290)], fill=GOLD, width=2)

    scenarios = [
        ("3 ans", "400 EUR/mois", "Aggressif"),
        ("4 ans", "280 EUR/mois", "Realiste"),
        ("5 ans", "230 EUR/mois", "Confortable"),
        ("7 ans", "140 EUR/mois", "Long terme"),
    ]
    y = 340
    f_dur = load_font(36, bold=True)
    f_mens = load_font(40, bold=True)
    f_type = load_font(22)
    for dur, mens, tp in scenarios:
        draw.line([(80, y), (W-80, y)], fill=(60, 55, 50), width=1)
        draw.text((100, y+15), dur, font=f_dur, fill=IVORY)
        # Right-align mensualite
        bbox = draw.textbbox((0, 0), mens, font=f_mens)
        gw = bbox[2] - bbox[0]
        draw.text((W-80-gw-20, y+13), mens, font=f_mens, fill=GOLD)
        draw.text((100, y+58), tp, font=f_type, fill=LIGHT)
        y += 105

    f_note = load_font(18)
    y = draw_wrapped(draw, (80, y+20),
        "Hypothese conservative : 10 %/an compose. "
        "Portefeuille NASDAQ halal a fait +43 %/an backteste sur 5 ans, "
        "divise par 4 pour prudence.",
        f_note, LIGHT, W-160, line_height=26)

    f_swipe = load_font(24, bold=True)
    draw.text((80, H - 210), "→ Marche aussi pour mariage / apport", font=f_swipe, fill=GOLD)
    brand_footer(draw)
    return img


def carousel_hadj_5():
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 5, 6)

    f_h = load_font(46, bold=True)
    draw.text((80, 180), "3 objectifs, meme methode.", font=f_h, fill=GOLD)

    draw.line([(80, 260), (W-80, 260)], fill=GOLD, width=2)

    y = 310
    projects = [
        ("Hadj",           "8-16K",  "3-5 ans", "115-400 EUR/mois"),
        ("Mariage",        "12-25K", "3-5 ans", "170-620 EUR/mois"),
        ("Apport 30 %",    "45-120K","5-7 ans", "600-1600 EUR/mois"),
    ]
    f_name = load_font(32, bold=True)
    f_val  = load_font(24)
    for name, target, dur, mens in projects:
        draw.rounded_rectangle([(80, y), (W-80, y+150)], radius=12,
                               outline=GOLD, width=2)
        draw.text((100, y+18), name, font=f_name, fill=GOLD)
        draw.text((100, y+62),
                  f"Objectif : {target}   |   Sur : {dur}",
                  font=f_val, fill=IVORY)
        draw.text((100, y+100), mens, font=f_val, fill=LIGHT)
        y += 175

    f_swipe = load_font(24, bold=True)
    draw.text((80, H - 210), "→ La methode complete ci-dessous", font=f_swipe, fill=GOLD)
    brand_footer(draw)
    return img


def carousel_hadj_6():
    """Slide 6/6 CTA — meme que Nvidia 6."""
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)
    brand_header(draw)
    slide_number(draw, 6, 6)

    f_h = load_font(48, bold=True)
    draw.text((80, 220), "Le guide complet.", font=f_h, fill=IVORY)
    draw.text((80, 290), "47 pages actionnables.", font=f_h, fill=GOLD)

    draw.line([(80, 400), (W-80, 400)], fill=GOLD, width=2)

    f_body = load_font(26)
    contents = [
        "Financer hadj + mariage + apport",
        "Screening AAOIFI simple",
        "Watchlist 30 actions halal 2026",
        "Comparatif Trade Republic / DEGIRO",
        "Or physique, SCPI halal, transmission",
    ]
    y = 440
    for c in contents:
        draw.text((80, y), f"·  {c}", font=f_body, fill=IVORY)
        y += 42

    f_price = load_font(56, bold=True)
    draw.text((80, 780), "14 EUR", font=f_price, fill=GOLD)
    f_price_s = load_font(24)
    draw.text((80, 850), "PDF livre en 2 minutes", font=f_price_s, fill=LIGHT)

    cta_button(draw, H - 260, "Precommander 29 EUR (au lieu de 63)")
    brand_footer(draw)
    return img


# ── Save helper ───────────────────────────────────────────────────────────
def save_all(img, name):
    p_local = OUT_DIR / name
    img.save(p_local, "PNG", optimize=True)
    print(f"  {name}  ({p_local.stat().st_size // 1024} KB)")
    shutil.copy(p_local, WEB_DIR / name)
    shutil.copy(p_local, VAULT_ATT / name)


def main():
    print("Generation creatives V2 SMA...")

    # Statiques 4 & 5
    save_all(build_statique_nvidia(), "visuel_4_nvidia.png")
    save_all(build_statique_hadj(),   "visuel_5_hadj.png")

    # Carousel Nvidia
    save_all(carousel_nvidia_1(), "carousel_nvidia_1.png")
    save_all(carousel_nvidia_2(), "carousel_nvidia_2.png")
    save_all(carousel_nvidia_3(), "carousel_nvidia_3.png")
    save_all(carousel_nvidia_4(), "carousel_nvidia_4.png")
    save_all(carousel_nvidia_5(), "carousel_nvidia_5.png")
    save_all(carousel_nvidia_6(), "carousel_nvidia_6.png")

    # Carousel Hadj/Mariage
    save_all(carousel_hadj_1(), "carousel_hadj_1.png")
    save_all(carousel_hadj_2(), "carousel_hadj_2.png")
    save_all(carousel_hadj_3(), "carousel_hadj_3.png")
    save_all(carousel_hadj_4(), "carousel_hadj_4.png")
    save_all(carousel_hadj_5(), "carousel_hadj_5.png")
    save_all(carousel_hadj_6(), "carousel_hadj_6.png")

    print("Done. 14 fichiers generes.")


if __name__ == "__main__":
    main()
