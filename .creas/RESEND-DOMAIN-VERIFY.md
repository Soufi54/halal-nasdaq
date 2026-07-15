# Verify domain mail.muslimfinance.net dans Resend (5 min DNS)

**Status** : domain ajouté dans Resend le 2026-05-17 (ID `04584d37-c41d-41b3-8a61-6dae582e7bb2`), records DNS générés, attente de propagation.

**Pourquoi le faire** : meilleur deliverability (DKIM + SPF), sender pro `guide@mail.muslimfinance.net` au lieu de `guide@backwatcher.app`, image de marque cohérente. Cela passe l'authentification email (DMARC) et évite spam folder.

## Action — ajouter 3 records DNS chez Google Domains (~5 min)

Va sur https://domains.google.com (ou Squarespace Domains depuis 2024) → muslimfinance.net → DNS → Records.

Ajoute exactement ces 3 records :

### Record 1 — DKIM (TXT)
| Champ | Valeur |
|-------|--------|
| Type | TXT |
| Host | `resend._domainkey.mail` |
| TTL | Auto (300s) |
| Data | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsxKMgt6KhTuqf25t1UlsMtzNuS9lZn/xHd5CwWRA6EA1NGYh3hKbh1enxNTomEpIyjkj0UuLd1kG1mAawJbkMw8uwZBw6iylxPpSN1kRpEZwstFWhFzZH9BiaHtDbX5BXoq5Mnyez+tPSn2ri8mJRxv6vlhL+nsboiw5XChApfwIDAQAB` |

### Record 2 — MX (return path bounces)
| Champ | Valeur |
|-------|--------|
| Type | MX |
| Host | `send.mail` |
| Priority | 10 |
| TTL | Auto |
| Data | `feedback-smtp.eu-west-1.amazonses.com` |

### Record 3 — SPF (TXT)
| Champ | Valeur |
|-------|--------|
| Type | TXT |
| Host | `send.mail` |
| TTL | Auto |
| Data | `v=spf1 include:amazonses.com ~all` |

## Une fois ajouté

Retourne sur https://resend.com/domains → clique "Verify DNS records" sur `mail.muslimfinance.net`. Propagation Google Domains = 5-30 min en général, max 24h.

Puis update `~/work/halal-nasdaq/.env.muslimfinance` :
```
RESEND_FROM_EMAIL=guide@mail.muslimfinance.net
RESEND_FROM_NAME=L'équipe muslimfinance.net
```

Et redéploie :
```bash
cd ~/work/halal-nasdaq/.creas/ebook && python3 deploy_worker.py
```

## En attendant la verify

Les emails partent depuis `guide@backwatcher.app` (domain déjà vérifié dans le même compte Resend). Fonctionne bien (testé livré chaker.memmadi54@gmail.com). Juste moins "branded muslimfinance".
