@echo off
REM Lance agent_post_x.py sur VivoBook (1 tweet/jour pour @muslimfinance_)
REM Daily via Task Scheduler Windows, déclenché à 10:00 heure locale.
REM Logs : %USERPROFILE%\repos\halal-nasdaq\.tweet_cron.log
REM
REM Setup Task Scheduler (1 fois) :
REM   schtasks /Create /TN "MuslimFinanceTweet" /TR "%USERPROFILE%\repos\halal-nasdaq\scraper\agent_post_x.bat" /SC DAILY /ST 10:00 /F

cd /D %USERPROFILE%\repos\halal-nasdaq\scraper

REM Activer le venv si présent, sinon Python système
if exist .venv\Scripts\python.exe (
    .venv\Scripts\python.exe agent_post_x.py >> "%USERPROFILE%\repos\halal-nasdaq\.tweet_cron.log" 2>&1
) else (
    python agent_post_x.py >> "%USERPROFILE%\repos\halal-nasdaq\.tweet_cron.log" 2>&1
)
