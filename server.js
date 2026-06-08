// =====================================================
// NAYON ALPHA SIGNALS v7.0 — Backend API Proxy Server
// Developed by NayonDev
// 6 RapidAPI Hosts • 50+ Endpoints • Key in .env
// =====================================================
require('dotenv').config();
const express=require('express'),cors=require('cors'),fetch=require('node-fetch'),path=require('path');
const app=express();
const PORT=process.env.PORT||3000;
const KEY=process.env.RAPIDAPI_KEY;
const H1=process.env.RAPIDAPI_HOST_TECHNICAL;
const H2=process.env.RAPIDAPI_HOST_PRICE;
const H3=process.env.RAPIDAPI_HOST_TRADERS;
const H4=process.env.RAPIDAPI_HOST_SELFTRADE;
const H5=process.env.RAPIDAPI_HOST_STOCKTA;
const H6=process.env.RAPIDAPI_HOST_TVDATA;
const H7=process.env.RAPIDAPI_HOST_FUTURES;
const H8=process.env.RAPIDAPI_HOST_FXTREND;
const H9=process.env.RAPIDAPI_HOST_QUANTSIG;
const H10=process.env.RAPIDAPI_HOST_DATANEST;
const H11=process.env.RAPIDAPI_HOST_QUICKSILVER;
const H12=process.env.RAPIDAPI_HOST_RTMARKET;
app.use(cors());app.use(express.json());app.use(express.static(path.join(__dirname,'public')));
const h7=(ep,p)=>apiGet(H7,ep,p);
const h8=(ep,p)=>apiGet(H8,ep,p);
const h9=(ep,p)=>apiGet(H9,ep,p);
const h10=(ep,p)=>apiGet(H10,ep,p);
const h11=(ep,p)=>apiGet(H11,ep,p);
const h11Post=(ep,b)=>apiPost(H11,ep,b);
const h12=(ep,p)=>apiGet(H12,ep,p);

async function apiGet(host,ep,params={}){
    const qs=new URLSearchParams(params).toString();
    const url=`https://${host}${ep}${qs?'?'+qs:''}`;const s=Date.now();
    try{const r=await fetch(url,{method:'GET',headers:{'x-rapidapi-key':KEY,'x-rapidapi-host':host}});
    const lat=Date.now()-s;if(!r.ok)throw new Error(r.status);
    const d=await r.json();return{data:d,latency:lat,success:true}}
    catch(e){return{data:null,latency:Date.now()-s,success:false,error:e.message}}
}
async function apiPost(host,ep,body={}){
    const url=`https://${host}${ep}`;const s=Date.now();
    try{const r=await fetch(url,{method:'POST',headers:{'x-rapidapi-key':KEY,'x-rapidapi-host':host,'Content-Type':'application/json'},body:JSON.stringify(body)});
    const lat=Date.now()-s;if(!r.ok)throw new Error(r.status);
    const d=await r.json();return{data:d,latency:lat,success:true}}
    catch(e){return{data:null,latency:Date.now()-s,success:false,error:e.message}}
}

// Health
app.get('/api/health',(q,r)=>r.json({status:'online',v:'12.0',dev:'NayonDev',hosts:{h1:!!H1,h2:!!H2,h3:!!H3,h4:!!H4,h5:!!H5,h6:!!H6,h7:!!H7,h8:!!H8,h9:!!H9,h10:!!H10,h11:!!H11,h12:!!H12},key:!!KEY,endpoints:145}));

// ===== H1: Technical Analysis =====
app.get('/api/tech/:ep',async(q,r)=>{const ep=q.params.ep,{symbol,timeframe,length}=q.query,tf=timeframe||'1d';
let p={symbol,timeframe:tf};if('sma ema wma'.includes(ep))p.length=length||'14';
if(ep==='adx'){p.diLength='14';p.adxSmoothing='14'}if(ep==='tsi'){p.long='25';p.short='13';p.siglen='13'}
if(ep==='volume-oscillator'){p.shortlen='5';p.longlen='10'}if(ep==='williamsR')p.length=length||'14';
if(ep==='psar'){p.start='0.02';p.increment='0.02';p.maximum='0.2'}if(ep==='sd'){p.periods='5';p.deviations='1'}
if(ep==='symbols')p={};r.json(await apiGet(H1,'/'+ep,p))});

