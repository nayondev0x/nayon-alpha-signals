// =====================================================
// NAYON ALPHA SIGNALS v5.0 — Backend API Proxy Server
// Developed by NayonDev
// API Key secured via .env — NEVER exposed to client
// 5 RapidAPI Hosts • 39+ Endpoints
// =====================================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const KEY = process.env.RAPIDAPI_KEY;
const H1 = process.env.RAPIDAPI_HOST_TECHNICAL;
const H2 = process.env.RAPIDAPI_HOST_PRICE;
const H3 = process.env.RAPIDAPI_HOST_TRADERS;
const H4 = process.env.RAPIDAPI_HOST_SELFTRADE;
const H5 = process.env.RAPIDAPI_HOST_STOCKTA;
app.use(cors()); app.use(express.json()); app.use(express.static(path.join(__dirname,'public')));

async function fetchAPI(base,host,ep,params={}){
    const qs=new URLSearchParams(params).toString();
    const url=`https://${host}${ep}${qs?'?'+qs:''}`;
    const s=Date.now();
    try{
        const r=await fetch(url,{method:'GET',headers:{'x-rapidapi-key':KEY,'x-rapidapi-host':host},timeout:20000});
        const lat=Date.now()-s;
        if(!r.ok)throw new Error(`${r.status}: ${await r.text()}`);
        const d=await r.json();return{data:d,latency:lat,success:true};
    }catch(e){return{data:null,latency:Date.now()-s,success:false,error:e.message}}
}
const h1=(ep,p)=>fetchAPI(null,H1,ep,p);
const h2=(ep,p)=>fetchAPI(null,H2,ep,p);
const h3=(ep,p)=>fetchAPI(null,H3,ep,p);
const h4=(ep,p)=>fetchAPI(null,H4,ep,p);
const h5=(ep,p)=>fetchAPI(null,H5,ep,p);

// ===== HOST 1: Technical Analysis =====
app.get('/api/tech/price',(q,r)=>{r.json(h1('/price',{symbol:q.query.symbol,timeframe:q.query.timeframe||'1d'})).catch(()=>{})});
// Simplified: single route for all tech endpoints
const techEndpoints=['price','volume','sma','ema','wma','adx','tsi','volume-oscillator','williamsR','psar','sd','symbols'];
app.get('/api/tech/:endpoint',async(req,res)=>{
    const ep=req.params.endpoint;const{symbol,timeframe,length}=req.query;const tf=timeframe||'1d';
    let params={symbol,timeframe:tf};
    if(ep==='sma'||ep==='ema'||ep==='wma')params.length=length||'14';
    if(ep==='adx'){params.diLength='14';params.adxSmoothing='14'}
    if(ep==='tsi'){params.long='25';params.short='13';params.siglen='13'}
    if(ep==='volume-oscillator'){params.shortlen='5';params.longlen='10'}
    if(ep==='williamsR')params.length=length||'14';
    if(ep==='psar'){params.start='0.02';params.increment='0.02';params.maximum='0.2'}
    if(ep==='sd'){params.periods='5';params.deviations='1'}
    if(ep==='symbols')params={};
    res.json(await h1('/'+ep,params));
});

// ===== HOST 2: Real-Time Price =====
app.get('/api/price/latest',async(q,r)=>r.json(await h2('/v1/crypto/price/latest',{tickers:q.query.tickers||'BINANCE:BTCUSDT'})));
app.get('/api/price/historical',async(q,r)=>r.json(await h2('/v1/crypto/historical-price',{ticker:q.query.ticker||'BTCUSDT',market:q.query.market||'BINANCE',start:q.query.start||'2025-05-01',interval:q.query.interval||'1D',page:q.query.page||'1'})));
app.get('/api/price/intraday',async(q,r)=>r.json(await h2('/v1/crypto/intraday-price',{ticker:q.query.ticker||'BTCUSDT',market:q.query.market||'BINANCE',interval:q.query.interval||'2hour',duration:q.query.duration||'1mon'})));
app.get('/api/price/search',async(q,r)=>r.json(await h2('/v1/crypto/search',{tickers:q.query.tickers})));
app.get('/api/price/advanced-search',async(q,r)=>r.json(await h2('/v1/crypto/advanced-search',{page:q.query.page||'1',limit:q.query.limit||'15'})));
app.get('/api/price/market',async(q,r)=>r.json(await h2('/v1/crypto/market',{search:q.query.search||''})));
app.get('/api/price/currency',async(q,r)=>r.json(await h2('/v1/crypto/currency')));
app.get('/api/news/list',async(q,r)=>r.json(await h2('/v1/crypto/news',{tickers:q.query.tickers||'BINANCE:BTCUSDT'})));
app.get('/api/news/details',async(q,r)=>r.json(await h2('/v1/news/details',{news_id:q.query.news_id})));
app.get('/api/news/sentiment',async(q,r)=>r.json(await h2('/v1/news/sentiment-analysis/details',{news_id:q.query.news_id})));
app.get('/api/ai/signal',async(q,r)=>r.json(await h2('/v1/crypto/ai-based-analysis/trading-signal-analysis',{ticker:q.query.ticker||'BTCUSDT',market:q.query.market||'BINANCE',interval:q.query.interval||'1D'})));
app.get('/api/ai/strategy',async(q,r)=>r.json(await h2('/v1/crypto/ai-based-analysis/generate-trading-stretegy',{ticker:q.query.ticker||'BTCUSDT',market:q.query.market||'BINANCE',interval:q.query.interval||'1D'})));
app.get('/api/ai/backtest',async(q,r)=>r.json(await h2('/v1/crypto/ai-based-analysis/backtest-trading-strategy',{ticker:q.query.ticker||'BTCUSDT',market:q.query.market||'BINANCE',interval:q.query.interval||'1D'})));
app.get('/api/ai/candlestick',async(q,r)=>r.json(await h2('/v1/crypto/ai-based-analysis/candlestick-pattern-with-technical-indicator',{ticker:q.query.ticker||'BTCUSDT',market:q.query.market||'BINANCE',interval:q.query.interval||'1D'})));

