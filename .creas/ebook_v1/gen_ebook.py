#!/usr/bin/env python3
"""
Génère l'ebook PDF "Halal & patrimoine — Le guide d'investissement pour le musulman
qui veut construire"

Usage :
    source ~/work/halal-nasdaq/.creas/leadmagnet/.venv/bin/activate
    python3 gen_ebook.py
"""
import json
import pathlib
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor, white
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable,
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

# ── Paths ────────────────────────────────────────────────────────────────────
ROOT   = pathlib.Path(__file__).resolve().parent
DATA   = pathlib.Path.home() / "work/halal-nasdaq/data"
OUT    = ROOT / "halal-patrimoine.pdf"

# ── Palette ──────────────────────────────────────────────────────────────────
GOLD        = HexColor("#c9a662")
DARK        = HexColor("#1c1917")
GREY        = HexColor("#57534e")
LIGHT_GREY  = HexColor("#a8a29e")
IVORY       = HexColor("#fafaf7")
STONE       = HexColor("#f7f3eb")   # beige chaud (remplace gris froid)
AMBER_BG    = HexColor("#fef3c7")
GOLD_DARK   = HexColor("#a07c3a")
RED         = HexColor("#b91c1c")
GOLD_SUBTLE = HexColor("#e8d5a3")   # fond callout plus doux

W = 16.5 * cm   # usable width

# ── Load data ────────────────────────────────────────────────────────────────
backtest       = json.loads((DATA / "backtest.json").read_text())
nasdaq_data    = json.loads((DATA / "halal_nasdaq100.json").read_text())
sp500_data     = json.loads((DATA / "halal_sp500.json").read_text())

nasdaq_holdings = sorted(nasdaq_data["holdings"], key=lambda h: h.get("weight", 0), reverse=True)
sp500_holdings  = sorted(sp500_data["holdings"],  key=lambda h: h.get("weight", 0), reverse=True)

BT_N = backtest["nasdaq100"]
BT_S = backtest["sp500"]

# ── Styles ───────────────────────────────────────────────────────────────────
base = getSampleStyleSheet()

def ps(name, **kw):
    return ParagraphStyle(name, parent=base["Normal"], **kw)

cover_title = ps("cover_title",
    fontName="Times-Bold", fontSize=36, leading=42,
    textColor=IVORY, spaceAfter=20, alignment=TA_LEFT)

cover_sub = ps("cover_sub",
    fontName="Helvetica", fontSize=14, leading=21,
    textColor=GOLD, spaceAfter=32, alignment=TA_LEFT)

cover_meta = ps("cover_meta",
    fontName="Helvetica", fontSize=9, leading=13,
    textColor=LIGHT_GREY, alignment=TA_LEFT)

brand_label = ps("brand_label",
    fontName="Helvetica-Bold", fontSize=8, leading=10,
    textColor=GOLD, spaceAfter=4, alignment=TA_LEFT)

chapter_number = ps("chapter_number",
    fontName="Helvetica-Bold", fontSize=10, leading=13,
    textColor=GOLD, spaceAfter=6, spaceBefore=0, letterSpacing=1.5)

chapter_title = ps("chapter_title",
    fontName="Times-Bold", fontSize=24, leading=30,
    textColor=DARK, spaceAfter=8, spaceBefore=0)

chapter_hook = ps("chapter_hook",
    fontName="Helvetica", fontSize=12, leading=19,
    textColor=GREY, spaceAfter=22, leftIndent=0)

section_head = ps("section_head",
    fontName="Times-Bold", fontSize=15, leading=20,
    textColor=DARK, spaceAfter=10, spaceBefore=22)

section_head_gold = ps("section_head_gold",
    fontName="Times-Bold", fontSize=13, leading=18,
    textColor=GOLD_DARK, spaceAfter=8, spaceBefore=16)

body = ps("body",
    fontName="Helvetica", fontSize=10.5, leading=17,
    textColor=DARK, spaceAfter=13)

body_grey = ps("body_grey",
    fontName="Helvetica", fontSize=10.5, leading=17,
    textColor=GREY, spaceAfter=13)

bullet = ps("bullet",
    fontName="Helvetica", fontSize=10.5, leading=17,
    textColor=DARK, spaceAfter=7, leftIndent=16, firstLineIndent=-16)

bold_body = ps("bold_body",
    fontName="Helvetica-Bold", fontSize=10.5, leading=17,
    textColor=DARK, spaceAfter=6)

callout = ps("callout",
    fontName="Helvetica-Bold", fontSize=11, leading=17,
    textColor=DARK, spaceAfter=0)

callout_italic = ps("callout_italic",
    fontName="Helvetica-Oblique", fontSize=10.5, leading=16,
    textColor=GREY, spaceAfter=0)

footer_s = ps("footer_s",
    fontName="Helvetica", fontSize=8, leading=10,
    textColor=LIGHT_GREY, alignment=TA_CENTER)

toc_chapter = ps("toc_chapter",
    fontName="Times-Bold", fontSize=11, leading=18,
    textColor=DARK, spaceAfter=2)

toc_sub = ps("toc_sub",
    fontName="Helvetica", fontSize=9.5, leading=14,
    textColor=GREY, spaceAfter=10, leftIndent=18)

disclaimer_s = ps("disclaimer_s",
    fontName="Helvetica", fontSize=8.5, leading=13,
    textColor=GREY, spaceAfter=10)

# ── Helpers ───────────────────────────────────────────────────────────────────
def gold_rule():
    return HRFlowable(width=W, thickness=2, color=GOLD, spaceAfter=16, spaceBefore=8)

def dark_rule():
    return HRFlowable(width=W, thickness=0.5, color=LIGHT_GREY, spaceAfter=10, spaceBefore=4)

def section_rule():
    return HRFlowable(width=W * 0.3, thickness=1, color=GOLD, spaceAfter=10, spaceBefore=4)

def callout_box(text: str, bg=AMBER_BG, border=GOLD):
    data = [[Paragraph(text, callout)]]
    t = Table(data, colWidths=[W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), bg),
        ("BOX",        (0,0), (-1,-1), 1.5, border),
        ("LEFTPADDING",(0,0), (-1,-1), 16),
        ("RIGHTPADDING",(0,0),(-1,-1), 16),
        ("TOPPADDING", (0,0), (-1,-1), 12),
        ("BOTTOMPADDING",(0,0),(-1,-1), 12),
    ]))
    return t

def callout_box_italic(text: str):
    data = [[Paragraph(text, callout_italic)]]
    t = Table(data, colWidths=[W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), STONE),
        ("BOX",        (0,0), (-1,-1), 1, LIGHT_GREY),
        ("LEFTPADDING",(0,0), (-1,-1), 16),
        ("RIGHTPADDING",(0,0),(-1,-1), 16),
        ("TOPPADDING", (0,0), (-1,-1), 10),
        ("BOTTOMPADDING",(0,0),(-1,-1), 10),
    ]))
    return t

def header_table(chapter_num: str, chapter_label: str):
    """Bandeau compact en haut de chaque chapitre."""
    data = [[
        Paragraph(f"<b>MUSLIMFINANCE.NET</b>", brand_label),
        Paragraph(f"Chapitre {chapter_num}", ps("ch_right",
            fontName="Helvetica", fontSize=8, leading=10,
            textColor=GOLD, alignment=TA_RIGHT)),
    ]]
    t = Table(data, colWidths=[W*0.7, W*0.3])
    t.setStyle(TableStyle([
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("LINEBELOW",(0,0),(-1,-1),1, GOLD),
        ("BOTTOMPADDING",(0,0),(-1,-1),5),
        ("TOPPADDING",(0,0),(-1,-1),0),
        ("LEFTPADDING",(0,0),(-1,-1),0),
        ("RIGHTPADDING",(0,0),(-1,-1),0),
    ]))
    return t

def table_styled(data, col_widths, header_bg=DARK):
    t = Table(data, colWidths=col_widths, repeatRows=1)
    n_rows = len(data)
    style = [
        ("BACKGROUND",  (0,0), (-1,0),   header_bg),
        ("TEXTCOLOR",   (0,0), (-1,0),   IVORY),
        ("FONTNAME",    (0,0), (-1,0),   "Helvetica-Bold"),
        ("FONTSIZE",    (0,0), (-1,0),   9),
        ("ALIGN",       (0,0), (-1,0),   "LEFT"),
        ("BOTTOMPADDING",(0,0),(-1,0),   9),
        ("TOPPADDING",  (0,0), (-1,0),   9),
        ("LINEBELOW",   (0,0), (-1,0),   2, GOLD),
        ("FONTNAME",    (0,1), (-1,-1),  "Helvetica"),
        ("FONTSIZE",    (0,1), (-1,-1),  9),
        ("LEFTPADDING", (0,0), (-1,-1),  8),
        ("RIGHTPADDING",(0,0), (-1,-1),  8),
        ("TOPPADDING",  (0,1), (-1,-1),  7),
        ("BOTTOMPADDING",(0,1),(-1,-1),  7),
        ("VALIGN",      (0,0), (-1,-1),  "MIDDLE"),
        ("ROWBACKGROUNDS",(0,1),(-1,-1), [IVORY, STONE]),
        ("LINEBELOW",   (0,1), (-1,-2),  0.3, LIGHT_GREY),
    ]
    t.setStyle(TableStyle(style))
    return t

def chapter_header(num: str, title: str, hook: str, story: list):
    story.append(header_table(num, title))
    story.append(Spacer(1, 14))
    story.append(Paragraph(f"CHAPITRE {num}", chapter_number))
    story.append(Paragraph(title, chapter_title))
    story.append(gold_rule())
    story.append(Paragraph(hook, chapter_hook))