// ===== H2: Real-Time Price =====
app.get('/api/price/latest',async(q,r)=>r.json(await apiGet(H2,'/v1/crypto/price/latest',{tickers:q.query.tickers||'BINANCE:BTCUSDT'})));
app.get('/api/price/intraday',async(q,r)=>r.json(await apiGet(H2,'/v1/crypto/intraday-price',{ticker:q.query.ticker||'BTCUSDT',market:'BINANCE',interval:q.query.interval||'2hour',duration:q.query.duration||'1mon'})));
app.get('/api/news/list',async(q,r)=>r.json(await apiGet(H2,'/v1/crypto/news',{tickers:q.query.tickers||'BINANCE:BTCUSDT'})));
app.get('/api/ai/signal',async(q,r)=>r.json(await apiGet(H2,'/v1/crypto/ai-based-analysis/trading-signal-analysis',{ticker:q.query.ticker||'BTCUSDT',market:'BINANCE',interval:q.query.interval||'1D'})));
app.get('/api/ai/strategy',async(q,r)=>r.json(await apiGet(H2,'/v1/crypto/ai-based-analysis/generate-trading-stretegy',{ticker:q.query.ticker||'BTCUSDT',market:'BINANCE',interval:q.query.interval||'1D'})));
app.get('/api/ai/candlestick',async(q,r)=>r.json(await apiGet(H2,'/v1/crypto/ai-based-analysis/candlestick-pattern-with-technical-indicator',{ticker:q.query.ticker||'BTCUSDT',market:'BINANCE',interval:q.query.interval||'1D'})));

// ===== H3: Traders Hub =====
app.get('/api/traders/signal',async(q,r)=>r.json(await apiGet(H3,'/v1/signal',{ticker:q.query.ticker,period:q.query.period||'1mo'})));
app.get('/api/traders/sentiment',async(q,r)=>r.json(await apiGet(H3,'/v1/sentiment',{ticker:q.query.ticker,headlines:'20'})));
app.get('/api/traders/multiframe',async(q,r)=>r.json(await apiGet(H3,'/v1/multiframe',{ticker:q.query.ticker})));

// ===== H4: SelfTrade =====
app.get('/api/selftrade/fear-greed',async(q,r)=>r.json(await apiGet(H4,'/rapidapi/fear-greed')));
app.get('/api/selftrade/funding-rates',async(q,r)=>r.json(await apiGet(H4,'/rapidapi/funding-rates')));
app.get('/api/selftrade/signal',async(q,r)=>r.json(await apiGet(H4,'/rapidapi/signal',{pair:q.query.pair||'BTCUSDT'})));

// ===== H5: Stock Technical Analysis =====
app.get('/api/stockta/indicators',async(q,r)=>r.json(await apiGet(H5,`/indicators/${q.query.symbol||'AAPL'}`)));
app.get('/api/stockta/signals',async(q,r)=>r.json(await apiGet(H5,`/signals/${q.query.symbol||'AAPL'}`)));
app.get('/api/stockta/analysis',async(q,r)=>r.json(await apiGet(H5,`/analysis/${q.query.symbol||'AAPL'}`)));

// ===== H6: TradingView Data API (NEW — Crypto+Stock+Forex+Economy) =====

// Health check
app.get('/api/tv/health',async(q,r)=>r.json(await apiGet(H6,'/health')));

// Price data — GET /api/price/:symbol
app.get('/api/tv/price/:symbol',async(q,r)=>{
    const sym=q.params.symbol;const tf=q.query.timeframe||'60';const range=q.query.range||'20';
    r.json(await apiGet(H6,`/api/price/${sym}`,{timeframe:tf,range}));
});

// Batch price — POST
app.post('/api/tv/price/batch',async(q,r)=>r.json(await apiPost(H6,'/api/price/batch',q.body)));

// Quote — GET single
app.get('/api/tv/quote/:symbol',async(q,r)=>{
    r.json(await apiGet(H6,`/api/quote/${q.params.symbol}`,{session:q.query.session||'regular',fields:q.query.fields||'all'}));
});

