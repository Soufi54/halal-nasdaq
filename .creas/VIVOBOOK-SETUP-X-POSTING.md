# Setup posting X auto sur VivoBook

**But** : 1 tweet par jour à 10:00 pour @muslimfinance_ avec validation Telegram bot.

**Pourquoi VivoBook** : Mac automations killed (cf memory `infra_vivobook.md`). Tout daily run = VivoBook always-on.

---

## Prérequis VivoBook (déjà présents)

| Composant | Statut |
|-----------|--------|
| Python 3.11+ + `httpx`, `requests` | ✅ déjà installé pour les autres scripts halal-nasdaq |
| Bot Telegram | ✅ tourne déjà sur VivoBook (chat_id Chaker `7977279807`) |
| Repo halal-nasdaq cloné dans `%USERPROFILE%\repos\halal-nasdaq` | ✅ déjà setup pour `update_weekly.py` cron |
| `.env` avec `TWITTER_CONSUMER_KEY/SECRET + ACCESS_TOKEN/SECRET` | ✅ déjà sur VivoBook (utilisés par autres scripts) |
| Config bot Telegram `~/.claude/telegram-bot/config.json` ou équivalent Windows | ⚠️ à copier si pas déjà là (token + chat_id) |

---

## Setup Task Scheduler Windows (3 min, 1 fois)

### Méthode rapide — ligne de commande (PowerShell admin)

```powershell
git -C "$env:USERPROFILE\repos\halal-nasdaq" pull
schtasks /Create /TN "MuslimFinanceTweet" /TR "$env:USERPROFILE\repos\halal-nasdaq\scraper\agent_post_x.bat" /SC DAILY /ST 10:00 /F
```

### Méthode UI

1. Ouvrir **Planificateur de tâches** (Task Scheduler)
2. Créer une tâche de base : nom = `MuslimFinanceTweet`
3. Déclencheur : Quotidien, 10:00
4. Action : Démarrer un programme → `%USERPROFILE%\repos\halal-nasdaq\scraper\agent_post_x.bat`
5. Cocher "Exécuter même si l'utilisateur n'est pas connecté"
6. Tester avec clic droit > **Exécuter**

---

## Vérification du config Telegram

Le script `agent_post_x.py` lit le token Telegram depuis :
```
~/.claude/telegram-bot/config.json  (Mac)
```

Sur VivoBook Windows, l'équivalent serait :
```
%USERPROFILE%\.claude\telegram-bot\config.json
```

**Format attendu** :
```json
{
  "telegram_token": "8713300497:AAEQ...",
  "allowed_user_ids": [7977279807]
}
```

Si ce fichier n'existe pas encore sur VivoBook, copie-le depuis Mac ou recrée-le avec le même token (utilisé par les autres scripts halal-nasdaq qui ping Telegram).

**Test rapide manuel** sur VivoBook (terminal) :
```cmd
cd %USERPROFILE%\repos\halal-nasdaq\scraper
python agent_post_x.py --dry-run
```

Ça doit afficher le prochain tweet sans rien poster ni envoyer Telegram.

---

## Workflow opérationnel

1. **10:00 chaque jour** : Task Scheduler déclenche `agent_post_x.bat`
2. Script lit `tweets_queue.json`, prend le prochain `pending`
3. Envoie le tweet sur Telegram au bot Chaker pour validation
4. Attend la réponse (jusqu'à 1h) :
   - `ok` → publie via API X
   - `skip` → marque skipped, passe au suivant demain
   - `edit: nouveau texte...` → publie avec ce texte
   - timeout 1h → reste pending, retente demain
5. Log dans `~/repos/halal-nasdaq/.tweet_log.json`

---

## Plus important — l'API X marche

**Pas besoin de browser_login** : l'API X v2 répond OAuth pour `@muslimfinance_`.
Rate limit testé 2026-05-17 12h : **73 requêtes/15min restantes** (largement assez pour 1 tweet/jour).

→ Le script poste directement via `tweet.py` (HTTP POST sur `https://api.x.com/2/tweets` avec OAuth1).
Aucune fenêtre Chrome ouverte. 100 % autonome.

---

## Logs et monitoring

| Fichier | Contient |
|---------|----------|
| `~/repos/halal-nasdaq/.tweet_cron.log` | stdout/stderr de chaque exécution Task Scheduler |
| `~/repos/halal-nasdaq/.tweet_log.json` | historique JSON détaillé : posted / skipped / failed |
| `~/repos/halal-nasdaq/.creas/leadmagnet/tweets_queue.json` | état queue (10 tweets, leur statut) |

Vérifier après la 1ère exécution :
```cmd
type %USERPROFILE%\repos\halal-nasdaq\.tweet_cron.log
```

---

## Roll-out

1. Sur **VivoBook** : `git pull` dans `~\repos\halal-nasdaq` → récupère `agent_post_x.py` + `agent_post_x.bat` + `tweets_queue.json`
2. Vérifier que `.env` racine du repo a les 4 vars `TWITTER_CONSUMER_KEY/SECRET/ACCESS_TOKEN/ACCESS_TOKEN_SECRET`
3. Vérifier ou créer `%USERPROFILE%\.claude\telegram-bot\config.json`
4. Test manuel : `python scraper\agent_post_x.py --dry-run`
5. Setup Task Scheduler (commande PowerShell ci-dessus)
6. Test trigger manuel via Planificateur > clic droit > Exécuter
7. Tu reçois le tweet #1 sur Telegram → réponds `ok` → publication live
