# Muslimfinance — Funnel lead magnet → vente ebook 7 jours

**Date setup** : 2026-05-17 (nuit). Tout est prêt en PAUSED. Tu actives demain en 5 min.

---

## TL;DR — 4 actions le matin pour activer (10 min total)

### Action 1 — Resend (3 min)
Crée compte sur https://resend.com → Dashboard > API Keys > Create (nom : `muslimfinance-leadmagnet`).
Décommente la ligne dans `~/work/halal-nasdaq/.env.muslimfinance` et colle ta clé `re_xxx`.
Puis redéploie le Worker :
```bash
cd ~/work/halal-nasdaq/.creas/ebook && python3 deploy_worker.py
```

### Action 2 — Débloque X @muslimfinance_ (2 min)
```bash
cd ~/work/halal-nasdaq/scraper && python3 browser_login.py
```
Une fenêtre Chrome s'ouvre → tu te logges → tu fermes. Profile persistant sauvé.

### Action 3 — Active la pub Meta V2 (1 commande)
```bash
cd ~/work/halal-nasdaq/.creas/leadmagnet && python3 launch_meta_v2.py --activate
```
Pub démarre 5 min après. Budget 30€/5j vers `/checklist` (lead magnet gratuit).

### Action 4 — Cron daily X posting sur Mac (3 min, optionnel)
Pour automatiser la publication d'1 tweet/jour avec validation Telegram :
```bash
crontab -e
# Ajoute la ligne :
0 10 * * * cd ~/work/halal-nasdaq/scraper && /opt/homebrew/bin/python3 agent_post_x.py >> ~/work/halal-nasdaq/.tweet_cron.log 2>&1
```
Ou test manuel d'abord : `python3 agent_post_x.py` (tu reçois le tweet sur Telegram, tu réponds "ok" ou "skip" ou "edit: nouveau texte").

---

## État live (vérifié 17/05 01:30)

| Asset | Statut | URL / ID |
|-------|--------|----------|
| Landing checklist (lead magnet) | ✅ live | https://muslimfinance.net/checklist |
| Landing ebook (preorder, V1) | ✅ live (déjà conv 0) | https://muslimfinance.net/ebook |
| PDF lead magnet | ✅ live | https://muslimfinance.net/lead-magnets/checklist-validus.pdf |
| PDF ebook payant (26 pages) | ✅ live | https://muslimfinance.net/products/halal-patrimoine.pdf |
| Worker /api/lead | ✅ déployé v2.0 | https://muslimfinance-subscribe.backwatcherdev.workers.dev |
| Cron trigger daily 09h UTC | ✅ activé | envoie séquence J+2/4/7/10 auto |
| Stripe Payment Link (test mode) | ✅ créé | https://buy.stripe.com/test_5kQ00i77H8Ok7DJ5C94wM08 |
| Pub Meta V2 (campagne 120247496285760589) | ⚠️ PAUSED (à activer) | https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=346605029347825&selected_campaign_ids=120247496285760589 |
| Pub Meta V1 (ebook, déjà testée 24€ / 0 conv) | ✅ PAUSED définitif | reste pour audience custom future |
| Queue 10 tweets @muslimfinance_ | ✅ prête | `.creas/leadmagnet/tweets_drafts.md` |
| Agent posting X + validation Telegram | ✅ code prêt | `scraper/agent_post_x.py` |
| 4 emails séquence (J+2/4/7/10) | ✅ intégrés au worker | rédigés en FR sobre |

---

## Le funnel complet

