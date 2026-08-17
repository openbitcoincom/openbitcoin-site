export function consentHtml(GA_ID) {
  if (!GA_ID) return '';
  return `
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{if(window.obConsentRead&&window.obConsentRead()==='granted')gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}catch(e){}
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<div id="ob-consent" class="ob-consent" hidden role="dialog" aria-label="Cookie choice">
<p class="ob-consent-t">This site uses cookies for analytics.</p>
<div class="ob-consent-b"><button type="button" id="ob-consent-ok">OK</button><button type="button" id="ob-consent-no">No</button></div>
</div>
<style>.ob-consent[hidden]{display:none}.ob-consent{position:fixed;left:12px;right:12px;bottom:12px;z-index:60;width:max-content;max-width:min(560px,calc(100% - 24px));margin:0 auto;display:flex;align-items:center;gap:12px;flex-wrap:wrap;background:var(--panel,#101D33);border:1px solid var(--line-2,#2A3B5C);border-radius:12px;padding:12px 16px;box-shadow:0 8px 30px rgba(0,0,0,.4)}.ob-consent-t{font:600 12.5px/1.5 var(--sans,system-ui);color:var(--ink-2,#C7D3E8);margin:0;flex:0 1 auto}.ob-consent-b{display:flex;gap:8px}.ob-consent button{font:700 11px var(--mono,monospace);letter-spacing:.06em;text-transform:uppercase;border-radius:8px;padding:8px 16px;cursor:pointer;border:1px solid var(--line-2,#2A3B5C);background:transparent;color:var(--ink-2,#C7D3E8)}.ob-consent #ob-consent-ok{background:var(--cta,#16273F);color:var(--cta-ink,#F7931A);border-color:var(--line-2,#2A3B5C);box-shadow:inset 0 1px 0 rgba(255,255,255,.09)}.ob-consent #ob-consent-ok:hover{background:var(--cta-hov,#1E304C)}</style>
<script>(function(){var el=document.getElementById('ob-consent');if(!el)return;
var s=window.obConsentRead?window.obConsentRead():null;
if(s)window.obConsentWrite&&window.obConsentWrite(s);   /* heal whichever store was cleared */
else el.hidden=false;
function c(v){window.obConsentWrite&&window.obConsentWrite(v);
if(v==='granted'&&window.gtag)gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
el.hidden=true;}
document.getElementById('ob-consent-ok').addEventListener('click',function(){c('granted');});
document.getElementById('ob-consent-no').addEventListener('click',function(){c('denied');});})();</script>`;
}

export const CONSENT_STORE = `<script>(function(){var K='ob-consent';
function ck(){try{var m=document.cookie.match(/(?:^|;\\s*)ob-consent=(granted|denied)/);return m?m[1]:null;}catch(e){return null;}}
function ls(){try{var v=localStorage.getItem(K);return (v==='granted'||v==='denied')?v:null;}catch(e){return null;}}
window.obConsentRead=function(){return ck()||ls();};
window.obConsentWrite=function(v){
try{localStorage.setItem(K,v);}catch(e){}
try{document.cookie=K+'='+v+';Max-Age=31536000;Path=/;SameSite=Lax'+(location.protocol==='https:'?';Secure':'');}catch(e){}
};})();</script>`;
