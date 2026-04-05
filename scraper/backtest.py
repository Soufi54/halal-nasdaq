"""
Backtest historique : compare la performance des indices halal
vs les indices complets (QQQ pour NASDAQ 100, SPY pour S&P 500).

Utilise les compositions actuelles appliquees retroactivement sur 1, 3 et 5 ans.
Sortie : data/backtest.json
"""

import json
import sys
from datetime import date, timedelta
from pathlib import Path

import yfinance as yf
import pandas as pd

DATA_DIR = Path(__file__).parent.parent / "data"
NASDAQ_FILE = DATA_DIR / "halal_nasdaq100.json"
SP500_FILE = DATA_DIR / "halal_sp500.json"
OUTPUT = DATA_DIR / "backtest.json"

# Periodes de backtest
PERIODS = {
    "1y": 365,
    "3y": 3 * 365,
    "5y": 5 * 365,
}


def load_halal_tickers(filepath):
    """Charge les tickers halal et leurs poids normalises."""
    data = json.loads(filepath.read_text(encoding="utf-8"))
    tickers = {}
    for h in data["holdings"]:
        tickers[h["ticker"]] = h["halal_weight"] / 100.0  # normalise 0-1
    return tickers


def download_prices(tickers, start_date, end_date):
    """Telecharge les prix de cloture ajustes pour une liste de tickers."""
    all_tickers = list(tickers)
    print(f"  Telechargement de {len(all_tickers)} tickers...")

    # Download in batches to avoid timeout
    batch_size = 50
    frames = []
    for i in range(0, len(all_tickers), batch_size):
        batch = all_tickers[i:i + batch_size]
        ticker_str = " ".join(batch)
        df = yf.download(
            ticker_str,
            start=start_date,
            end=end_date,
            auto_adjust=True,
            progress=False,
        )
        if df.empty:
            continue
        # yfinance returns MultiIndex columns (Price, Ticker) for multiple tickers
        if isinstance(df.columns, pd.MultiIndex):
            close = df["Close"]
        else:
            close = df[["Close"]].rename(columns={"Close": batch[0]})
        frames.append(close)

    if not frames:
        return pd.DataFrame()

    result = pd.concat(frames, axis=1)
    return result


def compute_weighted_returns(prices, weights):
    """Calcule les rendements ponderes d'un portefeuille."""
    # Garder seulement les tickers qu'on a dans prices
    available = [t for t in weights if t in prices.columns]
    if not available:
        return pd.Series(dtype=float)

    # Re-normaliser les poids pour les tickers disponibles
    total_w = sum(weights[t] for t in available)
    norm_weights = {t: weights[t] / total_w for t in available}

    # Rendements quotidiens
    daily_returns = prices[available].pct_change().fillna(0)

    # Rendement pondere du portefeuille
    portfolio_return = sum(
        daily_returns[t] * norm_weights[t] for t in available
    )

    # Performance cumulee (base 100)
    cumulative = (1 + portfolio_return).cumprod() * 100
    return cumulative


def compute_index_perf(prices):
    """Performance cumulee d'un ETF (base 100)."""
    daily_returns = prices.pct_change().fillna(0)
    return (1 + daily_returns).cumprod() * 100


def backtest_index(halal_file, etf_ticker, index_name):
    """Execute le backtest pour un indice."""
    print(f"\n{'='*50}")
    print(f"Backtest {index_name}")
    print(f"{'='*50}")

    halal_weights = load_halal_tickers(halal_file)
    print(f"  {len(halal_weights)} actions halal chargees")

    today = date.today()
    results = {}

    for period_name, days in PERIODS.items():
        print(f"\n  --- Periode : {period_name} ---")
        start = today - timedelta(days=days)
        start_str = start.isoformat()
        end_str = today.isoformat()

        # Telecharger prix halal + ETF reference
        all_tickers = list(halal_weights.keys()) + [etf_ticker]
        prices = download_prices(all_tickers, start_str, end_str)

        if prices.empty or etf_ticker not in prices.columns:
            print(f"  ERREUR : pas de donnees pour {period_name}")
            continue

        # Performance ETF complet
        etf_perf = compute_index_perf(prices[etf_ticker])

        # Performance portefeuille halal
        halal_perf = compute_weighted_returns(prices, halal_weights)

        if halal_perf.empty:
            print(f"  ERREUR : pas assez de donnees halal pour {period_name}")
            continue

        # Sous-echantillonner pour limiter la taille (1 point par semaine)
        etf_weekly = etf_perf.resample("W-FRI").last().dropna()
        halal_weekly = halal_perf.resample("W-FRI").last().dropna()

        # Aligner les deux series
        common_idx = etf_weekly.index.intersection(halal_weekly.index)
        etf_weekly = etf_weekly.loc[common_idx]
        halal_weekly = halal_weekly.loc[common_idx]

        # Stats
        halal_total_return = (halal_weekly.iloc[-1] / 100 - 1) * 100
        etf_total_return = (etf_weekly.iloc[-1] / 100 - 1) * 100
        outperformance = halal_total_return - etf_total_return

        available_count = sum(1 for t in halal_weights if t in prices.columns)

        print(f"  ETF ({etf_ticker}) : {etf_total_return:+.1f}%")
        print(f"  Halal : {halal_total_return:+.1f}%")
        print(f"  Surperformance : {outperformance:+.1f}%")
        print(f"  Tickers disponibles : {available_count}/{len(halal_weights)}")

        results[period_name] = {
            "start_date": common_idx[0].strftime("%Y-%m-%d"),
            "end_date": common_idx[-1].strftime("%Y-%m-%d"),
            "data_points": len(common_idx),
            "available_tickers": available_count,
            "total_tickers": len(halal_weights),
            "halal_return_pct": round(halal_total_return, 2),
            "index_return_pct": round(etf_total_return, 2),
            "outperformance_pct": round(outperformance, 2),
            "series": [
                {
                    "date": d.strftime("%Y-%m-%d"),
                    "halal": round(h, 2),
                    "index": round(e, 2),
                }
                for d, h, e in zip(common_idx, halal_weekly, etf_weekly)
            ],
        }

    return results


def main():
    if not NASDAQ_FILE.exists():
        print(f"ERREUR : {NASDAQ_FILE} introuvable", file=sys.stderr)
        sys.exit(1)
    if not SP500_FILE.exists():
        print(f"ERREUR : {SP500_FILE} introuvable", file=sys.stderr)
        sys.exit(1)

    nasdaq_results = backtest_index(NASDAQ_FILE, "QQQ", "NASDAQ 100 Halal")
    sp500_results = backtest_index(SP500_FILE, "SPY", "S&P 500 Halal")

    output = {
        "date": date.today().isoformat(),
        "methodology": "Static composition backtest using current halal screening applied historically. Weights redistributed pro-rata. Weekly resampling.",
        "disclaimer": "Past performance does not guarantee future results. This backtest uses current composition, not historical screening.",
        "nasdaq100": nasdaq_results,
        "sp500": sp500_results,
    }

    OUTPUT.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nResultats sauvegardes dans {OUTPUT}")


if __name__ == "__main__":
    main()
