import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { UMAMI_ID } from './config.js';
import { analyticsHtml } from './analytics-snippet.js';

function analyticsBlock() {
  return analyticsHtml(UMAMI_ID);
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
  html = html.split('<span>Gift Cards</span></a>').join('<span>Gift Cards</span></a><a href="/vpn"><svg viewBox="0 0 24 24"><path d="M12 3.2 19.5 6v6.1c0 4.2-3 7.5-7.5 8.7-4.5-1.2-7.5-4.5-7.5-8.7V6z"/><path d="M9.2 12.2l2 2 3.6-3.9"/></svg><span>VPNs</span></a>');
  html = html.split('<a class="btn-swap" href="#"').join('<a class="btn-swap" href="/swap"');
  html = html.split('<a class="btn-buy" href="#"').join('<a class="btn-buy" href="/buy"');
  html = html.split('<a href="#"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3.5"/><circle class="f" cx="9" cy="9" r="1.2"/><circle class="f" cx="15" cy="9" r="1.2"/><circle class="f" cx="12" cy="12" r="1.2"/><circle class="f" cx="9" cy="15" r="1.2"/><circle class="f" cx="15" cy="15" r="1.2"/></svg><span>Casinos</span></a>').join('');
  html = html.split('<a href="#"><svg viewBox="0 0 24 24"><path d="M7.5 8.5h9a5.5 5.5').join('<a href="/games"><svg viewBox="0 0 24 24"><path d="M7.5 8.5h9a5.5 5.5');
  html = html.replace('<li><a href="#">Bitcoin Casinos</a></li>', '');
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
  const cb = analyticsBlock();
  if (cb) html = html.replace('</body>', cb + '\n</body>');
  return html;
}