```
┌─────────────────────────────────────────────────────────────────┐
│                    PUB META V2 (30€ / 5j)                       │
│                                                                 │
│   Cible : FR 25-50, intérêts Investissement / Bourse            │
│   3 statiques : Checklist (FR clear), Static B, Static C        │
│   Hook : "Détecte une arnaque type Validus en 30 sec"           │
└────────────────────────────┬────────────────────────────────────┘
                             │ clic
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│            LANDING /checklist  (lead magnet gratuit)            │
│                                                                 │
│   Visiteur entre email → Worker /api/lead :                     │
│     - KV write (lead:email@x.com)                               │
│     - Resend envoie J+0 (welcome + lien PDF)                    │
│     - Pixel Meta fire event Lead                                │
│   Browser ouvre PDF direct (fallback si email filtré)           │
└────────────────────────────┬────────────────────────────────────┘
                             │ inscrit
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│         SÉQUENCE EMAIL AUTO (worker cron daily 09h UTC)         │
│                                                                 │
│   J+0  : Welcome + lien PDF download                            │
│   J+2  : Histoire 70K€ perdus (3 proches)                       │
│   J+4  : Méthode AAOIFI (NVDA vs JPM)                           │
│   J+7  : Comparatif courtiers honnête (sans affiliation)        │
│   J+10 : Vente ebook 14€ → Stripe Payment Link                  │
│                                                                 │
│   Tracking : sequence_sent dans KV (idempotent, retry-safe)     │
└────────────────────────────┬────────────────────────────────────┘
                             │ clic J+10
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              CHECKOUT STRIPE 14€ (test mode → swap live)        │
│                                                                 │
│   Payment Link : buy.stripe.com/test_5kQ00i77H8Ok7DJ5C94wM08    │
│   Sur achat : Stripe envoie reçu email + dashboard notif        │
│   ⚠️  Pour V1 : tu envoies le PDF /products/halal-patrimoine.pdf│
│       MANUELLEMENT au 1er acheteur (5 min). On automate après.  │
│                                                                 │
│   PASSER EN LIVE : crée la même Payment Link avec sk_live_xxx   │
│   et mets l'URL live dans .env.muslimfinance puis redéploie.    │
└─────────────────────────────────────────────────────────────────┘
                             │ +
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│          CANAL ORGANIQUE PARALLÈLE — X @muslimfinance_          │
│                                                                 │
│   1 tweet/jour via agent_post_x.py (cron 10h Mac)               │
│   Validation Telegram → tu réponds ok/skip/edit                 │
│   Hooks : perf NASDAQ halal +89%, méthode, anti-arnaque         │
│   Effet attendu : audience IG/X +200-500 followers en 7j        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Monitoring (3 URLs à bookmarker)

### Voir les leads captés
```
https://muslimfinance-subscribe.backwatcherdev.workers.dev/api/admin/leads?token=iJdFqzYxJQtPMUdhE1pcUo4t2boFjk4k_AN5xCH5Bao
```
Format JSON. Pour CSV : ajoute `&format=csv -o leads.csv`.

### Voir la perf pub Meta
```
https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=346605029347825&selected_campaign_ids=120247496285760589
```

### Voir les ventes Stripe
```
https://dashboard.stripe.com/test/payments  (mode test)
https://dashboard.stripe.com/payments       (mode live quand basculé)
```

---

## Force trigger séquence email manuel (test)

```bash
curl -X POST "https://muslimfinance-subscribe.backwatcherdev.workers.dev/api/admin/run-sequence?token=iJdFqzYxJQtPMUdhE1pcUo4t2boFjk4k_AN5xCH5Bao"
```
Retourne le compte d'emails envoyés. Utile pour vérifier que la séquence marche après avoir setup Resend.

---

## Estimations 7 jours (mesurables)

| Étape | Cible | Mesure |
|-------|-------|--------|
| Pub Meta → clic | 200-400 clics | Ads Manager / link_click |
| Clic → LPV /checklist | 70-80 % | landing_page_view |
| LPV → submit email | 10-20 % (cold finance audience) | KV count leads |
| Email J+10 ouvert | 30-50 % | Resend dashboard |
| Email J+10 → clic Stripe | 5-15 % | Stripe checkout sessions |
| Stripe → vente 14€ | 30-50 % | Stripe payments |

**Math optimiste** : 300 clics × 75 % × 15 % × 40 % × 10 % × 40 % = **0,5 vente** sur cycle complet.
**Math réaliste** : pour 1 vente J+7-J+10, il faut **viser 30-50 leads minimum** (donc plus de budget pub OU plus de conversion landing).

**Si à H+24 sur pub V2 on a < 10 leads** : la landing /checklist ne convertit pas non plus. Tu reviens, on pivote sur l'angle ou l'audience.

**Si à H+24 on a 20+ leads** : on est dans le couloir. Continue à observer.

---

## Files importantes

| Path | Quoi |
|------|------|
| `~/work/halal-nasdaq/.creas/ebook/worker_v2_src.js` | Code Worker (subscribe + lead + cron + emails) |
| `~/work/halal-nasdaq/.creas/ebook/deploy_worker.py` | Script déploiement Worker via Cloudflare API |
| `~/work/halal-nasdaq/.creas/leadmagnet/launch_meta_v2.py` | Script lancement Meta V2 (--activate pour live) |
| `~/work/halal-nasdaq/.creas/leadmagnet/email_sequence.md` | Texte source des 4 emails (rédigé) |
| `~/work/halal-nasdaq/.creas/leadmagnet/tweets_drafts.md` | 10 tweets perf prêts |
| `~/work/halal-nasdaq/.creas/leadmagnet/tweets_queue.json` | Queue persistante agent X |
| `~/work/halal-nasdaq/scraper/agent_post_x.py` | Agent X + validation Telegram |
| `~/work/halal-nasdaq/web/src/app/checklist/` | Landing lead magnet |
| `~/work/halal-nasdaq/web/public/lead-magnets/checklist-validus.pdf` | PDF lead magnet 4 pages |
| `~/work/halal-nasdaq/web/public/products/halal-patrimoine.pdf` | PDF ebook payant 26 pages |
| `~/work/halal-nasdaq/.env.muslimfinance` | Secrets (Resend key à remplir, Stripe URL) |

---

## Tokens / IDs en clair

- **Admin token Worker** : `iJdFqzYxJQtPMUdhE1pcUo4t2boFjk4k_AN5xCH5Bao`
- **Cloudflare account ID** : `80d4d2e1b1db359b5d5cd3e8f92f2a71`
- **CF KV namespace ID** (muslimfinance-subscribers) : `6dc023e7db1540cf81bd2ad201413928`
- **CF API tokens** : stockés dans la mémoire Claude (`memory/project_muslimfinance_ebook.md`) — pas commit pour cause de secret-scanning GitHub. Si besoin de redéployer le Worker, le token est hardcodé dans `~/work/halal-nasdaq/.creas/ebook/deploy_worker.py` (à rotater régulièrement).
- **Pixel Meta** : `1986901548880799` (px_ebook_halal — capture sur /ebook et /checklist)
- **Meta Page Muslim Finance** : `1039152282625969`
- **Meta ad account** : `act_346605029347825`
- **Stripe Product ID** : `prod_UX0HFQsVGevsGb`
- **Stripe Price ID** (14€) : `price_1TXwH9BsN4944XVac3yU1zOl`
- **Stripe Payment Link (test)** : `https://buy.stripe.com/test_5kQ00i77H8Ok7DJ5C94wM08`
- **Bot Telegram** : token dans `~/.claude/telegram-bot/config.json`, chat_id `7977279807`

