import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { GA_ID } from './config.js';

function consentBlock() {
  if (!GA_ID) return '';
  return `
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{if(localStorage.getItem('ob-consent')==='granted')gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}catch(e){}
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<div id="ob-consent" class="ob-consent" hidden role="dialog" aria-label="Cookie choice">
<p class="ob-consent-t">This site uses cookies for analytics.</p>
<div class="ob-consent-b"><button type="button" id="ob-consent-ok">OK</button><button type="button" id="ob-consent-no">No</button></div>
</div>
<style>.ob-consent[hidden]{display:none}.ob-consent{position:fixed;left:12px;right:12px;bottom:12px;z-index:60;width:max-content;max-width:min(560px,calc(100% - 24px));margin:0 auto;display:flex;align-items:center;gap:12px;flex-wrap:wrap;background:var(--panel,#101D33);border:1px solid var(--line-2,#2A3B5C);border-radius:12px;padding:12px 16px;box-shadow:0 8px 30px rgba(0,0,0,.4)}.ob-consent-t{font:600 12.5px/1.5 var(--sans,system-ui);color:var(--ink-2,#C7D3E8);margin:0;flex:0 1 auto}.ob-consent-b{display:flex;gap:8px}.ob-consent button{font:700 11px var(--mono,monospace);letter-spacing:.06em;text-transform:uppercase;border-radius:8px;padding:8px 16px;cursor:pointer;border:1px solid var(--line-2,#2A3B5C);background:transparent;color:var(--ink-2,#C7D3E8)}.ob-consent #ob-consent-ok{background:var(--cta,#16273F);color:var(--cta-ink,#F7931A);border-color:var(--line-2,#2A3B5C);box-shadow:inset 0 1px 0 rgba(255,255,255,.09)}.ob-consent #ob-consent-ok:hover{background:var(--cta-hov,#1E304C)}</style>
<script>(function(){var el=document.getElementById('ob-consent');if(!el)return;var s;try{s=localStorage.getItem('ob-consent');}catch(e){}if(!s)el.hidden=false;function c(v){try{localStorage.setItem('ob-consent',v);}catch(e){}if(v==='granted'&&window.gtag)gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});el.hidden=true;}document.getElementById('ob-consent-ok').addEventListener('click',function(){c('granted');});document.getElementById('ob-consent-no').addEventListener('click',function(){c('denied');});})();</script>`;
}