// ===== HOST 3: Traders Hub =====
app.get('/api/traders/signal',async(q,r)=>r.json(await h3('/v1/signal',{ticker:q.query.ticker,period:q.query.period||'1mo'})));
app.get('/api/traders/sentiment',async(q,r)=>r.json(await h3('/v1/sentiment',{ticker:q.query.ticker,headlines:q.query.headlines||'20'})));
app.get('/api/traders/multiframe',async(q,r)=>r.json(await h3('/v1/multiframe',{ticker:q.query.ticker})));
app.get('/api/traders/health',async(q,r)=>r.json(await h3('/v1/health')));

// ===== HOST 4: SelfTrade (NEW) =====
app.get('/api/selftrade/fear-greed',async(q,r)=>r.json(await h4('/rapidapi/fear-greed')));
app.get('/api/selftrade/funding-rates',async(q,r)=>r.json(await h4('/rapidapi/funding-rates')));
app.get('/api/selftrade/pairs',async(q,r)=>r.json(await h4('/rapidapi/pairs')));
app.get('/api/selftrade/signal',async(q,r)=>r.json(await h4('/rapidapi/signal',{pair:q.query.pair||'BTCUSDT'})));

// ===== HOST 5: Stock Technical Analysis (NEW) =====
app.get('/api/stockta/indicators',async(q,r)=>r.json(await h5(`/indicators/${q.query.symbol||'AAPL'}`)));
app.get('/api/stockta/signals',async(q,r)=>r.json(await h5(`/signals/${q.query.symbol||'AAPL'}`)));
app.get('/api/stockta/analysis',async(q,r)=>r.json(await h5(`/analysis/${q.query.symbol||'AAPL'}`)));
app.get('/api/stockta/screen',async(q,r)=>r.json(await h5('/screen')));