// Quote batch — POST
app.post('/api/tv/quote/batch',async(q,r)=>r.json(await apiPost(H6,'/api/quote/batch',q.body)));

// Market search
app.get('/api/tv/search/:query',async(q,r)=>{
    r.json(await apiGet(H6,`/api/search/market/${q.params.query}`,{filter:q.query.filter||''}));
});

// Technical Analysis — full summary (no /indicators)
app.get('/api/tv/ta-summary/:symbol',async(q,r)=>{
    r.json(await apiGet(H6,`/api/ta/${q.params.symbol}`));
});

// Technical Analysis — detailed indicators
app.get('/api/tv/ta/:symbol',async(q,r)=>{
    r.json(await apiGet(H6,`/api/ta/${q.params.symbol}/indicators`));
});

// Leaderboard — stocks movers
app.get('/api/tv/leaderboard',async(q,r)=>{
    const{id,market_code,count,columnset,start,lang}=q.query;
    r.json(await apiGet(H6,'/api/leaderboard/data',{id:id||'stocks_market_movers.gainers',market_code:market_code||'america',count:count||'20',columnset:columnset||'overview',start:start||'0',lang:lang||'en'}));
});

// Bonds
app.get('/api/tv/bonds',async(q,r)=>{
    r.json(await apiGet(H6,'/api/leaderboard/bonds',{lang:'en',start:'0',tab:q.query.tab||'all',count:'20',columnset:'overview'}));
});

// Corporate bonds
app.get('/api/tv/corporate-bonds',async(q,r)=>{
    r.json(await apiGet(H6,'/api/leaderboard/corporate-bonds',{columnset:'overview',tab:q.query.tab||'highest-yield',start:'0',lang:'en',count:'20'}));
});

// Stocks leaderboard (gainers/losers/most-active)
app.get('/api/tv/stocks',async(q,r)=>{
    r.json(await apiGet(H6,'/api/leaderboard/stocks',{count:q.query.count||'20',tab:q.query.tab||'gainers',lang:'en',start:q.query.start||'0',columnset:'overview',market_code:q.query.market_code||'america'}));
});

// Crypto leaderboard
app.get('/api/tv/crypto',async(q,r)=>{
    r.json(await apiGet(H6,'/api/leaderboard/crypto',{start:q.query.start||'0',columnset:'overview',lang:'en',count:q.query.count||'20',tab:q.query.tab||'all'}));
});

// ETFs leaderboard
app.get('/api/tv/etfs',async(q,r)=>{
    r.json(await apiGet(H6,'/api/leaderboard/etfs',{columnset:'overview',start:q.query.start||'0',lang:'en',tab:q.query.tab||'largest',count:q.query.count||'20'}));
});

// Futures leaderboard
app.get('/api/tv/futures',async(q,r)=>{
    r.json(await apiGet(H6,'/api/leaderboard/futures',{tab:q.query.tab||'all',columnset:'overview',count:q.query.count||'20',lang:'en',start:q.query.start||'0'}));
});

// Indices leaderboard
app.get('/api/tv/indices',async(q,r)=>{
    r.json(await apiGet(H6,'/api/leaderboard/indices',{count:q.query.count||'20',tab:q.query.tab||'all',start:q.query.start||'0',columnset:'overview',lang:'en'}));
});

// Forex leaderboard
app.get('/api/tv/forex',async(q,r)=>{
    r.json(await apiGet(H6,'/api/leaderboard/forex',{columnset:'overview',tab:q.query.tab||'all',start:q.query.start||'0',count:q.query.count||'20',lang:'en'}));
});

// World Economy — GDP, inflation, etc
app.get('/api/tv/economy/:indicator',async(q,r)=>{
    r.json(await apiGet(H6,`/api/world-economy/indicators/${q.params.indicator}`,{region:q.query.region||'g20'}));
});

// Trading Ideas — hot
app.get('/api/tv/ideas/hot',async(q,r)=>{
    r.json(await apiGet(H6,'/api/ideas/hot',{lang:q.query.lang||'en'}));
});

// Trading Ideas — editors picks
app.get('/api/tv/ideas/editors-picks',async(q,r)=>{
    r.json(await apiGet(H6,'/api/ideas/editors-picks',{lang:q.query.lang||'en'}));
});

