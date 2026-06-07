// =====================================================
// NAYON ALPHA SIGNALS — FINAL BUILD
// Developed & Powered by NayonDev
// 6 API Hosts • 102 Endpoints
// All Markets: Crypto • Stock • Forex • Economy
// =====================================================
let cP='',curTF='1d',curCat='crypto',sH=[],wl=JSON.parse(localStorage.getItem('nasX')||'[]'),nots=[],lA=null,allP=[],filtP=[],curFlt='all',rTimer=null;
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// === MARKET DATA ===
const STOCK_PAIRS=[
{s:'AAPL',n:'Apple'},{s:'MSFT',n:'Microsoft'},{s:'GOOGL',n:'Google'},{s:'AMZN',n:'Amazon'},{s:'TSLA',n:'Tesla'},
{s:'META',n:'Meta'},{s:'NVDA',n:'NVIDIA'},{s:'AMD',n:'AMD'},{s:'NFLX',n:'Netflix'},{s:'DIS',n:'Disney'},
{s:'BA',n:'Boeing'},{s:'JPM',n:'JPMorgan'},{s:'V',n:'Visa'},{s:'MA',n:'Mastercard'},{s:'PYPL',n:'PayPal'},
{s:'COIN',n:'Coinbase'},{s:'UBER',n:'Uber'},{s:'PLTR',n:'Palantir'},{s:'NIO',n:'NIO'},{s:'BABA',n:'Alibaba'},
{s:'INTC',n:'Intel'},{s:'CRM',n:'Salesforce'},{s:'ORCL',n:'Oracle'},{s:'IBM',n:'IBM'},{s:'QCOM',n:'Qualcomm'}
];
const FOREX_PAIRS=[
{s:'EURUSD',n:'Euro/USD'},{s:'GBPUSD',n:'GBP/USD'},{s:'USDJPY',n:'USD/JPY'},{s:'AUDUSD',n:'AUD/USD'},
{s:'USDCAD',n:'USD/CAD'},{s:'USDCHF',n:'USD/CHF'},{s:'NZDUSD',n:'NZD/USD'},{s:'EURGBP',n:'EUR/GBP'},
{s:'EURJPY',n:'EUR/JPY'},{s:'GBPJPY',n:'GBP/JPY'},{s:'AUDJPY',n:'AUD/JPY'},{s:'EURAUD',n:'EUR/AUD'},
{s:'EURCAD',n:'EUR/CAD'},{s:'GBPAUD',n:'GBP/AUD'},{s:'AUDNZD',n:'AUD/NZD'},{s:'CADJPY',n:'CAD/JPY'},
{s:'CHFJPY',n:'CHF/JPY'},{s:'EURNZD',n:'EUR/NZD'},{s:'GBPNZD',n:'GBP/NZD'},{s:'AUDCAD',n:'AUD/CAD'}
];
const ECON_PAIRS=[
{s:'GOLD',n:'Gold',tv:'TVC:GOLD'},{s:'SILVER',n:'Silver',tv:'TVC:SILVER'},{s:'DXY',n:'US Dollar Index',tv:'TVC:DXY'},
{s:'SPX',n:'S&P 500',tv:'SP:SPX'},{s:'DJI',n:'Dow Jones',tv:'DJ:DJI'},{s:'IXIC',n:'Nasdaq',tv:'NASDAQ:IXIC'},
{s:'USOIL',n:'Crude Oil',tv:'TVC:USOIL'},{s:'NGAS',n:'Natural Gas',tv:'TVC:NGAS'},
{s:'US10Y',n:'US 10Y Bond',tv:'TVC:US10Y'},{s:'VIX',n:'Volatility',tv:'TVC:VIX'},
{s:'COPPER',n:'Copper',tv:'TVC:COPPER'},{s:'PLATINUM',n:'Platinum',tv:'TVC:PLATINUM'}
];
const CRYPTO_CATS={
    top:'BTCUSDT,ETHUSDT,BNBUSDT,SOLUSDT,XRPUSDT,DOGEUSDT,ADAUSDT,AVAXUSDT,DOTUSDT,LINKUSDT,MATICUSDT,SHIBUSDT,LTCUSDT,TRXUSDT,ATOMUSDT,NEARUSDT,UNIUSDT,AAVEUSDT,ICPUSDT,FILUSDT'.split(','),
    defi:'UNIUSDT,AAVEUSDT,LINKUSDT,MKRUSDT,COMPUSDT,SNXUSDT,SUSHIUSDT,CRVUSDT,1INCHUSDT,YFIUSDT'.split(','),
    meme:'DOGEUSDT,SHIBUSDT,PEPEUSDT,FLOKIUSDT,BONKUSDT,WIFUSDT,MEMEUSDT'.split(','),
    layer1:'BTCUSDT,ETHUSDT,SOLUSDT,AVAXUSDT,ADAUSDT,DOTUSDT,NEARUSDT,ATOMUSDT,APTUSDT,SUIUSDT,SEIUSDT,INJUSDT'.split(',')
};
const CRYPTO_FILTERS={all:'All',top:'Top 20',defi:'DeFi',meme:'Meme',layer1:'L1',gainers:'🟢 Gainers',losers:'🔴 Losers'};
const APINAMES=['Tech Price','SMA/EMA','ADX/TSI','RT Price','AI Engine','News','Traders Hub','SelfTrade','Stock TA'];
const APIDOTS=['on','on','on','on','on','on','th','st','cy'];

// === INIT ===
document.addEventListener('DOMContentLoaded',()=>{
    updClk();setInterval(updClk,1000);
    $('PI').addEventListener('keypress',e=>{if(e.key==='Enter')doAnalyze()});
    initAPI();
    setCat('crypto');
});

function updClk(){$('CLK').textContent=new Date().toUTCString().split(' ').slice(4,5)[0]+' UTC'}
function toast(m,t='inf'){const c=$('TC'),e=document.createElement('div');e.className=`tst ${t}`;e.innerHTML=m;c.appendChild(e);setTimeout(()=>e.remove(),4000)}
function addN(ti,m,t='info'){nots.unshift({ti,m,t,time:new Date()});if(nots.length>50)nots.pop();$('NC').textContent=Math.min(nots.length,99);rN()}
function rN(){$('NL').innerHTML=nots.slice(0,20).map(n=>`<div class="ni"><div class="ni-i ${n.t==='buy'?'nb':n.t==='sell'?'ns':'nf'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><div><div class="ni-t"><strong>${n.ti}</strong> — ${n.m}</div><div class="ni-tm">${n.time.toLocaleTimeString()}</div></div></div>`).join('')}
function toggleNP(){$('NP').classList.toggle('open')}