export function loadProto(name, route) {
  const candidates = [
    resolve(process.cwd(), '..', 'prototype', name), // npm run from site/
    resolve(process.cwd(), 'prototype', name),       // run from repo root
  ];
  const path = candidates.find(existsSync);
  if (!path) throw new Error(`prototype page not found: ${name}`);
  let html = readFileSync(path, 'utf8');
  html = html.replace(/href="(index|address|block|tx|chart|contact|quantum)\.html"/g,
    (m, p) => (p === 'index' ? 'href="/"' : `href="/${p}"`));
  html = html.replace(/(<meta name="viewport"[^>]*>)/,
    '$1\n<link rel="icon" type="image/svg+xml" href="/favicon.svg">');
  if (route !== undefined) {
    const canonical = 'https://openbitcoin.com' + (route === '/' ? '/' : route);
    const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || 'OpenBitcoin';
    const d = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    const og = [
      '<meta name="robots" content="noindex">',
      `<link rel="canonical" href="${canonical}">`,
      '<meta property="og:site_name" content="OpenBitcoin">',
      '<meta property="og:type" content="website">',
      `<meta property="og:title" content="${t}">`,
      d && `<meta property="og:description" content="${d}">`,
      `<meta property="og:url" content="${canonical}">`,
      '<meta property="og:image" content="https://openbitcoin.com/og/default.png">',
      '<meta property="og:image:width" content="1200">',
      '<meta property="og:image:height" content="630">',
      '<meta name="twitter:card" content="summary_large_image">',
      `<meta name="twitter:title" content="${t}">`,
      '<meta name="twitter:image" content="https://openbitcoin.com/og/default.png">',
    ].filter(Boolean).join('\n');
    html = html.replace('</title>', '</title>\n' + og);
  }
  const footLinks = {
    About: '/about', Sources: '/sources', Disclosure: '/disclosure', Privacy: '/privacy',
    Converter: '/convert', 'Fee estimator': '/fees', 'Sats calculator': '/sats',
    'Halving countdown': '/halving', 'Address validator': '/tools/validate', Charts: '/chart',
    'DCA backtester': '/dca',
    Learn: '/learn', News: '/news', Nodes: '/nodes', Blocks: '/blocks', Mempool: '/mempool',
    Wallets: '/wallets', 'Buy / sell bitcoin': '/buy', 'Gift cards': '/spend/gift-cards',
    'Rich list': '/rich-list', Swap: '/swap', 'No-KYC list': '/no-kyc',
    'Bitcoin ATMs': '/atms', API: '/api', 'Merchant map': '/spend/map', Games: '/games',
    'Block explorer': '/', 'Seed recovery': '/tools/seed-recovery',
    'BIP39 check': '/tools/bip39', 'Verify message': '/tools/verify-message',
  };
  html = html.split('<a href="#"><svg viewBox="0 0 24 24"><path d="M4 4v16h16"').join('<a href="/chart"><svg viewBox="0 0 24 24"><path d="M4 4v16h16"');
  html = html.split('<a href="#"><svg viewBox="0 0 24 24"><path d="M12 6.5C10 4.8').join('<a href="/learn"><svg viewBox="0 0 24 24"><path d="M12 6.5C10 4.8');
  html = html.split('<a href="#"><svg viewBox="0 0 24 24"><rect x="3.5" y="6.5"').join('<a href="/wallets"><svg viewBox="0 0 24 24"><rect x="3.5" y="6.5"');
  html = html.split('<a href="#"><svg viewBox="0 0 24 24"><rect x="4" y="9.5"').join('<a href="/spend/gift-cards"><svg viewBox="0 0 24 24"><rect x="4" y="9.5"');
  html = html.split('<a class="btn-swap" href="#"').join('<a class="btn-swap" href="/swap"');
  html = html.split('<a class="btn-buy" href="#"').join('<a class="btn-buy" href="/buy"');
  html = html.split('<a href="#"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3.5"').join('<a href="/casinos"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3.5"');
  html = html.split('<a href="#"><svg viewBox="0 0 24 24"><path d="M7.5 8.5h9a5.5 5.5').join('<a href="/games"><svg viewBox="0 0 24 24"><path d="M7.5 8.5h9a5.5 5.5');
  html = html.replace('<a href="#">Bitcoin Casinos</a>', '<a href="/casinos">Bitcoin Casinos</a>');
  for (const [label, href] of Object.entries(footLinks)) {
    html = html.replace(`<a href="#">${label}</a>`, `<a href="${href}">${label}</a>`);
  }
  html = html.replace('<a href="#">Sponsor</a>', '');
  html = html.replace('<a href="#">Status</a>', '');
  html = html.replace('<li><a href="/learn">Learn</a></li>',
    '<li><a href="/learn">Learn</a></li><li><a href="/tax">Bitcoin taxes</a></li>');
  html = html.replace('<li><a href="/convert">Converter</a></li>',
    '<li><a href="/tools">All tools</a></li><li><a href="/convert">Converter</a></li>');
  html = html.replace('<li><a href="/nodes">Nodes</a></li>',
    '<li><a href="/hashrate">Hashrate</a></li><li><a href="/nodes">Nodes</a></li>');
  html = html.replace('<a href="/privacy">Privacy</a>', '<a href="/privacy">Privacy</a><a href="/terms">Terms</a>');
  const cb = consentBlock();
  if (cb) html = html.replace('</body>', cb + '\n</body>');
  return html;
}
