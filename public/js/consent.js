/* Consent Mode v2 banner (dormant until GA_ID is set in src/lib/config.js).
   Contract per the plan: minimal bottom card, "This site uses cookies." with
   OK / No; browsing is identical either way; analytics runs non-personalized
   with consent denied until an explicit OK; the choice persists and the card
   never returns. No third-party requests happen before OK: gtag.js itself is
   only injected after consent is granted, which is stricter than Consent
   Mode requires and keeps the pre-consent page at zero third-party bytes. */
(function () {
  'use strict';
  var GA_ID = document.documentElement.getAttribute('data-ga') || '';
  if (!GA_ID) return;

  var KEY = 'ob-consent'; /* 'granted' | 'denied' */
  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied',
  });

  function loadGa() {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  if (choice === 'granted') { loadGa(); return; }
  if (choice === 'denied') return;

  function decide(granted) {
    try { localStorage.setItem(KEY, granted ? 'granted' : 'denied'); } catch (e) {}
    var el = document.getElementById('ob-consent');
    if (el) el.remove();
    if (granted) loadGa();
  }

  function show() {
    var card = document.createElement('div');
    card.id = 'ob-consent';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-label', 'Cookie consent');
    card.innerHTML =
      '<style>' +
      '#ob-consent{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;justify-content:center;padding:0 12px 12px}' +
      '#ob-consent .obc{display:flex;align-items:center;gap:14px;flex-wrap:wrap;max-width:560px;width:100%;' +
      'background:#101D33;border:1px solid #2A3B5C;border-radius:12px;padding:12px 16px;' +
      'box-shadow:0 8px 30px rgba(0,0,0,.45);font:600 13px/1.5 system-ui,"Segoe UI",Roboto,sans-serif;color:#C7D3E8}' +
      '#ob-consent .obc b{font-weight:600;flex:1 1 180px}' +
      '#ob-consent button{font:700 12px ui-monospace,Consolas,monospace;letter-spacing:.06em;border-radius:8px;' +
      'padding:8px 18px;cursor:pointer}' +
      '#ob-consent .ok{background:#16273F;color:#F7931A;border:1.