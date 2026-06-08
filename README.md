# 📊 NAYON ALPHA SIGNALS

### ⚡ AI-Powered Multi-Market Trading Intelligence Platform
### Developed & Powered by [NayonDev](https://github.com/nayondev0x)

---

## 🌐 All Markets — One Platform

| ₿ Crypto | 📈 US Stocks | 💱 Forex | 🏦 Economy | 📊 Futures |
|----------|-------------|---------|-----------|-----------|
| Live Binance pairs | AAPL, TSLA, NVDA... | EURUSD, GBPUSD... | GOLD, OIL, SPX... | Real-Time Futures |
| Full AI signals | TradingView TA | TradingView TA | TradingView TA | AI Signal Analysis |
| 12+ Indicators | Chart + Analysis | Chart + Analysis | Chart + Analysis | Backtest + Strategy |

---

## 🧠 AI Signal Engine

```
STRONG BUY  → All indicators bullish + RSI < 30
BUY         → 3+ bullish confirmations  
HOLD        → Mixed signals
SELL        → 3+ bearish confirmations
STRONG SELL → All indicators bearish + RSI > 70
```

**Confidence: 0-100%** • **Hold Time Recommendation** • **Risk Level**

### Signal Sources (12 API Hosts):
```
H1:  Technical Indicators (SMA, EMA, ADX, TSI, PSAR, Williams...) → BUY/SELL weight
H2:  Real-Time Crypto Price + AI Analysis → market data
H3:  Traders Hub Signal (PRIMARY) → BUY/SELL +2 weight
H4:  Fear & Greed Index → extreme = BUY/SELL +1
H5:  Stock Technical Analysis → indicators
H6:  TradingView Data (All Markets) → TA + quotes
H7:  Futures AI Signal → BUY/SELL +1
H8:  Forex/Gold Trend & Strength → BUY/SELL +1
H9:  QuantSignalPro → BUY/SELL +1
H10: DataNest Stock Analysis → BUY/SELL +1
H11: Quicksilver Trading Signals → BUY/SELL +1
H12: Real-Time Crypto & Stock Market → price data
─────────────────────────────────────────────────
All combined → STRONG BUY / BUY / HOLD / SELL / STRONG SELL
```

---

## 🔌 12 API Hosts — 145 Endpoints — 123 Routes

| # | API Host | Endpoints | Purpose |
|---|----------|-----------|---------|
| 1 | Crypto Technical Analysis | 15 | SMA, EMA, WMA, ADX, TSI, PSAR, Williams %R, Volume Osc, Std Dev |
| 2 | Real-Time Crypto Price | 15 | Live prices, news, sentiment, AI signals, strategy, candlestick |
| 3 | Traders Hub Signals | 4 | Primary trading signal, sentiment, multi-timeframe |
| 4 | SelfTrade | 4 | Fear & Greed Index, funding rates, signals |
| 5 | Stock Technical Analysis | 4 | Full indicators, signals, analysis for stocks |
| 6 | TradingView Data | 60+ | Price, quotes, TA, leaderboards, news, market data, ideas, calendars |
| 7 | Real-Time Future Price | 12 | Futures prices, AI signals, strategy, backtest, news |
| 8 | Forex/Gold Trend & Strength | 2 | Multi-timeframe trend analysis for Forex & XAUUSD |
| 9 | QuantSignalPro | 5 | Scanner, backtest signals, compare, quotes |
| 10 | Stock Market DataNest | 7 | Stock quotes, analysis, earnings, news, movers |
| 11 | Quicksilver Trading Signals | 10 | Signals, trades, strategies, backtest, market, performance |
| 12 | Real-Time Crypto & Stock Market | 8 | Crypto/stock prices, trending, history, forex rates |

---

## ⏱️ All Timeframes

```
1M • 2M • 5M • 10M • 15M • 30M • 1H • 2H • 4H • 1D
```

---

## 📊 12 Technical Indicators

```
SMA 50 • SMA 200 • EMA 20 • EMA 50 • WMA 14
ADX • TSI • Williams %R • PSAR
Volume Oscillator • Standard Deviation • RSI (calculated)
```

Plus: Fear & Greed Index • Convergence Chart • Hold Time Calculator

---

## 🔐 Security

API keys are **never exposed** in frontend code. All calls proxied through backend.

```
Browser → Express Server (server.js) → RapidAPI (hidden key)
```

- ✅ API key stored as environment variable only
- ✅ 0 occurrences of key in any source file
- ✅ `.env` excluded via `.gitignore`

---

## 🚀 Deploy on Render (Free)

1. Fork this repo
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect GitHub repo
4. Set **Build Command:** `npm install`
5. Set **Start Command:** `node server.js`
6. Add **13 environment variables** (see `.env.example`)
7. Deploy — live in 2-3 minutes!

### Environment Variables:

