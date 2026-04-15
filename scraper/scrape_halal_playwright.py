#!/usr/bin/env python3
"""Scrape halal status from Zoya.finance using JS rendering (Playwright).

Replaces scrape_halal_batch.py which used static HTML (broken since Zoya
became a SPA with template-based HTML containing both halal and haram text).

Usage:
    python scrape_halal_playwright.py <input_weights.json> <output_halal_status.json>
    python scrape_halal_playwright.py data/nasdaq100_weights.json data/halal_status.json
    python scrape_halal_playwright.py --ticker APP    # single-ticker probe

Merges with existing output: only refreshes entries > REFRESH_MAX_AGE_DAYS old,
or tickers missing from the output. Use --force to refresh all.
"""

import asyncio
import json
import re
import sys
import argparse
from datetime import datetime, timezone
from pathlib import Path

from playwright.async_api import async_playwright

BASE_URL = "https://zoya.finance/stocks"
DELAY_SEC = 1.5
REFRESH_MAX_AGE_DAYS = 7
NAV_TIMEOUT_MS = 30000
WAIT_AFTER_LOAD_MS = 1500


async def get_status(page, ticker: str) -> dict:
    url = f"{BASE_URL}/{ticker.lower()}"
    try:
        resp = await page.goto(url, wait_until="domcontentloaded", timeout=NAV_TIMEOUT_MS)
        if resp and resp.status == 404:
            return {"ticker": ticker, "status": "unknown", "source": "zoya", "detail": "404"}
        await page.wait_for_timeout(WAIT_AFTER_LOAD_MS)
        body = (await page.inner_text("body")).lower()
    except Exception as e:
        return {"ticker": ticker, "status": "error", "source": "zoya", "detail": str(e)[:120]}

    tl = re.escape(ticker.lower())
    # Zoya phrasing: "<ticker> stock is shariah-compliant" / "questionable" / "not shariah-compliant"
    m = re.search(rf"{tl}\s+stock\s+is\s+(not shariah.?compliant|shariah.?compliant|questionable)", body)
    if not m:
        status = "unknown"
    else:
        verdict = m.group(1)
        if verdict.startswith("not"):
            status = "not_halal"
        elif verdict == "questionable":
            status = "doubtful"
        else:
            status = "halal"

    interest_pct = None
    m = re.search(r"interest income[^%]*?(\d+(?:\.\d+)?)\s*%", body)
    if m:
        interest_pct = float(m.group(1))

    return {
        "ticker": ticker,
        "status": status,
        "interest_pct": interest_pct,
        "source": "zoya",
        "scraped_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }


def apply_override(entry: dict, overrides: dict) -> dict:
    ticker = entry.get("ticker")
    if ticker and ticker in overrides:
        ov = overrides[ticker]
        entry = dict(entry)
        entry["status"] = ov["status"]
        entry["overridden"] = True
        entry["override_reason"] = ov.get("reason", "")
        entry["override_date"] = ov.get("date", "")
    return entry


def needs_refresh(entry: dict, force: bool) -> bool:
    if force:
        return True
    if entry.get("status") in {"error", "unknown"}:
        return True
    ts = entry.get("scraped_at")
    if not ts:
        return True
    try:
        dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
    except Exception:
        return True
    age_days = (datetime.now(timezone.utc) - dt).days
    return age_days >= REFRESH_MAX_AGE_DAYS


async def run_batch(input_path: Path, output_path: Path, force: bool):
    holdings = json.loads(input_path.read_text())
    tickers = [h["ticker"] for h in holdings]
    total = len(tickers)

    existing_by_ticker: dict[str, dict] = {}
    if output_path.exists():
        for item in json.loads(output_path.read_text()):
            existing_by_ticker[item["ticker"]] = item

    # Load manual overrides
    overrides_path = input_path.parent / "manual_overrides.json"
    overrides: dict[str, dict] = {}
    if overrides_path.exists():
        raw = json.loads(overrides_path.read_text())
        overrides = {k: v for k, v in raw.items() if not k.startswith("_")}
        print(f"  Overrides: {len(overrides)} tickers ({', '.join(overrides.keys())})")

    print(f"Scraping {total} tickers (JS rendered)")
    print(f"  Input  : {input_path}")
    print(f"  Output : {output_path}")
    print(f"  Refresh threshold: {REFRESH_MAX_AGE_DAYS}d (force={force})")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context(user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36")
        page = await ctx.new_page()

        results: list[dict] = []
        n_refreshed = 0
        for i, ticker in enumerate(tickers, 1):
            prev = existing_by_ticker.get(ticker)
            if prev and not needs_refresh(prev, force):
                results.append(apply_override(prev, overrides))
                continue
            try:
                r = await get_status(page, ticker)
                n_refreshed += 1
                r = apply_override(r, overrides)
                print(f"  [{i}/{total}] {ticker} -- {r['status']}{' (override)' if r.get('overridden') else ''}")
                results.append(r)
            except Exception as e:
                print(f"  [{i}/{total}] {ticker} -- ERROR {e}")
                results.append(apply_override(prev or {"ticker": ticker, "status": "error", "detail": str(e)[:120]}, overrides))
            await asyncio.sleep(DELAY_SEC)

        await browser.close()

    output_path.write_text(json.dumps(results, indent=2, ensure_ascii=False))
    print(f"\nDone. Wrote {len(results)} entries ({n_refreshed} refreshed).")


async def run_single(ticker: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context(user_agent="Mozilla/5.0")
        page = await ctx.new_page()
        r = await get_status(page, ticker)
        await browser.close()
    print(json.dumps(r, indent=2, ensure_ascii=False))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input", nargs="?")
    ap.add_argument("output", nargs="?")
    ap.add_argument("--ticker")
    ap.add_argument("--force", action="store_true")
    args = ap.parse_args()

    if args.ticker:
        asyncio.run(run_single(args.ticker))
        return

    if not args.input or not args.output:
        print("Usage: python scrape_halal_playwright.py <input_weights.json> <output_halal_status.json>")
        print("       python scrape_halal_playwright.py --ticker APP")
        sys.exit(1)

    asyncio.run(run_batch(Path(args.input), Path(args.output), args.force))


if __name__ == "__main__":
    main()