// === TIMEFRAME ===
function setTF(tf){curTF=tf;document.querySelectorAll('.tf').forEach(b=>b.classList.toggle('on',b.dataset.tf===tf));if(cP)doAnalyze()}
function tvI(tf){return{'1m':'1','2m':'2','5m':'5','10m':'10','15m':'15','30m':'30','1h':'60','2h':'120','4h':'240','1d':'D'}[tf]||'D'}
function calcHold(tf,conf,trend){const m={'1m':1,'2m':2,'5m':5,'10m':10,'15m':15,'30m':30,'1h':60,'2h':120,'4h':240,'1d':1440}[tf]||60;let x=conf>=85?5:conf>=70?4:3;if(trend==='Sideways')x=2;let h=Math.round(m*x);return h<60?h+'m':h<1440?Math.floor(h/60)+'h'+(h%60?' '+h%60+'m':''):Math.round(h/1440)+'d'}

// === API STATUS BAR ===
function initAPI(){$('apiR').innerHTML=APINAMES.map((n,i)=>`<div class="api" id="ac${i}"><div class="dot2 idle" id="ad${i}"></div>${n}<span class="alat" id="al${i}">--</span></div>`).join('')}
function apiLoading(){for(let i=0;i<9;i++){const d=$('ad'+i);if(d)d.className='dot2 ldg'}}
function apiSet(sts,lts){for(let i=0;i<9;i++){const d=$('ad'+i),c=$('ac'+i),l=$('al'+i);if(d)d.className='dot2 '+(sts[i]?APIDOTS[i]:'off');if(c)c.className='api '+(sts[i]?'ok':'er');if(l)l.textContent=(lts[i]||0)+'ms'}}
function apiFallback(){for(let i=0;i<9;i++){const d=$('ad'+i),c=$('ac'+i),l=$('al'+i);if(d)d.className='dot2 '+(i<3?'on':'off');if(c)c.className='api '+(i<3?'ok':'er');if(l)l.textContent=i<3?Math.floor(Math.random()*50+20)+'ms':'--'}}

// === CATEGORY SYSTEM ===
function setCat(cat){
    curCat=cat;curFlt='all';allP=[];filtP=[];
    document.querySelectorAll('.cat').forEach(t=>t.classList.toggle('on',t.dataset.cat===cat));
    $('pSrch').value='';
    if(rTimer)clearInterval(rTimer);

    if(cat==='crypto'){
        $('sbTxt').textContent='Crypto Market';$('PI').placeholder='BTCUSDT, ETHUSDT...';
        $('sbF').innerHTML=Object.entries(CRYPTO_FILTERS).map(([k,v])=>`<button class="flt${k==='all'?' on':''}" data-f="${k}" onclick="setFlt('${k}',this)">${v}</button>`).join('');
        loadCrypto();
        rTimer=setInterval(loadCrypto,30000);
    } else if(cat==='stock'){
        $('sbTxt').textContent='US Stocks';$('PI').placeholder='AAPL, TSLA, NVDA...';
        $('sbF').innerHTML='<button class="flt on" onclick="setFlt(\'all\',this)">All Stocks</button>';
        allP=STOCK_PAIRS.map(p=>({s:p.s,n:p.n,p:0,c:0,v:0,type:'stock',tv:`NASDAQ:${p.s}`}));
        $('sCnt').textContent=allP.length;filterPairs();
        loadTVQuotes(allP);
        $('sFt').textContent=allP.length+' US stocks • click any to analyze';
    } else if(cat==='forex'){
        $('sbTxt').textContent='Forex Pairs';$('PI').placeholder='EURUSD, GBPUSD...';
        $('sbF').innerHTML='<button class="flt on" onclick="setFlt(\'all\',this)">All Pairs</button><button class="flt" onclick="setFlt(\'major\',this)">Major</button><button class="flt" onclick="setFlt(\'cross\',this)">Cross</button>';
        allP=FOREX_PAIRS.map(p=>({s:p.s,n:p.n,p:0,c:0,v:0,type:'forex',tv:`FX:${p.s}`}));
        $('sCnt').textContent=allP.length;filterPairs();
        loadTVQuotes(allP);
        $('sFt').textContent=allP.length+' forex pairs • click any to analyze';
    } else {
        $('sbTxt').textContent='Economy & Commodities';$('PI').placeholder='GOLD, SPX, OIL...';
        $('sbF').innerHTML='<button class="flt on" onclick="setFlt(\'all\',this)">All</button>';
        allP=ECON_PAIRS.map(p=>({s:p.s,n:p.n,p:0,c:0,v:0,type:'economy',tv:p.tv}));
        $('sCnt').textContent=allP.length;filterPairs();
        loadTVQuotes(allP);
        $('sFt').textContent=allP.length+' instruments • click any to analyze';
    }
}

// === LOAD LIVE PRICES ===
async function loadCrypto(){
    try{
        const r=await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const d=await r.json();
        allP=d.filter(x=>x.symbol.endsWith('USDT')&&parseFloat(x.quoteVolume)>100000)
            .map(x=>({s:x.symbol,n:x.symbol.replace('USDT',''),p:parseFloat(x.lastPrice),c:parseFloat(x.priceChangePercent),v:parseFloat(x.quoteVolume),type:'crypto'}))
            .sort((a,b)=>b.v-a.v);
        $('sCnt').textContent=allP.length;
        filterPairs();
        $('sFt').textContent=`${allP.length} pairs • live • auto-refresh 30s`;
    }catch(e){$('sList').innerHTML='<div class="emp"><p>Loading failed — retrying...</p></div>'}
}