| Variable | Value |
|----------|-------|
| `RAPIDAPI_KEY` | Your RapidAPI key |
| `RAPIDAPI_HOST_TECHNICAL` | `crypto-technical-analysis-indicator-apis-for-trading.p.rapidapi.com` |
| `RAPIDAPI_HOST_PRICE` | `real-time-crypto-price-api.p.rapidapi.com` |
| `RAPIDAPI_HOST_TRADERS` | `traders-hub-trading-signals5.p.rapidapi.com` |
| `RAPIDAPI_HOST_SELFTRADE` | `selftrade.p.rapidapi.com` |
| `RAPIDAPI_HOST_STOCKTA` | `stock-technical-analysis1.p.rapidapi.com` |
| `RAPIDAPI_HOST_TVDATA` | `tradingview-data1.p.rapidapi.com` |
| `RAPIDAPI_HOST_FUTURES` | `real-time-future-price-api.p.rapidapi.com` |
| `RAPIDAPI_HOST_FXTREND` | `trend-and-strength-api-for-forex-gold-xauusd.p.rapidapi.com` |
| `RAPIDAPI_HOST_QUANTSIG` | `quantsignalpro.p.rapidapi.com` |
| `RAPIDAPI_HOST_DATANEST` | `stock-market-by-datanest.p.rapidapi.com` |
| `RAPIDAPI_HOST_QUICKSILVER` | `quicksilver-trading-signals-api1.p.rapidapi.com` |
| `RAPIDAPI_HOST_RTMARKET` | `real-time-crypto-stock-market-api-prices-trends.p.rapidapi.com` |

---

## 📁 Project Structure

```
nayon-alpha-signals/
├── package.json          → Dependencies & scripts
├── server.js             → Express backend (123 routes, 145 endpoints, 12 hosts)
├── render.yaml           → Auto-deploy config for Render.com
├── .env.example          → Environment variable template (13 vars)
├── .gitignore            → Excludes .env & node_modules
├── README.md             → This file
└── public/
    ├── index.html        → Premium dark UI (glassmorphism, responsive)
    └── app.js            → Frontend logic (signal engine, all markets)
```

---

## ✨ Features

### 🎯 Core
- ✅ AI Signal Engine — STRONG BUY / BUY / HOLD / SELL / STRONG SELL
- ✅ 12 Technical Indicators with convergence chart
- ✅ Confidence scoring (0-100%)
- ✅ Recommended hold time calculator
- ✅ Risk level assessment
- ✅ Fear & Greed Index (animated gauge)

### 📈 Markets
- ✅ **Crypto** — Live Binance pairs, auto-refresh 30s, filters (Top 20, DeFi, Meme, L1, Gainers, Losers)
- ✅ **US Stocks** — 25 major stocks with TradingView TA
- ✅ **Forex** — 20 pairs (Major + Cross) with trend analysis
- ✅ **Economy** — Gold, Silver, Oil, Indices, Bonds

### ⏱️ Timeframes
- ✅ 1M, 2M, 5M, 10M, 15M, 30M, 1H, 2H, 4H, 1D

### 🎨 UI/UX
- ✅ Premium dark theme (#060c19)
- ✅ Glassmorphism panels with blur effects
- ✅ Ambient background with animated orbs
- ✅ Space Grotesk + Inter + JetBrains Mono fonts
- ✅ Hover glow effects & smooth animations
- ✅ Color-coded panels (green/purple/orange/cyan)
- ✅ Live TradingView embedded chart with RSI & MACD
- ✅ Mobile responsive (sidebar becomes scrollable list)

### 🔧 Tools
- ✅ Live sidebar with auto-loaded pair lists
- ✅ Category tabs (Crypto/Stock/Forex/Economy)
- ✅ Filter buttons (no search needed!)
- ✅ One-click pair analysis
- ✅ Persistent watchlist (localStorage)
- ✅ Signal history log
- ✅ Alert notification system
- ✅ Export analysis report
- ✅ 9 API status indicators with latency

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js + Express |
| **Frontend** | Vanilla HTML/CSS/JS (zero dependencies) |
| **APIs** | 12 RapidAPI hosts (145 endpoints) |
| **Charts** | TradingView embedded widget |
| **Fallback** | Binance public API (no key needed) |
| **Hosting** | Render.com (free tier) |

---

## ⚠️ Disclaimer

This platform is for **educational and informational purposes only**. Trading signals should **not** be considered financial advice. Always do your own research (DYOR). Past performance does not guarantee future results.

---

<div align="center">

### Built with ❤️ by NayonDev

**Nayon Alpha Signals © 2026**

*Advanced AI Trading Intelligence Platform*

*12 API Hosts • 145 Endpoints • 123 Routes*

*Crypto • Stocks • Forex • Futures • Economy*

---

⭐ **Star this repo if you found it useful!** ⭐

</div>