// Trading Ideas — minds for a symbol
app.get('/api/tv/ideas/minds/:symbol',async(q,r)=>{
    r.json(await apiGet(H6,`/api/ideas/${q.params.symbol}/minds`,{lang:q.query.lang||'en'}));
});

// Trading Ideas — single idea by ID
app.get('/api/tv/ideas/detail/:id',async(q,r)=>{
    r.json(await apiGet(H6,`/api/ideas/${q.params.id}`));
});

// Trading Ideas — list for a symbol
app.get('/api/tv/ideas/list/:symbol',async(q,r)=>{
    r.json(await apiGet(H6,`/api/ideas/list/${q.params.symbol}`,{page:q.query.page||'1',per_page:q.query.per_page||'20',lang:q.query.lang||'en'}));
});

// MCP Generate (POST)
app.post('/api/tv/mcp/generate',async(q,r)=>r.json(await apiPost(H6,'/api/mcp/generate',q.body||{})));

// Token Generate (POST)
app.post('/api/tv/token/generate',async(q,r)=>r.json(await apiPost(H6,'/api/token/generate',q.body||{})));

// Calendar — IPO
app.get('/api/tv/calendar/ipo',async(q,r)=>{
    r.json(await apiGet(H6,'/api/calendar/ipo',{from:q.query.from,to:q.query.to,market:q.query.market||'america'}));
});

// Calendar — Revenue
app.get('/api/tv/calendar/revenue',async(q,r)=>{
    r.json(await apiGet(H6,'/api/calendar/revenue',{from:q.query.from,to:q.query.to,market:q.query.market||'america'}));
});

// Calendar — Earnings
app.get('/api/tv/calendar/earnings',async(q,r)=>{
    r.json(await apiGet(H6,'/api/calendar/earnings',{from:q.query.from,to:q.query.to,market:q.query.market||'america'}));
});

// Calendar — Economic Events
app.get('/api/tv/calendar/economic',async(q,r)=>{
    r.json(await apiGet(H6,'/api/calendar/economic',{from:q.query.from,to:q.query.to,market:q.query.market||'america'}));
});

// Metadata — Languages
app.get('/api/tv/metadata/languages',async(q,r)=>r.json(await apiGet(H6,'/api/metadata/languages')));

// Metadata — Tabs
app.get('/api/tv/metadata/tabs',async(q,r)=>r.json(await apiGet(H6,'/api/metadata/tabs',{type:q.query.type||'stocks'})));

// Metadata — Markets
app.get('/api/tv/metadata/markets',async(q,r)=>r.json(await apiGet(H6,'/api/metadata/markets')));

// Metadata — Columnsets
app.get('/api/tv/metadata/columnsets',async(q,r)=>r.json(await apiGet(H6,'/api/metadata/columnsets')));

// Metadata — Exchanges
app.get('/api/tv/metadata/exchanges',async(q,r)=>r.json(await apiGet(H6,'/api/metadata/exchanges')));

// Metadata — World Economy Indicators
app.get('/api/tv/metadata/economy-indicators',async(q,r)=>r.json(await apiGet(H6,'/api/metadata/world-economy/indicators',{category:q.query.category||'gdp'})));

// Logo
app.get('/api/tv/logo',async(q,r)=>r.json(await apiGet(H6,'/logo',{url:q.query.url||'',big:q.query.big||'false'})));

// ===== TradingView NEWS (All Markets) =====

// News — single article by ID
app.get('/api/tv/news/article/:id',async(q,r)=>r.json(await apiGet(H6,`/api/news/${q.params.id}`,{lang:q.query.lang||'en'})));

// News — general (with filters)
app.get('/api/tv/news',async(q,r)=>r.json(await apiGet(H6,'/api/news',{market_country:q.query.market_country||'US',market:q.query.market||'stock',symbol:q.query.symbol||'',lang:q.query.lang||'en'})));

// News — index
app.get('/api/tv/news/index',async(q,r)=>r.json(await apiGet(H6,'/api/news/index',{lang:q.query.lang||'en'})));