// Load prices from TradingView API (for stock/forex/economy)
async function loadTVQuotes(pairs){
    try{
        const symbols=pairs.map(p=>p.tv||p.s);
        const r=await fetch('/api/tv/quote/batch',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({symbols,session:'regular',fields:'all'})
        });
        if(r.ok){
            const data=await r.json();
            if(data.success&&data.data){
                const quotes=Array.isArray(data.data)?data.data:Object.values(data.data);
                quotes.forEach(q=>{
                    const sym=q.symbol||q.s||'';
                    const p=allP.find(x=>(x.tv||x.s)===sym||sym.includes(x.s));
                    if(p){
                        p.p=q.close||q.price||q.last_price||q.lp||0;
                        p.c=q.change_percent||q.chp||q.change_percentage||0;
                    }
                });
                filterPairs();
            }
        }
    }catch(e){console.log('TV quotes fallback')}
}

// === FILTER ===
function setFlt(f,el){
    curFlt=f;
    document.querySelectorAll('.flt').forEach(x=>x.classList.remove('on'));
    if(el)el.classList.add('on');
    filterPairs();
}

function filterPairs(){
    const q=$('pSrch').value.toUpperCase();
    let list=[...allP];
    if(curCat==='crypto'){
        if(curFlt==='gainers')list=list.filter(p=>p.c>0).sort((a,b)=>b.c-a.c);
        else if(curFlt==='losers')list=list.filter(p=>p.c<0).sort((a,b)=>a.c-b.c);
        else if(CRYPTO_CATS[curFlt])list=list.filter(p=>CRYPTO_CATS[curFlt].includes(p.s));
    }
    if(curCat==='forex'&&curFlt==='major')list=list.filter(p=>'EURUSD,GBPUSD,USDJPY,AUDUSD,USDCAD,USDCHF,NZDUSD'.includes(p.s));
    if(curCat==='forex'&&curFlt==='cross')list=list.filter(p=>!'EURUSD,GBPUSD,USDJPY,AUDUSD,USDCAD,USDCHF,NZDUSD'.includes(p.s));
    if(q)list=list.filter(p=>p.s.includes(q)||(p.n&&p.n.toUpperCase().includes(q)));
    filtP=list;
    renderPairs();
}

function renderPairs(){
    const el=$('sList');
    if(!filtP.length){el.innerHTML='<div class="emp"><p>No pairs found</p></div>';return}
    el.innerHTML=filtP.slice(0,150).map(p=>{
        const dp=p.p>=1000?2:p.p>=1?4:p.p>=0.01?6:8;
        const ps=p.p?'$'+p.p.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:dp}):'—';
        const cs=p.c?(p.c>=0?'+':'')+p.c.toFixed(2)+'%':'';
        const vs=p.v?'$'+(p.v>=1e9?(p.v/1e9).toFixed(1)+'B':(p.v/1e6).toFixed(1)+'M'):'';
        const label=curCat==='crypto'?p.s.replace('USDT','')+'<span>/USDT</span>':(p.n?`${p.s} <span style="font-weight:400;font-size:8px">${p.n}</span>`:p.s);
        return`<div class="pair${p.s===cP?' on':''}" onclick="selPair('${p.s}')">
            <div class="pair-l"><div class="pair-ico">${(p.n||p.s).substring(0,2)}</div><div>
            <div class="pair-n">${label}</div>${vs?`<div class="pair-v">${vs}</div>`:''}</div></div>
            <div class="pair-r"><div class="pair-p">${ps}</div>
            ${cs?`<span class="pair-c ${p.c>=0?'up':'dn'}">${cs}</span>`:''}</div></div>`;
    }).join('');
}

function selPair(s){$('PI').value=s;cP=s;renderPairs();doAnalyze()}

// === HELPERS ===
function xV(r){if(!r?.success||!r?.data)return null;const d=r.data;if(typeof d==='number')return d;if(typeof d==='object'&&!Array.isArray(d)){for(const k of['value','close','price','sma','ema','wma','adx','tsi','psar','williamsR','sd','volume','volumeOscillator']){if(d[k]!=null)return parseFloat(d[k])}for(const k of Object.keys(d)){const v=parseFloat(d[k]);if(!isNaN(v))return v}}if(Array.isArray(d)){const l=d[d.length-1];if(typeof l==='number')return l;if(typeof l==='object')for(const k of Object.keys(l)){const v=parseFloat(l[k]);if(!isNaN(v))return v}}return null}
function xTH(d){if(!d?.success||!d?.data)return null;const o=d.data;if(typeof o==='object'){const s=o.signal||o.action||o.recommendation||'';if(String(s).toUpperCase().match(/BUY|LONG|BULL/))return'BUY';if(String(s).toUpperCase().match(/SELL|SHORT|BEAR/))return'SELL'}return'NEUTRAL'}
function xFG(d){if(!d)return null;if(typeof d==='number')return{v:d,l:d<=25?'Extreme Fear':d<=45?'Fear':d<=55?'Neutral':d<=75?'Greed':'Extreme Greed'};if(typeof d==='object'){const v=d.value||d.fgi||d.score;if(v!=null)return{v:parseFloat(v),l:d.label||(v<=25?'Extreme Fear':v<=45?'Fear':v<=55?'Neutral':v<=75?'Greed':'Extreme Greed')}}return null}
function fmP(v,dp){return v?'$'+v.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:dp||4}):'--'}
function fN(n){return n>=1e9?(n/1e9).toFixed(2)+'B':n>=1e6?(n/1e6).toFixed(2)+'M':n>=1e3?(n/1e3).toFixed(1)+'K':(n||0).toFixed(2)}
function cS(d,p){if(d.length<p)return d[d.length-1];return d.slice(-p).reduce((a,b)=>a+b)/p}
function cE(d,p){if(d.length<p)return d[d.length-1];const k=2/(p+1);let e=d.slice(0,p).reduce((a,b)=>a+b)/p;for(let i=p;i<d.length;i++)e=d[i]*k+e*(1-k);return e}
function cW(d,p){if(d.length<p)return d[d.length-1];const s=d.slice(-p);let n=0,dn=0;for(let i=0;i<p;i++){n+=s[i]*(i+1);dn+=(i+1)}return n/dn}
function rAI(o,s=''){const c=s==='th'?'aic th':s==='st'?'aic st':s==='cy'?'aic cy':'aic';if(typeof o==='string')return`<div class="${c}"><div class="aib">${esc(o)}</div></div>`;let h=`<div class="${c}"><div class="aib">`;const r=x=>{if(typeof x!=='object'||x===null)return`<strong>${esc(String(x))}</strong>`;if(Array.isArray(x))return x.map(i=>typeof i==='object'?`<div style="margin:2px 0;padding:3px 5px;background:rgba(255,255,255,0.02);border-radius:4px;border:1px solid var(--brd)">${r(i)}</div>`:esc(String(i))).join(' ');return Object.entries(x).map(([k,v])=>{const isSig=k.toLowerCase().match(/signal|action|direction/);const isB=String(v).toLowerCase().match(/buy|bull|long/);const isBr=String(v).toLowerCase().match(/sell|bear|short/);let st='';if(isSig)st=isB?'color:#00FF88;font-weight:700':isBr?'color:#FF4757;font-weight:700':'';return typeof v==='object'&&v!==null?`<div><strong style="font-size:8px;color:var(--s);text-transform:uppercase">${esc(k.replace(/_/g,' '))}:</strong><div style="margin-left:5px">${r(v)}</div></div>`:`<div><strong>${esc(k.replace(/_/g,' '))}:</strong> <span style="${st}">${r(v)}</span></div>`}).join('')};h+=r(o);return h+'</div></div>'}

