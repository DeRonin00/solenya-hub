(async()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let D;try{const r=await fetch('data/tools.json',{cache:'no-cache'});if(!r.ok)throw 0;D=await r.json()}catch{$('#grid').innerHTML='<p class="empty">Could not load <code>data/tools.json</code>. Serve the site over HTTP (see README).</p>';return}
const T=Array.isArray(D.tools)?D.tools:[],C=Array.isArray(D.categories)?D.categories:[],L=D.links||{},cm=Object.fromEntries(C.map(c=>[c.id,c]));
const fr=T.filter(t=>t.access==='free').length,pr=T.filter(t=>t.access==='premium').length;
$('#yr').textContent=new Date().getFullYear();
$('#stats').innerHTML=[['box',T.length,'Tools'],['star',`${fr} Free · ${pr} Premium`,'Access options'],['chart','Active','Development'],['users','Community','Built for Torn players']].map(([i,a,b])=>`<div><span class="ico">${svg(i)}</span><b>${esc(a)}</b><small>${esc(b)}</small></div>`).join('');
const F=T.filter(t=>t.featured);if(F.length){$('#featured').hidden=false;$('#feat').innerHTML=F.map((t,i)=>card(t,cm[t.category],'big',i)).join('')}
const S={q:'',a:'all',c:'all',s:'manual'};
$('#chips').innerHTML=[{id:'all',name:'All categories',icon:'grid'},...C].map(c=>`<button data-c="${esc(c.id)}">${svg(c.icon)}${esc(c.name)}</button>`).join('');
const ui=()=>{$$('#acc button').forEach(b=>b.classList.toggle('on',b.dataset.a===S.a));$$('#chips button').forEach(b=>b.classList.toggle('on',b.dataset.c===S.c));$('#q').value=S.q;$('#sort').value=S.s};
const draw=()=>{const q=S.q.toLowerCase();let r=T.filter(t=>(S.a==='all'||t.access===S.a)&&(S.c==='all'||t.category===S.c)&&(!q||`${t.name} ${t.description}`.toLowerCase().includes(q)));
if(S.s==='name')r=[...r].sort((a,b)=>(a.name||'').localeCompare(b.name||''));if(S.s==='new')r=[...r].sort((a,b)=>(b.updated||'').localeCompare(a.updated||''));
$('#grid').innerHTML=r.length?r.map((t,i)=>card(t,cm[t.category],'',Math.min(i,12))).join(''):'<div class="empty">No tools match your filters.<br><button class="link" id="clr">Clear filters</button></div>';
$('#count').textContent=`${r.length} / ${T.length} TOOLS`;ui()};
$('#acc').onclick=e=>{const a=e.target.dataset.a;if(a){S.a=a;draw()}};
$('#chips').onclick=e=>{const b=e.target.closest('button');if(b){S.c=b.dataset.c;draw()}};
$('#q').oninput=e=>{S.q=e.target.value.trim();draw()};$('#sort').onchange=e=>{S.s=e.target.value;draw()};
$('#grid').onclick=e=>{if(e.target.id==='clr'){Object.assign(S,{q:'',a:'all',c:'all'});draw()}};
draw();
const ln=[['torn','Torn profile'],['discord','Discord']];
$('#links').innerHTML=ln.map(([k,n])=> {
  if (k === 'discord' && L[k]) return `<li class="dim">${n} — .Solenya.</li>`;
  return safeUrl(L[k])?`<li><a href="${esc(safeUrl(L[k]))}" target="_blank" rel="noopener noreferrer">${n} →</a></li>`:`<li class="dim">${n} — not configured yet (set in <code>data/tools.json</code>)</li>`;
}).join('');

$('#ns').onclick=()=>{$('#tools').scrollIntoView();setTimeout(()=>$('#q').focus({preventScroll:true}),300)};
$('#burger').onclick=()=>{const o=$('#menu').classList.toggle('open');$('#burger').setAttribute('aria-expanded',o)};
$('#menu').onclick=e=>{if(e.target.closest('a'))$('#menu').classList.remove('open')};
const io=new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}}),{threshold:.1});$$('.rv').forEach(x=>io.observe(x));
const nav=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#menu a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id&&a.id!=='dl'))}),{rootMargin:'-40% 0px -55% 0px'});['home','tools','about'].forEach(i=>nav.observe($('#'+i)));
addEventListener('scroll',()=>$('#nav').classList.toggle('sm',scrollY>40),{passive:true});
const h=$('.hero');let raf;if(!matchMedia('(prefers-reduced-motion:reduce)').matches)h.onpointermove=e=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{h.style.setProperty('--mx',(e.clientX/innerWidth-.5).toFixed(3));h.style.setProperty('--my',(e.clientY/innerHeight-.5).toFixed(3))})};
document.addEventListener('visibilitychange',()=>document.body.classList.toggle('paused',document.hidden));
})();