// News — crypto
app.get('/api/tv/news/crypto',async(q,r)=>r.json(await apiGet(H6,'/api/news/crypto',{lang:q.query.lang||'en'})));

// News — forex
app.get('/api/tv/news/forex',async(q,r)=>r.json(await apiGet(H6,'/api/news/forex',{lang:q.query.lang||'en'})));

// News — futures
app.get('/api/tv/news/futures',async(q,r)=>r.json(await apiGet(H6,'/api/news/futures',{lang:q.query.lang||'en'})));

// News — stock
app.get('/api/tv/news/stock',async(q,r)=>r.json(await apiGet(H6,'/api/news/stock',{lang:q.query.lang||'en',market_country:q.query.market_country||'US',symbol:q.query.symbol||''})));

// News — ETF
app.get('/api/tv/news/etf',async(q,r)=>r.json(await apiGet(H6,'/api/news/etf',{lang:q.query.lang||'en'})));

// News — bond
app.get('/api/tv/news/bond',async(q,r)=>r.json(await apiGet(H6,'/api/news/bond',{lang:q.query.lang||'en'})));

// News — economic
app.get('/api/tv/news/economic',async(q,r)=>r.json(await apiGet(H6,'/api/news/economic',{market_country:q.query.market_country||'US',lang:q.query.lang||'en'})));

// ===== TradingView MARKET DATA (Fundamentals) =====

// Market data — overview
app.get('/api/tv/market-data/:symbol',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}`)));

// Market data — company info
app.get('/api/tv/market-data/:symbol/company',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/company`,{page:q.query.page||'1'})));

// Market data — IPO
app.get('/api/tv/market-data/:symbol/ipo',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/ipo`)));

// Market data — indicators
app.get('/api/tv/market-data/:symbol/indicators',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/indicators`)));

// Market data — TTM
app.get('/api/tv/market-data/:symbol/ttm',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/ttm`)));

// Market data — current
app.get('/api/tv/market-data/:symbol/current',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/current`)));

// Market data — financials quarterly
app.get('/api/tv/market-data/:symbol/financials-quarterly',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/financials-quarterly`)));

// Market data — financials annual
app.get('/api/tv/market-data/:symbol/financials-annual',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/financials-annual`)));

// Market data — history quarterly
app.get('/api/tv/market-data/:symbol/history-quarterly',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/history-quarterly`)));

// Market data — history annual
app.get('/api/tv/market-data/:symbol/history-annual',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/history-annual`)));

// Market data — dividend
app.get('/api/tv/market-data/:symbol/dividend',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/dividend`)));

// Market data — analyst recommendations
app.get('/api/tv/market-data/:symbol/analyst-recommendations',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/analyst-recommendations`)));

// Market data — enterprise value
app.get('/api/tv/market-data/:symbol/enterprise-value',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/enterprise-value`)));

// Market data — credit ratings
app.get('/api/tv/market-data/:symbol/credit-ratings',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/credit-ratings`)));

// Market data — cash flow
app.get('/api/tv/market-data/:symbol/cash-flow',async(q,r)=>r.json(await apiGet(H6,`/api/market-data/${q.params.symbol}/cash-flow`)));

// ===== H8: Forex/Gold Trend & Strength API =====
app.get('/api/fxtrend/:timeframe',async(q,r)=>r.json(await h8(`/${q.params.timeframe}`)));

// ===== H9: QuantSignalPro API =====
app.get('/api/quant/scanner',async(q,r)=>r.json(await h9('/api/v1/scanner')));
app.get('/api/quant/signals/:ticker',async(q,r)=>r.json(await h9(`/api/v1/backtest/${q.params.ticker}/signals`)));
app.get('/api/quant/compare/:ticker',async(q,r)=>r.json(await h9(`/api/v1/compare/${q.params.ticker}`)));
app.get('/api/quant/quote',async(q,r)=>r.json(await h9('/api/v1/quote',{tickers:q.query.tickers||'AAPL'})));
app.get('/api/quant/backtest/:ticker',async(q,r)=>r.json(await h9(`/backtest/${q.params.ticker}`)));

