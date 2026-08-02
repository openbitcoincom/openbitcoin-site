const fs=require('fs');
const {join}=require('path');
function walk(d,out=[]){for(const n of fs.readdirSync(d)){const p=join(d,n);
  if(fs.statSync(p).isDirectory())walk(p,out);else if(n==='index.html')out.push(p);}return out;}
const dist=join(process.cwd(),'dist');
const routes=walk(dist).map(p=>p.slice(dist.length,-'index.html'.length).replace(/\\/g,'/'))
  .concat(['/404.html']).sort();
const html=`<!doctype html><meta charset="utf-8"><body style="margin:0">
<iframe id="f" style="width:360px;height:700px;border:0"></iframe>
<pre id="out"></pre>
<script>
var routes=${JSON.stringify(routes)},i=0,res=[];
var f=document.getElementById("f");
function next(){
  if(i>=routes.length){document.getElementById("out").textContent="RESULTS "+JSON.stringify(res);document.title="DONE";return;}
  var r=routes[i++],done=false;
  var t=setTimeout(function(){if(!done){done=true;res.push([r,-1]);next();}},4000);
  f.onload=function(){
    if(done)return;
    setTimeout(function(){
      if(done)return;done=true;clearTimeout(t);
      try{res.push([r,f.contentDocument.documentElement.scrollWidth]);}
      catch(e){res.push([r,-2]);}
      next();
    },700);
  };
  f.src=r;
}
next();
</script>`;
fs.writeFileSync(join(dist,'__measure.html'),html);
console.log('measure page written,',routes.length,'routes');
