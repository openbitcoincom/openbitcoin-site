export function analyticsHtml(UMAMI_ID) {
  if (!UMAMI_ID) return '';
  return `
<script>(function(){
var p=location.pathname,b=p;
if(RegExp('^/(?:[13][a-km-zA-HJ-NP-Z1-9]{24,33}|bc1[a-z0-9]{11,90})$').test(p))b='/lookup/address';
else if(RegExp('^/[0-9a-fA-F]{64}$').test(p))b='/lookup/tx';
else if(RegExp('^/[0-9]{1,9}$').test(p))b='/lookup/block';
var s=document.createElement('script');s.defer=true;s.src='/u.js';
s.setAttribute('data-website-id','${UMAMI_ID}');
s.setAttribute('data-host-url','https://openbitcoin.com/_uma');
s.setAttribute('data-auto-track','false');
s.onload=function(){try{
window.umami&&umami.track(function(x){return Object.assign({},x,{url:b,title:b===p?document.title:b});});
}catch(e){}};
document.head.appendChild(s);
})();</script>`;
}