// ===== H12: Real-Time Crypto & Stock Market API =====
app.get('/api/rtm/health',async(q,r)=>r.json(await h12('/')));
app.get('/api/rtm/crypto/price',async(q,r)=>r.json(await h12('/api/market/crypto/price',{ids:q.query.ids||'bitcoin,ethereum',currency:q.query.currency||'usd'})));
app.get('/api/rtm/crypto/trending',async(q,r)=>r.json(await h12('/api/market/crypto/trending')));
app.get('/api/rtm/crypto/list',async(q,r)=>r.json(await h12('/api/market/crypto/list',{currency:q.query.currency||'usd',page:q.query.page||'1',page_size:q.query.page_size||'100'})));
app.get('/api/rtm/crypto/history',async(q,r)=>r.json(await h12('/api/market/crypto/history',{id:q.query.id||'bitcoin',days:q.query.days||'7',currency:q.query.currency||'usd'})));
app.get('/api/rtm/stock/price',async(q,r)=>r.json(await h12('/api/market/stock/price',{symbol:q.query.symbol||'AAPL'})));
app.get('/api/rtm/stock/history',async(q,r)=>r.json(await h12('/api/market/stock/history',{symbol:q.query.symbol||'AAPL',interval:q.query.interval||'daily'})));
app.get('/api/rtm/forex',async(q,r)=>r.json(await h12('/api/market/forex',{from:q.query.from||'usd',to:q.query.to||'eur'})));

// ===== H11: Quicksilver Trading Signals =====
app.get('/api/qs/health',async(q,r)=>r.json(await h11('/health')));
app.get('/api/qs/signals',async(q,r)=>r.json(await h11('/signals')));
app.get('/api/qs/market',async(q,r)=>r.json(await h11('/market')));
app.get('/api/qs/trades',async(q,r)=>r.json(await h11('/trades')));
app.get('/api/qs/strategies',async(q,r)=>r.json(await h11('/strategies')));
app.get('/api/qs/performance',async(q,r)=>r.json(await h11('/performance')));
app.get('/api/qs/pricing',async(q,r)=>r.json(await h11('/pricing')));
app.get('/api/qs/status',async(q,r)=>r.json(await h11('/status')));
app.get('/api/qs/register',async(q,r)=>r.json(await h11('/register',{tier:q.query.tier||'free'})));
app.post('/api/qs/backtest',async(q,r)=>r.json(await h11Post('/backtest',q.body||{symbol:'BTC',strategy:'bollinger_bounce'})));

// ===== H10: Stock Market by DataNest =====
app.get('/api/datanest/quote/:symbol',async(q,r)=>r.json(await h10(`/quote/${q.params.symbol}`)));
app.get('/api/datanest/analysis/:symbol',async(q,r)=>r.json(await h10(`/analysis/${q.params.symbol}`)));
app.get('/api/datanest/earnings/:symbol',async(q,r)=>r.json(await h10(`/earnings/${q.params.symbol}`)));
app.get('/api/datanest/news/:symbol',async(q,r)=>r.json(await h10(`/news/${q.params.symbol}`)));
app.get('/api/datanest/compare',async(q,r)=>r.json(await h10('/compare')));
app.get('/api/datanest/movers',async(q,r)=>r.json(await h10('/movers')));
app.get('/api/datanest/analyze',async(q,r)=>r.json(await h10('/analyze')));

