/* GENERATED from prototype/index.html chrome JS by port-chrome.js — now source of truth, edit directly.
   Shared chrome behaviors: header MENU + footer currency/language dropdowns, band cockpit,
   lookup routing + typing placeholder, Satoshi quote rotation. Page hooks: window.obCurrencyChange(S),
   window.obPaintFiat(S) are called on currency change / repaint when defined.
   The band carries no seeded figures: price, height and last-block age show an ellipsis until the
   data service supplies them, and the age counter starts only once a real block time has been seen.
   Fiat cross-rates arrive with /summary (fx.rates) and are published on window.OB_FX so pages can
   reuse them instead of carrying their own tables. */
(function(){
  var reduced=matchMedia("(prefers-reduced-motion:reduce)").matches;
  var ELL="…";
  /* pre-fetch fallback only: live rates from /summary overwrite this table in place */
  var fx={USD:1,EUR:.8745,GBP:.7442,CAD:1.4023,AUD:1.4337,SEK:9.655,JPY:162.35,CNY:6.7775,RUB:78.1,BRL:5.1158,MXN:17.4837,INR:96.28,TRY:47.142,KRW:1485.32,CHF:.807},
      sym={USD:"$",EUR:"\u20AC",GBP:"\u00A3",CAD:"$",AUD:"$",SEK:"",JPY:"\u00A5",CNY:"\u00A5",RUB:"\u20BD",BRL:"R$",MXN:"$",INR:"\u20B9",TRY:"\u20BA",KRW:"\u20A9",CHF:""};
  window.OB_FX=fx;
  /* null until the data service answers; nothing here is ever seeded with a made-up figure */
  var S={price:null,cur:"USD",lang:"EN",height:null,since:null};
  function fmt(n,d){return n.toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});}
  var FLAG={
    US:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#B22234"/><g fill="#FFF"><rect y="2.14" width="22" height="2.14"/><rect y="6.43" width="22" height="2.14"/><rect y="10.71" width="22" height="2.15"/></g><rect width="9.5" height="8.57" fill="#3C3B6E"/><g fill="#FFF"><circle cx="1.2" cy="1.35" r=".42"/><circle cx="3.3" cy="1.35" r=".42"/><circle cx="5.4" cy="1.35" r=".42"/><circle cx="7.5" cy="1.35" r=".42"/><circle cx="2.25" cy="3.05" r=".42"/><circle cx="4.35" cy="3.05" r=".42"/><circle cx="6.45" cy="3.05" r=".42"/><circle cx="1.2" cy="4.75" r=".42"/><circle cx="3.3" cy="4.75" r=".42"/><circle cx="5.4" cy="4.75" r=".42"/><circle cx="7.5" cy="4.75" r=".42"/><circle cx="2.25" cy="6.45" r=".42"/><circle cx="4.35" cy="6.45" r=".42"/><circle cx="6.45" cy="6.45" r=".42"/></g></svg>',
    EU:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#003399"/><g fill="#FFCC00"><circle cx="11" cy="3.6" r=".9"/><circle cx="14.4" cy="4.9" r=".9"/><circle cx="15.8" cy="7.5" r=".9"/><circle cx="14.4" cy="10.1" r=".9"/><circle cx="11" cy="11.4" r=".9"/><circle cx="7.6" cy="10.1" r=".9"/><circle cx="6.2" cy="7.5" r=".9"/><circle cx="7.6" cy="4.9" r=".9"/></g></svg>',
    GB:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#012169"/><path d="M0,0 22,15 M22,0 0,15" stroke="#FFF" stroke-width="3"/><path d="M0,0 22,15 M22,0 0,15" stroke="#C8102E" stroke-width="1.4"/><rect x="9" width="4" height="15" fill="#FFF"/><rect y="5.5" width="22" height="4" fill="#FFF"/><rect x="9.9" width="2.2" height="15" fill="#C8102E"/><rect y="6.4" width="22" height="2.2" fill="#C8102E"/></svg>',
    CA:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#FFF"/><rect width="5.5" height="15" fill="#D52B1E"/><rect x="16.5" width="5.5" height="15" fill="#D52B1E"/><path d="M11,3.2 12,5.4 14.2,5 12.8,7 14.6,8.6 11.9,8.8 11,11.2 10.1,8.8 7.4,8.6 9.2,7 7.8,5 10,5.4 Z" fill="#D52B1E"/></svg>',
    AU:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#00247D"/><g fill="#FFF"><circle cx="16" cy="3" r=".8"/><circle cx="19" cy="6" r=".8"/><circle cx="16" cy="9.5" r=".8"/><circle cx="13.5" cy="6.5" r=".8"/><circle cx="17" cy="12.5" r="1"/></g><rect width="9" height="7" fill="#012169"/><path d="M0,0 9,7 M9,0 0,7" stroke="#FFF" stroke-width="1.6"/><rect x="3.7" width="1.6" height="7" fill="#FFF"/><rect y="2.7" width="9" height="1.6" fill="#FFF"/><rect x="4.1" width=".8" height="7" fill="#C8102E"/><rect y="3.1" width="9" height=".8" fill="#C8102E"/></svg>',
    SE:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#006AA7"/><rect x="6" width="3" height="15" fill="#FECC00"/><rect y="6" width="22" height="3" fill="#FECC00"/></svg>',
    JP:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#FFF"/><circle cx="11" cy="7.5" r="4.2" fill="#BC002D"/></svg>',
    CN:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#DE2910"/><path d="M4,1.8 5,4 7.4,4.1 5.5,5.5 6.2,7.8 4,6.4 1.8,7.8 2.5,5.5 .6,4.1 3,4 Z" fill="#FFDE00"/></svg>',
    RU:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#FFF"/><rect y="5" width="22" height="5" fill="#0039A6"/><rect y="10" width="22" height="5" fill="#D52B1E"/></svg>',
    BR:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#009B3A"/><path d="M11,1.8 20.2,7.5 11,13.2 1.8,7.5 Z" fill="#FEDF00"/><circle cx="11" cy="7.5" r="3.4" fill="#002776"/></svg>',
    MX:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#FFF"/><rect width="7.3" height="15" fill="#006847"/><rect x="14.7" width="7.3" height="15" fill="#CE1126"/><circle cx="11" cy="7.5" r="1.7" fill="#8C6239"/></svg>',
    IN:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#FFF"/><rect width="22" height="5" fill="#FF9933"/><rect y="10" width="22" height="5" fill="#138808"/><circle cx="11" cy="7.5" r="1.8" fill="none" stroke="#000080" stroke-width=".8"/></svg>',
    TR:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#E30A17"/><circle cx="9" cy="7.5" r="3.6" fill="#FFF"/><circle cx="10.1" cy="7.5" r="2.9" fill="#E30A17"/><circle cx="13.9" cy="7.5" r=".9" fill="#FFF"/></svg>',
    KR:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#FFF"/><path d="M7.8,7.5 a3.2,3.2 0 0 1 6.4,0 Z" fill="#CD2E3A"/><path d="M14.2,7.5 a3.2,3.2 0 0 1 -6.4,0 Z" fill="#0047A0"/></svg>',
    CH:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#D52B1E"/><rect x="9.6" y="3" width="2.8" height="9" fill="#FFF"/><rect x="6.5" y="6.1" width="9" height="2.8" fill="#FFF"/></svg>',
    ES:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#AA151B"/><rect y="3.75" width="22" height="7.5" fill="#F1BF00"/></svg>',
    PT:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#DA291C"/><rect width="8.8" height="15" fill="#046A38"/><circle cx="8.8" cy="7.5" r="2.2" fill="#FFE900"/></svg>',
    FR:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#FFF"/><rect width="7.3" height="15" fill="#002395"/><rect x="14.7" width="7.3" height="15" fill="#ED2939"/></svg>',
    DE:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#FFCE00"/><rect width="22" height="10" fill="#DD0000"/><rect width="22" height="5" fill="#000"/></svg>',
    IT:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#FFF"/><rect width="7.3" height="15" fill="#009246"/><rect x="14.7" width="7.3" height="15" fill="#CE2B37"/></svg>',
    PL:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#DC143C"/><rect width="22" height="7.5" fill="#FFF"/></svg>',
    NL:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#21468B"/><rect width="22" height="10" fill="#FFF"/><rect width="22" height="5" fill="#AE1C28"/></svg>',
    ID:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#FFF"/><rect width="22" height="7.5" fill="#CE1126"/></svg>',
    VN:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#DA251D"/><path d="M11,3.4 12.1,6.5 15.4,6.5 12.7,8.4 13.7,11.6 11,9.6 8.3,11.6 9.3,8.4 6.6,6.5 9.9,6.5 Z" fill="#FFDE00"/></svg>',
    SA:'<svg viewBox="0 0 22 15"><rect width="22" height="15" fill="#165B33"/><path d="M4.5,5.5 q2,-1.2 4,0 q2,1.2 4,0 q2,-1.2 4,0" fill="none" stroke="#FFF" stroke-width="1.1"/><rect x="4.5" y="9.2" width="13" height="1.1" rx=".55" fill="#FFF"/><path d="M17.5,9.75 l1.6,0" stroke="#FFF" stroke-width="1.1" stroke-linecap="round"/></svg>'
  };
  function flagOf(cc){return '<span class="flg">'+(FLAG[cc]||"")+'</span>';}
  /* currency icons: original cartoon-banknote template (paper tint + ink) — same design for all, colorized per currency */
  var NOTEC={USD:["#DFEAD9","#3E6B4F"],EUR:["#DCE4F5","#3A5AA0"],GBP:["#E8DFF2","#63498D"],CAD:["#F2DCDC","#A84848"],
             AUD:["#F5EAD2","#A8863A"],SEK:["#DCEAF2","#46769B"],JPY:["#E2E6F0","#5D6C94"],CNY:["#F5DBDA","#A83E3C"],
             RUB:["#D9EDE5","#47836F"],BRL:["#E4EED4","#6E8A3C"],MXN:["#F2DCE9","#94517A"],INR:["#E0E8ED","#64798A"],
             TRY:["#F2E2D6","#96603F"],KRW:["#DDEAE3","#56826B"],CHF:["#E9DFF0","#74519A"]};
  var NSYM={USD:"$",EUR:"€",GBP:"£",CAD:"$",AUD:"$",SEK:"kr",JPY:"¥",CNY:"¥",RUB:"₽",BRL:"R$",MXN:"$",INR:"₹",TRY:"₺",KRW:"₩",CHF:"Fr"};
  function noteOf(code){
    var cc=NOTEC[code]||["#E6E6E6","#777"],P=cc[0],K=cc[1];
    function bust(cx,rx,ry){return '<ellipse cx="'+cx+'" cy="7.5" rx="'+rx+'" ry="'+ry+'" fill="#FFF" stroke="'+K+'" stroke-width=".55"/>'+
      '<circle cx="'+cx+'" cy="6.5" r="1.25" fill="'+K+'"/>'+
      '<path d="M'+(cx-1.9)+',10.9 q1.9,-2.8 3.8,0 Z" fill="'+K+'"/>';}
    function T(x,y,fs,t){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="ui-monospace,Consolas,monospace" font-size="'+fs+'" font-weight="700" fill="'+K+'">'+t+'</text>';}
    function hatch(x,y,n){var h="";for(var i=0;i<n;i++)h+='<path d="M'+x+','+(y+i*0.75)+' h2.2" stroke="'+K+'" stroke-width=".3" opacity=".55"/>';return h;}
    var ROS='<circle cx="3.1" cy="3.1" r=".45" fill="none" stroke="'+K+'" stroke-width=".35" opacity=".7"/>'+
            '<circle cx="18.9" cy="11.9" r=".45" fill="none" stroke="'+K+'" stroke-width=".35" opacity=".7"/>';
    var inner="";
    switch(code){
      case "USD": /* $1: center portrait, black+green seals, "1" in all four corners, engraving hatches */
        inner=bust(11,3,4)+hatch(4.6,6.9,4)+hatch(15.2,6.9,4)+
        '<circle cx="6.3" cy="9" r="1.05" fill="none" stroke="'+K+'" stroke-width=".5"/>'+
        '<circle cx="15.7" cy="9" r="1.05" fill="'+K+'" opacity=".55"/>'+
        T(3.7,12.4,3.8,"$")+T(18.3,5.2,3.8,"$");break;
      case "EUR": /* €20: arch with columns, star arc, big 20, no portrait — true to the euro */
        inner='<path d="M13,11.6 V7 a3.1,3.1 0 0 1 6.2,0 V11.6 Z" fill="#FFF" stroke="'+K+'" stroke-width=".5"/>'+
        '<path d="M14.4,7.9 V11.6 M15.6,7.4 V11.6 M16.8,7.4 V11.6 M18,7.9 V11.6" stroke="'+K+'" stroke-width=".38"/>'+
        '<g fill="'+K+'"><circle cx="13.4" cy="4.8" r=".42"/><circle cx="14.7" cy="4" r=".42"/><circle cx="16.1" cy="3.7" r=".42"/><circle cx="17.5" cy="4" r=".42"/><circle cx="18.8" cy="4.8" r=".42"/></g>'+
        T(5.6,10.8,5.6,"€")+hatch(4,6.2,3);break;
      case "GBP": /* £20: crowned monarch right, big 20 + £ left, guilloche wave */
        inner=bust(15.3,2.8,3.8)+'<path d="M14.3,4.9 h2 l-.3,-1.1 -.4,.55 -.3,-.85 -.3,.85 -.4,-.55 Z" fill="'+K+'"/>'+
        T(5.6,9.8,5.6,"£")+
        '<path d="M3.2,8.6 q1,-.9 2,0 t2,0" fill="none" stroke="'+K+'" stroke-width=".35" opacity=".6"/>';break;
      case "CAD": /* $50 polymer: portrait left, clear window band, two maple leaves, 50 */
        inner=bust(7.8,2.8,3.8)+'<rect x="15.9" y="1.7" width="3.3" height="11.6" fill="#FFF" opacity=".72"/>'+
        '<path d="M17.5,4.9 18,6.1 19.1,5.9 18.4,6.9 19.3,7.7 17.9,7.8 17.5,9 17.1,7.8 15.7,7.7 16.6,6.9 15.9,5.9 17,6.1 Z" fill="'+K+'"/>'+
        '<path d="M17.5,10.2 17.8,10.9 18.4,10.8 18,11.4 18.5,11.9 17.7,11.9 17.5,12.6 17.3,11.9 16.5,11.9 17,11.4 16.6,10.8 17.2,10.9 Z" fill="'+K+'" opacity=".65"/>'+
        T(4,5.6,4.2,"$")+hatch(11.2,5.4,3);break;
      case "AUD": /* $50 polymer: portrait right, round clear window, diagonal band, 50 */
        inner='<path d="M2.2,13.2 L8.8,1.8" stroke="#FFF" stroke-width="1.5" opacity=".65"/>'+bust(15,2.8,3.8)+
        '<circle cx="4.7" cy="11" r="1.55" fill="#FFF" stroke="'+K+'" stroke-width=".4"/>'+
        T(5,5.6,4.2,"$");break;
      case "SEK": /* 100 kronor: portrait left, 100 kr, the three crowns */
        inner=bust(7.4,2.8,3.8)+T(16.6,9.4,4.4,"kr")+
        '<g fill="'+K+'"><path d="M14.9,4.2 l.6,-.9 .6,.9 Z"/><path d="M16.3,4.2 l.6,-.9 .6,.9 Z"/><path d="M17.7,4.2 l.6,-.9 .6,.9 Z"/></g>';break;
      case "JPY": /* ¥1000: portrait right, red hanko, watermark oval, kanji-style strokes */
        inner=bust(15.3,2.8,3.8)+'<circle cx="4.5" cy="11.6" r=".95" fill="#B03A2E"/>'+
        '<ellipse cx="10" cy="7.5" rx="1.6" ry="2.4" fill="#FFF" opacity=".55"/>'+
        '<path d="M3.6,3.4 h2.4 M4.8,3.4 v1.9 M3.6,6.2 h2.4 M4.2,6.2 l-.6,1.6 M5.4,6.2 l.6,1.6" stroke="'+K+'" stroke-width=".42"/>'+
        T(5.4,10.7,4,"¥");break;
      case "CNY": /* ¥100: portrait right, big 100, star cluster, peony watermark */
        inner=bust(15.3,2.8,3.8)+
        '<g fill="#E8C33A"><circle cx="3.5" cy="3.5" r=".6"/><circle cx="4.7" cy="3" r=".32"/><circle cx="5.4" cy="3.8" r=".32"/><circle cx="4.9" cy="4.6" r=".32"/></g>'+
        '<g fill="#FFF" opacity=".6"><circle cx="9.7" cy="8.6" r=".7"/><circle cx="8.7" cy="7.8" r=".55"/><circle cx="10.7" cy="7.8" r=".55"/><circle cx="9.2" cy="9.6" r=".55"/><circle cx="10.2" cy="9.6" r=".55"/></g>'+
        T(5.2,11,4.6,"¥");break;
      case "RUB": /* 100₽: theatre facade with pediment + quadriga hint, laurels, ₽ corners */
        inner='<path d="M7.6,6.3 L11,4.1 L14.4,6.3 Z" fill="#FFF" stroke="'+K+'" stroke-width=".5"/>'+
        '<circle cx="11" cy="5.5" r=".4" fill="'+K+'" opacity=".7"/>'+
        '<rect x="7.6" y="6.3" width="6.8" height="5.1" fill="#FFF" stroke="'+K+'" stroke-width=".5"/>'+
        '<path d="M8.9,6.8 V11 M10.3,6.8 V11 M11.7,6.8 V11 M13.1,6.8 V11" stroke="'+K+'" stroke-width=".42"/>'+
        '<path d="M6.4,10.6 a3.2,3.2 0 0 1 0,-4.6 M15.6,10.6 a3.2,3.2 0 0 0 0,-4.6" fill="none" stroke="'+K+'" stroke-width=".38" opacity=".6"/>'+
        T(3.8,12.5,4,"₽");break;
      case "BRL": /* 50 reais: effigy left, diagonal band with stars, 50 */
        inner=bust(7.4,2.8,3.8)+'<path d="M13.2,13.4 L20.4,6.6 V13.4 Z" fill="#FFF" opacity=".5"/>'+
        '<g fill="'+K+'" opacity=".7"><circle cx="16.4" cy="12" r=".35"/><circle cx="17.8" cy="10.8" r=".35"/><circle cx="19.2" cy="9.6" r=".35"/></g>'+
        T(17.2,5.2,3.4,"R$");break;
      case "MXN": /* 500 pesos: portrait left, wide band, 500 */
        inner=bust(7.4,2.8,3.8)+'<rect x="14.9" y="1.7" width="5.2" height="11.6" fill="#FFF" opacity=".45"/>'+
        T(17.5,9.4,4.4,"$")+hatch(12,4.4,4);break;
      case "INR": /* ₹500: Gandhi right, security thread, Ashoka pillar, 500 */
        inner=bust(15,2.8,3.8)+'<rect x="10.1" y="1.7" width="1.1" height="11.6" fill="#FFF" opacity=".62"/>'+
        '<path d="M4.4,3.2 v2.4 M3.7,3.2 h1.4 M3.8,5.6 h1.2 M4,3 a.6,.35 0 0 1 .8,0" stroke="'+K+'" stroke-width=".45" fill="none"/>'+
        T(5.4,10.7,4.4,"₹");break;
      case "TRY": /* 200₺: Atatürk right, crescent AND star, 200 */
        inner=bust(15.3,2.8,3.8)+'<circle cx="4.6" cy="4.3" r="1.25" fill="#FFF"/><circle cx="5.15" cy="4.3" r="1" fill="'+P+'"/>'+
        '<circle cx="6.4" cy="4.3" r=".4" fill="#FFF"/>'+
        T(5.2,11.4,4.4,"₺")+hatch(8.2,4.6,3);break;
      case "KRW": /* ₩10000: portrait left, 10000, plum-branch wave */
        inner=bust(7,2.8,3.8)+T(16.4,9,4.6,"₩")+
        '<path d="M13.8,12.1 q2.2,-1.5 4.4,0" fill="none" stroke="'+K+'" stroke-width=".35" opacity=".6"/>'+
        '<circle cx="15.2" cy="11.4" r=".3" fill="'+K+'" opacity=".6"/><circle cx="16.8" cy="11.2" r=".3" fill="'+K+'" opacity=".6"/>';break;
      case "CHF": /* CHF 20: vertical white band + Swiss cross, globe motif (new-series style), 20 */
        inner='<rect x="1.7" y="1.7" width="4.8" height="11.6" fill="#FFF" opacity=".8"/>'+
        '<rect x="3.35" y="2.9" width="1.5" height="4.2" fill="#C23B3B"/><rect x="2" y="4.25" width="4.2" height="1.5" fill="#C23B3B"/>'+
        '<circle cx="13.6" cy="7.5" r="3.1" fill="#FFF" stroke="'+K+'" stroke-width=".5"/>'+
        '<path d="M10.5,7.5 h6.2 M13.6,4.4 v6.2 M11.6,5.5 q2,1.1 4,0 M11.6,9.5 q2,-1.1 4,0" fill="none" stroke="'+K+'" stroke-width=".35"/>'+
        T(19.2,12.5,3.2,"Fr");break;
      default: inner=bust(11,3,4);
    }
    inner+=ROS;
    return '<span class="flg"><svg viewBox="0 0 22 15">'+
      '<rect width="22" height="15" rx="1.5" fill="'+P+'"/>'+
      '<rect x=".9" y=".9" width="20.2" height="13.2" rx=".9" fill="none" stroke="'+K+'" stroke-width=".9"/>'+
      '<rect x="2.3" y="2.3" width="17.4" height="10.4" fill="none" stroke="'+K+'" stroke-width=".4" opacity=".5"/>'+
      inner+'</svg></span>';
  }
  /* [code, flag country, menu label] */
  var CURS=[["USD","US","$ · US Dollar"],["EUR","EU","€ · Euro"],["GBP","GB","£ · British Pound"],["CAD","CA","$ · Canadian Dollar"],
            ["AUD","AU","$ · Australian Dollar"],["SEK","SE","kr · Swedish Krona"],["JPY","JP","¥ · Japanese Yen"],["CNY","CN","¥ · Chinese Yuan"],
            ["RUB","RU","₽ · Russian Ruble"],["BRL","BR","R$ · Brazilian Real"],["MXN","MX","$ · Mexican Peso"],["INR","IN","₹ · Indian Rupee"],
            ["TRY","TR","₺ · Turkish Lira"],["KRW","KR","₩ · South Korean Won"],["CHF","CH","Fr · Swiss Franc"]];
  var LANGS=[["EN","US","English"],["ES","ES","Español"],["FR","FR","Français"],["DE","DE","Deutsch"],["JA","JP","日本語"],
             ["RU","RU","Русский"],["ZH","CN","中文"],["PT","PT","Português"],["PL","PL","Polski"],["IT","IT","Italiano"],
             ["KO","KR","한국어"],["VI","VN","Tiếng Việt"],["TR","TR","Türkçe"],["AR","SA","العربية"],["HI","IN","हिन्दी"],
             ["NL","NL","Nederlands"],["ID","ID","Bahasa Indonesia"]];
  var UNITS=[["btc","BTC"],["mbtc","mBTC"],["bits","bits"],["sats","sats"]];
  function qa(s){return Array.prototype.slice.call(document.querySelectorAll(s));}
  function closeAllDD(){qa(".dd.open, .tag2.open").forEach(function(n){n.classList.remove("open");});
    qa(".bandgrid.popopen").forEach(function(n){n.classList.remove("popopen");});}
  document.addEventListener("click",function(e){
    if(!e.target.closest||( !e.target.closest(".dd") && !e.target.closest(".tag2") ))closeAllDD();
  });
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeAllDD();});

  /* MENU dropdown (tablet/mobile masthead) — outside-click + Escape close come from the global .dd handlers */
  (function(){
    var m=document.getElementById("dd-menu"),mb=m.querySelector(".btn-menu");
    mb.addEventListener("click",function(e){e.stopPropagation();
      var was=m.classList.contains("open");closeAllDD();
      if(!was)m.classList.add("open");
      mb.setAttribute("aria-expanded",m.classList.contains("open")?"true":"false");
    });
  })();
  function mkHeaderDD(host,items,get,set,iconOf,veto){
    function btnHTML(v){var it=null;items.forEach(function(x){if(x[0]===v)it=x;});
      return iconOf(it)+v+'<span class="dda">▾</span>';}
    var b=document.createElement("button");b.type="button";b.className="ddb";b.innerHTML=btnHTML(get());
    var p=document.createElement("div");p.className="ddp";
    items.forEach(function(x){
      var o=document.createElement("button");o.type="button";
      o.innerHTML=iconOf(x)+x[0]+'<span class="ddn">'+x[x.length-1]+'</span>';
      if(x[0]===get())o.className="cur";
      o.addEventListener("click",function(){
        if(veto&&veto(x[0],o))return;
        set(x[0]);b.innerHTML=btnHTML(x[0]);
        Array.prototype.forEach.call(p.children,function(z){z.classList.toggle("cur",z===o);});
        closeAllDD();
      });
      p.appendChild(o);
    });
    b.addEventListener("click",function(e){e.stopPropagation();var was=host.classList.contains("open");closeAllDD();
      if(!was){host.classList.add("open");
        p.style.left="";p.style.right="";p.style.maxWidth=Math.min(340,innerWidth-24)+"px";
        var r=p.getBoundingClientRect();
        if(r.left<12||r.right>innerWidth-12){p.style.right="auto";var h=host.getBoundingClientRect(),w=Math.min(r.width,innerWidth-24);p.style.left=(Math.max(12,Math.min(h.left,innerWidth-12-w))-h.left)+"px";}
      }});
    host.appendChild(b);host.appendChild(p);
    host._sync=function(){b.innerHTML=btnHTML(get());
      Array.prototype.forEach.call(p.children,function(z,i){z.classList.toggle("cur",items[i][0]===get());});};
  }
  function mkPop(host,items,get,set){
    function lab(v){var l=v;items.forEach(function(x){if(x[0]===v)l=x[1];});return l+'<span class="dda">▾</span>';}
    var b=document.createElement("button");b.type="button";b.className="tagbtn";b.innerHTML=lab(get());
    var p=document.createElement("div");p.className="pop";
    var g=document.createElement("div");g.className="grid4";
    items.forEach(function(x){
      var o=document.createElement("button");o.type="button";o.textContent=x[1];
      if(x[0]===get())o.className="cur";
      o.addEventListener("click",function(){
        set(x[0]);b.innerHTML=lab(x[0]);
        Array.prototype.forEach.call(g.children,function(z){z.classList.toggle("cur",z===o);});
        closeAllDD();
      });
      g.appendChild(o);
    });
    p.appendChild(g);
    b.addEventListener("click",function(e){e.stopPropagation();var was=host.classList.contains("open");closeAllDD();
      if(!was){host.classList.add("open");
        var bg=host.closest(".bandgrid");if(bg)bg.classList.add("popopen");
        p.classList.remove("below");
        if(p.getBoundingClientRect().top<4)p.classList.add("below");
      }});
    host.appendChild(b);host.appendChild(p);
    host._sync=function(){b.innerHTML=lab(get());
      Array.prototype.forEach.call(g.children,function(z,i){z.classList.toggle("cur",items[i][0]===get());});};
  }
  function sendLangStat(body){
    var url="/api/lang-interest",sent=false;
    try{if(navigator.sendBeacon)sent=navigator.sendBeacon(url,body);}catch(e){}
    if(!sent){try{fetch(url,{method:"POST",body:body,keepalive:true}).catch(function(){});}catch(e){}}
  }
  function langInterest(v,row){
    if(v==="EN")return false;
    var voted=null,tainted=null;
    try{voted=localStorage.getItem("ob_lang_vote");tainted=localStorage.getItem("ob_lang_tainted");}catch(e){}
    if(!tainted){
      if(!voted){sendLangStat("lang="+v);try{localStorage.setItem("ob_lang_vote",v);}catch(e){}}
      else if(voted!==v){sendLangStat("retract="+voted);try{localStorage.setItem("ob_lang_tainted","1");}catch(e){}}
    }
    if(!row._t){
      var n=row.querySelector(".ddn"),orig=n.textContent;
      n.textContent="In Development";row.classList.add("dev");
      row._t=setTimeout(function(){n.textContent=orig;row.classList.remove("dev");row._t=null;},1600);
    }
    return true;
  }
  function conv(){var r=fx[S.cur];return typeof r==="number"?r:1;}
  function priceTxt(){return S.price===null?ELL:(sym[S.cur]||"")+fmt(Math.round(S.price*conv()),0);}
  function paintFiat(){
    var fp=document.getElementById("f-price");if(fp)fp.textContent=S.cur+" "+priceTxt();
    var ft=document.getElementById("f-tip");if(ft)ft.textContent="Block "+(S.height===null?ELL:fmt(S.height,0));
    /* all-time chain pills: summary.chain, absent until the service answers */
    var C=(window.OB_LIVE&&window.OB_LIVE.chain)||null,e;
    if(C){
      if(typeof C.txTotal==="number"&&(e=document.getElementById("f-ctx")))e.textContent="Txs "+fmt(C.txTotal,0);
      if(typeof C.supplySat==="number"&&(e=document.getElementById("f-sup")))e.textContent="Mined "+fmt(Math.floor(C.supplySat/1e8),0)+" BTC · "+(C.supplySat/1e8/21e6*100).toFixed(2)+"%";
      if(typeof C.fundedAddresses==="number"&&(e=document.getElementById("f-addr")))e.textContent="Addresses "+fmt(C.fundedAddresses,0);
      var sz=(typeof C.rawSizeBytes==="number"?C.rawSizeBytes:C.sizeBytes);
      if(typeof sz==="number"&&(e=document.getElementById("f-size")))e.textContent="Chain "+(sz/1e9).toFixed(2)+" GB";
    }
    /* pages copy S straight into their own state, so the hook only fires once
       real figures exist: a null price painted through a page would render a
       fabricated $0 */
    if(window.obPaintFiat&&(S.price!==null||S.height!==null))window.obPaintFiat(S);}
  var elCP=document.getElementById("c-p"),elCH=document.getElementById("c-h"),elCS=document.getElementById("c-s");
  function paintBandPrice(){if(!elCP)return;elCP.textContent=priceTxt();
    var cl=document.getElementById("c-cl");if(cl)cl.textContent=S.cur;}
  var ddCur=document.getElementById("dd-cur"),ddLang=document.getElementById("dd-lang");
  if(ddCur)mkHeaderDD(ddCur,CURS,function(){return S.cur;},function(v){S.cur=v;paintFiat();paintBandPrice();if(window.obCurrencyChange)window.obCurrencyChange(S);},function(it){return noteOf(it[0]);});
  if(ddLang)mkHeaderDD(ddLang,LANGS,function(){return S.lang;},function(v){S.lang=v;},function(it){return flagOf(it[1]);},langInterest);
  /* LIVE mode: when the page defines window.OB_DATA_API (set by Base.astro once
     lib/config.js DATA_API is filled), the band figures come from the data
     service. With no API the band simply sits still on its placeholders. */
  var LIVE=typeof window.OB_DATA_API==="string"&&window.OB_DATA_API!=="";
  function sinceTxt(s2){if(typeof s2!=="number")return ELL;var m=Math.floor(s2/60);return m?m+"m "+(s2%60)+"s":s2+"s";}
  /* the age counter only runs after a real block time has arrived */
  var sinceTimer=null;
  function startSince(){if(sinceTimer)return;
    sinceTimer=setInterval(function(){if(typeof S.since!=="number")return;S.since++;if(elCS)elCS.textContent=sinceTxt(S.since);},1000);}
  var newBlock=function(h){
    if(typeof h==="number")S.height=h;else if(typeof S.height==="number")S.height++;else return;
    S.since=0;startSince();
    if(elCH)elCH.textContent=fmt(S.height,0);if(elCS)elCS.textContent=sinceTxt(0);paintFiat();
    if(reduced||!elCH)return;
    var ic=elCH.closest(".cstat").querySelector("svg");
    [ic,elCH,elCS].forEach(function(n){if(!n)return;n.classList.remove("flash");void n.getBoundingClientRect();n.classList.add("flash");});
  };
  if(elCP){
    paintBandPrice();
    if(elCH)elCH.textContent=S.height===null?ELL:fmt(S.height,0);
    if(elCS)elCS.textContent=sinceTxt(S.since);
  }
  paintFiat();
  if(LIVE)(function(){
    function applySummary(d){
      if(!d)return;
      /* live cross-rates replace the fallback table in place, so window.OB_FX stays the
         same object and pages holding a reference see the update */
      if(d.fx&&d.fx.rates)for(var k in d.fx.rates){if(typeof d.fx.rates[k]==="number")fx[k]=d.fx.rates[k];}
      if(d.price&&typeof d.price.usd==="number")S.price=d.price.usd;
      if(typeof d.height==="number"&&d.height!==S.height){S.height=d.height;if(elCH)elCH.textContent=fmt(S.height,0);}
      if(d.lastBlockAt){
        var t=Date.parse(d.lastBlockAt);
        if(isFinite(t)){var s2=Math.max(0,Math.floor((Date.now()-t)/1000));
          S.since=s2;if(elCS)elCS.textContent=sinceTxt(s2);startSince();}
      }
      window.OB_LIVE=d;
      paintFiat();paintBandPrice();
    }
    function fallbackFetch(){
      try{fetch(window.OB_DATA_API+"/summary").then(function(r){return r.json();}).then(applySummary).catch(function(){});}catch(e){}
    }
    if(typeof EventSource==="function"){
      try{
        /* first paint must not wait on the stream: some middleboxes (AV web
           shields, proxies) buffer a nascent SSE connection for seconds, and
           the tiles sat at ellipses meanwhile (owner cold-boot report
           2026-08-16). A plain fetch races the stream; whichever lands first
           paints, the stream owns every update after. */
        fallbackFetch();
        var es=new EventSource(window.OB_DATA_API+"/stream");
        es.addEventListener("summary",function(ev){try{applySummary(JSON.parse(ev.data));}catch(e){}});
        es.addEventListener("block",function(ev){try{newBlock(JSON.parse(ev.data).height);}catch(e){}});
      }catch(e){fallbackFetch();}
    }else fallbackFetch();
  })();
  var sform=document.getElementById("sform"),sin=document.getElementById("sin");
  /* root-level canonical lookups: /{txid|address|height}; an invalid query
     flashes the field instead of navigating anywhere */
  function route(q){
    q=q.trim();if(!q)return null;
    if(/^[0-9a-fA-F]{64}$/.test(q))return"/"+q.toLowerCase();
    if(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{20,}$/.test(q))return"/"+q;
    if(/^\d{1,7}$/.test(q.replace(/,/g,"")))return"/"+q.replace(/,/g,"");
    return null;
  }
  if(sform)sform.addEventListener("submit",function(e){
    e.preventDefault();
    var r=route(sin.value);
    if(r){location.href=r;return;}
    if(sin.value.trim()){
      sin.style.transition="box-shadow .15s";
      sin.style.boxShadow="0 0 0 2px rgba(246,70,93,.65)";
      setTimeout(function(){sin.style.boxShadow="";},900);
    }
  });
  /* ---- animated typing placeholder (pauses while the user is in the field) ---- */
  var PH=[{p:"Search for an address ",t:["bc1q7x9…","17HzK4…","36q5rD…","bc1p8s…"]},
          {p:"Search for a transaction ",t:["081e2f4a…"]},
          {p:"Search for a block ",t:["958641"]}];
  var phI=0,phT=0,phPos=0,phMode="type";
  var PH_STATIC="Address, Transaction ID or Block Height",phDone=false;
  /* phones fit ~20 chars — same animation, mobile-sized script */
  if(matchMedia("(max-width:720px)").matches){
    PH=[{p:"Address ",t:["bc1q7x9…","17HzK4…","bc1p8s…"]},
        {p:"Transaction ",t:["081e2f4a…"]},
        {p:"Block ",t:["958641"]}];
    PH_STATIC="Address, TXID or Block";
  }
  /* 360-wide phones fit only ~20 characters of the 15px hint, so the 22-char
     string above clipped to "Address, TXID or Blo" with no ellipsis. One more
     tier rather than a CSS font-size override, so the width threshold and the
     strings it governs stay in the same place. */
  if(matchMedia("(max-width:400px)").matches){
    PH=[{p:"Address ",t:["bc1q7x9…","17HzK4…","bc1p8s…"]},
        {p:"TXID ",t:["081e2f4a…"]},
        {p:"Block ",t:["958641"]}];
    PH_STATIC="Address, TXID, block";
  }
  function phTick(){
    if(document.activeElement===sin||sin.value){setTimeout(phTick,800);return;}
    var seg=PH[phI],full=seg.p+seg.t[phT];
    if(phMode==="type"){
      phPos++;sin.placeholder=full.slice(0,phPos);
      if(phPos>=full.length){phMode="hold";setTimeout(phTick,1600);return;}
      setTimeout(phTick,52+Math.random()*56);return;
    }
    if(phMode==="hold"){phMode="erase";setTimeout(phTick,30);return;}
    var lastTail=phT>=seg.t.length-1;
    /* between examples erase only the id; between sections erase back to the shared prefix
       ("Search for an address …" → keep "Search for a" → type "transaction …"); full erase only before the static rest */
    var stop;
    if(!lastTail){stop=seg.p.length;}
    else if(phI===PH.length-1){stop=0;}
    else{
      var nfull=PH[phI+1].p+PH[phI+1].t[0],m=0;
      while(m<full.length&&m<nfull.length&&full[m]===nfull[m])m++;
      stop=m;
    }
    if(phPos>stop){phPos--;sin.placeholder=full.slice(0,phPos);setTimeout(phTick,24);return;}
    if(lastTail){
      if(phI===PH.length-1){                                                 /* one full rotation, then rest */
        phDone=true;
        sin.style.setProperty("--pha","0");
        sin.placeholder=PH_STATIC;
        var f0=null;
        var fade=function(ts){
          if(f0===null)f0=ts;
          var k=Math.min(1,(ts-f0)/700);
          sin.style.setProperty("--pha",String(1-Math.pow(1-k,2)));          /* ease-out */
          if(k<1)requestAnimationFrame(fade);
        };
        requestAnimationFrame(fade);
        return;
      }
      phI++;phT=0;
    }else{phT++;}
    phMode="type";setTimeout(phTick,380);
  }
  if(!reduced){setTimeout(phTick,150);}else{sin.placeholder=PH_STATIC;}
  /* addresses, txids and heights never contain spaces — block the key, strip pasted ones */
  sin.addEventListener("keydown",function(e){if(e.key===" ")e.preventDefault();});
  sin.addEventListener("input",function(){
    if(/\s/.test(sin.value)){
      var c=sin.selectionStart||0,removed=(sin.value.slice(0,c).match(/\s/g)||[]).length;
      sin.value=sin.value.replace(/\s+/g,"");
      try{sin.setSelectionRange(c-removed,c-removed);}catch(e){}
    }
  });
  sin.addEventListener("focus",function(){sin.placeholder=PH_STATIC;});
  sin.addEventListener("blur",function(){if(!sin.value){
    if(phDone){sin.placeholder=PH_STATIC;}
    else{phI=0;phT=0;phPos=0;phMode="type";}
  }});

  var SATOSHI=[
    ["The root problem with conventional currency is all the trust that's required to make it work.","P2P Foundation, February 2009"],
    ["It might make sense just to get some in case it catches on.","Cryptography mailing list, January 2009"],
    ["If you don't believe me or don't get it, I don't have time to try to convince you, sorry.","bitcointalk, July 2010"],
    ["Lost coins only make everyone else's coins worth slightly more. Think of it as a donation to everyone.","bitcointalk, June 2010"],
    ["The nature of Bitcoin is such that once version 0.1 was released, the core design was set in stone for the rest of its lifetime.","bitcointalk, June 2010"],
    ["Writing a description of Bitcoin for general audiences is bloody hard. There's nothing to relate it to.","bitcointalk, July 2010"],
    ["We have proposed a system for electronic transactions without relying on trust.","Bitcoin whitepaper, October 2008"],
    ["Governments are good at cutting off the heads of centrally controlled networks like Napster, but pure P2P networks like Gnutella and Tor seem to be holding their own.","Cryptography mailing list, November 2008"],
    ["In a few decades when the reward gets too small, the transaction fee will become the main compensation for nodes.","bitcointalk, February 2010"],
    ["I've moved on to other things. It's in good hands with Gavin and everyone.","Email to Mike Hearn, April 2011"],
    ["Banks must be trusted to hold our money and transfer it electronically, but they lend it out in waves of credit bubbles with barely a fraction in reserve.","P2P Foundation, February 2009"],
    ["With e-currency based on cryptographic proof, without the need to trust a third party middleman, money can be secure and transactions effortless.","P2P Foundation, February 2009"],
    ["I'm sure that in 20 years there will either be very large transaction volume or no volume.","bitcointalk, February 2010"],
    ["The utility of the exchanges made possible by Bitcoin will far exceed the cost of electricity used. Therefore, not having Bitcoin would be the net waste.","bitcointalk, August 2010"],
    ["The heat from your computer is not wasted if you need to heat your home.","bitcointalk, August 2010"],
    ["WikiLeaks has kicked the hornet's nest, and the swarm is headed towards us.","bitcointalk, December 2010"],
    ["We can win a major battle in the arms race and gain a new territory of freedom for several years.","Cryptography mailing list, November 2008"],
    ["As a thought experiment, imagine there was a base metal as scarce as gold … and one special, magical property: it can be transported over a communications channel.","bitcointalk, August 2010"]
  ];
  (function(){
    /* deterministic per-page: the URL path picks the quote, so each page always shows the same one */
    var h=0,p=location.pathname;
    for(var i=0;i<p.length;i++)h=(h*31+p.charCodeAt(i))>>>0;
    var q=SATOSHI[h%SATOSHI.length];
    document.getElementById("sq-text").textContent=q[0];
    document.getElementById("sq-cite").textContent="Satoshi Nakamoto \u00B7 "+q[1];
  })();
})();

