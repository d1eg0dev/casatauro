/* ═══════════════════════════════════════════════════════════
   CASA TAURO — sitio.js · v1 (Fase 1)
   Motor compartido por TODAS las páginas (incluido index).
   · i18n ES/EN (localStorage 'ct-lang') + red de seguridad
   · Menú hamburguesa fullscreen + submenu (.msub)
   · Header compacto al scrollear + WhatsApp flotante (>500px)
   · Reveal/stagger con IntersectionObserver
   · Fallback de imágenes data-fb → picsum
   · Enlaces .waLink / .mailLink
   · Lightbox por grupos (.gal) y modo solo (hero, data-lb)
   ═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
var WA_NUMBER='524498905064';           /* +52 449 890 5064 */
var MAIL='info@casatauro.com.mx';       /* PLACEHOLDER-CONTACT: confirmar email de reservas */
var LANG_KEY='ct-lang';                 /* NUEVA clave (antes ce-lang en Escobedo) */

/* ---------- i18n ---------- */
function applyLang(x){
  document.documentElement.lang=x;
  try{localStorage.setItem(LANG_KEY,x)}catch(e){}
  document.querySelectorAll('.langsw button').forEach(function(b){
    b.classList.toggle('on',b.getAttribute('data-l')===x);
  });
  /* red de seguridad: estilos inline con !important (lección Escobedo) */
  document.querySelectorAll('.lang').forEach(function(el){
    var tag=el.tagName.toLowerCase();
    var mode=(tag==='span'||tag==='tspan')?'inline':'block';
    el.style.setProperty('display',el.classList.contains(x)?mode:'none','important');
  });
}
var saved=null;try{saved=localStorage.getItem(LANG_KEY)}catch(e){}
applyLang(saved||((navigator.language||'es').toLowerCase().indexOf('en')===0?'en':'es'));
document.querySelectorAll('.langsw button').forEach(function(b){
  b.addEventListener('click',function(){applyLang(b.getAttribute('data-l'))});
});

/* ---------- menú hamburguesa + submenu ---------- */
var burger=document.getElementById('burger'),
    mm=document.getElementById('mm'),
    mmX=document.getElementById('mmX');
function menuClose(){if(!mm)return;mm.classList.remove('open');document.body.classList.remove('lock');if(burger)burger.setAttribute('aria-expanded','false');}
function menuOpen(){if(!mm)return;mm.classList.add('open');document.body.classList.add('lock');if(burger)burger.setAttribute('aria-expanded','true');}
if(burger)burger.addEventListener('click',function(){mm.classList.contains('open')?menuClose():menuOpen();});
if(mmX)mmX.addEventListener('click',menuClose);
if(mm){
  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',menuClose);});
  var msubBtn=document.getElementById('msubBtn');   /* toggle del submenu — SIEMPRE junto al menú */
  if(msubBtn)msubBtn.addEventListener('click',function(){
    msubBtn.closest('.msub').classList.toggle('open');
  });
}

/* ---------- scroll: header compacto + WhatsApp flotante ---------- */
var hd=document.getElementById('hd'),waF=document.getElementById('waFloat');
function onScroll(){
  var y=window.scrollY||0;
  if(hd)hd.classList.toggle('sc',y>40);
  if(waF)waF.classList.toggle('show',y>500);
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&mm&&mm.classList.contains('open'))menuClose();
});

/* ---------- reveal / stagger ---------- */
var reduce=false;
try{reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
var revs=document.querySelectorAll('.reveal');
if(reduce||!('IntersectionObserver' in window)){
  revs.forEach(function(el){el.classList.add('in')});
}else{
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  revs.forEach(function(el){io.observe(el)});
}

/* ---------- fallback de imágenes data-fb → picsum ---------- */
document.querySelectorAll('img[data-fb]').forEach(function(img){
  function fb(){
    var p=(img.getAttribute('data-fb')||'').split('/');
    if(p.length>=3)img.src='https://picsum.photos/seed/'+p[0]+'/'+p[1]+'/'+p[2];
  }
  img.addEventListener('error',function(){img.removeEventListener('error',fb);fb();});
  if(img.complete&&img.naturalWidth===0)fb();
});

/* ---------- enlaces de contacto ---------- */
document.querySelectorAll('a.waLink').forEach(function(a){
  a.setAttribute('href','https://wa.me/'+WA_NUMBER);
  a.setAttribute('target','_blank');a.setAttribute('rel','noopener');
});
document.querySelectorAll('a.mailLink').forEach(function(a){
  var h=a.getAttribute('href');
  if(!h||h==='#')a.setAttribute('href','mailto:'+MAIL);
});

/* ---------- lightbox: grupos (.gal) y modo solo ---------- */
var lb=null,lbImg=null,lbCap=null,lbP=null,lbN=null;
var curList=[],curIdx=0,soloMode=false;
function buildLB(){
  lb=document.createElement('div');lb.id='lb';
  lb.innerHTML='<button class="lb-x" type="button" aria-label="Cerrar">✕</button>'+
    '<button class="lb-p" type="button" aria-label="Anterior">‹</button>'+
    '<button class="lb-n" type="button" aria-label="Siguiente">›</button>'+
    '<img alt=""><div class="lb-c"></div>';
  document.body.appendChild(lb);
  lbImg=lb.querySelector('img');lbCap=lb.querySelector('.lb-c');
  lbP=lb.querySelector('.lb-p');lbN=lb.querySelector('.lb-n');
  lbP.addEventListener('click',function(){step(-1)});
  lbN.addEventListener('click',function(){step(1)});
  lb.querySelector('.lb-x').addEventListener('click',lbClose);
  lb.addEventListener('click',function(e){if(e.target===lb)lbClose();});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')lbClose();
    else if(e.key==='ArrowLeft')step(-1);
    else if(e.key==='ArrowRight')step(1);
  });
}
function lbShow(){
  var img=curList[curIdx];if(!img)return;
  lbImg.src=img.currentSrc||img.src;
  lbImg.alt=img.alt||'';
  var fig=img.closest('figure'),t='';
  if(fig){
    var cap=fig.querySelector('figcaption');
    if(cap){
      var s=cap.querySelector('span.lang.'+document.documentElement.lang);
      t=(s||cap).textContent.trim();
    }
  }
  lbCap.textContent=t;
  lbCap.style.display=t?'':'none';
  var many=curList.length>1&&!soloMode;
  lbP.style.display=many?'':'none';
  lbN.style.display=many?'':'none';
}
function lbOpen(list,i,solo){
  if(!lb)buildLB();
  curList=list;curIdx=i;soloMode=!!solo;
  lb.classList.add('open');document.body.classList.add('lock');
  lbShow();
}
function lbClose(){if(!lb)return;lb.classList.remove('open');document.body.classList.remove('lock');lbImg.src='';}
function step(d){
  if(soloMode||curList.length<2)return;
  curIdx=(curIdx+d+curList.length)%curList.length;lbShow();
}
document.querySelectorAll('.gal').forEach(function(g){
  var imgs=[].slice.call(g.querySelectorAll('img'));
  imgs.forEach(function(img,i){
    img.style.cursor='zoom-in';
    img.addEventListener('click',function(){lbOpen(imgs,i,false)});
  });
});
document.querySelectorAll('.hero img, img[data-lb]').forEach(function(img){
  img.style.cursor='zoom-in';
  img.addEventListener('click',function(){lbOpen([img],0,true)});
});
})();