# ── BUILD ─────────────────────────────────────────────────────────────────────
def build():
    doc = SimpleDocTemplate(
        str(OUT), pagesize=A4,
        topMargin=2.0*cm, bottomMargin=2.0*cm,
        leftMargin=2.2*cm, rightMargin=2.2*cm,
        title="Halal & patrimoine — Le guide d'investissement pour le musulman qui veut construire",
        author="L'équipe muslimfinance.net",
        subject="Investissement halal AAOIFI, bourse, immobilier, or — 2026",
    )
    story = []

    # ══════════════════════════════════════════════════════════════════════════
    # PAGE DE GARDE
    # ══════════════════════════════════════════════════════════════════════════
    cover_inner = [
        [Paragraph("MUSLIMFINANCE.NET", ps("cv_brand3",
            fontName="Helvetica-Bold", fontSize=9, leading=11,
            textColor=GOLD, spaceAfter=6))],
        [Spacer(1, 32)],
        [Paragraph("Halal &amp; patrimoine", cover_title)],
        [Paragraph(
            "Le guide d'investissement pour le musulman<br/>qui veut construire",
            cover_sub)],
        [Spacer(1, 14)],
        [HRFlowable(width=W-48, thickness=1.5, color=GOLD, spaceAfter=24)],
        [Spacer(1, 8)],
        [Paragraph(
            "66 actions NASDAQ halal • 226 actions S&amp;P 500 halal • "
            "Performance backtestée • Screening AAOIFI • Or, SCPI, zakat",
            ps("cv_features",
                fontName="Helvetica", fontSize=10, leading=16,
                textColor=LIGHT_GREY, spaceAfter=44))],
        [Spacer(1, 60)],
        [Paragraph(
            "muslimfinance.net  •  Edition 2026  •  Usage personnel uniquement",
            ps("cv_footer",
                fontName="Helvetica", fontSize=8, leading=11,
                textColor=LIGHT_GREY, spaceAfter=0))],
    ]
    cover_table = Table(cover_inner, colWidths=[W])
    cover_table.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1), DARK),
        ("LEFTPADDING",(0,0),(-1,-1),28),
        ("RIGHTPADDING",(0,0),(-1,-1),28),
        ("TOPPADDING",(0,0),(-1,-1),0),
        ("BOTTOMPADDING",(0,0),(-1,-1),0),
    ]))

    outer_cover = Table([[cover_table]], colWidths=[W])
    outer_cover.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1), DARK),
        ("LEFTPADDING",(0,0),(-1,-1),0),
        ("RIGHTPADDING",(0,0),(-1,-1),0),
        ("TOPPADDING",(0,0),(-1,-1),0),
        ("BOTTOMPADDING",(0,0),(-1,-1),0),
        ("BOX",(0,0),(-1,-1),2.5, GOLD),
    ]))

    story.append(Spacer(1, 0.5*cm))
    story.append(outer_cover)
    story.append(Spacer(1, 0.5*cm))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # PAGE 2 — AVANT-PROPOS
    # ══════════════════════════════════════════════════════════════════════════
    story.append(Paragraph("MUSLIMFINANCE.NET", brand_label))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Avant-propos", section_head))
    story.append(gold_rule())
    story.append(Paragraph(
        "Ce guide n'a pas été écrit pour te vendre un cours, une formation ou un accès VIP. "
        "Il a été écrit parce qu'une question revient en boucle dans nos messages : "
        "<i>\"Comment je construis un patrimoine sans toucher au haram ?\"</i>",
        body))
    story.append(Paragraph(
        "La réponse est plus accessible qu'on ne le pense — mais elle demande d'apprendre trois choses : "
        "reconnaître ce qui est réellement conforme, comprendre les outils disponibles, "
        "et ignorer le bruit (arnaques, faux \"halal\", promesses de rendement garanti).",
        body))
    story.append(Paragraph(
        "Ce document couvre les 10 sujets qui reviennent le plus souvent. "
        "Chaque chapitre donne du concret : des chiffres réels, des critères précis, "
        "des tableaux actionnables. Pas de théologie de surface, pas de guru.",
        body))
    story.append(Paragraph(
        "Les données de marché utilisées proviennent du screening live de muslimfinance.net "
        "(mise à jour hebdomadaire, norme AAOIFI). Les backtests cités ont été calculés "
        "sur la composition actuelle du portefeuille halal appliquée historiquement — "
        "voir le disclaimer en fin de document.",
        body_grey))
    story.append(Spacer(1, 10))
    story.append(callout_box(
        "Ce guide est un outil d'éducation financière. Il ne constitue pas un conseil "
        "en investissement personnalisé. Tu restes seul responsable de tes décisions."
    ))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # SOMMAIRE
    # ══════════════════════════════════════════════════════════════════════════
    story.append(Paragraph("MUSLIMFINANCE.NET", brand_label))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Sommaire", chapter_title))
    story.append(gold_rule())

    toc_items = [
        ("1", "Pourquoi 90 % des musulmans n'ont aucun patrimoine",
               "Et pourquoi ce n'est pas entièrement leur faute"),
        ("2", "Le screening AAOIFI expliqué simplement",
               "La norme qui fait foi — les 4 critères — autres indices islamiques — BDS/ESG"),
        ("3", "Les 30 actions halal de la watchlist 2026",
               "Top NASDAQ + S&P 500 avec justifications"),
        ("4", "Profiter du boom de l'IA sans compromis",
               "Semi-conducteurs halal : NVDA, AVGO, AMD, ASML"),
        ("5", "L'or physique : combien, où, comment",
               "4 conditions islamiques — or papier vs physique — zakat or — fiscalité FR"),
        ("6", "L'immobilier nu sans crédit + SCPI halal",
               "Cash, murabaha, SCI — SCPI sharia compliant — pièges à éviter"),
        ("7", "Détecter une arnaque en 30 secondes",
               "Validus, OneCoin, MLM crypto — 5 cas réels"),
        ("8", "Les courtiers 100 % compatibles",
               "Trade Republic, IBKR, DEGIRO, BoursoBank — frais réels"),
        ("9", "Le rebalancing trimestriel en 30 minutes",
               "Routine simple — calcul zakat sur portefeuille"),
        ("10","Transmettre : héritage, donation, zakat",
               "Calculs concrets — cas pratiques famille FR"),
    ]
    for num, title, sub in toc_items:
        story.append(KeepTogether([
            Paragraph(f"<b>Chapitre {num} — {title}</b>", toc_chapter),
            Paragraph(sub, toc_sub),
        ]))

    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # CHAPITRE 1 — Pourquoi 90 % des musulmans n'ont aucun patrimoine
    # ══════════════════════════════════════════════════════════════════════════
    chapter_header("1",
        "Pourquoi 90 % des musulmans n'ont aucun patrimoine",
        "Et pourquoi ce n'est pas entièrement leur faute.",
        story)

    story.append(Paragraph(
        "En France, la grande majorité des ménages musulmans pratiquants n'ont pas de portefeuille "
        "d'actions, pas de placement halal structuré, et souvent pas de stratégie patrimoniale. "
        "Ce n'est pas une question de revenu.",
        body))
    story.append(Paragraph(
        "Un ingénieur qui gagne 50 000 euros par an peut très bien n'avoir accumulé aucun actif "
        "à 35 ans. Et un autre, au même salaire, avec la même foi, peut avoir 80 000 euros en portefeuille. "
        "La différence tient à trois facteurs.",
        body))

    story.append(Paragraph("Le blocage du riba — réel mais mal géré", section_head))
    story.append(Paragraph(
        "Refuser le riba est une obligation religieuse. Mais ce refus produit souvent un effet "
        "paralysant : si le livret A porte intérêt, si l'assurance-vie capitalise "
        "sur des obligations, si le crédit immobilier est haram — alors quoi ?",
        body))
    story.append(Paragraph(
        "La réponse courante est de ne rien faire. L'argent reste sur un compte courant, "
        "il s'érode avec l'inflation (entre 3 % et 5 % par an en Europe depuis 2021), "
        "et la conscience est tranquille. Mais l'inaction a un coût : 10 000 euros immobiles "
        "pendant 10 ans, c'est 4 000 à 6 000 euros de pouvoir d'achat perdus.",
        body))
    story.append(callout_box(
        "L'inaction n'est pas neutre. Garder son argent au chaud pendant 10 ans coûte, "
        "en pouvoir d'achat, autant que de l'avoir investi dans quelque chose de mauvais."
    ))
    story.append(Spacer(1, 14))

    story.append(Paragraph("Le manque d'outils accessibles et vérifiables", section_head))
    story.append(Paragraph(
        "Jusqu'à très récemment, il n'existait aucune ressource francophone sérieuse listant "
        "les actions halal avec les critères AAOIFI documentés. Les seuls outils disponibles "
        "étaient anglophiles, payants, ou peu fiables.",
        body))
    story.append(Paragraph(
        "Résultat : soit on investissait dans n'importe quoi (banques, alcool, armement) "
        "sans le savoir, soit on s'en remettait à des \"conseillers halal\" non régulés "
        "qui proposaient des schémas douteux.",
        body))

    story.append(Paragraph("La défiance — souvent justifiée", section_head))
    story.append(Paragraph(
        "La communauté musulmane a été ciblée de façon disproportionnée par des arnaques "
        "financières se réclamant du halal. Validus, OneCoin, et des dizaines de schémas MLM "
        "ont utilisé la mosquée, le réseau familial, la confiance religieuse comme vecteur. "
        "Le résultat est une méfiance généralisée — qui touche aussi les véhicules légitimes.",
        body))
    story.append(Paragraph(
        "Ce guide est là pour sortir de ce blocage : donner les outils concrets, "
        "les critères vérifiables, et les chiffres réels pour construire sans compromis.",
        body))

    story.append(Paragraph("Ce que tu peux construire en 10 ans avec 300 euros par mois", section_head))

    # CORRECTION BUG SUPERPOSITION : col nom élargie à 6 cm, labels raccourcis
    sim_data = [
        ["Scénario", "Investi", "Rendement", "Valeur à 10 ans"],
        ["Compte courant (inaction)", "36 000 €", "0 %", "36 000 €"],
        ["Livret A", "36 000 €", "3 % / an", "41 900 €"],
        ["NASDAQ halal — base conservative", "36 000 €", "12 % / an*", "69 600 €"],
        ["NASDAQ halal — base optimiste", "36 000 €", "18 % / an*", "94 200 €"],
    ]
    story.append(table_styled(sim_data,
        [6*cm, 2.5*cm, 3*cm, 4*cm]))
    story.append(Paragraph(
        "* Hypothèse conservative fondée sur la performance historique 5 ans du portefeuille NASDAQ halal "
        "(+497 % sur 5 ans backtestés, soit ~43 % annualisé — délibérément divisé par 3 pour un scénario prudent). "
        "Les performances passées ne garantissent pas les performances futures.",
        ps("note", fontName="Helvetica", fontSize=8.5, leading=12,
           textColor=LIGHT_GREY, spaceAfter=10)))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # CHAPITRE 2 — Le screening AAOIFI
    # ══════════════════════════════════════════════════════════════════════════
    chapter_header("2",
        "Le screening AAOIFI expliqué simplement",
        "La norme qui fait foi. Pas un comité inventé, pas un label marketing.",
        story)

    story.append(Paragraph(
        "AAOIFI signifie Accounting and Auditing Organization for Islamic Financial Institutions. "
        "C'est l'organisme international de référence pour la finance islamique, fondé en 1990, "
        "basé à Bahreïn. Ses normes Sharia sont adoptées par plus de 45 pays.",
        body))
    story.append(Paragraph(
        "Quand une action passe le filtre AAOIFI, cela signifie qu'elle satisfait des critères "
        "précis et vérifiables — pas l'avis d'un imam local ni la promesse d'une fintech. "
        "Voici les 4 critères.",
        body))

    story.append(Paragraph("Critère 1 — Le secteur d'activité principal", section_head))
    story.append(Paragraph(
        "La société ne doit pas opérer principalement dans un secteur interdit. "
        "La liste est exhaustive :",
        body))

    excluded_sectors = [
        "Banques et institutions financières conventionnelles (riba structurel)",
        "Alcool — production, distribution, vente",
        "Jeux d'argent — casinos, paris sportifs, loteries",
        "Armement offensif — fabricants de missiles, bombes, armes de destruction massive",
        "Pornographie et divertissement explicitement haram",
        "Viande porcine — production, transformation, distribution",
        "Tabac",
    ]
    for s in excluded_sectors:
        story.append(Paragraph(f"- {s}", bullet))

    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Attention : la cybersécurité, les logiciels de défense passive, "
        "et les sociétés qui ont des revenus marginaux dans ces secteurs "
        "ne sont pas automatiquement exclues — c'est le critère 4 qui tranche.",
        body_grey))

    story.append(Paragraph("Critère 2 — Ratio dette / capitalisation boursière < 33 %", section_head))
    story.append(Paragraph(
        "La dette portant intérêt ne doit pas dépasser un tiers de la capitalisation boursière de la société. "
        "Exemple : si Apple vaut 3 000 milliards de dollars et a 100 milliards de dettes financières, "
        "le ratio est de 3,3 % — largement conforme. "
        "Si une société est surendettée à effet de levier, elle génère structurellement des intérêts.",
        body))

    story.append(Paragraph("Critère 3 — Ratio (cash + placements rémunérés) / capitalisation < 33 %", section_head))
    story.append(Paragraph(
        "Une société ne doit pas ressembler à une banque. Si elle détient d'énormes réserves "
        "de liquidités placées sur des comptes rémunérés, elle se transforme en institution financière. "
        "Ce critère évite les holdings purement financiers déguisés en industriels.",
        body))

    story.append(Paragraph("Critère 4 — Revenus non conformes < 5 %", section_head))
    story.append(Paragraph(
        "C'est le critère de tolérance. Une société comme Apple perçoit quelques intérêts "
        "sur sa trésorerie — c'est inévitable. AAOIFI tolère jusqu'à 5 % de revenus "
        "\"non conformes\" si l'activité principale est halal.",
        body))
    story.append(Paragraph(
        "Dans ce cas, l'actionnaire doit purifier ses dividendes : "
        "calculer la fraction de revenus haram reçus et les donner en sadaqa. "
        "Concrètement, si 2 % des revenus sont non conformes, "
        "tu donnes 2 % de tes dividendes en charité. Simple.",
        body))

    story.append(Paragraph("Tableau récapitulatif — Les 4 critères AAOIFI", section_head))
    crit_data = [
        ["Critère AAOIFI", "Seuil", "Ce que ça signifie"],
        ["Secteur principal", "100 % conforme", "Pas de haram comme activité principale"],
        ["Dette / capitalisation", "< 33 %", "Société peu endettée à intérêt"],
        ["Cash + placements / capitalisation", "< 33 %", "Pas une banque déguisée"],
        ["Revenus non conformes", "< 5 %", "Tolérance pour intérêts marginaux — purifier"],
    ]
    story.append(table_styled(crit_data, [5.5*cm, 3*cm, 7*cm]))
    story.append(Paragraph(
        "Toutes les actions listées dans ce guide et sur muslimfinance.net "
        "passent ces 4 critères. Le screening est mis à jour hebdomadairement.",
        body_grey))

    story.append(Paragraph("Pourquoi pas les autres \"comités\" ?", section_head))
    story.append(Paragraph(
        "Il existe des dizaines de listes \"halal\" sur internet. "
        "Certaines sont produites par des comités internes à des fintechs. "
        "D'autres citent des \"scholars\" sans nommer personne. "
        "D'autres encore ont des critères opaques ou variables selon les mois.",
        body))
    story.append(callout_box(
        "Règle simple : si la source du screening n'est pas AAOIFI ou une institution "
        "académique islamique établie (ISRA, Dar al-Iftaa), demande la documentation "
        "complète avant de faire confiance."
    ))
    story.append(Spacer(1, 16))

    # ── Section nouvelle : autres indices islamiques et critères personnels ──
    story.append(Paragraph("AAOIFI parmi d'autres normes islamiques", section_head))
    story.append(Paragraph(
        "AAOIFI est la norme de référence, mais elle coexiste avec d'autres indices islamiques "
        "dont les critères sont proches — avec parfois des seuils légèrement différents.",
        body))

    _tb = ps("_tb", fontName="Helvetica", fontSize=9, leading=13, textColor=DARK)
    _tbh = ps("_tbh", fontName="Helvetica-Bold", fontSize=9, leading=13, textColor=IVORY)
    indices_data = [
        [Paragraph("Indice", _tbh), Paragraph("Organisme", _tbh), Paragraph("Particularité", _tbh)],
        [Paragraph("AAOIFI Sharia Standard", _tb), Paragraph("AAOIFI (Bahreïn)", _tb), Paragraph("Référence mondiale — seuils 33 % / 5 %", _tb)],
        [Paragraph("DJIM (Dow Jones Islamic Market)", _tb), Paragraph("S&amp;P Dow Jones Indices", _tb), Paragraph("Plus ancien indice islamique (1999), seuils similaires AAOIFI", _tb)],
        [Paragraph("MSCI Islamic Index", _tb), Paragraph("MSCI", _tb), Paragraph("Utilisé par les grandes institutions, screening trimestriel", _tb)],
        [Paragraph("FTSE Shariah Global Equity", _tb), Paragraph("FTSE Russell + Yasaar", _tb), Paragraph("Couvre actions UK, Europe, Asie — seuil 33 %", _tb)],
    ]
    t_indices = Table(indices_data, colWidths=[4*cm, 4*cm, 7.5*cm], repeatRows=1)
    t_indices.setStyle(TableStyle([
        ("BACKGROUND",  (0,0), (-1,0),   DARK),
        ("LINEBELOW",   (0,0), (-1,0),   2, GOLD),
        ("FONTNAME",    (0,1), (-1,-1),  "Helvetica"),
        ("FONTSIZE",    (0,1), (-1,-1),  9),
        ("LEFTPADDING", (0,0), (-1,-1),  8),
        ("RIGHTPADDING",(0,0), (-1,-1),  8),
        ("TOPPADDING",  (0,0), (-1,-1),  7),
        ("BOTTOMPADDING",(0,0),(-1,-1),  7),
        ("VALIGN",      (0,0), (-1,-1),  "TOP"),
        ("ROWBACKGROUNDS",(0,1),(-1,-1), [IVORY, STONE]),
        ("LINEBELOW",   (0,1), (-1,-2),  0.3, LIGHT_GREY),
    ]))
    story.append(t_indices)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Superposer ses propres critères éthiques à AAOIFI", section_head_gold))
    story.append(Paragraph(
        "AAOIFI définit la conformité Sharia stricto sensu. "
        "Rien ne t'empêche d'aller plus loin et d'ajouter tes propres filtres éthiques "
        "par-dessus le screening halal. Trois approches courantes :",
        body))

    story.append(Paragraph("<b>Critères BDS (Boycott, Divestment, Sanctions)</b>", bold_body))
    story.append(Paragraph(
        "Le mouvement BDS milite pour exclure les entreprises liées à la colonisation. "
        "Exemples d'entreprises ciblées (liste bdsmovement.net) : "
        "Coca-Cola, HP, Caterpillar, Puma, Airbnb, McDonald's. "
        "Certaines de ces entreprises passent le filtre AAOIFI — à toi de décider si tu veux "
        "les exclure en plus. Ton portefeuille sera plus restreint, mais aligné avec tes valeurs.",
        body))
    story.append(callout_box_italic(
        "Exemple concret : si tu veux exclure Coca-Cola pour raisons BDS, "
        "ton portefeuille halal-AAOIFI + BDS sera plus restreint mais cohérent "
        "avec tes convictions personnelles. C'est un choix valide — pas une obligation religieuse."
    ))
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>Critères ESG / ISR</b>", bold_body))
    story.append(Paragraph(
        "Les filtres ESG (Environnement, Social, Gouvernance) permettent d'exclure "
        "les sociétés à fort impact carbone, les mauvais employeurs, "
        "ou les entreprises avec une gouvernance douteuse. "
        "Ces critères sont distincts d'AAOIFI mais peuvent être superposés.",
        body))

    story.append(Paragraph("<b>Critères personnels</b>", bold_body))
    story.append(Paragraph(
        "Certains investisseurs ajoutent leurs propres lignes rouges : "
        "éviter des entreprises soutenant indirectement des contenus immoraux, "
        "ou des pollueurs notoires même si conformes AAOIFI. "
        "Ces choix relèvent du jugement personnel et non d'une fatwa.",
        body))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # CHAPITRE 3 — Les 30 actions halal watchlist 2026
    # ══════════════════════════════════════════════════════════════════════════
    chapter_header("3",
        "Les 30 actions halal de la watchlist 2026",
        "Top NASDAQ 100 + S&P 500. Toutes vérifiées AAOIFI. Toutes accessibles depuis un courtier classique.",
        story)

    story.append(Paragraph(
        "Le screening de muslimfinance.net (données au 2026-05-11) recense "
        f"{nasdaq_data['stats']['included']} actions halal dans le NASDAQ 100 "
        f"et {sp500_data['stats']['halal_count']} dans le S&P 500. "
        "Ci-dessous, les 30 plus importantes en termes de poids dans leur indice respectif.",
        body))

    story.append(Paragraph("Top 15 — NASDAQ 100 halal", section_head))

    name_map = {
        "NVDA": ("NVIDIA Corporation", "Semi-conducteurs"),
        "AAPL": ("Apple Inc.", "Tech / Hardware"),
        "AVGO": ("Broadcom Inc.", "Semi-conducteurs"),
        "TSLA": ("Tesla Inc.", "Véhicule électrique"),
        "MU":   ("Micron Technology", "Semi-conducteurs"),
        "AMD":  ("Advanced Micro Devices", "Semi-conducteurs"),
        "INTC": ("Intel Corporation", "Semi-conducteurs"),
        "ASML": ("ASML Holding NV", "Equip. semi-cond."),
        "CSCO": ("Cisco Systems", "Infrastructure réseau"),
        "LRCX": ("Lam Research", "Equip. semi-cond."),
        "AMAT": ("Applied Materials", "Equip. semi-cond."),
        "TXN":  ("Texas Instruments", "Semi-conducteurs"),
        "KLAC": ("KLA Corporation", "Equip. semi-cond."),
        "QCOM": ("Qualcomm Inc.", "Semi-cond. / Mobile"),
        "LIN":  ("Linde plc", "Gaz industriels"),
    }

    nasdaq_top15 = nasdaq_holdings[:15]
    nq_table_data = [["#", "Ticker", "Société", "Secteur", "Poids", "Int. %"]]
    for i, h in enumerate(nasdaq_top15, 1):
        tk = h.get("ticker", "?")
        nom, sec = name_map.get(tk, (h.get("company", tk), "—"))
        nq_table_data.append([
            str(i), tk, nom, sec,
            f"{h.get('weight',0):.2f}%",
            f"{h.get('interest_pct',0):.2f}%",
        ])

    t_nq = table_styled(nq_table_data, [0.7*cm, 1.6*cm, 4.5*cm, 3.4*cm, 1.8*cm, 2*cm])
    t_nq.setStyle(TableStyle([
        ("FONTNAME",  (1,1),(1,-1), "Helvetica-Bold"),
        ("TEXTCOLOR", (1,1),(1,-1), GOLD_DARK),
    ]))
    story.append(t_nq)

    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "\"Int. %\" = fraction des revenus totaux provenant de sources non conformes (intérêts sur trésorerie). "
        "Si > 0 %, purifier cette fraction sur tes dividendes.",
        ps("note2", fontName="Helvetica", fontSize=8.5, leading=12,
           textColor=LIGHT_GREY, spaceAfter=16)))

    story.append(Paragraph("Top 15 — S&P 500 halal (hors NASDAQ 100)", section_head))

    sp_name_map = {
        "LLY":  ("Eli Lilly & Co.", "Pharma"),
        "V":    ("Visa Inc.", "Paiements"),
        "XOM":  ("Exxon Mobil Corp.", "Energie"),
        "JNJ":  ("Johnson & Johnson", "Pharma / Med."),
        "MA":   ("Mastercard Inc.", "Paiements"),
        "CAT":  ("Caterpillar Inc.", "Industrie lourde"),
        "CVX":  ("Chevron Corp.", "Energie"),
        "ABBV": ("AbbVie Inc.", "Biopharma"),
        "PG":   ("Procter & Gamble", "Biens de conso."),
        "KO":   ("Coca-Cola Co.", "Boissons"),
        "HD":   ("Home Depot Inc.", "Distribution"),
        "GEV":  ("GE Vernova Inc.", "Energie verte"),
        "MRK":  ("Merck & Co Inc.", "Pharma"),
        "AMAT": ("Applied Materials", "Equip. semi-cond."),
        "TXN":  ("Texas Instruments", "Semi-conducteurs"),
    }

    nasdaq_tickers_set = {h.get("ticker") for h in nasdaq_holdings[:15]}
    sp500_extra = [h for h in sp500_holdings if h.get("ticker") not in nasdaq_tickers_set][:15]

    sp_table_data = [["#", "Ticker", "Société", "Secteur", "Poids S&P"]]
    for i, h in enumerate(sp500_extra, 1):
        tk = h.get("ticker", "?")
        nom, sec = sp_name_map.get(tk, (h.get("company", tk)[:30], "—"))
        sp_table_data.append([
            str(i), tk, nom, sec,
            f"{h.get('weight',0):.3f}%",
        ])

    t_sp = table_styled(sp_table_data, [0.7*cm, 1.6*cm, 5*cm, 3.8*cm, 2.1*cm])
    t_sp.setStyle(TableStyle([
        ("FONTNAME",  (1,1),(1,-1), "Helvetica-Bold"),
        ("TEXTCOLOR", (1,1),(1,-1), GOLD_DARK),
    ]))
    story.append(t_sp)

    story.append(Spacer(1, 12))
    story.append(Paragraph(
        "Comment utiliser cette watchlist : ces 30 valeurs sont un point de départ, pas une "
        "liste exhaustive. La conformité doit être vérifiée avant chaque achat sur muslimfinance.net "
        "— le screening évolue chaque semaine avec les nouvelles données comptables. "
        "Les pondérations sont celles de l'indice au 2026-05-11.",
        body_grey))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # CHAPITRE 4 — Profiter du boom de l'IA sans compromis
    # ══════════════════════════════════════════════════════════════════════════
    chapter_header("4",
        "Profiter du boom de l'IA sans compromis",
        "Les semi-conducteurs sont le sous-jacent réel de l'IA. Beaucoup sont halal.",
        story)

    story.append(Paragraph(
        "L'IA générative tourne sur des puces. Les puces viennent de semi-conducteurs. "
        "Et les semi-conducteurs — NVIDIA, Broadcom, AMD, ASML — sont majoritairement "
        "dans le secteur le plus représenté du portefeuille NASDAQ halal.",
        body))
    story.append(Paragraph(
        "Ce n'est pas un hasard. L'industrie des semi-conducteurs n'a pas de revenus "
        "d'intérêt structurels, ne distribue pas d'alcool, ne finance pas de jeux d'argent. "
        "Elle fait des puces. C'est un secteur qui passe naturellement le filtre AAOIFI.",
        body))

    story.append(Paragraph("NVIDIA (NVDA) — Le fournisseur d'infrastructure de l'IA", section_head))
    story.append(Paragraph(
        "Poids dans le NASDAQ halal : 13,32 % (premier poste). "
        "Revenus non conformes : 1,07 % (purification très marginale).",
        body))
    story.append(Paragraph(
        "NVIDIA fabrique les GPU H100 et H200 — les processeurs sur lesquels tournent "
        "ChatGPT, Gemini, Mistral, et la quasi-totalité des modèles IA d'envergure. "
        "En 2024, les revenus de son segment data center ont dépassé 87 milliards de dollars, "
        "soit plus que le total de ses ventes en 2023.",
        body))
    story.append(Paragraph(
        "Le stock a multiplié par plus de 10 entre 2022 et 2025. "
        "Cela ne signifie pas que la performance future sera similaire — "
        "mais la position dominante dans l'infrastructure IA reste structurelle.",
        body_grey))

    story.append(Paragraph("Broadcom (AVGO) — L'autre grand semi-conducteur halal", section_head))
    story.append(Paragraph(
        "Poids dans le NASDAQ halal : 5,18 %. Revenus non conformes : 0,54 %.",
        body))
    story.append(Paragraph(
        "Broadcom fabrique des puces réseau, des processeurs d'application et "
        "des circuits intégrés pour data centers. Moins médiatisé que NVIDIA, "
        "mais présent dans pratiquement toutes les infrastructures cloud mondiales. "
        "Apple est l'un de ses plus gros clients.",
        body))

    story.append(Paragraph("AMD — L'outsider qui a rattrapé Intel", section_head))
    story.append(Paragraph(
        "Poids dans le NASDAQ halal : 1,89 %. Revenus non conformes : 5,00 % (limite AAOIFI — à purifier).",
        body))
    story.append(Paragraph(
        "AMD produit des processeurs CPU et GPU concurrents d'Intel et NVIDIA. "
        "Ses GPU MI300 montent en puissance dans les data centers IA. "
        "Attention : le ratio d'intérêts est à 5 % — à la limite du seuil AAOIFI. "
        "Surveiller ce ratio à chaque mise à jour screening.",
        body_grey))

    story.append(Paragraph("ASML — Le seul fabricant de machines EUV au monde", section_head))
    story.append(Paragraph(
        "Poids dans le NASDAQ halal : 1,56 %. Revenus non conformes : 0,32 %.",
        body))
    story.append(Paragraph(
        "ASML (basé aux Pays-Bas) fabrique les machines lithographiques EUV sans lesquelles "
        "personne — ni TSMC, ni Samsung, ni Intel — ne peut produire les puces les plus avancées. "
        "C'est un monopole de fait sur une technologie critique. "
        "L'un des profils risque/position dominante les plus intéressants du secteur.",
        body))

    story.append(Paragraph("Tableau comparatif — Les 4 acteurs clés IA halal", section_head))
    ia_cmp = [
        ["Société", "Ticker", "Spécialité", "Poids NASDAQ halal", "Int. %"],
        ["NVIDIA", "NVDA", "GPU data center / IA", "13,32 %", "1,07 %"],
        ["Broadcom", "AVGO", "Puces réseau / cloud", "5,18 %", "0,54 %"],
        ["AMD", "AMD", "CPU/GPU compétiteurs", "1,89 %", "5,00 %"],
        ["ASML", "ASML", "Machines lithographiques EUV", "1,56 %", "0,32 %"],
    ]
    story.append(table_styled(ia_cmp, [3.5*cm, 1.8*cm, 5*cm, 3.5*cm, 1.7*cm]))
    story.append(Spacer(1, 12))

    story.append(Paragraph("Ce qu'il faut éviter : les tokens IA et plateformes non régulées", section_head))
    story.append(Paragraph(
        "Le boom de l'IA a généré des dizaines de \"tokens IA\" : Fetch.AI, SingularityNET, "
        "Render Network, etc. Ces actifs numériques ont plusieurs problèmes du point de vue halal :",
        body))

    tokens_issues = [
        "Aucun sous-jacent réel vérifiable dans une bourse réglementée",
        "Volatilité extrême avec des baisses de 80-95 % fréquentes",
        "Aucun screening AAOIFI disponible — pas de documentation Sharia sérieuse",
        "Souvent associés à des mécanismes de staking qui ressemblent à du riba",
        "Tracabilité des fonds quasi-nulle",
    ]
    for issue in tokens_issues:
        story.append(Paragraph(f"- {issue}", bullet))

    story.append(callout_box(
        "La vraie exposition à l'IA passe par les actions des fabricants de puces, "
        "pas par des tokens. NVIDIA est dans l'IA. Un \"token d'intelligence artificielle\" "
        "sur une plateforme obscure n'est généralement pas dans l'IA — il est dans l'arnaque."
    ))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # CHAPITRE 5 — L'or physique
    # ══════════════════════════════════════════════════════════════════════════
    chapter_header("5",
        "L'or physique : combien, où, comment",
        "L'or reste la valeur refuge la plus ancienne. En islam, sa forme et son mode d'achat comptent.",
        story)

    story.append(Paragraph(
        "L'or est mentionné dans le Coran comme unité de valeur. Sa détention est licite, "
        "son commerce en spot aussi. Ce qui pose problème, c'est l'or \"papier\" : "
        "les ETF adossés à des contrats futures, les certificats d'or sans livraison physique, "
        "les comptes d'or dans des banques conventionnelles.",
        body))

    story.append(Paragraph("Les 4 conditions de l'achat d'or en islam", section_head))
    story.append(Paragraph(
        "La majorité des écoles juridiques islamiques (Hanafi, Maliki, Shafii, Hanbali) "
        "s'accordent sur 4 conditions pour que l'achat d'or soit conforme.",
        body))

    conditions_or = [
        ("1. Qabd — possession effective immédiate",
         "L'or doit changer de main immédiatement lors de la transaction (cash contre métal). "
         "Pas de livraison différée de plusieurs jours. "
         "Selon la majorité des scholars, le qabd peut être physique (tu prends le lingot) "
         "ou hukmi (possession légale reconnue, ex : retrait en agence le jour même). "
         "Les livraisons postales sous 24-48h sont débattues — prends l'avis d'un scholar."),
        ("2. Paiement comptant uniquement",
         "Pas de crédit, pas de paiement échelonné sur l'achat d'or. "
         "L'or contre l'or et l'or contre l'argent doivent être échangés main à main et immédiatement. "
         "Payer en carte ou virement instantané le même jour est généralement accepté."),
        ("3. Or physique — lingots et pièces uniquement",
         "Lingots certifiés (LBMA Good Delivery), Napoléons, Souverains, Krugerrand, Maple Leaf. "
         "L'or papier (ETF or sur contrats à terme, certificats sans métal sous-jacent) "
         "ne satisfait pas la condition de qabd selon AAOIFI strict."),
        ("4. Pesée et titrage transparents",
         "Tu dois savoir exactement combien d'or pur tu acquiers. "
         "Titrage en millièmes : 999/1000 = or 24 carats (99,9 % pur), "
         "750/1000 = or 18 carats (75 % pur). "
         "Exige le certificat de titrage pour les lingots de valeur."),
    ]
    for titre, detail in conditions_or:
        story.append(KeepTogether([
            Paragraph(f"<b>{titre}</b>", bold_body),
            Paragraph(detail, body_grey),
            Spacer(1, 6),
        ]))

    story.append(callout_box(
        "L'achat d'or comporte des subtilités qui varient selon les écoles (Hanafi, Maliki, Shafii, Hanbali). "
        "En cas de doute, consulte un savant de référence ou un cabinet de fatwa reconnu "
        "(Dar al-Ifta Egypte, AAOIFI, ISRA Malaisie)."
    ))
    story.append(Spacer(1, 14))

    story.append(Paragraph("Or physique vs Or papier vs ETF or — Tableau comparatif", section_head))
    _tc = ps("_tc", fontName="Helvetica", fontSize=8.5, leading=12, textColor=DARK)
    _tch = ps("_tch", fontName="Helvetica-Bold", fontSize=8.5, leading=12, textColor=IVORY)
    or_cmp = [
        [Paragraph("Type", _tch), Paragraph("Conformité Sharia", _tch), Paragraph("Coût entrée", _tch), Paragraph("Liquidité", _tch), Paragraph("Frais / an", _tch)],
        [Paragraph("Lingots / pièces physiques", _tc), Paragraph("Oui (qabd respecté)", _tc), Paragraph("Premium 2-5 %", _tc), Paragraph("Moyen (revente agence)", _tc), Paragraph("0 % (stockage pers.)", _tc)],
        [Paragraph("ETF or physique ségrégé (ex: GBS)", _tc), Paragraph("Généralement oui", _tc), Paragraph("Prix spot", _tc), Paragraph("Elevée (bourse)", _tc), Paragraph("0,15-0,25 %", _tc)],
        [Paragraph("ETF or papier (futures)", _tc), Paragraph("Non (pas de qabd)", _tc), Paragraph("Prix spot", _tc), Paragraph("Très élevée", _tc), Paragraph("0,10-0,20 %", _tc)],
        [Paragraph("Compte or banque conv.", _tc), Paragraph("Non (pas de qabd réel)", _tc), Paragraph("Prix spot", _tc), Paragraph("Dépend banque", _tc), Paragraph("Frais de garde", _tc)],
        [Paragraph("Certificats or sans livraison", _tc), Paragraph("Non (gharar)", _tc), Paragraph("Variable", _tc), Paragraph("Limitée", _tc), Paragraph("Variable", _tc)],
    ]
    t_or = Table(or_cmp, colWidths=[4*cm, 3.5*cm, 2.2*cm, 3*cm, 2.8*cm], repeatRows=1)
    t_or.setStyle(TableStyle([
        ("BACKGROUND",  (0,0), (-1,0),   DARK),
        ("LINEBELOW",   (0,0), (-1,0),   2, GOLD),
        ("LEFTPADDING", (0,0), (-1,-1),  7),
        ("RIGHTPADDING",(0,0), (-1,-1),  7),
        ("TOPPADDING",  (0,0), (-1,-1),  6),
        ("BOTTOMPADDING",(0,0),(-1,-1),  6),
        ("VALIGN",      (0,0), (-1,-1),  "TOP"),
        ("ROWBACKGROUNDS",(0,1),(-1,-1), [IVORY, STONE]),
        ("LINEBELOW",   (0,1), (-1,-2),  0.3, LIGHT_GREY),
    ]))
    story.append(t_or)
    story.append(Spacer(1, 12))

    story.append(Paragraph("Où acheter de l'or physique en France", section_head))
    or_vendors = [
        ("CPoR Devises (filiale Crédit Agricole)", "Livraison physique ou retrait en agence, devis en ligne, prix spot + premium raisonnable. Respecte le qabd si retrait immédiat."),
        ("Loomis / Brinks (coffres)", "Stockage sécurisé professionnel. Ton or t'appartient pleinement, séparé physiquement — pas de problème de qabd si achat via courtier sérieux."),
        ("Geiger Edelmetalle", "Fondeur allemand reconnu, lingots certifiés LBMA, livraison sécurisée en Europe."),
        ("Or en Cash", "Réseau d'agences physiques France — achat comptant en agence = qabd respecté immédiatement."),
        ("Comptoir National de l'Or", "Réseau de boutiques physiques + vente en ligne avec livraison assurée."),
    ]
    for name, desc in or_vendors:
        story.append(Paragraph(f"<b>{name}</b> — {desc}", bullet))

    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Evite systématiquement les revendeurs sans local commercial fixe, "
        "les \"clubs d'achat or\" et les plateformes qui ne livrent pas physiquement.",
        body_grey))

    story.append(Paragraph("Quelle part d'or dans un portefeuille ?", section_head))
    alloc_data = [
        ["Profil", "Allocation recommandée", "Logique"],
        ["Débutant < 5 ans d'horizon", "5-8 %", "Stabilité, assurance psychologique"],
        ["Investisseur moyen 10 ans", "5-10 %", "Diversification classique"],
        ["Proche retraite / transmission", "10-15 %", "Préservation du capital"],
    ]
    story.append(table_styled(alloc_data, [5*cm, 4*cm, 7*cm]))
    story.append(Spacer(1, 10))

    story.append(Paragraph("Zakat sur l'or", section_head))
    story.append(Paragraph(
        "Le nisab de l'or est fixé à <b>85 grammes d'or pur</b>. "
        "Si tu détiens 85 g ou plus depuis une année lunaire complète (hawl), "
        "tu dois la zakat au taux de <b>2,5 %</b> sur la valeur totale au-delà du nisab.",
        body))
    story.append(Paragraph(
        "Exemple : 200 g d'or au cours de 70 €/g = 14 000 €. "
        "Nisab (85 g × 70 €) = 5 950 €. "
        "Base zakatable = 14 000 €. Zakat due = 14 000 × 2,5 % = <b>350 €</b>.",
        body_grey))

    story.append(Paragraph("Stockage : domicile vs coffre bancaire", section_head))
    story.append(Paragraph(
        "Le coffre bancaire ne pose pas de problème de qabd si l'or t'appartient pleinement "
        "et est physiquement séparé des actifs de la banque. "
        "La banque n'est que gardien — elle n'est pas propriétaire. "
        "En pratique : préfère un coffre avec contrat de dépôt nominatif (\"dépôt séparé\", "
        "pas \"coffre mutualisé\").",
        body))

    story.append(Paragraph("Fiscalité de l'or en France", section_head))
    story.append(Paragraph(
        "Option 1 — Taxe forfaitaire sur métaux précieux : 11,5 % du prix de vente brut "
        "(quelle que soit la plus-value). Simple, sans justificatif d'achat.",
        bullet))
    story.append(Paragraph(
        "Option 2 — Régime des plus-values : 36,2 % (19 % + prélèvements sociaux) sur la plus-value nette, "
        "avec abattement de 5 % par an à partir de la 3e année de détention. "
        "Exonération totale après 22 ans.",
        bullet))
    story.append(Paragraph(
        "Règle : si tu gardes l'or plus de 10 ans, l'option 2 est presque toujours plus favorable. "
        "Garde tes factures d'achat.",
        body_grey))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # CHAPITRE 6 — L'immobilier nu sans crédit + SCPI halal
    # ══════════════════════════════════════════════════════════════════════════
    chapter_header("6",
        "L'immobilier nu sans crédit + SCPI halal",
        "Acheter de l'immobilier sans intérêt, c'est possible. Et la \"pierre papier\" aussi.",
        story)

    story.append(Paragraph(
        "Le crédit immobilier conventionnel est fondé sur le riba — les intérêts constituent "
        "l'essentiel du coût de financement. Pour un appartement à 200 000 euros financé "
        "sur 20 ans à 3,5 %, les intérêts totaux dépassent 75 000 euros.",
        body))
    story.append(Paragraph(
        "Il existe des alternatives légitimes, plus ou moins accessibles selon la situation.",
        body))

    story.append(Paragraph("Option 1 — L'achat cash", section_head))
    story.append(Paragraph(
        "La solution la plus simple. Pas de financement, pas de riba. "
        "Tu achètes un bien dont le prix est inférieur à tes liquidités disponibles. "
        "Cela suppose une épargne préalable — d'où l'importance de commencer à investir tôt.",
        body))
    story.append(Paragraph(
        "En pratique : des studios ou T2 en zone B2 (périphérie de villes moyennes) "
        "sont accessibles entre 60 000 et 120 000 euros cash. "
        "Le rendement locatif brut dans ces zones peut atteindre 7-9 %.",
        body))

    story.append(Paragraph("Option 2 — Le murabaha simplifié", section_head))
    story.append(Paragraph(
        "Le murabaha est un contrat de vente à terme avec marge. "
        "Principe : un tiers (idéalement une institution islamique) achète le bien, "
        "puis te le revend au prix majoré d'une marge fixe, payable en mensualités.",
        body))
    story.append(Paragraph(
        "En France, ce mécanisme n'est pas fiscalement neutre : "
        "la double mutation entraîne deux fois les droits de mutation (frais de notaire). "
        "Quelques institutions testent ce format (Islamic Finance Advisory & Assurance Services, "
        "StrideUp au Royaume-Uni), mais l'offre française reste limitée en 2026.",
        body))
    story.append(callout_box(
        "Le murabaha réel exige deux actes notariés distincts. Méfie-toi des \"murabaha\" "
        "qui ne sont que des crédits conventionnels renommés sans transfert de propriété intermédiaire."
    ))
    story.append(Spacer(1, 14))

    story.append(Paragraph("Option 3 — La SCI avec apports équitables", section_head))
    story.append(Paragraph(
        "La Société Civile Immobilière (SCI) permet à plusieurs associés d'acheter ensemble. "
        "Si chaque associé apporte sa part en cash — sans emprunt — la structure est compatible.",
        body))
    story.append(Paragraph(
        "Avantages : mutualisation du capital, gestion simplifiée de la succession (cession de parts), "
        "fiscalité optimisable (IS possible). Inconvénient : si l'un des associés finance sa part "
        "avec un crédit conventionnel, l'ensemble de la structure porte du riba.",
        body))

    story.append(Paragraph("Option 4 — Les SCPI sharia compliant (pierre papier halal)", section_head))
    story.append(Paragraph(
        "Une SCPI (Société Civile de Placement Immobilier) permet d'investir dans l'immobilier "
        "sans gérer un bien soi-même : tu achètes des parts d'une société qui possède un parc "
        "immobilier (bureaux, commerces, santé, logistique), et tu touches des loyers mensuels.",
        body))
    story.append(Paragraph(
        "Le problème avec les SCPI classiques : la majorité utilisent l'effet de levier via "
        "emprunts bancaires conventionnels — non conformes. "
        "Quelques SCPI françaises sont structurées <b>sans recours à l'emprunt à intérêt</b> "
        "et certifiées conformes Sharia. Les plus citées sur le marché francophone :",
        body))

    scpi_examples = [
        ("5/7 Or", "Référence du marché halal francophone — certifiée AAOIFI"),
        ("Perial Sharia / Pernice", "Gamme dédiée halal, structure sans effet de levier"),
    ]
    for nom, desc in scpi_examples:
        story.append(Paragraph(f"<b>{nom}</b> — {desc}", bullet))

    story.append(callout_box(
        "La conformité Sharia des SCPI evolue : vérifier le certificat AAOIFI à jour "
        "avant de souscrire. Une SCPI labellisée halal il y a 5 ans peut avoir changé "
        "de structure depuis. Source actualisée : muslimfinance.net"
    ))
    story.append(Spacer(1, 12))

    story.append(Paragraph("SCPI halal — Avantages et inconvénients", section_head_gold))
    scpi_av = [
        ["", "SCPI halal", "Immobilier nu cash"],
        ["Ticket d'entrée", "Quelques milliers d'euros", "60 000 € minimum"],
        ["Rendement typique", "3-5 % net / an", "5-9 % brut / an"],
        ["Gestion", "Déléguée (zéro effort)", "Active (locataires, travaux)"],
        ["Frais d'entrée", "8-12 % (non récupérables < 8 ans)", "Frais notaire 7-8 %"],
        ["Liquidité", "Marché secondaire (semaines)", "Plusieurs mois"],
        ["Diversification", "Multi-immeubles, multi-secteurs", "Un bien unique"],
        ["Fiscalité", "Revenus fonciers (IR + 17,2 % PS)", "Revenus fonciers identiques"],
    ]
    story.append(table_styled(scpi_av, [3.5*cm, 6*cm, 6*cm]))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "Recommandation : si tu veux exposer ton patrimoine à l'immobilier sans acheter en direct, "
        "les SCPI halal sont l'option à étudier. Pour la liste actualisée des SCPI certifiées, "
        "consulte muslimfinance.net.",
        body_grey))

    story.append(Paragraph("Les pièges à éviter", section_head))
    pieges = [
        ("\"Plan béton au bled\"", "Les projets immobiliers vendus par des promoteurs informels à l'étranger (Maroc, Algérie, Tunisie) présentent des risques juridiques majeurs : titre de propriété non transférable, promoteur insolvable, délais indéfinis. Exiger un titre foncier officiel (TF au Maroc) avant tout engagement."),
        ("Le crédit in fine déguisé", "Certains montages présentés comme \"halal\" sont en réalité des crédits in fine où le capital reste constant et seuls les intérêts sont payés pendant la durée. La forme change, pas le fond."),
        ("Les SCPI non certifiées", "Toutes les SCPI ne sont pas sharia compliant. Vérifier le certificat AAOIFI à jour — pas juste un label marketing vague."),
    ]
    for titre, expl in pieges:
        story.append(KeepTogether([
            Paragraph(f"<b>{titre}</b>", bold_body),
            Paragraph(expl, body_grey),
            Spacer(1, 6),
        ]))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # CHAPITRE 7 — Détecter une arnaque en 30 secondes
    # ══════════════════════════════════════════════════════════════════════════
    chapter_header("7",
        "Détecter une arnaque en 30 secondes",
        "5 cas réels analysés. Même mécanisme, mêmes victimes, même fuite.",
        story)

    story.append(Paragraph(
        "Le lead magnet gratuit distribué sur muslimfinance.net (\"Checklist 8 questions — "
        "Comment détecter une arnaque halal en 30 secondes\") couvre le protocole complet. "
        "Ce chapitre se concentre sur 5 cas réels et le mécanisme commun qui les unit.",
        body))

    story.append(Paragraph("Le mécanisme commun — Schéma de Ponzi islamique", section_head))
    story.append(Paragraph(
        "Tous les schémas frauduleux ciblant les musulmans partagent 4 éléments :",
        body))

    ponzi_elements = [
        "Un label halal non certifié (comité interne, imam payé, \"approuvé par des scholars\")",
        "Un réseau de recrutement communautaire (mosquée, WhatsApp familial, frères de confiance)",
        "Un rendement garanti impossible à justifier (\"8 % par mois\", \"double en 6 mois\")",
        "Un retrait d'argent conditionné ou progressivement bloqué",
    ]
    for e in ponzi_elements:
        story.append(Paragraph(f"- {e}", bullet))

    story.append(Paragraph("Checklist de détection rapide", section_head))
    checklist_data = [
        ["Question", "Signal d'alarme si..."],
        ["Qui régule ce produit ?", "Pas de régulateur nommé (AMF, BaFin, FCA...)"],
        ["Quel est le rendement annoncé ?", "> 12 % garanti = impossible légalement"],
        ["Puis-je retirer quand je veux ?", "Conditions de retrait floues ou différées"],
        ["Le label halal est-il certifié AAOIFI ?", "Comité interne ou scholar inconnu"],
        ["L'opportunité vient-elle d'un proche ?", "Pression sociale = signal Ponzi classique"],
        ["Y a-t-il un site public vérifiable ?", "Site récent, adresse introuvable, zero avis tiers"],
    ]
    story.append(table_styled(checklist_data, [6*cm, 9*cm]))
    story.append(Spacer(1, 12))

    story.append(Paragraph("5 cas réels", section_head))

    cas = [
        ("Validus (2015-2020)",
         "Promesse de trading Forex \"halal\" sur des marchés OTC. Rendement garanti de 40-120 % annuels. "
         "Schéma pyramidal pur : les nouveaux investisseurs financent les retraits des anciens. "
         "Effondrement en 2020. Pertes estimées : plusieurs dizaines de millions d'euros, "
         "dont une part significative dans les communautés musulmanes francophones. "
         "Signal d'alarme principal : rendement garanti + aucun régulateur reconnu."),
        ("OneCoin (2014-2019)",
         "\"Cryptomonnaie halal\" présentée lors de séminaires dans des salles de conférence d'hôtels. "
         "Aucune blockchain existante. La fondatrice (Ruja Ignatova, \"Crypto Queen\") est en fuite depuis 2017, "
         "sous mandat d'arrêt international. Fraude estimée à 4 milliards de dollars au niveau mondial. "
         "Signal d'alarme : actif non vérifiable sur aucun explorateur blockchain indépendant."),
        ("Schémas MLM crypto FR (2020-2023)",
         "Multiplication de plateformes (HyperFund, Forsage, MetaForce) utilisées dans les communautés "
         "musulmanes comme \"investissement passif halal\". Commission sur recrutement = structure pyramidale. "
         "Aucune valeur sous-jacente réelle. La plupart ont fermé avec les fonds des derniers entrants. "
         "Signal d'alarme : la rémunération vient du recrutement, pas du produit."),
        ("Trading rooms Telegram (2021-2025)",
         "Groupes Telegram privés proposant des \"signaux de trading halal\" moyennant abonnement. "
         "Faux résultats, screenshots truqués, témoignages de complices. "
         "Quand les pertes apparaissent, le groupe est archivé et le compte disparaît. "
         "Signal d'alarme : performance non vérifiable + anonymat + \"places limitées\"."),
        ("Plans immobiliers \"halal\" au Maghreb (2018-2026)",
         "Promoteurs informels promettant 15-20 % de rendement locatif sur des appartements "
         "à construire en Algérie ou au Maroc. Travaux non démarrés, titres de propriété inexistants, "
         "promoteurs injoignables après encaissement. "
         "Signal d'alarme : pas de titre foncier officiel, paiement avant acte notarié."),
    ]

    for titre, detail in cas:
        story.append(KeepTogether([
            Paragraph(f"<b>{titre}</b>", bold_body),
            Paragraph(detail, body_grey),
            Spacer(1, 6),
        ]))

    story.append(callout_box(
        "Règle d'or : si quelqu'un de ta communauté te propose une opportunité financière "
        "et que tu ne peux pas la vérifier toi-même sur un site public neutre en 5 minutes, "
        "tu ne mets pas d'argent. La pression sociale ne remplace pas la vérification."
    ))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # CHAPITRE 8 — Courtiers et plateformes 100 % compatibles
    # ══════════════════════════════════════════════════════════════════════════
    chapter_header("8",
        "Les courtiers et plateformes 100 % compatibles",
        "Pas d'affiliation. Frais réels. Comment ouvrir un compte et acheter une action halal.",
        story)

    story.append(Paragraph(
        "Un courtier est un intermédiaire régulé qui permet d'acheter des actions sur les marchés. "
        "Le courtier lui-même n'a pas besoin d'être \"halal\" — tu n'investis pas dans le courtier, "
        "tu investis dans les entreprises via lui. Ce qui compte : qu'il ne te propose pas "
        "de produits à intérêt comme les obligations ou les SRD à crédit.",
        body))

    story.append(Paragraph("Comparatif des 4 courtiers recommandés", section_head))
    _tb2 = ps("_tb2", fontName="Helvetica", fontSize=9, leading=13, textColor=DARK)
    _tbh2 = ps("_tbh2", fontName="Helvetica-Bold", fontSize=9, leading=13, textColor=IVORY)
    brokers_table = [
        [Paragraph("Courtier", _tbh2), Paragraph("Régulation", _tbh2), Paragraph("Frais / ordre", _tbh2), Paragraph("Pour qui ?", _tbh2)],
        [Paragraph("Trade Republic", _tb2), Paragraph("BaFin (Allemagne)", _tb2), Paragraph("1 € fixe", _tb2), Paragraph("Débutant — petits montants", _tb2)],
        [Paragraph("Interactive Brokers", _tb2), Paragraph("SEC + FCA + AMF", _tb2), Paragraph("0,05 % (min 1 $)", _tb2), Paragraph("Investisseur confirmé > 10 K€", _tb2)],
        [Paragraph("DEGIRO (Custody)", _tb2), Paragraph("AFM (Pays-Bas)", _tb2), Paragraph("2 € + 0,02 %", _tb2), Paragraph("Intermédiaire, accès EU large", _tb2)],
        [Paragraph("BoursoBank", _tb2), Paragraph("AMF (France)", _tb2), Paragraph("1,99 € / 0 € Premium", _tb2), Paragraph("Banque + courtier intégré", _tb2)],
    ]
    t_brokers = Table(brokers_table, colWidths=[3.5*cm, 4*cm, 3.5*cm, 4.5*cm], repeatRows=1)
    t_brokers.setStyle(TableStyle([
        ("BACKGROUND",  (0,0), (-1,0),   DARK),
        ("LINEBELOW",   (0,0), (-1,0),   2, GOLD),
        ("LEFTPADDING", (0,0), (-1,-1),  8),
        ("RIGHTPADDING",(0,0), (-1,-1),  8),
        ("TOPPADDING",  (0,0), (-1,-1),  7),
        ("BOTTOMPADDING",(0,0),(-1,-1),  7),
        ("VALIGN",      (0,0), (-1,-1),  "TOP"),
        ("ROWBACKGROUNDS",(0,1),(-1,-1), [IVORY, STONE]),
        ("LINEBELOW",   (0,1), (-1,-2),  0.3, LIGHT_GREY),
    ]))
    story.append(t_brokers)
    story.append(Spacer(1, 12))

    brokers = [
        ("Trade Republic",
         "Compte ouvert en 10 min sur smartphone. Interface simple, adaptée aux débutants. "
         "Inconvénient : pas de PEA. "
         "Intérêts sur cash : proposés mais optionnels (désactiver si souhaité)."),
        ("Interactive Brokers (IBKR)",
         "Accès à toutes les bourses mondiales — NASDAQ, NYSE, Euronext. "
         "Interface plus complexe mais la plus complète. Pour portefeuilles > 10 000 €."),
        ("DEGIRO — compte Custody",
         "DEGIRO pratique le \"securities lending\" par défaut (prêt de tes titres). "
         "Passer en compte Custody pour éviter ça — tes actions restent les tiennes et ne sont pas prêtées."),
        ("BoursoBank (ex-Boursorama)",
         "Avantage : banque + courtier dans la même app, virement instantané. "
         "Inconvénient : accès aux marchés US plus limité que IBKR."),
    ]

    for nom, detail in brokers:
        story.append(KeepTogether([
            Paragraph(f"<b>{nom}</b>", bold_body),
            Paragraph(detail, body_grey),
            Spacer(1, 4),
        ]))

    story.append(Paragraph("Ce qu'il faut éviter chez les courtiers", section_head))
    avoid = [
        "Le SRD (Service à Règlement Différé) : achat d'actions à crédit, avec intérêts. Désactiver.",
        "Les produits dérivés (options, CFD, turbos) : levier + intérêts = incompatible",
        "Les obligations (bonds) : instruments de dette portant intérêt",
        "Les fonds monétaires : investissent dans des obligations court terme",
        "Le \"prêt de titres\" automatique (DEGIRO standard) : évitable avec compte Custody",
    ]
    for a in avoid:
        story.append(Paragraph(f"- {a}", bullet))

    story.append(callout_box(
        "Ouvrir un compte chez un courtier régulé et y acheter des actions halal n'est pas haram. "
        "Ce n'est pas une banque islamique — mais c'est un canal d'accès transparent "
        "à des actifs que tu choisis toi-même selon les critères AAOIFI."
    ))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # CHAPITRE 9 — Le rebalancing trimestriel en 30 minutes
    # ══════════════════════════════════════════════════════════════════════════
    chapter_header("9",
        "Le rebalancing trimestriel en 30 minutes",
        "Gérer un portefeuille halal n'est pas compliqué. Voici la routine exacte.",
        story)

    story.append(Paragraph(
        "Un portefeuille qui n'est jamais rééquilibré dérive. "
        "Une action qui double passe de 10 % à 20 % du portefeuille — "
        "et si elle corrige violemment, la perte est disproportionnée. "
        "Le rebalancing ramène chaque ligne à sa pondération cible.",
        body))

    story.append(Paragraph("La routine trimestrielle — 4 étapes", section_head))

    steps = [
        ("Etape 1 — Vérifier le screening (10 min)",
         "Aller sur muslimfinance.net et vérifier que toutes tes lignes sont toujours \"halal\". "
         "Les entreprises évoluent : rachat d'une filiale dans un secteur interdit, "
         "endettement qui dépasse le seuil 33 %, revenus non conformes qui grimpent. "
         "Si une action est passée en \"douteux\" ou \"exclu\", la sortir du portefeuille."),
        ("Etape 2 — Calculer les écarts de pondération (10 min)",
         "Télécharger le relevé de ton courtier. Calculer le poids actuel de chaque ligne "
         "(valeur ligne / valeur totale × 100). Comparer à la cible. "
         "Règle : si l'écart dépasse 5 points de pourcentage, rééquilibrer."),
        ("Etape 3 — Rééquilibrer avec les apports (5 min)",
         "Avant de vendre, utilise les nouveaux apports du trimestre pour acheter les lignes sous-pondérées. "
         "Ça évite des transactions inutiles (et les frais associés). "
         "Vendre uniquement ce qui est fortement surpondéré."),
        ("Etape 4 — Calculer la zakat (5 min)",
         "Voir ci-dessous."),
    ]
    for titre, detail in steps:
        story.append(KeepTogether([
            Paragraph(f"<b>{titre}</b>", bold_body),
            Paragraph(detail, body_grey),
            Spacer(1, 6),
        ]))

    story.append(Paragraph("Calcul de la zakat sur portefeuille boursier", section_head))
    story.append(Paragraph(
        "La zakat sur actions est un sujet sur lequel les scholars divergent légèrement. "
        "L'approche la plus commune (et la plus prudente) :",
        body))

    zakat_steps = [
        "Prendre la valeur de marché totale du portefeuille",
        "Multiplier par le pourcentage d'actifs \"zakatable\" de chaque entreprise "
        "(cash + stocks + créances commerciales / total actifs). Certaines apps halal le calculent.",
        "Méthode simplifiée acceptée : appliquer 2,5 % sur la valeur totale du portefeuille "
        "si tu le détiens avec intention de vente (trader). Si intention de long terme (investisseur), "
        "certains scholars appliquent 2,5 % uniquement sur les dividendes.",
        "Date de référence : la date anniversaire de ton hawl (un an lunaire de détention au-dessus du nissab)",
        "Nissab 2026 : environ 5 950 € (valeur de 85 g d'or à ~70 €/g) — vérifier au moment du calcul",
    ]
    for i, s in enumerate(zakat_steps, 1):
        story.append(Paragraph(f"{i}. {s}", bullet))

    story.append(Spacer(1, 10))
    _tz = ps("_tz", fontName="Helvetica", fontSize=9, leading=13, textColor=DARK)
    _tzh = ps("_tzh", fontName="Helvetica-Bold", fontSize=9, leading=13, textColor=IVORY)
    zakat_ex_data = [
        [Paragraph("Valeur portefeuille", _tzh), Paragraph("Méthode", _tzh), Paragraph("Zakat due", _tzh)],
        [Paragraph("20 000 €", _tz), Paragraph("2,5 % sur valeur totale (trader)", _tz), Paragraph("500 €", _tz)],
        [Paragraph("20 000 €", _tz), Paragraph("2,5 % sur dividendes seulement (investisseur LT)", _tz), Paragraph("Variable selon dividendes", _tz)],
        [Paragraph("5 000 € (< nissab)", _tz), Paragraph("Non applicable", _tz), Paragraph("0 €", _tz)],
    ]
    t_zakat = Table(zakat_ex_data, colWidths=[3.5*cm, 8.5*cm, 3.5*cm], repeatRows=1)
    t_zakat.setStyle(TableStyle([
        ("BACKGROUND",  (0,0), (-1,0),   DARK),
        ("LINEBELOW",   (0,0), (-1,0),   2, GOLD),
        ("LEFTPADDING", (0,0), (-1,-1),  8),
        ("RIGHTPADDING",(0,0), (-1,-1),  8),
        ("TOPPADDING",  (0,0), (-1,-1),  7),
        ("BOTTOMPADDING",(0,0),(-1,-1),  7),
        ("VALIGN",      (0,0), (-1,-1),  "TOP"),
        ("ROWBACKGROUNDS",(0,1),(-1,-1), [IVORY, STONE]),
        ("LINEBELOW",   (0,1), (-1,-2),  0.3, LIGHT_GREY),
    ]))
    story.append(t_zakat)
    story.append(Paragraph(
        "Consulter un scholar ou une plateforme comme Zakat.org pour les cas complexes "
        "(portefeuille mixte, actions étrangères, dividendes réinvestis).",
        body_grey))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # CHAPITRE 10 — Transmettre : héritage, donation, zakat
    # ══════════════════════════════════════════════════════════════════════════
    chapter_header("10",
        "Transmettre : héritage, donation, zakat",
        "Construire c'est bien. Que ça reste dans la famille, c'est mieux.",
        story)

    story.append(Paragraph(
        "La transmission de patrimoine touche trois domaines qui s'articulent mal en France : "
        "le droit successoral français, la loi islamique (mawarith), et la fiscalité des donations. "
        "Ce chapitre ne remplace pas un notaire, mais donne les bases pour poser les bonnes questions.",
        body))

    story.append(Paragraph("Succession — Les règles de base", section_head))
    story.append(Paragraph(
        "En France, le droit successoral est d'ordre public. La réserve héréditaire protège "
        "les enfants (50 % pour 1 enfant, 66 % pour 2, 75 % pour 3+). "
        "La quotité disponible est la seule fraction librement transmissible.",
        body))
    story.append(Paragraph(
        "La loi islamique (fara'id) prévoit des parts différentes selon le lien de parenté et le genre. "
        "Ces parts peuvent être compatibles avec le droit français si la quotité disponible "
        "est utilisée intelligemment — mais cela nécessite une planification anticipée.",
        body))

    story.append(Paragraph("Donation de son vivant — Les abattements FR", section_head))
    story.append(Paragraph(
        "La donation est le mécanisme le plus efficace fiscalement pour transmettre. "
        "Les abattements par donateur se renouvellent tous les 15 ans.",
        body))

    _td = ps("_td", fontName="Helvetica", fontSize=9, leading=13, textColor=DARK)
    _tdh = ps("_tdh", fontName="Helvetica-Bold", fontSize=9, leading=13, textColor=IVORY)
    don_data = [
        [Paragraph("Lien", _tdh), Paragraph("Abattement (2026)", _tdh), Paragraph("Exemple", _tdh)],
        [Paragraph("Parent → enfant", _td), Paragraph("100 000 €", _td), Paragraph("2 parents = 200 000 € nets à chaque enfant", _td)],
        [Paragraph("Grand-parent → petit-enfant", _td), Paragraph("31 865 €", _td), Paragraph("4 grands-parents = 127 460 € nets", _td)],
        [Paragraph("Oncle/tante → neveu/nièce", _td), Paragraph("7 967 €", _td), Paragraph("Limité", _td)],
        [Paragraph("Don familial (argent, donateur < 80 ans, bénéf. > 18 ans)", _td), Paragraph("31 865 € en plus", _td), Paragraph("Cumulable avec abattement principal", _td)],
    ]
    t_don = Table(don_data, colWidths=[4.5*cm, 3.5*cm, 7.5*cm], repeatRows=1)
    t_don.setStyle(TableStyle([
        ("BACKGROUND",  (0,0), (-1,0),   DARK),
        ("LINEBELOW",   (0,0), (-1,0),   2, GOLD),
        ("LEFTPADDING", (0,0), (-1,-1),  8),
        ("RIGHTPADDING",(0,0), (-1,-1),  8),
        ("TOPPADDING",  (0,0), (-1,-1),  7),
        ("BOTTOMPADDING",(0,0),(-1,-1),  7),
        ("VALIGN",      (0,0), (-1,-1),  "TOP"),
        ("ROWBACKGROUNDS",(0,1),(-1,-1), [IVORY, STONE]),
        ("LINEBELOW",   (0,1), (-1,-2),  0.3, LIGHT_GREY),
    ]))
    story.append(t_don)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Transmettre un portefeuille d'actions", section_head))
    story.append(Paragraph(
        "Les actions transmises par donation ou succession bénéficient d'une purge des plus-values "
        "latentes : le bénéficiaire prend le bien à sa valeur au jour du décès ou de la donation "
        "(pas au prix d'acquisition initial). C'est un avantage fiscal massif pour des positions "
        "longtemps détenues.",
        body))
    story.append(Paragraph(
        "Exemple : tu as acheté NVDA à 20 € il y a 5 ans, elle vaut aujourd'hui 120 €. "
        "Si tu la donnes à ton enfant, il l'obtient à 120 € — et ne paie aucune plus-value "
        "sur les 100 € de gain accumulé. Il ne paiera des impôts que sur les gains futurs "
        "au-delà de 120 €.",
        body))

    story.append(Paragraph("La SCI comme outil de transmission", section_head))
    story.append(Paragraph(
        "Loger un bien immobilier dans une SCI et donner des parts (plutôt que l'immeuble) "
        "offre plusieurs avantages :",
        body))

    sci_avantages = [
        "Les parts de SCI peuvent être transmises progressivement (15 000 €/an sans imposition dans certaines configurations)",
        "La valeur des parts peut être minorée par rapport à la valeur vénale du bien (décote pour absence de liquidité)",
        "La gestion du bien reste centralisée même après fragmentation des parts",
        "La SCI à l'IS permet d'amortir l'immeuble et de baisser la base imposable",
    ]
    for a in sci_avantages:
        story.append(Paragraph(f"- {a}", bullet))

    story.append(Paragraph("Cas pratique — famille avec 3 enfants, patrimoine 250 000 €", section_head))

    _tc2 = ps("_tc2", fontName="Helvetica", fontSize=9, leading=13, textColor=DARK)
    _tc2h = ps("_tc2h", fontName="Helvetica-Bold", fontSize=9, leading=13, textColor=IVORY)
    case_data = [
        [Paragraph("Actif", _tc2h), Paragraph("Valeur", _tc2h), Paragraph("Mécanisme recommandé", _tc2h)],
        [Paragraph("Résidence principale", _tc2), Paragraph("180 000 €", _tc2), Paragraph("Donation progressive aux 3 enfants (abattement 100K × 2 parents)", _tc2)],
        [Paragraph("Portefeuille actions halal", _tc2), Paragraph("50 000 €", _tc2), Paragraph("Donation en nature avec purge des PV — documenter la conformité AAOIFI", _tc2)],
        [Paragraph("Or physique", _tc2), Paragraph("15 000 €", _tc2), Paragraph("Donation directe (lingots) ou testament pour quotité disponible", _tc2)],
        [Paragraph("Liquidités", _tc2), Paragraph("5 000 €", _tc2), Paragraph("Don familial d'argent (jusqu'à 31 865 €, renouvelable 15 ans)", _tc2)],
    ]
    t_case = Table(case_data, colWidths=[3.5*cm, 2.5*cm, 9.5*cm], repeatRows=1)
    t_case.setStyle(TableStyle([
        ("BACKGROUND",  (0,0), (-1,0),   DARK),
        ("LINEBELOW",   (0,0), (-1,0),   2, GOLD),
        ("LEFTPADDING", (0,0), (-1,-1),  8),
        ("RIGHTPADDING",(0,0), (-1,-1),  8),
        ("TOPPADDING",  (0,0), (-1,-1),  7),
        ("BOTTOMPADDING",(0,0),(-1,-1),  7),
        ("VALIGN",      (0,0), (-1,-1),  "TOP"),
        ("ROWBACKGROUNDS",(0,1),(-1,-1), [IVORY, STONE]),
        ("LINEBELOW",   (0,1), (-1,-2),  0.3, LIGHT_GREY),
    ]))
    story.append(t_case)
    story.append(Paragraph(
        "Ce tableau est illustratif. Un notaire spécialisé en patrimoine est indispensable "
        "pour valider la structure selon ta situation familiale exacte.",
        body_grey))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # PERFORMANCES BACKTESTÉES — PAGE DÉDIÉE
    # ══════════════════════════════════════════════════════════════════════════
    story.append(Paragraph("MUSLIMFINANCE.NET", brand_label))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Performances backtestées", chapter_title))
    story.append(gold_rule())
    story.append(Paragraph(
        "Les chiffres suivants proviennent du backtest réalisé sur muslimfinance.net. "
        "Méthodologie : composition actuelle du portefeuille halal AAOIFI appliquée "
        "historiquement aux données de prix hebdomadaires. Rééchantillonnage hebdomadaire. "
        "Les performances passées ne garantissent pas les performances futures.",
        body_grey))
    story.append(Spacer(1, 14))

    _tp = ps("_tp", fontName="Helvetica", fontSize=9, leading=13, textColor=DARK)
    _tph = ps("_tph", fontName="Helvetica-Bold", fontSize=9, leading=13, textColor=IVORY)

    def perf_table(rows, col_widths):
        t = Table(rows, colWidths=col_widths, repeatRows=1)
        t.setStyle(TableStyle([
            ("BACKGROUND",  (0,0), (-1,0),   DARK),
            ("LINEBELOW",   (0,0), (-1,0),   2, GOLD),
            ("LEFTPADDING", (0,0), (-1,-1),  8),
            ("RIGHTPADDING",(0,0), (-1,-1),  8),
            ("TOPPADDING",  (0,0), (-1,-1),  7),
            ("BOTTOMPADDING",(0,0),(-1,-1),  7),
            ("VALIGN",      (0,0), (-1,-1),  "TOP"),
            ("ROWBACKGROUNDS",(0,1),(-1,-1), [IVORY, STONE]),
            ("LINEBELOW",   (0,1), (-1,-2),  0.3, LIGHT_GREY),
        ]))
        return t

    perf_data = [
        [Paragraph("Période", _tph), Paragraph("NASDAQ halal", _tph), Paragraph("NASDAQ 100 complet", _tph), Paragraph("Surperformance", _tph)],
        [Paragraph("1 an (mai 2025 → mai 2026)", _tp), Paragraph(f"+{BT_N['1y']['halal_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_N['1y']['index_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_N['1y']['outperformance_pct']:.1f} pts", _tp)],
        [Paragraph("3 ans", _tp), Paragraph(f"+{BT_N['3y']['halal_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_N['3y']['index_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_N['3y']['outperformance_pct']:.1f} pts", _tp)],
        [Paragraph("5 ans", _tp), Paragraph(f"+{BT_N['5y']['halal_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_N['5y']['index_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_N['5y']['outperformance_pct']:.1f} pts", _tp)],
    ]
    story.append(Paragraph("NASDAQ 100 halal vs indice complet", section_head))
    story.append(perf_table(perf_data, [5*cm, 3.2*cm, 4.5*cm, 3.3*cm]))
    story.append(Spacer(1, 18))

    perf_sp_data = [
        [Paragraph("Période", _tph), Paragraph("S&amp;P 500 halal", _tph), Paragraph("S&amp;P 500 complet", _tph), Paragraph("Surperformance", _tph)],
        [Paragraph("1 an (mai 2025 → mai 2026)", _tp), Paragraph(f"+{BT_S['1y']['halal_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_S['1y']['index_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_S['1y']['outperformance_pct']:.1f} pts", _tp)],
        [Paragraph("3 ans", _tp), Paragraph(f"+{BT_S['3y']['halal_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_S['3y']['index_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_S['3y']['outperformance_pct']:.1f} pts", _tp)],
        [Paragraph("5 ans", _tp), Paragraph(f"+{BT_S['5y']['halal_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_S['5y']['index_return_pct']:.1f} %", _tp), Paragraph(f"+{BT_S['5y']['outperformance_pct']:.1f} pts", _tp)],
    ]
    story.append(Paragraph("S&amp;P 500 halal vs indice complet", section_head))
    story.append(perf_table(perf_sp_data, [5*cm, 3.2*cm, 4.5*cm, 3.3*cm]))
    story.append(Spacer(1, 18))

    story.append(callout_box(
        f"Sur 5 ans, le portefeuille NASDAQ halal a rendu +{BT_N['5y']['halal_return_pct']:.0f} % "
        f"contre +{BT_N['5y']['index_return_pct']:.0f} % pour le NASDAQ 100 complet — "
        f"soit +{BT_N['5y']['outperformance_pct']:.0f} points de surperformance. "
        "Le filtre AAOIFI a concentré le portefeuille sur les secteurs les plus performants "
        "de la décennie (semi-conducteurs, tech hardware) en excluant les banques et les secteurs mous."
    ))
    story.append(Spacer(1, 18))
    story.append(Paragraph(
        "Interprétation importante : cette surperformance est en partie liée au boom des "
        "semi-conducteurs (2023-2026). Elle ne sera pas reproduite mécaniquement dans les "
        "prochaines années. Le filtre halal peut aussi sous-performer lors de cycles "
        "favorables aux banques ou à l'énergie conventionnelle. "
        "Construire sur le long terme, pas sur 1 ou 3 ans.",
        body_grey))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # DISCLAIMER LÉGAL
    # ══════════════════════════════════════════════════════════════════════════
    story.append(Paragraph("MUSLIMFINANCE.NET", brand_label))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Avertissement légal", chapter_title))
    story.append(gold_rule())

    disclaimers = [
        ("Nature du document",
         "Ce document est un guide d'éducation financière à usage personnel. "
         "Il ne constitue pas un conseil en investissement au sens de la directive MIF II. "
         "Il ne constitue pas une offre d'achat ou de vente de valeurs mobilières. "
         "Il ne constitue pas une consultation juridique, fiscale ou notariale."),
        ("Responsabilité",
         "L'équipe muslimfinance.net ne peut être tenue responsable des pertes financières "
         "résultant de décisions d'investissement prises sur la base de ce document. "
         "Tu restes seul responsable de tes décisions. Consulte un conseiller en investissement "
         "réglementé (CIF, AMF) et/ou un expert-comptable avant tout investissement significatif."),
        ("Performances passées",
         "Les performances backtestées présentées dans ce document utilisent la composition "
         "actuelle du portefeuille halal appliquée historiquement. Elles ne reflètent pas "
         "les performances qu'un investisseur aurait effectivement obtenues, car le screening "
         "évolue dans le temps. Les performances passées ne présagent pas des performances futures."),
        ("Conformité religieuse",
         "Les classifications AAOIFI présentées dans ce document sont fondées sur les données "
         "disponibles au moment de leur collecte (2026-05-11). La conformité d'une action "
         "peut évoluer selon les résultats financiers de l'entreprise. "
         "Vérifier systematiquement sur muslimfinance.net avant tout achat. "
         "Ce document ne constitue pas une fatwa."),
        ("Données fiscales",
         "Les informations fiscales (abattements, taux d'imposition) sont valables en France "
         "pour l'exercice 2026. Elles peuvent être modifiées par la loi de finances. "
         "Vérifier auprès d'un conseiller fiscal avant de prendre des décisions de donation ou succession."),
        ("Droits d'utilisation",
         "Ce document est vendu à usage personnel uniquement. "
         "Sa reproduction, redistribution ou revente totale ou partielle est interdite "
         "sans accord écrit de l'équipe muslimfinance.net."),
    ]

    for titre, texte in disclaimers:
        story.append(KeepTogether([
            Paragraph(f"<b>{titre}</b>", ps("disc_title",
                fontName="Helvetica-Bold", fontSize=9.5, leading=13,
                textColor=DARK, spaceAfter=3)),
            Paragraph(texte, disclaimer_s),
            Spacer(1, 4),
        ]))

    story.append(Spacer(1, 20))
    story.append(dark_rule())
    story.append(Paragraph(
        "Halal &amp; patrimoine — Le guide d'investissement pour le musulman qui veut construire  "
        "•  Edition 2026  •  muslimfinance.net",
        footer_s))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # BACK COVER
    # ══════════════════════════════════════════════════════════════════════════
    back_inner = [
        [Spacer(1, 60)],
        [Paragraph("muslimfinance.net", ps("bc_brand",
            fontName="Times-Bold", fontSize=24, leading=28,
            textColor=GOLD, spaceAfter=12))],
        [HRFlowable(width=W-48, thickness=1.5, color=GOLD, spaceAfter=20)],
        [Paragraph(
            "Screening AAOIFI en temps réel",
            ps("bc_feat", fontName="Helvetica", fontSize=11, leading=17,
               textColor=IVORY, spaceAfter=6))],
        [Paragraph(
            "Backtest portefeuille halal vs indices",
            ps("bc_feat2", fontName="Helvetica", fontSize=11, leading=17,
               textColor=IVORY, spaceAfter=6))],
        [Paragraph(
            "Simulateur et watchlist mis à jour chaque semaine",
            ps("bc_feat3", fontName="Helvetica", fontSize=11, leading=17,
               textColor=IVORY, spaceAfter=44))],
        [Spacer(1, 40)],
        [Paragraph(
            "© 2026 L'équipe muslimfinance.net  •  Usage personnel uniquement",
            ps("bc_footer", fontName="Helvetica", fontSize=8, leading=11,
               textColor=LIGHT_GREY, spaceAfter=0))],
    ]
    back_table = Table(back_inner, colWidths=[W])
    back_table.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1), DARK),
        ("LEFTPADDING",(0,0),(-1,-1),28),
        ("RIGHTPADDING",(0,0),(-1,-1),28),
        ("TOPPADDING",(0,0),(-1,-1),0),
        ("BOTTOMPADDING",(0,0),(-1,-1),0),
    ]))
    outer_back = Table([[back_table]], colWidths=[W])
    outer_back.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1), DARK),
        ("LEFTPADDING",(0,0),(-1,-1),0),
        ("RIGHTPADDING",(0,0),(-1,-1),0),
        ("TOPPADDING",(0,0),(-1,-1),0),
        ("BOTTOMPADDING",(0,0),(-1,-1),0),
        ("BOX",(0,0),(-1,-1),2.5, GOLD),
    ]))
    story.append(Spacer(1, 0.5*cm))
    story.append(outer_back)

    # ── Build ─────────────────────────────────────────────────────────────────
    doc.build(story)
    size_kb = OUT.stat().st_size // 1024
    print(f"PDF genere : {OUT}  ({size_kb} KB)")
    return OUT


if __name__ == "__main__":
    out = build()
    # Copy to web/public/products/
    dest = pathlib.Path.home() / "work/halal-nasdaq/web/public/products/halal-patrimoine.pdf"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(out.read_bytes())
    print(f"Copie web    : {dest}")
