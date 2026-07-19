#!/usr/bin/env python3
"""
Genere visuel_6_protocole.png — angle "protocole 4 regles" (remplace le
statique perf refuse par Meta : gros chiffre EUR = policy finance perso).
Meme charte que gen_visuels.py.
"""
import pathlib
import shutil
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = pathlib.Path(__file__).parent / "visuels"
WEB_DIR = pathlib.Path.home() / "work/halal-nasdaq/web/public/img/sma"

W, H = 1080, 1350
DARK = (28, 25, 23)
GOLD = (201, 166, 98)
IVORY = (250, 250, 247)
LIGHT = (168, 162, 158)


def load_font(size, bold=False):
    cands = (["/System/Library/Fonts/Supplemental/Arial Bold.ttf"] if bold
             else ["/System/Library/Fonts/Supplemental/Arial.ttf"])
    for c in cands:
        p = pathlib.Path(c)
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()


def draw_wrapped(draw, xy, text, font, fill, max_width, line_height):
    words, lines, cur = text.split(), [], []
    for w in words:
        t = " ".join(cur + [w])
        if draw.textbbox((0, 0), t, font=font)[2] <= max_width:
            cur.append(w)
        else:
            lines.append(" ".join(cur))
            cur = [w]
    lines.append(" ".join(cur))
    x, y = xy
    for ln in lines:
        draw.text((x, y), ln, font=font, fill=fill)
        y += line_height
    return y


img = Image.new("RGB", (W, H), DARK)
draw = ImageDraw.Draw(img)
draw.rectangle([(0, 0), (W, 8)], fill=GOLD)
draw.text((80, 40), "MUSLIMFINANCE.NET", font=load_font(24, True), fill=GOLD)

f_hook = load_font(58, bold=True)
draw.text((80, 130), "Ton courtier te fait", font=f_hook, fill=IVORY)
draw.text((80, 200), "toucher du riba", font=f_hook, fill=GOLD)
draw.text((80, 270), "sans te le dire.", font=f_hook, fill=IVORY)

f_body = load_font(28)
draw_wrapped(draw, (80, 380),
             "Interets sur le cash non investi, pret de tes titres, margin "
             "active par defaut. Le protocole en 4 regles pour investir chez "
             "un courtier classique en restant conforme :",
             f_body, LIGHT, W - 160, 42)

rules = [
    ("1", "Desactiver les interets sur le cash"),
    ("2", "Zero achat sur marge (margin)"),
    ("3", "Zero pret de titres (securities lending)"),
    ("4", "Screening AAOIFI avant chaque achat"),
]
y = 600
f_num = load_font(44, bold=True)
f_rule = load_font(30, bold=True)
for n, t in rules:
    draw.ellipse([(80, y), (150, y + 70)], outline=GOLD, width=3)
    bbox = draw.textbbox((0, 0), n, font=f_num)
    draw.text((80 + (70 - (bbox[2] - bbox[0])) // 2,
               y + (70 - (bbox[3] - bbox[1])) // 2 - 8), n, font=f_num, fill=GOLD)
    draw.text((180, y + 16), t, font=f_rule, fill=IVORY)
    y += 105

f_note = load_font(22)
draw.text((80, y + 15), "Applicable sur Trade Republic, DEGIRO, IBKR — detaille dans le guide.",
          font=f_note, fill=LIGHT)

btn_y = H - 260
draw.rounded_rectangle([(80, btn_y), (W - 80, btn_y + 90)], radius=14, fill=GOLD)
f_cta = load_font(36, bold=True)
txt = "Je reserve ma place - 29 EUR sortie"
bbox = draw.textbbox((0, 0), txt, font=f_cta)
draw.text((80 + (W - 160 - (bbox[2] - bbox[0])) // 2, btn_y + 25), txt, font=f_cta, fill=DARK)

fy = H - 130
draw.line([(80, fy), (W - 80, fy)], fill=GOLD, width=2)
draw.text((80, fy + 18), "MUSLIMFINANCE.NET", font=load_font(26, True), fill=GOLD)
draw.text((80, fy + 52), "Ebook - sortie 5 août 2026 - 29 EUR (au lieu de 63)",
          font=load_font(22), fill=IVORY)

out = OUT_DIR / "visuel_6_protocole.png"
img.save(out, "PNG", optimize=True)
shutil.copy(out, WEB_DIR / out.name)
print(f"OK {out} ({out.stat().st_size // 1024} KB)")
