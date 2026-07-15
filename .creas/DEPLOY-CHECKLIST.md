# Deploy Checklist — Ebook v2 + Funnel complet

Date : 2026-07-15
Contexte : landing v2 + form + delivery ebook + tracking pret. Prerequis avant activation SEA/SMA.

Chaque etape doit etre validee avant unpause des campagnes.

---

## 1. Stripe — passer en LIVE

- [ ] Stripe Dashboard > Products > **creer produit** "Halal & patrimoine v2" (14 EUR one-shot)
- [ ] Copier le **Price ID** (`price_...`) live
- [ ] Aller dans Developers > **API keys** > copier `sk_live_...` (jamais commit !)
- [ ] Developers > **Webhooks** > Add endpoint
    - URL : `https://muslimfinance.net/api/stripe/webhook`
    - Events : `checkout.session.completed`
    - Copier `whsec_...` (Signing secret)

## 2. Cloudflare Pages — variables d'environnement

Dashboard Cloudflare > Pages > halal-nasdaq > Settings > **Environment variables** > **Production** :

| Variable | Valeur | Encrypt ? |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_...` (production) | OUI |
| `STRIPE_PRICE_ID` | `price_...` (live du produit v2) | Non |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (endpoint /api/stripe/webhook) | OUI |
| `META_PIXEL_ID` | `1986901548880799` | Non |
| `META_CAPI_ACCESS_TOKEN` | `EAAxxx...` (a generer voir plus bas) | OUI |
| `META_TEST_EVENT_CODE` | vide ou code test | Non |
| `RESEND_API_KEY` | `re_xxx...` | OUI |
| `RESEND_FROM_EMAIL` | `guide@muslimfinance.net` | Non |
| `SITE_URL` | `https://muslimfinance.net` | Non |
| `EBOOK_URL` | `https://muslimfinance.net/products/halal-patrimoine-v2.pdf` | Non |

## 3. Cloudflare KV — creer namespace PURCHASES_KV

- [ ] Dashboard > Workers & Pages > **KV** > Create namespace `PURCHASES_KV`
- [ ] Copier l'ID de namespace
- [ ] Retour dans Pages > halal-nasdaq > Settings > **Functions** > **KV namespace bindings** :
    - Add binding : `SUBSCRIBERS_KV` -> namespace existant `6dc023e7db1540cf81bd2ad201413928`
    - Add binding : `PURCHASES_KV` -> nouvelle namespace
- [ ] Save + trigger un redeploy

## 4. Meta Conversion API — generer access token

- [ ] Business Manager > Data Sources > Pixel `1986901548833912`
- [ ] Settings > Set up manually > **Conversions API** > Generate access token
- [ ] Copier + coller dans Cloudflare env vars `META_CAPI_ACCESS_TOKEN`
- [ ] Verifier domain verification `muslimfinance.net` (obligatoire iOS 14+)
- [ ] Aggregated Event Measurement : configurer 8 events avec Purchase en priorite 1

## 5. Resend — configuration email

- [ ] Compte Resend actif (backwatcherdev@gmail.com d'apres le repo)
- [ ] **Domain verification** `muslimfinance.net` :
    - Ajouter les DNS records (SPF, DKIM, DMARC) chez Google Domains
    - Attendre propagation (~15 min)
    - Valider dans Resend Dashboard
- [ ] API key : verifier qu'elle est active
- [ ] Test envoi : depuis Resend Dashboard, envoyer un test email vers ton propre email

## 6. Ebook v2 — verification livrable

- [ ] Fichier PDF accessible : `https://muslimfinance.net/products/halal-patrimoine-v2.pdf`
- [ ] Verifier taille + nombre de pages (68 KB, ~34 pages)
- [ ] Verifier contenu : les 11 chapitres + backcover
- [ ] Verifier le disclaimer legal p. dernière

## 7. Test end-to-end (mode TEST Stripe)

Avant de passer en live, faire un test complet en mode test :

- [ ] Stripe en mode TEST, `STRIPE_SECRET_KEY=sk_test_...`
- [ ] Ouvrir `https://muslimfinance.net/ebook/v2` en incognito
- [ ] Verifier Meta Pixel Helper : `PageView` fire
- [ ] Cliquer "Acheter maintenant"
- [ ] Verifier `InitiateCheckout` fire (Meta Pixel Helper)
- [ ] Verifier redirection Stripe Checkout
- [ ] Payer avec carte test `4242 4242 4242 4242`, CVC 123, date > aujourd'hui
- [ ] Verifier redirection vers `/ebook/success`
- [ ] Verifier reception de l'email dans les 2 min
- [ ] Verifier lien dans email fonctionne (telechargement PDF)
- [ ] Verifier dans Meta Events Manager que `Purchase` event apparait (cote pixel client + cote CAPI server, dedup via event_id)
- [ ] Verifier dans Cloudflare KV que la purchase est saved (`PURCHASES_KV` > browse keys)

## 8. Bascule TEST -> LIVE

- [ ] Verifier que le test end-to-end est 100 % OK
- [ ] Dans Cloudflare env vars, swap `STRIPE_SECRET_KEY` de `sk_test_...` a `sk_live_...`
- [ ] Swap `STRIPE_PRICE_ID` de test a live
- [ ] Swap `STRIPE_WEBHOOK_SECRET` de test a live
- [ ] Trigger redeploy Cloudflare Pages
- [ ] Refaire un test end-to-end avec ta CB perso (Chaker) — depenser 14 EUR sur ton propre ebook pour valider
- [ ] Rembourser ce test via Stripe Dashboard si besoin

## 9. Landing en prod — bascule /ebook v1 vs v2

Actuellement `/ebook/v2` est en `robots: index: false`. Deux strategies possibles :

**Option A** — Basculer completement sur v2
- [ ] Remplacer contenu de `/ebook/page.tsx` par le contenu de `/ebook/v2/page.tsx`
- [ ] Supprimer `robots: index: false` de la nouvelle v2
- [ ] Redirect `/ebook/v2` -> `/ebook` (301) pour URLs anciennes
- [ ] Update sitemap et robots.txt

**Option B** — A/B test v1 vs v2 (recommande si trafic > 500 visitors/j)
- [ ] Garder v1 et v2 en parallele
- [ ] Router 50 % du trafic vers /ebook/v2 via cookie ou Cloudflare Worker A/B
- [ ] Mesurer conversion rate sur 500-1000 visitors chaque
- [ ] Choisir le gagnant

## 10. Campagnes marketing — activation

Une fois 1-9 valides :

- [ ] SEA Google Ads : voir [[Campagne SEA v1 - Plan et Copy]] + guide setup
    - Importer CSV via Google Ads Editor
    - Verifier tracking GA4 + conversions
    - Unpause manuel
- [ ] SMA Meta Ads : voir [[Campagne SMA v1 - Guide Meta Ads Manager]]
    - Uploader creatives (14 fichiers dans .creas/sma_v1/visuels/)
    - Verifier tracking Pixel + CAPI dedup
    - Unpause manuel

---

## Budget test final

- SEA : 300 EUR / 30 jours
- SMA : 500 EUR / 14 jours
- **Total : 800 EUR** pour valider le funnel v2

Objectif ROAS : > 1x (57 ventes ebook a 14 EUR = 798 EUR) pour break-even. Realiste sur marche vierge SEA + SMA.

---

Retour au [[INDEX - MuslimFinance]]