// ===== H7: Real-Time Future Price API =====
app.get('/api/futures/country',async(q,r)=>r.json(await h7('/v1/future/country',{search:q.query.search||'us'})));
app.get('/api/futures/currency',async(q,r)=>r.json(await h7('/v1/future/currency',{search:q.query.search||'usd'})));
app.get('/api/futures/market',async(q,r)=>r.json(await h7('/v1/future/market',{search:q.query.search||''})));
app.get('/api/futures/price/latest',async(q,r)=>r.json(await h7('/v1/future/price/latest',{tickers:q.query.tickers})));
app.get('/api/futures/price/date',async(q,r)=>r.json(await h7(`/v1/future/price/${q.query.date||'2025-01-01'}`,{tickers:q.query.tickers})));
app.get('/api/futures/news',async(q,r)=>r.json(await h7('/v1/future/news')));
app.get('/api/futures/news/details',async(q,r)=>r.json(await h7('/v1/news/details',{news_id:q.query.news_id})));
app.get('/api/futures/news/sentiment',async(q,r)=>r.json(await h7('/v1/news/sentiment-analysis/details',{news_id:q.query.news_id})));
app.get('/api/futures/ai/candlestick',async(q,r)=>r.json(await h7('/v1/future/ai-based-analysis/candlestick-pattern-with-technical-indicator',{ticker:q.query.ticker,market:q.query.market||'EUREX',interval:q.query.interval||'1D'})));
app.get('/api/futures/ai/strategy',async(q,r)=>r.json(await h7('/v1/future/ai-based-analysis/generate-trading-stretegy',{ticker:q.query.ticker,market:q.query.market||'EUREX',interval:q.query.interval||'1D'})));
app.get('/api/futures/ai/signal',async(q,r)=>r.json(await h7('/v1/future/ai-based-analysis/trading-signal-analysis',{ticker:q.query.ticker,market:q.query.market||'EUREX',interval:q.query.interval||'1D'})));
app.get('/api/futures/ai/backtest',async(q,r)=>r.json(await h7('/v1/future/ai-based-analysis/backtest-trading-strategy',{ticker:q.query.ticker,market:q.query.market||'EUREX',interval:q.query.interval||'1D'})));