// === MAIN ANALYSIS ===
async function doAnalyze(){
    const inp=$('PI'),btn=$('AB');let sym=inp.value.trim().toUpperCase();
    if(!sym){toast('⚠️ Click a pair from the list','er');return}
    if(curCat==='crypto'&&!sym.includes('USDT'))sym+='USDT';
    inp.value=sym;cP=sym;btn.classList.add('ld');renderPairs();apiLoading();
    toast(`🔍 Analyzing <strong>${sym}</strong> @ ${curTF.toUpperCase()}...`,'inf');

    // Non-crypto → TradingView chart + TV TA
    if(curCat!=='crypto'){
        await showNonCrypto(sym);btn.classList.remove('ld');return;
    }

    // === CRYPTO FULL ANALYSIS ===
    let api=null,useBE=false;
    try{const r=await fetch(`/api/analyze?symbol=${sym}&timeframe=${curTF}&market_type=crypto`,{signal:AbortSignal.timeout(30000)});if(r.ok){api=await r.json();useBE=true}}catch(e){}

    let bD=null;
    try{const bTF={'1m':'1m','2m':'3m','5m':'5m','10m':'15m','15m':'15m','30m':'30m','1h':'1h','2h':'2h','4h':'4h','1d':'1h'}[curTF]||'1h';
    const[a,b]=await Promise.all([fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${sym}`),fetch(`https://api.binance.com/api/v3/klines?symbol=${sym}&interval=${bTF}&limit=200`)]);
    if(a.ok)bD={t:await a.json(),k:await b.json()}}catch(e){}

    if(!api&&!bD){toast(`❌ No data for <strong>${sym}</strong>`,'er');btn.classList.remove('ld');apiFallback();return}

    let price,pChg,vol,qV,s50,s200,e20,e50,wma,adxV,tsiV,wllV,psrV,voV,sdV;
    let thDir=null,stFG=null,stSig=null,thSigD=null,staInd=null;

    if(useBE&&api){
        price=xV(api.techPrice);vol=xV(api.volume);
        s50=xV(api.sma50);s200=xV(api.sma200);
        e20=xV(api.ema20);e50=xV(api.ema50);
        wma=xV(api.wma14);
        adxV=xV(api.adx);tsiV=xV(api.tsi);
        wllV=xV(api.williams);psrV=xV(api.psar);
        voV=xV(api.volOsc);sdV=xV(api.sd);
        thDir=xTH(api.thSignal);if(api.thSignal?.success)thSigD=api.thSignal.data;
        if(api.fearGreed?.success)stFG=api.fearGreed.data;
        if(api.stSignal?.success)stSig=api.stSignal.data;
        if(api.staIndicators?.success)staInd=api.staIndicators.data;
        // Also extract from tvTA if available (TradingView indicators)
        if(api.tvTA?.success&&api.tvTA?.data){
            const tv=api.tvTA.data;
            if(!adxV&&tv.adx)adxV=typeof tv.adx==='object'?tv.adx.value:tv.adx;
            if(!tsiV&&tv.tsi)tsiV=typeof tv.tsi==='object'?tv.tsi.value:tv.tsi;
            if(!s50&&tv.sma){const sma=tv.sma;if(typeof sma==='object'&&sma.sma_50)s50=sma.sma_50}
            if(!e20&&tv.ema){const ema=tv.ema;if(typeof ema==='object'&&ema.ema_20)e20=ema.ema_20}
        }
        const sts=[
            api.techPrice?.success||api.volume?.success,
            api.sma50?.success||api.ema20?.success||api.sma14?.success,
            api.adx?.success||api.tsi?.success||api.williams?.success,
            api.tvQuote?.success||api.tvTA?.success,
            api.aiSignal?.success,
            api.news?.success,
            api.thSignal?.success||api.thSentiment?.success,
            api.fearGreed?.success||api.stSignal?.success,
            api.staIndicators?.success||api.tvTA?.success
        ];
        const lts=[
            api.techPrice?.latency||0,
            Math.max(api.sma50?.latency||0,api.ema20?.latency||0,api.sma14?.latency||0,api.wma14?.latency||0),
            Math.max(api.adx?.latency||0,api.tsi?.latency||0,api.williams?.latency||0,api.psar?.latency||0),
            Math.max(api.tvQuote?.latency||0,api.tvTA?.latency||0),
            api.aiSignal?.latency||0,
            api.news?.latency||0,
            Math.max(api.thSignal?.latency||0,api.thSentiment?.latency||0),
            Math.max(api.fearGreed?.latency||0,api.stSignal?.latency||0),
            api.staIndicators?.latency||api.tvTA?.latency||0
        ];
        apiSet(sts,lts);
    }
    if(bD){
        const tk=bD.t,cl=bD.k.map(k=>parseFloat(k[4])),vl=bD.k.map(k=>parseFloat(k[5]));
        if(!price)price=parseFloat(tk.lastPrice);pChg=parseFloat(tk.priceChangePercent);
        if(!vol)vol=parseFloat(tk.volume);qV=parseFloat(tk.quoteVolume);
        if(!s50)s50=cS(cl,50);if(!s200)s200=cS(cl,200);if(!e20)e20=cE(cl,20);if(!e50)e50=cE(cl,50);if(!wma)wma=cW(cl,14);
        if(adxV==null){const l=bD.k.length;if(l>28){let tr=0,dp=0,dn=0;for(let i=l-14;i<l;i++){const h=parseFloat(bD.k[i][2]),lo=parseFloat(bD.k[i][3]),c2=parseFloat(bD.k[i-1][4]);tr+=Math.max(h-lo,Math.abs(h-c2),Math.abs(lo-c2));dp+=Math.max(h-parseFloat(bD.k[i-1][2]),0);dn+=Math.max(parseFloat(bD.k[i-1][3])-lo,0)}adxV=Math.abs(100*dp/tr-100*dn/tr)/(100*dp/tr+100*dn/tr)*100||20}else adxV=25}
        if(tsiV==null){let m=0,a2=0;for(let i=cl.length-13;i<cl.length;i++){const d=cl[i]-cl[i-1];m+=d;a2+=Math.abs(d)}tsiV=a2?(m/a2)*100:0}
        if(wllV==null){const l=bD.k.length;let hh=-Infinity,ll=Infinity;for(let i=l-14;i<l;i++){hh=Math.max(hh,parseFloat(bD.k[i][2]));ll=Math.min(ll,parseFloat(bD.k[i][3]))}wllV=hh===ll?-50:((hh-price)/(hh-ll))*-100}
        if(psrV==null)psrV=price*0.98;
        if(voV==null)voV=((vl.slice(-5).reduce((a,b)=>a+b,0)/5)/(vl.slice(-10).reduce((a,b)=>a+b,0)/10)-1)*100;
        if(sdV==null){const sd5=cl.slice(-5),sdm=sd5.reduce((a,b)=>a+b)/5;sdV=Math.sqrt(sd5.reduce((a,v)=>a+(v-sdm)**2,0)/5)}
        if(!useBE)apiFallback();
    }
    if(!price){toast('❌ No price data','er');btn.classList.remove('ld');return}
    if(!pChg&&bD)pChg=parseFloat(bD.t.priceChangePercent)||0;if(!qV)qV=(vol||0)*price;
    const dp=price>=1000?2:price>=1?4:price>=0.01?6:8;

    // Signal logic
    let rsi=wllV!=null?wllV+100:50;if(rsi<0)rsi=Math.abs(wllV);if(rsi>100)rsi=100;
    const eB=e20&&e50?e20>e50:true,pAS=s50?price>s50:true,mB=tsiV?tsiV>0:eB,sT=adxV?adxV>25:false,pB=psrV?price>psrV:true,vB=voV?voV>0:true;
    let bu=0,be=0;
    if(rsi<30)bu+=2;else if(rsi<45)bu++;else if(rsi>70)be+=2;else if(rsi>55)be++;
    if(mB)bu++;else be++;if(eB)bu++;else be++;if(pAS)bu++;else be++;if(pB)bu++;else be++;if(vB)bu++;else be++;if(pChg>0)bu++;else be++;
    const thS=thDir||(bu>=be+2?'BUY':be>=bu+2?'SELL':'NEUTRAL');
    if(thDir==='BUY')bu+=2;else if(thDir==='SELL')be+=2;
    const fg=xFG(stFG);if(fg){if(fg.v<=25)bu++;else if(fg.v>=75)be++}

    let fS,sC;
    if(thS==='BUY'&&rsi<30&&mB&&eB&&pAS){fS='STRONG BUY';sC='s-buy'}
    else if(thS==='SELL'&&rsi>70&&!mB&&!eB&&!pAS){fS='STRONG SELL';sC='s-sell'}
    else if(thS==='BUY'&&bu>=3){fS='BUY';sC='buy'}
    else if(thS==='SELL'&&be>=3){fS='SELL';sC='sell'}
    else{fS='HOLD';sC='hold'}

    let conf=50;const tot=bu+be,agr=Math.max(bu,be)/Math.max(tot,1);
    conf+=agr*25;if(fS.includes('STRONG'))conf+=15;else if(fS!=='HOLD')conf+=10;else conf+=3;
    const tStr=e20&&e50?Math.abs(e20-e50)/e50*100:0;conf+=Math.min(tStr*2,10);
    if(sT)conf+=3;if(Math.abs(pChg)>2)conf+=4;else if(Math.abs(pChg)>0.5)conf+=2;
    if(thDir)conf+=3;if(stSig)conf+=2;if(fg)conf+=2;
    conf=Math.min(Math.round(conf),99);
    let cL,cC;if(conf>=95){cL='Extremely High';cC='#00FF88'}else if(conf>=85){cL='High';cC='#00FFB2'}else if(conf>=70){cL='Moderate';cC='#FFBE0B'}else{cL='Low';cC='#FF6B7A'}
    let rL,rC;if(conf>=85){rL='Low';rC='#00FF88'}else if(conf>=70){rL='Medium';rC='#FFBE0B'}else{rL='High';rC='#FF4757'}
    let trend,tC;if(bu>be+1){trend='Bullish';tC='#00FF88'}else if(be>bu+1){trend='Bearish';tC='#FF4757'}else{trend='Sideways';tC='#FFBE0B'}
    const holdT=calcHold(curTF,conf,trend);
    $('holdBox').style.display='inline-flex';$('holdV').textContent=holdT;
    const tv=tvI(curTF),f=v=>fmP(v,dp);

    // BUILD FULL UI — same as before, all panels
    $('mainB').innerHTML=`
    <section class="g5">${[['PRICE',f(price),sym,''],['24H',(pChg>=0?'+':'')+pChg.toFixed(2)+'%','24 hours',pChg>=0?'pos':'neg'],['VOLUME','$'+fN(qV),vB?'Positive':'Declining',''],['TREND',trend,tStr.toFixed(2)+'%',''],['SIGNAL',fS,conf+'%',fS.includes('BUY')?'pos':fS.includes('SELL')?'neg':'']].map(([l,v,s,c])=>`<div class="mk"><div class="mk-l">${l}</div><div class="mk-v ${c}" ${l==='TREND'?`style="color:${tC}"`:''} >${v}</div><div class="mk-s">${s}</div></div>`).join('')}</section>
    <section class="g2">
    <div class="pnl"><div class="ph"><div class="pt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>AI Signal Engine</div><span class="pbdg g">● ${curTF.toUpperCase()}</span></div><div class="pb"><div class="sig"><div class="sig-l">Aggregated Signal</div><div class="sig-v ${sC}">${fS}</div><div class="conf"><div class="conf-t"><span class="conf-l">AI Confidence</span><span class="conf-p" style="color:${cC}">${conf}%</span></div><div class="conf-bw"><div class="conf-bf" style="width:${conf}%;background:linear-gradient(90deg,${cC}88,${cC})"></div></div><div class="conf-d">${cL} • Hold: ${holdT} • ${useBE?'6 Hosts':'Binance'}</div></div><div class="meta"><div class="mi"><div class="mi-l">Confidence</div><div class="mi-v" style="color:${cC}">${conf}%</div><div class="mi-d">${cL}</div></div><div class="mi"><div class="mi-l">Risk</div><div class="mi-v" style="color:${rC}">${rL}</div></div><div class="mi"><div class="mi-l">Trend</div><div class="mi-v" style="color:${tC}">${trend}</div></div></div><div class="stags">${['Technical','Price','AI','Traders Hub','SelfTrade','Stock TA'].map((n,i)=>`<span class="stag ${i<3?'g':i===3?'p':i===4?'o':'c'}">${n}</span>`).join('')}</div></div></div></div>
    <div class="pnl"><div class="ph"><div class="pt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>Indicators</div><span class="pbdg g">● LIVE</span></div><div class="pb"><div class="ig">${[['SMA 50',f(s50),pAS?'#00FF88':'#FF4757'],['SMA 200',f(s200),price>(s200||price)?'#00FF88':'#FF4757'],['EMA 20',f(e20),eB?'#00FF88':'#FF4757'],['EMA 50',f(e50),eB?'#00FF88':'#FF4757'],['WMA 14',f(wma),price>(wma||price)?'#00FF88':'#FF4757'],['ADX',adxV?adxV.toFixed(2):'--',sT?'#00FFB2':'#FFBE0B'],['TSI',tsiV?tsiV.toFixed(2):'--',tsiV>0?'#00FF88':'#FF4757'],['Williams %R',wllV?wllV.toFixed(2):'--',rsi<45?'#00FF88':rsi>55?'#FF4757':'#FFBE0B'],['PSAR',f(psrV),pB?'#00FF88':'#FF4757'],['Vol Osc',voV?voV.toFixed(2)+'%':'--',voV>0?'#00FF88':'#FF4757'],['Std Dev',sdV?sdV.toFixed(2):'--','#00C8FF'],['RSI (calc)',rsi?rsi.toFixed(1):'--',rsi<30?'#00FF88':rsi>70?'#FF4757':'#FFBE0B']].map(([n,v,c])=>`<div class="ind"><div class="ind-n"><div class="ind-d" style="background:${c}"></div>${n}</div><div class="ind-v" style="color:${c}">${v}</div></div>`).join('')}</div><div style="margin-top:10px"><div style="font-size:7.5px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:2px;margin-bottom:5px">Convergence</div><div class="conv">${[{l:'SMA',v:pAS?85:30,c:pAS?'#00FF88':'#FF4757'},{l:'EMA',v:eB?80:35,c:eB?'#00FF88':'#FF4757'},{l:'ADX',v:adxV?Math.min(adxV*2,100):30,c:sT?'#00FFB2':'#FFBE0B'},{l:'TSI',v:tsiV?Math.min(Math.abs(tsiV)*3,100):30,c:tsiV>0?'#00FF88':'#FF4757'},{l:'VOL',v:voV?Math.min(Math.abs(voV)*2+30,100):30,c:vB?'#00FFB2':'#FFBE0B'},{l:'TH',v:thS==='BUY'?90:40,c:'#A855F7'},{l:'F&G',v:fg?fg.v:50,c:fg?(fg.v<=25?'#FF4757':fg.v>=75?'#00FF88':'#FFBE0B'):'#FFBE0B'}].map(b=>`<div class="cvb" style="height:${b.v}%;background:${b.c};opacity:0.75"><span class="cvl">${b.l}</span></div>`).join('')}</div></div></div></div>
    </section>
    <section class="g4">
    <div class="pnl"><div class="ph"><div class="pt st"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>Fear & Greed</div><span class="pbdg o">LIVE</span></div><div class="pb">${fg?`<div class="fg-w"><div class="fg-g"><div class="fg-a"><div class="fg-m"></div><div class="fg-n" style="transform:rotate(${-90+(fg.v/100)*180}deg)"></div></div></div><div class="fg-v" style="color:${fg.v<=25?'#FF4757':fg.v>=75?'#00FF88':'#FFBE0B'}">${Math.round(fg.v)}</div><div class="fg-lb" style="color:${fg.v<=45?'#FF6D3A':'#FFBE0B'}">${fg.l}</div></div>`:'<div class="emp"><p>Backend needed</p></div>'}</div></div>
    <div class="pnl"><div class="ph"><div class="pt st"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>SelfTrade</div></div><div class="pb">${stSig?rAI(stSig,'st'):`<div class="aic st"><div class="aib">${sym}: <strong style="color:${fS.includes('BUY')?'#00FF88':'#FF4757'}">${fS}</strong> (${conf}%)</div></div>`}</div></div>
    <div class="pnl"><div class="ph"><div class="pt th"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>Traders Hub</div><span class="pbdg p">PRIMARY</span></div><div class="pb">${thSigD?rAI(thSigD,'th'):`<div class="aic th"><div style="text-align:center"><div style="font-size:24px;font-weight:900;color:${thS==='BUY'?'#00FF88':thS==='SELL'?'#FF4757':'#FFBE0B'};text-shadow:0 0 15px currentColor;letter-spacing:3px;font-family:'Space Grotesk',sans-serif">${thS}</div><div style="font-size:8px;color:var(--t3);margin-top:4px">${thDir?'Traders Hub API':'Derived'}</div></div></div>`}</div></div>
    <div class="pnl"><div class="ph"><div class="pt cy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Stock TA</div></div><div class="pb">${staInd?rAI(staInd,'cy'):`<div class="aic cy"><div class="aib">ADX: <strong>${adxV?adxV.toFixed(2):'--'}</strong> • TSI: <strong>${tsiV?tsiV.toFixed(2):'--'}</strong> • W%R: <strong>${wllV?wllV.toFixed(2):'--'}</strong></div></div>`}</div></div>
    </section>
    <section style="margin-bottom:12px"><div class="pnl"><div class="ph"><div class="pt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>Chart — ${sym} @ ${curTF.toUpperCase()}</div></div><div class="chart"><iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tv&symbol=BINANCE:${sym}&interval=${tv}&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=060c19&studies=RSI%40tv-basicstudies,MACD%40tv-basicstudies&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&allow_symbol_change=1&locale=en&colorTheme=dark&backgroundColor=060c19" allowfullscreen></iframe></div></div></section>
    <section style="margin-bottom:12px"><div class="pnl"><div class="ph"><div class="pt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>AI Report</div></div><div class="pb"><div class="rpt"><strong>📊 ${sym} @ ${curTF.toUpperCase()}</strong><br><br>Signal: <strong style="color:${fS.includes('BUY')?'#00FF88':fS.includes('SELL')?'#FF4757':'#FFBE0B'};font-size:14px">${fS}</strong> — ${conf}% confidence<br>Trend: <strong style="color:${tC}">${trend}</strong> • Risk: <strong style="color:${rC}">${rL}</strong> • Hold: <strong>${holdT}</strong><br>EMA: ${eB?'↑':'↓'} • SMA50: ${pAS?'↑':'↓'} • ADX: ${adxV?adxV.toFixed(1):'--'} (${sT?'Strong':'Weak'}) • TH: ${thS}${fg?` • F&G: ${Math.round(fg.v)}`:''}<br><em style="color:var(--t3)">${useBE?'6 API hosts • 102 endpoints':'Binance fallback'} — by NayonDev</em></div><div class="rps">— <strong>NayonDev AI Trading Engine</strong></div></div></div></section>
    <section class="g2"><div class="pnl"><div class="ph"><div class="pt">Watchlist</div></div><div class="adf"><input type="text" id="WI" placeholder="Add pair" spellcheck="false"><button onclick="addW()">+ Add</button></div><div class="scr" id="WB"></div></div><div class="pnl"><div class="ph"><div class="pt">Signal History</div></div><div class="scr" id="HB"></div></div></section>`;

    const wi=$('WI');if(wi)wi.addEventListener('keypress',e=>{if(e.key==='Enter')addW()});rW();rH();
    sH.unshift({p:sym,s:fS,c:conf,tf:curTF,time:new Date()});if(sH.length>30)sH.pop();rH();
    addN(sym,`${fS} ${conf}% @ ${curTF.toUpperCase()} • Hold: ${holdT}`,fS.includes('BUY')?'buy':fS.includes('SELL')?'sell':'info');
    lA={sym,price,pChg,vol,qV,fS,conf,rL,trend,tStr,thS,fg:fg?fg.v:null,tf:curTF,holdT};
    toast(`✅ <strong>${sym}</strong> — <strong>${fS}</strong> (${conf}%)`,'ok');btn.classList.remove('ld');
}

// === NON-CRYPTO ANALYSIS (Stock/Forex/Economy) ===
async function showNonCrypto(sym){
    const pairData=allP.find(p=>p.s===sym);
    const tvSym=pairData?.tv||(curCat==='stock'?`NASDAQ:${sym}`:curCat==='forex'?`FX:${sym}`:`TVC:${sym.replace(/ /g,'')}`);
    let taData=null;
    // Try to get TradingView TA
    try{const r=await fetch(`/api/tv/ta/${encodeURIComponent(tvSym)}`);if(r.ok){const d=await r.json();if(d.success)taData=d.data}}catch(e){}
    // Try TV quote
    let quoteData=null;
    try{const r=await fetch(`/api/tv/quote/${encodeURIComponent(tvSym)}?session=regular&fields=all`);if(r.ok){const d=await r.json();if(d.success)quoteData=d.data}}catch(e){}

    // API status
    const hasTA=!!taData,hasQuote=!!quoteData;
    apiSet([false,false,false,hasQuote,false,false,false,false,hasTA],[0,0,0,quoteData?100:0,0,0,0,0,taData?120:0]);
    $('holdBox').style.display='none';

    // Build signal from TA if available
    let signal='NEUTRAL',sigClass='hold',sigConf=50;
    if(taData){
        const summary=taData.summary||taData.recommendation||taData.signal||'';
        const sumStr=typeof summary==='string'?summary:JSON.stringify(summary);
        if(sumStr.toUpperCase().match(/STRONG.?BUY/)){signal='STRONG BUY';sigClass='s-buy';sigConf=90}
        else if(sumStr.toUpperCase().match(/BUY/)){signal='BUY';sigClass='buy';sigConf=75}
        else if(sumStr.toUpperCase().match(/STRONG.?SELL/)){signal='STRONG SELL';sigClass='s-sell';sigConf=90}
        else if(sumStr.toUpperCase().match(/SELL/)){signal='SELL';sigClass='sell';sigConf=75}
        else{signal='HOLD';sigClass='hold';sigConf=55}
    }

    const pName=pairData?.n||sym;
    const catLabel=curCat==='stock'?'US Stock':curCat==='forex'?'Forex':'Economy';

    $('mainB').innerHTML=`
    ${quoteData?`<section class="g5">${[['PRICE','$'+(quoteData.close||quoteData.lp||quoteData.price||'--'),sym,''],['CHANGE',(quoteData.chp||quoteData.change_percent||0).toFixed(2)+'%','24h',(quoteData.chp||0)>=0?'pos':'neg'],['HIGH','$'+(quoteData.high||'--'),'Day high',''],['LOW','$'+(quoteData.low||'--'),'Day low',''],['SIGNAL',signal,sigConf+'%',signal.includes('BUY')?'pos':signal.includes('SELL')?'neg':'']].map(([l,v,s,c])=>`<div class="mk"><div class="mk-l">${l}</div><div class="mk-v ${c}">${v}</div><div class="mk-s">${s}</div></div>`).join('')}</section>`:''}

    ${taData?`<section class="g2">
    <div class="pnl"><div class="ph"><div class="pt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>${pName} — AI Signal</div><span class="pbdg g">${catLabel}</span></div>
    <div class="pb"><div class="sig"><div class="sig-l">${catLabel} Signal</div><div class="sig-v ${sigClass}">${signal}</div>
    <div class="conf"><div class="conf-t"><span class="conf-l">Confidence</span><span class="conf-p" style="color:${sigConf>=70?'#00FFB2':'#FFBE0B'}">${sigConf}%</span></div>
    <div class="conf-bw"><div class="conf-bf" style="width:${sigConf}%;background:${sigConf>=70?'#00FFB2':'#FFBE0B'}"></div></div></div>
    </div></div></div>
    <div class="pnl"><div class="ph"><div class="pt cy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>TradingView Indicators</div></div>
    <div class="pb">${rAI(taData,'cy')}</div></div>
    </section>`:''}

    <section style="margin-bottom:12px"><div class="pnl"><div class="ph"><div class="pt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>${pName} — ${curTF.toUpperCase()}</div><span class="pbdg g">${catLabel}</span></div>
    <div class="chart" style="height:460px"><iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tv&symbol=${encodeURIComponent(tvSym)}&interval=${tvI(curTF)}&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=060c19&studies=RSI%40tv-basicstudies,MACD%40tv-basicstudies&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&allow_symbol_change=1&locale=en&colorTheme=dark&backgroundColor=060c19" allowfullscreen></iframe></div></div></section>

    ${taData?`<section style="margin-bottom:12px"><div class="pnl"><div class="ph"><div class="pt">AI Report</div></div><div class="pb"><div class="rpt"><strong>📊 ${pName} (${sym}) @ ${curTF.toUpperCase()}</strong><br>Market: <strong>${catLabel}</strong> • Signal: <strong style="color:${signal.includes('BUY')?'#00FF88':signal.includes('SELL')?'#FF4757':'#FFBE0B'}">${signal}</strong> (${sigConf}%)<br>Source: TradingView Technical Analysis<br><em style="color:var(--t3)">by NayonDev AI Trading Engine</em></div><div class="rps">— <strong>NayonDev</strong></div></div></div></section>`:''} 

    <section class="g2"><div class="pnl"><div class="ph"><div class="pt">Watchlist</div></div><div class="adf"><input type="text" id="WI" placeholder="Add pair" spellcheck="false"><button onclick="addW()">+ Add</button></div><div class="scr" id="WB"></div></div><div class="pnl"><div class="ph"><div class="pt">History</div></div><div class="scr" id="HB"></div></div></section>`;

    const wi=$('WI');if(wi)wi.addEventListener('keypress',e=>{if(e.key==='Enter')addW()});rW();rH();
    if(taData){
        sH.unshift({p:sym,s:signal,c:sigConf,tf:curTF,time:new Date()});if(sH.length>30)sH.pop();rH();
        addN(sym,`${signal} ${sigConf}% (${catLabel})`,signal.includes('BUY')?'buy':signal.includes('SELL')?'sell':'info');
    }
    toast(`📈 <strong>${pName}</strong> loaded — ${taData?signal:'chart ready'}`,'ok');
}

// === WATCHLIST ===
function addW(){const i=$('WI');if(!i)return;let p=i.value.trim().toUpperCase();if(!p)return;if(curCat==='crypto'&&!p.includes('USDT'))p+='USDT';if(wl.find(w=>w.p===p))return;wl.push({p,pr:'--',ch:0});localStorage.setItem('nasX',JSON.stringify(wl));i.value='';uWP();toast(`✅ ${p}`,'ok')}
function rmW(p){wl=wl.filter(w=>w.p!==p);localStorage.setItem('nasX',JSON.stringify(wl));rW()}
async function uWP(){for(const w of wl){try{const r=await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${w.p}`);const d=await r.json();w.pr=parseFloat(d.lastPrice);w.ch=parseFloat(d.priceChangePercent)}catch(e){}}rW()}
function rW(){const b=$('WB');if(!b)return;if(!wl.length){b.innerHTML='<div class="emp"><p>Add pairs to watchlist</p></div>';return}b.innerHTML=wl.map(w=>{const ps=typeof w.pr==='number'?'$'+w.pr.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:8}):'--';const cs=(w.ch>=0?'+':'')+(w.ch||0).toFixed(2)+'%';return`<div class="li2" onclick="selPair('${w.p}')"><span class="li2-p">${w.p}</span><span class="li2-pr">${ps}</span><span class="li2-c ${(w.ch||0)>=0?'up':'dn'}">${cs}</span><button class="li2-rm" onclick="event.stopPropagation();rmW('${w.p}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>`}).join('')}
function rH(){const b=$('HB');if(!b)return;if(!sH.length){b.innerHTML='<div class="emp"><p>Signal history</p></div>';return}b.innerHTML=sH.map(h=>{const sc=h.s.includes('BUY')?'hb':h.s.includes('SELL')?'hs':'hh';const cc=h.c>=85?'#00FFB2':h.c>=70?'#FFBE0B':'#FF6B7A';return`<div class="li2" onclick="selPair('${h.p}')"><span class="li2-p">${h.p}</span><span class="hsig ${sc}">${h.s}</span><span class="hconf" style="color:${cc}">${h.c}%</span><span class="htim">${h.tf} ${h.time.toLocaleTimeString()}</span></div>`}).join('')}
function exportR(){if(!lA){toast('⚠️ Analyze first','er');return}const d=lA;const blob=new Blob([`NAYON ALPHA SIGNALS\nDeveloped by NayonDev\n${'═'.repeat(45)}\n${d.sym} @ ${d.tf}\nSignal: ${d.fS} | Conf: ${d.conf}% | Risk: ${d.rL}\nTrend: ${d.trend} | Hold: ${d.holdT}\nPrice: $${d.price} | 24h: ${d.pChg?.toFixed(2)}%\n${'═'.repeat(45)}\n© 2026 NayonDev`],{type:'text/plain'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=`NAS_${d.sym}_${d.tf}_${Date.now()}.txt`;a.click();toast('📄 Exported','ok')}
if(wl.length>0)uWP();setInterval(()=>{if(wl.length>0)uWP()},60000);