---

## Ce qui n'est PAS automatisé (V2 — après 1ère vente)

1. **Livraison auto PDF après achat Stripe** : besoin webhook Stripe → worker → email Resend avec lien PDF. Pour V1, livraison manuelle (Stripe te notifie, tu envoies l'email avec le lien PDF, 5 min).
2. **Désabonnement email auto** : pour l'instant, "réponds stop" est traité manuellement. À l'échelle, faut un endpoint unsubscribe + RGPD propre.
3. **A/B test landing /checklist** vs /ebook/v2 : possible quand on aura plus de volume.
4. **Retargeting Meta sur audience custom 5K visiteurs mai** : créer dans Audience Manager, puis 2e ad set qui retarget. À faire J+3 si la pub V2 marche.
5. **Migration Stripe test → live** : 1 ligne à changer dans `.env.muslimfinance` une fois la 1ère vente test validée.
6. **Setup mail.muslimfinance.net comme sender Resend** : domain verify chez le registrar Google Domains. Pour l'instant on envoie via `onboarding@resend.dev` (free tier 3K mails/mois).

---

## Si quelque chose foire

- **Form /checklist marche pas** : `curl https://muslimfinance-subscribe.backwatcherdev.workers.dev/health` → si pas 200, redéploie worker.
- **Pas d'email reçu après inscription** : check que `RESEND_API_KEY` est dans `.env.muslimfinance` ET que `python3 deploy_worker.py` a été relancé après.
- **Pub Meta rejetée** : check Ads Manager → effective_status. Si `WITH_ISSUES`, lis le `issues_info`. Souvent : pixel pas partagé (déjà fait) ou créa flagué (régen sans le mot "garanti").
- **Pause toute la pub Meta d'urgence** :
  ```bash
  TOKEN=$(grep META_USER_TOKEN ~/.config/quran-vinyl/stripe-test.env | cut -d= -f2- | tr -d "'\"")
  curl -X POST "https://graph.facebook.com/v22.0/120247496285760589" -d "status=PAUSED" -d "access_token=$TOKEN"
  ```
- **Tweet X échoue** : check `~/work/halal-nasdaq/.tweet_log.json` pour l'erreur. Souvent : token expiré → relance browser_login.py.

---

## Le timeline du test 7 jours

| Jour | Action attendue | Métrique |
|------|-----------------|----------|
| J+0 (matin) | Toi : 4 actions (Resend, X login, activate pub Meta, cron X) | Setup complet |
| J+0 (soir) | Premier tweet validé via Telegram | 1er tweet live |
| J+1 | Pub Meta tourne, 1er leads arrivent | 5-15 leads visible KV |
| J+2 | Tweet 2 + email J+2 part auto pour leads J+0 | Tu peux lire les emails Resend dashboard |
| J+3 | Bilan mi-parcours pub Meta | Si < 10 leads cumulés : alerte |
| J+4 | Email J+4 part. Tweet 4. | 25-50 leads cumulés cible |
| J+5 | Email J+5 part pour ceux de J+0 (J+5 = J+0 + 5j). Tu peux faire le bilan partiel. | |
| J+7 | Email J+7 (comparatif courtiers) part | |
| J+10 | Email J+10 (vente ebook 14€) part | 1ère vente espérée |

---

C'est tout. Bonne nuit, et bon test demain.

— L'équipe Claude (cf session 2026-05-17)