// ===== MASTER ANALYZE — All 7 hosts =====
app.get('/api/analyze',async(req,res)=>{
    const{symbol,timeframe,market_type}=req.query;
    if(!symbol)return res.status(400).json({error:'Symbol required'});
    const tf=timeframe||'1d';const mtype=market_type||'crypto';
    const ticker=symbol;const market='BINANCE';
    const aiInt=tf==='1d'?'1D':tf==='4h'?'4H':'1D';
    const bnTicker=`BINANCE:${symbol}`;
    const base=symbol.replace('USDT','').replace('BUSD','');
    const thTicker=`${base}-USD`;
    const tvTF={'1m':'1','2m':'2','5m':'5','10m':'10','15m':'15','30m':'30','1h':'60','2h':'120','4h':'240','1d':'D'}[tf]||'60';
    const start=Date.now();
    console.log(`[v7] ${symbol}@${tf} (${mtype})`);

    // Determine TV symbol format
    let tvSymbol=bnTicker;
    if(mtype==='stock')tvSymbol=`NASDAQ:${symbol}`;
    if(mtype==='forex')tvSymbol=`FX:${symbol}`;
    if(mtype==='economy')tvSymbol=`TVC:${symbol}`;

    // Build parallel calls based on market type
    const calls=[];
    const callNames=[];

    // Always call TradingView Data API (works for ALL markets)
    calls.push(apiGet(H6,`/api/quote/${tvSymbol}`,{session:'regular',fields:'all'}));callNames.push('tvQuote');
    calls.push(apiGet(H6,`/api/price/${tvSymbol}`,{timeframe:tvTF,range:'50'}));callNames.push('tvPrice');
    calls.push(apiGet(H6,`/api/ta/${tvSymbol}/indicators`));callNames.push('tvTA');

    if(mtype==='crypto'){
        // H1: Technical
        calls.push(apiGet(H1,'/price',{symbol,timeframe:tf}));callNames.push('techPrice');
        calls.push(apiGet(H1,'/volume',{symbol,timeframe:tf}));callNames.push('volume');
        calls.push(apiGet(H1,'/sma',{symbol,timeframe:tf,length:'14'}));callNames.push('sma14');
        calls.push(apiGet(H1,'/sma',{symbol,timeframe:tf,length:'50'}));callNames.push('sma50');
        calls.push(apiGet(H1,'/sma',{symbol,timeframe:tf,length:'200'}));callNames.push('sma200');
        calls.push(apiGet(H1,'/ema',{symbol,timeframe:tf,length:'20'}));callNames.push('ema20');
        calls.push(apiGet(H1,'/ema',{symbol,timeframe:tf,length:'50'}));callNames.push('ema50');
        calls.push(apiGet(H1,'/wma',{symbol,timeframe:tf,length:'14'}));callNames.push('wma14');
        calls.push(apiGet(H1,'/adx',{symbol,timeframe:tf,diLength:'14',adxSmoothing:'14'}));callNames.push('adx');
        calls.push(apiGet(H1,'/tsi',{symbol,timeframe:tf,long:'25',short:'13',siglen:'13'}));callNames.push('tsi');
        calls.push(apiGet(H1,'/williamsR',{symbol,timeframe:tf,length:'14'}));callNames.push('williams');
        calls.push(apiGet(H1,'/psar',{symbol,timeframe:tf,start:'0.02',increment:'0.02',maximum:'0.2'}));callNames.push('psar');
        calls.push(apiGet(H1,'/volume-oscillator',{symbol,timeframe:tf,shortlen:'5',longlen:'10'}));callNames.push('volOsc');
        calls.push(apiGet(H1,'/sd',{symbol,timeframe:tf,periods:'5',deviations:'1'}));callNames.push('sd');
        // H2
        calls.push(apiGet(H2,'/v1/crypto/news',{tickers:bnTicker}));callNames.push('news');
        calls.push(apiGet(H2,'/v1/crypto/ai-based-analysis/trading-signal-analysis',{ticker,market,interval:aiInt}));callNames.push('aiSignal');
        // H3
        calls.push(apiGet(H3,'/v1/signal',{ticker:thTicker,period:'1mo'}));callNames.push('thSignal');
        calls.push(apiGet(H3,'/v1/sentiment',{ticker:thTicker,headlines:'20'}));callNames.push('thSentiment');
        // H4
        calls.push(apiGet(H4,'/rapidapi/fear-greed'));callNames.push('fearGreed');
        calls.push(apiGet(H4,'/rapidapi/signal',{pair:symbol}));callNames.push('stSignal');
        // H5
        calls.push(apiGet(H5,`/indicators/${base}`));callNames.push('staIndicators');
        // H7: Futures AI
        calls.push(h7('/v1/future/ai-based-analysis/trading-signal-analysis',{ticker:symbol,market:'BINANCE',interval:aiInt}));callNames.push('futSignal');
        calls.push(h7('/v1/future/news'));callNames.push('futNews');
        // H8: Forex/Gold Trend
        const fxTF={'1m':'M1','2m':'M5','5m':'M5','10m':'M15','15m':'M15','30m':'M30','1h':'H1','2h':'H4','4h':'H4','1d':'D1'}[tf]||'D1';
        calls.push(h8(`/${fxTF}`));callNames.push('fxTrend');
        // H9: QuantSignalPro
        calls.push(h9(`/api/v1/backtest/${base}/signals`));callNames.push('quantSignals');
        calls.push(h9('/api/v1/scanner'));callNames.push('quantScanner');
        // H10: DataNest Stock Analysis
        calls.push(h10(`/analysis/${base}`));callNames.push('datanestAnalysis');
        calls.push(h10(`/quote/${base}`));callNames.push('datanestQuote');
        // H11: Quicksilver Trading Signals
        calls.push(h11('/signals'));callNames.push('qsSignals');
        calls.push(h11('/market'));callNames.push('qsMarket');
        // H12: RT Market crypto price
        calls.push(h12('/api/market/crypto/price',{ids:base.toLowerCase(),currency:'usd'}));callNames.push('rtmPrice');
        calls.push(h12('/api/market/crypto/trending'));callNames.push('rtmTrending');
    } else {
        // For stock/forex/economy — use H5 + H6 only
        calls.push(apiGet(H5,`/indicators/${symbol}`));callNames.push('staIndicators');
        calls.push(apiGet(H5,`/signals/${symbol}`));callNames.push('staSignals');
        calls.push(apiGet(H5,`/analysis/${symbol}`));callNames.push('staAnalysis');
    }

    const results=await Promise.all(calls);
    const total=Date.now()-start;
    console.log(`[v7] Done ${total}ms`);

    // Build response object
    const resp={symbol,timeframe:tf,market_type:mtype,timestamp:new Date().toISOString(),totalLatency:total};
    callNames.forEach((name,i)=>resp[name]=results[i]);
    res.json(resp);
});

app.get('/',(q,r)=>r.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT,'0.0.0.0',()=>{console.log(`Server on ${PORT} | Nayon Alpha Signals v12.0 | 12 hosts | Key: ${KEY?'OK':'MISSING'}`)});