// ===== MASTER ANALYSIS =====
app.get('/api/analyze',async(req,res)=>{
    const{symbol,timeframe}=req.query;
    if(!symbol)return res.status(400).json({error:'Symbol required'});
    const tf=timeframe||'1d';const ticker=symbol;const market='BINANCE';
    const aiInt=tf==='1d'?'1D':tf==='4h'?'4H':tf==='1h'?'1H':'1D';
    const bnTicker=`BINANCE:${symbol}`;
    const base=symbol.replace('USDT','').replace('BUSD','').replace(/BTC$/,'');
    const thTicker=base.length<=1?symbol:`${base}-USD`;
    const thPeriod=tf==='1d'?'1mo':tf==='4h'?'5d':'1d';
    const start=Date.now();
    console.log(`[v5] ${symbol}@${tf} — 5 hosts firing...`);

    const[
        // H1: Technical
        tPrice,tVol,s14,s50,s200,e20,e50,w14,adx,tsi,vOsc,will,psar,sd,
        // H2: Price/AI
        ltPrice,intra,news,aiSig,aiStrat,aiBt,aiCandle,
        // H3: Traders Hub
        thSig,thSent,thMulti,
        // H4: SelfTrade (NEW)
        stFearGreed,stFunding,stSignal,
        // H5: Stock TA (NEW)
        staIndicators,staSignals,staAnalysis
    ]=await Promise.all([
        h1('/price',{symbol,timeframe:tf}),h1('/volume',{symbol,timeframe:tf}),
        h1('/sma',{symbol,timeframe:tf,length:'14'}),h1('/sma',{symbol,timeframe:tf,length:'50'}),h1('/sma',{symbol,timeframe:tf,length:'200'}),
        h1('/ema',{symbol,timeframe:tf,length:'20'}),h1('/ema',{symbol,timeframe:tf,length:'50'}),
        h1('/wma',{symbol,timeframe:tf,length:'14'}),
        h1('/adx',{symbol,timeframe:tf,diLength:'14',adxSmoothing:'14'}),
        h1('/tsi',{symbol,timeframe:tf,long:'25',short:'13',siglen:'13'}),
        h1('/volume-oscillator',{symbol,timeframe:tf,shortlen:'5',longlen:'10'}),
        h1('/williamsR',{symbol,timeframe:tf,length:'14'}),
        h1('/psar',{symbol,timeframe:tf,start:'0.02',increment:'0.02',maximum:'0.2'}),
        h1('/sd',{symbol,timeframe:tf,periods:'5',deviations:'1'}),
        h2('/v1/crypto/price/latest',{tickers:bnTicker}),
        h2('/v1/crypto/intraday-price',{ticker,market,interval:'2hour',duration:'1mon'}),
        h2('/v1/crypto/news',{tickers:bnTicker}),
        h2('/v1/crypto/ai-based-analysis/trading-signal-analysis',{ticker,market,interval:aiInt}),
        h2('/v1/crypto/ai-based-analysis/generate-trading-stretegy',{ticker,market,interval:aiInt}),
        h2('/v1/crypto/ai-based-analysis/backtest-trading-strategy',{ticker,market,interval:aiInt}),
        h2('/v1/crypto/ai-based-analysis/candlestick-pattern-with-technical-indicator',{ticker,market,interval:aiInt}),
        h3('/v1/signal',{ticker:thTicker,period:thPeriod}),
        h3('/v1/sentiment',{ticker:thTicker,headlines:'20'}),
        h3('/v1/multiframe',{ticker:thTicker}),
        h4('/rapidapi/fear-greed'),h4('/rapidapi/funding-rates'),h4('/rapidapi/signal',{pair:symbol}),
        h5(`/indicators/${base}`),h5(`/signals/${base}`),h5(`/analysis/${base}`)
    ]);
    const total=Date.now()-start;
    console.log(`[v5] Done ${total}ms`);
    res.json({
        symbol,timeframe:tf,timestamp:new Date().toISOString(),totalLatency:total,
        technical:{price:tPrice,volume:tVol,sma14:s14,sma50:s50,sma200:s200,ema20:e20,ema50:e50,wma14:w14,adx,tsi,volOsc:vOsc,williams:will,psar,sd},
        realtime:{latestPrice:ltPrice,intradayPrice:intra},
        news,
        ai:{signal:aiSig,strategy:aiStrat,backtest:aiBt,candlestick:aiCandle},
        tradersHub:{signal:thSig,sentiment:thSent,multiframe:thMulti},
        selfTrade:{fearGreed:stFearGreed,fundingRates:stFunding,signal:stSignal},
        stockTA:{indicators:staIndicators,signals:staSignals,analysis:staAnalysis}
    });
});

app.get('/api/health',(q,r)=>r.json({status:'online',platform:'Nayon Alpha Signals v5.0',developer:'NayonDev',hosts:{h1:!!H1,h2:!!H2,h3:!!H3,h4:!!H4,h5:!!H5},keyConfigured:!!KEY,endpoints:39,timestamp:new Date().toISOString()}));
app.get('/',(q,r)=>r.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT,()=>{console.log(`
╔══════════════════════════════════════════════════════════════╗
║       NAYON ALPHA SIGNALS v5.0 — AI Trading Engine          ║
║       Developed & Powered by NayonDev                       ║
║       http://localhost:${PORT}                                   ║
║       API Key: ${KEY?'✅ Secured':'❌ Missing'}                              ║
║       Host 1 (Technical):     ${H1?'✅':'❌'}                              ║
║       Host 2 (Price/AI):      ${H2?'✅':'❌'}                              ║
║       Host 3 (Traders Hub):   ${H3?'✅':'❌'}                              ║
║       Host 4 (SelfTrade):     ${H4?'✅':'❌'}  ← NEW                      ║
║       Host 5 (Stock TA):      ${H5?'✅':'❌'}  ← NEW                      ║
║       Total Endpoints: 39+                                  ║
╚══════════════════════════════════════════════════════════════╝
`)});