/* phones: the slim band's three cockpit tiles ride the topbar next to the
   burger, one at a time on a 7s rotation, rolling like a ticker (owner
   2026-08-17). The NODES move, so the c-p/c-h/c-s fills above keep working
   wherever the tiles sit; desktop puts them back in the band. The rotation
   skips ticks while the tab is hidden and the fade collapses to an instant
   swap under reduced motion (css side). */
(function(){
  var rotor=document.getElementById("tb-rotor"),
      band=document.querySelector(".band.slim .cband");
  if(!rotor||!band)return;
  var tiles=Array.prototype.slice.call(band.querySelectorAll(".cstat"));
  if(tiles.length<2)return;
  var lookup=band.querySelector(".lookup"),
      mq=matchMedia("(max-width:720px)"),timer=0,idx=0;
  /* the box glides to hug the active reading; +16 = the chip's side padding
     plus a little air. The observer keeps it snug when a live value changes
     width mid-view (the last-block seconds tick every second). */
  function fit(){
    var sp=tiles[idx].querySelector("span");
    if(sp)rotor.style.width=Math.min(96,Math.ceil(sp.getBoundingClientRect().width)+16)+"px";
  }
  function show(i){tiles.forEach(function(t,k){t.classList.toggle("on",k===i);t.classList.remove("out");});fit();}
  if(window.ResizeObserver){
    var ro=new ResizeObserver(function(){if(mq.matches)fit();});
    tiles.forEach(function(t){var sp=t.querySelector("span");if(sp)ro.observe(sp);});
  }
  /* ticker roll: the current reading exits upward while the next rises in
     from below in the same beat, so the box never sits empty (owner); the
     exit class clears once the roll lands and the tile waits below again */
  function tick(){
    if(document.hidden)return;
    var cur=tiles[idx];
    cur.classList.remove("on");cur.classList.add("out");
    idx=(idx+1)%tiles.length;
    tiles[idx].classList.add("on");
    fit();
    setTimeout(function(){cur.classList.remove("out");},500);
  }
  var bar=document.querySelector(".topbar");
  function place(){
    clearInterval(timer);
    if(mq.matches){
      tiles.forEach(function(t){rotor.appendChild(t);});
      show(idx);
      timer=setInterval(tick,7000);
      if(bar)bar.classList.add("tb-compact");   /* burger-only; the front page keeps MENU */
    }else{
      tiles.forEach(function(t){t.classList.remove("on");t.classList.remove("out");band.insertBefore(t,lookup);});
      rotor.style.width="";
      if(bar)bar.classList.remove("tb-compact");
    }
  }
  place();
  mq.addEventListener?mq.addEventListener("change",place):mq.addListener(place);
})();
