#!/usr/bin/env python3
"""Génère le PDF lead magnet : Checklist arnaque + Watchlist 10 actions halal."""
import json
import pathlib
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / "checklist-validus.pdf"
DATA = pathlib.Path.home() / "work/halal-nasdaq/data/halal_nasdaq100.json"

# Colors
GOLD = HexColor("#c9a662")
DARK = HexColor("#1c1917")
GREY = HexColor("#57534e")
LIGHT_GREY = HexColor("#a8a29e")
AMBER_BG = HexColor("#fef3c7")
RED = HexColor("#b91c1c")

# Styles
styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    "title", parent=styles["Heading1"],
    fontName="Times-Bold", fontSize=28, leading=32,
    textColor=DARK, spaceAfter=18, alignment=TA_LEFT,
)
subtitle_style = ParagraphStyle(
    "sub", parent=styles["Normal"],
    fontName="Helvetica", fontSize=12, leading=16,
    textColor=GREY, spaceAfter=20,
)
section_style = ParagraphStyle(
    "section", parent=styles["Heading2"],
    fontName="Times-Bold", fontSize=18, leading=22,
    textColor=DARK, spaceAfter=12, spaceBefore=18,
)
question_style = ParagraphStyle(
    "question", parent=styles["Normal"],
    fontName="Times-Bold", fontSize=13, leading=18,
    textColor=DARK, spaceAfter=6,
)
answer_style = ParagraphStyle(
    "answer", parent=styles["Normal"],
    fontName="Helvetica", fontSize=11, leading=16,
    textColor=GREY, spaceAfter=14, leftIndent=20,
)
meta_style = ParagraphStyle(
    "meta", parent=styles["Normal"],
    fontName="Helvetica", fontSize=9, leading=12,
    textColor=LIGHT_GREY, alignment=TA_LEFT,
)
small_gold = ParagraphStyle(
    "smallgold", parent=styles["Normal"],
    fontName="Helvetica-Bold", fontSize=9, leading=12,
    textColor=GOLD, alignment=TA_LEFT,
)
footer_style = ParagraphStyle(
    "footer", parent=styles["Normal"],
    fontName="Helvetica", fontSize=9, leading=11,
    textColor=LIGHT_GREY, alignment=TA_CENTER,
)

QUESTIONS = [
    (
        "1. Te promet-on un rendement garanti ?",
        "Le rendement n'est jamais garanti, dans aucun marché. "
        "Une vraie action peut monter ou baisser. Si quelqu'un te garantit "
        "« 8 % par mois », « doubler en 6 mois », « rendement passif assuré » — c'est une arnaque. "
        "Sans exception."
    ),
    (
        "2. Es-tu recruté par quelqu'un qui touche une commission si tu adhères ?",
        "C'est le marqueur n° 1 d'un schéma pyramidal (MLM). "
        "Si la rémunération vient du recrutement et pas de la vente d'un produit/service réel, "
        "tu nourris une pyramide qui s'effondrera. Validus, OneCoin, Bitconnect : "
        "tous bâtis sur ce modèle."
    ),
    (
        "3. L'« opportunité » est-elle vendue dans un groupe WhatsApp ou Telegram fermé ?",
        "Les vrais produits financiers sont régulés et publiquement accessibles. "
        "Les arnaques se cachent dans des groupes privés où la pression sociale "
        "(« vite, places limitées », « ton frère a déjà mis 5 000 € ») empêche la réflexion."
    ),
    (
        "4. La société est-elle régulée par l'AMF (France) ou un équivalent ?",
        "Va sur amf-france.org et tape le nom. Si elle n'apparaît pas, "
        "ou si elle est sur la « liste noire AMF », fuis. "
        "Pour les courtiers étrangers : FCA (UK), CySEC (Chypre), SEC (USA)."
    ),
    (
        "5. Y a-t-il un sous-jacent réel, vérifiable, dans une bourse réglementée ?",
        "Une action Apple = une part d'Apple cotée au NASDAQ, traçable. "
        "Un « token halal AAA » sur une plateforme inconnue ? Aucun sous-jacent réel. "
        "Si tu ne peux pas vérifier l'actif sur un site neutre (Yahoo Finance, etc.), c'est de l'air."
    ),
    (
        "6. Peux-tu retirer ton argent à tout moment, sans condition ?",
        "Une vraie action : tu vends, l'argent arrive sur ton compte sous 2-3 jours. "
        "Une arnaque : retraits bloqués, conditions de « palier », frais de retrait croissants, "
        "« il faut recruter X personnes avant de retirer ». Test : essaie de retirer 100 €."
    ),
    (
        "7. Le label « halal » est-il certifié par AAOIFI ou un comité réputé ?",
        "AAOIFI est la norme internationale qui fait foi. "
        "Si la conformité « halal » vient d'un « comité interne », d'un imam payé, "
        "ou n'est pas documentée, le label est marketing — pas religieux."
    ),
    (
        "8. Le vendeur a-t-il un track record vérifiable, public, sans pseudo ?",
        "Un vrai gestionnaire signe avec son vrai nom, sa formation est vérifiable, "
        "ses performances passées sont auditées. Un compte Insta anonyme qui promet du halal, "
        "ou un « mentor » qui ne montre que des Lamborghini louées : zéro crédibilité."
    ),
]

