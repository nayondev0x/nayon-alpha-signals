# 📊 NAYON ALPHA SIGNALS v8.0 PREMIUM

### ⚡ AI-Powered Multi-Market Trading Intelligence Platform

> **Developed & Powered by [NayonDev](https://github.com/nayondev0x)**

[![Live](https://img.shields.io/badge/Status-LIVE-00FFB2?style=for-the-badge&logo=statuspage&logoColor=white)](https://nayon-alpha-signals.onrender.com)
[![APIs](https://img.shields.io/badge/API%20Hosts-6-00C8FF?style=for-the-badge)](https://rapidapi.com)
[![Endpoints](https://img.shields.io/badge/Endpoints-102+-7C5CFC?style=for-the-badge)](https://rapidapi.com)

---

<div align="center">

### 🌐 **Crypto • US Stocks • Forex • Economy**
### All Markets — One Platform — Real-Time AI Signals

</div>

---

## 🚀 What is Nayon Alpha Signals?

Nayon Alpha Signals is a **premium, dark-themed, AI-powered** multi-market trading analysis platform. It aggregates **live data from 6 different API sources** (102+ endpoints), processes them through an advanced signal engine, and generates **filtered trading signals** with AI confidence scoring.

### ✨ One Platform — All Markets

| Market | Status | Features |
|--------|--------|----------|
| ₿ **Crypto** | ✅ Full Analysis | Live pairs, AI signals, 14 indicators, Fear & Greed |
| 📈 **US Stocks** | ✅ Chart + TA | TradingView chart, technical analysis, company data |
| 💱 **Forex** | ✅ Chart + TA | All major & cross pairs, live charts |
| 🏦 **Economy** | ✅ Chart + Data | Gold, Oil, Indices, GDP, Bonds |

---

## 🧠 AI Signal Engine

The platform generates **5 types of signals** based on multi-source analysis:

```
STRONG BUY  → All indicators bullish + RSI < 30 + Primary signal BUY
BUY         → Primary signal BUY + 3+ bullish confirmations
HOLD        → Mixed/conflicting signals
SELL        → Primary signal SELL + 3+ bearish confirmations  
STRONG SELL → All indicators bearish + RSI > 70 + Primary signal SELL
```

### Confidence Scoring (0-100%)

| Range | Level | Meaning |
|-------|-------|---------|
| 95-100% | 🟢 Extremely High | Very strong signal agreement |
| 85-94% | 🟢 High | Strong indicator convergence |
| 70-84% | 🟡 Moderate | Moderate agreement |
| Below 70% | 🔴 Low | Weak/conflicting signals |

### ⏱️ Recommended Hold Time

The AI calculates optimal trade duration based on:
- Selected timeframe (1M to 1D)
- Signal confidence level
- Trend strength & direction

---

## 🔌 API Architecture

This platform connects to **6 RapidAPI hosts** with **102+ endpoints**:

### Host 1: Crypto Technical Analysis API
> SMA, EMA, WMA, ADX, TSI, Williams %R, PSAR, Volume Oscillator, Standard Deviation — 15 endpoints

### Host 2: Real-Time Crypto Price API
> Live prices, historical data, intraday, news, sentiment, AI signals, AI strategy, AI candlestick patterns — 15 endpoints

### Host 3: Traders Hub Trading Signals API *(Primary Signal Provider)*
> Trading signals, sentiment analysis, multi-timeframe analysis — 4 endpoints

### Host 4: SelfTrade API
> Fear & Greed Index, funding rates, trading signals — 4 endpoints

### Host 5: Stock Technical Analysis API
> Full indicators, signals, and analysis for stocks — 4 endpoints

### Host 6: TradingView Data API *(Multi-Market)*
> Price data, quotes, technical analysis, leaderboards (stocks/crypto/forex/futures/ETFs/indices), news (all markets), market data & fundamentals, trading ideas, world economy, calendars (IPO/earnings/economic), metadata — 60+ endpoints

---

## 🔐 Security

> **API keys are NEVER exposed in the frontend code.**

All API calls are **proxied through the Node.js backend server**. The API key is stored as an **environment variable** — it never appears in any file that gets pushed to GitHub.

```
Browser → Express Backend (server.js) → RapidAPI (with hidden key)
```

### To deploy your own:

1. Get your own API key from [RapidAPI](https://rapidapi.com)
2. Add it as an environment variable named `RAPIDAPI_KEY` in your hosting platform
3. See `.env.example` for all required environment variables

---

## 📊 Dashboard Features

### 🎯 Core
- ✅ AI Signal Engine (STRONG BUY → STRONG SELL)
- ✅ Confidence scoring with visual bar
- ✅ Recommended hold time calculator
- ✅ 14 Technical Indicators with convergence chart
- ✅ Fear & Greed Index (animated gauge)

### 📈 Markets
- ✅ **Crypto** — Live Binance pairs, auto-refresh 30s
- ✅ **US Stocks** — AAPL, TSLA, NVDA, 30+ symbols
- ✅ **Forex** — EURUSD, GBPUSD, 15+ pairs
- ✅ **Economy** — Gold, Oil, SPX500, indices

### ⏱️ Timeframes
```
1M | 2M | 5M | 10M | 15M | 30M | 1H | 2H | 4H | 1D
```

### 🎨 UI/UX
- ✅ Premium dark theme (#060c19)
- ✅ Glassmorphism panels with blur effects
- ✅ Ambient background orbs with vignette
- ✅ Space Grotesk + Inter + JetBrains Mono fonts
- ✅ Hover glow effects & smooth animations
- ✅ Color-coded API panels (green/purple/orange/cyan)
- ✅ Live TradingView embedded chart
- ✅ Mobile responsive design

### 🔧 Tools
- ✅ Market category tabs (Crypto/Stock/Forex/Economy)
- ✅ Live sidebar with search & filters
- ✅ Persistent watchlist (localStorage)
- ✅ Signal history log
- ✅ Alert notification system
- ✅ Export analysis report
- ✅ One-click pair analysis

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js + Express |
| **Frontend** | Vanilla HTML/CSS/JS (zero dependencies) |
| **APIs** | 6 RapidAPI hosts (102+ endpoints) |
| **Charts** | TradingView embedded widget |
| **Fallback** | Binance public API (no key needed) |
| **Hosting** | Render.com (free tier) |

---

## 📁 Project Structure

```
nayon-alpha-signals/
├── package.json          → Dependencies & scripts
├── server.js             → Express backend (API proxy, 102 endpoints)
├── render.yaml           → Auto-deploy config for Render.com
├── .env.example          → Environment variable template
├── .gitignore            → Excludes .env & node_modules
├── README.md             → This file
└── public/
    └── index.html        → Complete frontend (Premium UI)
```

---

## 🚀 Deploy Your Own

### Option 1: Render.com (Recommended — Free)

1. Fork this repository
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Add environment variables (see `.env.example`)
5. Deploy — your site will be live in 2-3 minutes!

### Option 2: Local Development

```bash
# Clone the repo
git clone https://github.com/nayondev0x/nayon-alpha-signals.git
cd nayon-alpha-signals

# Create .env file with your API key
cp .env.example .env
# Edit .env and add your RAPIDAPI_KEY

# Install & run
npm install
npm start

# Open http://localhost:3000
```

---

## 📸 Screenshots

> Premium dark theme with glassmorphism UI, live market sidebar, AI signal engine, and multi-timeframe analysis.

---

## ⚠️ Disclaimer

This platform is for **educational and informational purposes only**. Trading signals generated by this platform should **not** be considered as financial advice. Always do your own research (DYOR) before making any trading decisions. Past performance does not guarantee future results.

---

## 📜 License

MIT License — see [LICENSE](LICENSE)

---

<div align="center">

### Built with ❤️ by NayonDev

**Nayon Alpha Signals © 2026**

*Advanced AI Trading Intelligence Platform*

*6 API Hosts • 102+ Endpoints • Crypto • Stocks • Forex • Economy*

---

⭐ **Star this repo if you found it useful!** ⭐

</div>
