#!/bin/bash
# Daily refresh of halal statuses from Zoya (Playwright, JS-rendered).
# Runs via claude-automation/daily/run-daily.sh on VivoBook.
#
# Refreshes entries older than 7 days automatically. Respects manual_overrides.json.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DATA_DIR="$REPO_DIR/data"

# Pick venv (Mac vs Win)
if [ -x "$HOME/work/scrapping/.venv/bin/python" ]; then
    PYTHON="$HOME/work/scrapping/.venv/bin/python"
elif [ -x "$HOME/repos/scrapping/.venv/Scripts/python.exe" ]; then
    PYTHON="$HOME/repos/scrapping/.venv/Scripts/python.exe"
elif [ -x "$SCRIPT_DIR/.venv/bin/python" ]; then
    PYTHON="$SCRIPT_DIR/.venv/bin/python"
else
    PYTHON="python3"
fi

echo "[$(date)] Halal refresh starting. python=$PYTHON"

cd "$SCRIPT_DIR"

# Refresh NASDAQ 100 (fast, ~5 min)
"$PYTHON" scrape_halal_playwright.py \
    "$DATA_DIR/nasdaq100_weights.json" \
    "$DATA_DIR/halal_status.json" || echo "  [WARN] nasdaq100 refresh failed"

# Refresh S&P 500 (slower, ~25 min)
"$PYTHON" scrape_halal_playwright.py \
    "$DATA_DIR/sp500_weights.json" \
    "$DATA_DIR/sp500_halal_status.json" || echo "  [WARN] sp500 refresh failed"

# Rebuild index JSONs used by carousel/reel generators
"$PYTHON" build_index.py || echo "  [WARN] build_index failed"
"$PYTHON" build_sp500_index.py || echo "  [WARN] build_sp500_index failed"

echo "[$(date)] Halal refresh done."