VERDICT = (
    "<b>Si tu réponds « OUI » à 3 questions ou plus, c'est une arnaque. </b>"
    "Tu n'as pas besoin de comprendre les détails financiers. "
    "Tu n'as pas besoin de te justifier auprès du vendeur. Tu pars."
)


def build_pdf():
    doc = SimpleDocTemplate(
        str(OUT), pagesize=A4,
        topMargin=2.2 * cm, bottomMargin=2 * cm,
        leftMargin=2 * cm, rightMargin=2 * cm,
        title="Checklist 8 questions — Halal & arnaques 2026",
        author="L'équipe muslimfinance.net",
    )
    story = []

    # === Page 1 : Header + Checklist ===
    story.append(Paragraph("MUSLIMFINANCE.NET", small_gold))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Halal &amp; arnaques 2026", title_style))
    story.append(Paragraph(
        "Comment détecter en 30 secondes une arnaque déguisée en investissement halal — "
        "la checklist 8 questions que tu n'as jamais reçue.",
        subtitle_style,
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("Les 8 questions", section_style))

    for q, a in QUESTIONS:
        story.append(KeepTogether([
            Paragraph(q, question_style),
            Paragraph(a, answer_style),
        ]))

    # Verdict box
    verdict_data = [[Paragraph(VERDICT, ParagraphStyle(
        "verdict", parent=styles["Normal"],
        fontName="Helvetica", fontSize=11, leading=16,
        textColor=DARK,
    ))]]
    verdict_table = Table(verdict_data, colWidths=[16 * cm])
    verdict_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), AMBER_BG),
        ("BOX", (0, 0), (-1, -1), 1.5, GOLD),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    story.append(Spacer(1, 8))
    story.append(verdict_table)

    story.append(PageBreak())

    # === Page 2 : Watchlist 10 actions ===
    story.append(Paragraph("MUSLIMFINANCE.NET", small_gold))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Watchlist 10 actions halal — 2026", title_style))
    story.append(Paragraph(
        "Les 10 plus grosses positions du NASDAQ 100 qui passent le filtre AAOIFI. "
        "Toutes vérifiables, toutes cotées, toutes accessibles via un courtier classique. "
        "Pas de token mystère. Pas de plateforme « halal exclusive ». Juste de la bourse.",
        subtitle_style,
    ))

    # Get top 10 holdings
    holdings_data = json.loads(DATA.read_text())
    top10 = sorted(holdings_data["holdings"], key=lambda h: h.get("weight", 0), reverse=True)[:10]

    # Build table
    table_data = [
        ["#", "Ticker", "Société", "Secteur", "Poids NASDAQ"]
    ]
    # Stock metadata supplémentaire (sector best-guess pour le top 10)
    sector_map = {
        "NVDA": "Semi-conducteurs",
        "AAPL": "Tech",
        "AVGO": "Semi-conducteurs",
        "TSLA": "Auto",
        "MU": "Semi-conducteurs",
        "AMD": "Semi-conducteurs",
        "INTC": "Semi-conducteurs",
        "ASML": "Semi-conducteurs",
        "CSCO": "Réseau",
        "LRCX": "Semi-conducteurs",
    }
    name_map = {
        "NVDA": "NVIDIA Corporation",
        "AAPL": "Apple Inc.",
        "AVGO": "Broadcom Inc.",
        "TSLA": "Tesla Inc.",
        "MU": "Micron Technology",
        "AMD": "Advanced Micro Devices",
        "INTC": "Intel Corporation",
        "ASML": "ASML Holding",
        "CSCO": "Cisco Systems",
        "LRCX": "Lam Research",
    }
    for i, h in enumerate(top10, 1):
        ticker = h.get("ticker", "?")
        table_data.append([
            str(i),
            ticker,
            name_map.get(ticker, h.get("name") or ticker),
            sector_map.get(ticker, "—"),
            f"{h.get('weight', 0):.2f} %",
        ])

    table = Table(table_data, colWidths=[1 * cm, 2 * cm, 6 * cm, 4 * cm, 3 * cm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), DARK),
        ("TEXTCOLOR", (0, 0), (-1, 0), HexColor("#fef3c7")),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),
        ("ALIGN", (0, 0), (-1, 0), "LEFT"),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
        ("TOPPADDING", (0, 0), (-1, 0), 10),
        ("BACKGROUND", (0, 1), (-1, -1), HexColor("#fafaf7")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [HexColor("#fafaf7"), HexColor("#f5f5f4")]),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 1), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 8),
        ("FONTNAME", (1, 1), (1, -1), "Helvetica-Bold"),
        ("TEXTCOLOR", (1, 1), (1, -1), GOLD),
        ("ALIGN", (4, 1), (4, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, 0), 2, GOLD),
    ]))
    story.append(table)

    story.append(Spacer(1, 18))
    story.append(Paragraph("Comment vérifier toi-même la conformité AAOIFI", section_style))
    method_text = (
        "Pour chaque action, il faut 4 vérifications (toutes documentées par AAOIFI) : <br/><br/>"
        "<b>1. Secteur conforme</b> : pas de banque conventionnelle, alcool, jeux d'argent, armement offensif, "
        "pornographie, divertissement haram, viande non-halal, tabac.<br/><br/>"
        "<b>2. Ratio dette / capitalisation &lt; 33 %</b> : la société ne doit pas être surchargée de dette à intérêt.<br/><br/>"
        "<b>3. Ratio (cash + investissements rémunérateurs) / capitalisation &lt; 33 %</b> : éviter les sociétés "
        "qui jouent à la banque.<br/><br/>"
        "<b>4. Revenus non-conformes &lt; 5 %</b> : tolérance Sharia pour les revenus secondaires inévitables "
        "(intérêts sur trésorerie, partenariats marginaux).<br/><br/>"
        "Le screening complet et à jour est disponible sur "
        "<b>muslimfinance.net</b> — 66 actions NASDAQ 100 et 221 actions S&amp;P 500 vérifiées."
    )
    story.append(Paragraph(method_text, ParagraphStyle(
        "method", parent=styles["Normal"],
        fontName="Helvetica", fontSize=10, leading=15,
        textColor=GREY, spaceAfter=12,
    )))

    story.append(Spacer(1, 16))
    story.append(Paragraph(
        "<b>⚠️ Avertissement.</b> Ce document est un guide d'éducation financière, "
        "pas un conseil en investissement personnalisé. "
        "Les performances passées du portefeuille AAOIFI ne préjugent pas des performances futures. "
        "Le backtest utilise la composition actuelle des indices appliquée historiquement. "
        "Tu restes seul responsable de tes décisions d'investissement.",
        meta_style,
    ))

    story.append(Spacer(1, 18))
    story.append(Paragraph(
        "muslimfinance.net &nbsp;•&nbsp; © 2026 &nbsp;•&nbsp; L'équipe muslimfinance.net",
        footer_style,
    ))

    doc.build(story)
    print(f"PDF generé : {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    build_pdf()
