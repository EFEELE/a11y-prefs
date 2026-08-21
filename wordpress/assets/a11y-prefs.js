/*! a11y-prefs v0.2.0 | MIT | github.com/EFEELE/a11y-prefs */
"use strict";var A11yPrefs=(()=>{var G=Object.defineProperty;var Mt=Object.getOwnPropertyDescriptor;var kt=Object.getOwnPropertyNames;var At=Object.prototype.hasOwnProperty;var st=i=>{throw TypeError(i)};var wt=(i,e)=>{for(var t in e)G(i,t,{get:e[t],enumerable:!0})},Et=(i,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of kt(e))!At.call(i,n)&&n!==t&&G(i,n,{get:()=>e[n],enumerable:!(a=Mt(e,n))||a.enumerable});return i};var St=i=>Et(G({},"__esModule",{value:!0}),i);var Y=(i,e,t)=>e.has(i)||st("Cannot "+t);var o=(i,e,t)=>(Y(i,e,"read from private field"),t?t.call(i):e.get(i)),f=(i,e,t)=>e.has(i)?st("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),p=(i,e,t,a)=>(Y(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),l=(i,e,t)=>(Y(i,e,"access private method"),t);var $t={};wt($t,{A11yPrefsElement:()=>F,BUNDLED_LOCALES:()=>J,DEFAULT_LOCALE:()=>S,FEATURES:()=>O,FEATURE_IDS:()=>E,TAG_NAME:()=>I,configure:()=>ot,defineA11yPrefs:()=>it,registerA11yPrefs:()=>B});function nt(i){typeof document>"u"||(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",i,{once:!0}):i())}var h=i=>`<path d="${i}"/>`,O=[{id:"fontSize",kind:"step",options:["1","2","3","4"],icon:h("M3 20 9 4h2l6 16M5.5 14h9M16 20l3-8h1l3 8M17.2 17.5h4.6")},{id:"textSpacing",kind:"step",options:["1","2","3"],icon:h("M3 5h18M3 19h18M7 9h10M7 12h10M7 15h10")},{id:"contrast",kind:"enum",options:["high","invert","grayscale"],icon:`<circle cx="12" cy="12" r="9"/>${h("M12 3v18a9 9 0 0 0 0-18Z")}`},{id:"dyslexia",kind:"toggle",options:["on"],icon:h("M4 19V7a3 3 0 0 1 6 0v12M4 13h6M14 5h6l-6 14h6")},{id:"links",kind:"toggle",options:["on"],icon:h("M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1")},{id:"headings",kind:"toggle",options:["on"],icon:h("M5 5v14M13 5v14M5 12h8M17 19v-8l4 8v-8")},{id:"focusOutline",kind:"toggle",options:["on"],icon:'<circle cx="12" cy="12" r="3"/>'+h("M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3")},{id:"stopAnimations",kind:"toggle",options:["on"],icon:`<circle cx="12" cy="12" r="9"/>${h("M9 9h2v6H9zM13 9h2v6h-2z")}`},{id:"readingHelp",kind:"enum",options:["guide","mask"],icon:h("M3 6h18M3 12h18M3 18h18M7 12l-2 2 2 2")},{id:"bigCursor",kind:"toggle",options:["on"],icon:h("M5 3l14 9-6 1.5L10.5 20z")},{id:"hideImages",kind:"toggle",options:["on"],icon:h("M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6")+'<circle cx="8.5" cy="9" r="1.5"/>'+h("M3 3l18 18")},{id:"alignStart",kind:"toggle",options:["on"],icon:h("M3 5h18M3 9h12M3 13h18M3 17h12")}],E=O.map(i=>i.id),Ct=new Map(O.map(i=>[i.id,i])),P=i=>Ct.get(i),N=i=>`data-a11y-${i.replace(/[A-Z]/g,e=>"-"+e.toLowerCase())}`;var D={"ui.title":"Accessibility","ui.open":"Accessibility options","ui.close":"Close","ui.reset":"Reset all","ui.statement":"Accessibility statement","ui.on":"on","ui.off":"off","ui.level":"Level {n} of {max}","ui.didReset":"Preferences reset","ui.hint":"Your preferences are stored in this browser only.","feature.fontSize":"Text size","feature.textSpacing":"Text spacing","feature.contrast":"Contrast","feature.dyslexia":"Dyslexia-friendly font","feature.links":"Highlight links","feature.headings":"Highlight headings","feature.focusOutline":"Visible focus","feature.stopAnimations":"Stop animations","feature.readingHelp":"Reading help","feature.bigCursor":"Big cursor","feature.hideImages":"Hide images","feature.alignStart":"Align to start","option.contrast.high":"High","option.contrast.invert":"Inverted","option.contrast.grayscale":"Grayscale","option.readingHelp.guide":"Guide","option.readingHelp.mask":"Mask"};var rt={"ui.title":"Accesibilidad","ui.open":"Opciones de accesibilidad","ui.close":"Cerrar","ui.reset":"Restablecer todo","ui.statement":"Declaración de accesibilidad","ui.on":"activado","ui.off":"desactivado","ui.level":"Nivel {n} de {max}","ui.didReset":"Preferencias restablecidas","ui.hint":"Tus preferencias se guardan solo en este navegador.","feature.fontSize":"Tamaño del texto","feature.textSpacing":"Espaciado del texto","feature.contrast":"Contraste","feature.dyslexia":"Fuente para dislexia","feature.links":"Resaltar enlaces","feature.headings":"Resaltar títulos","feature.focusOutline":"Foco visible","feature.stopAnimations":"Detener animaciones","feature.readingHelp":"Ayuda de lectura","feature.bigCursor":"Cursor grande","feature.hideImages":"Ocultar imágenes","feature.alignStart":"Alinear al inicio","option.contrast.high":"Alto","option.contrast.invert":"Invertido","option.contrast.grayscale":"Escala de grises","option.readingHelp.guide":"Guía","option.readingHelp.mask":"Máscara"};var lt={"ui.title":"Accessibilità","ui.open":"Opzioni di accessibilità","ui.close":"Chiudi","ui.reset":"Reimposta tutto","ui.statement":"Dichiarazione di accessibilità","ui.on":"attivo","ui.off":"disattivato","ui.level":"Livello {n} di {max}","ui.didReset":"Preferenze reimpostate","ui.hint":"Le tue preferenze restano solo in questo browser.","feature.fontSize":"Dimensione del testo","feature.textSpacing":"Spaziatura del testo","feature.contrast":"Contrasto","feature.dyslexia":"Font per dislessia","feature.links":"Evidenzia i link","feature.headings":"Evidenzia i titoli","feature.focusOutline":"Focus visibile","feature.stopAnimations":"Ferma le animazioni","feature.readingHelp":"Aiuto alla lettura","feature.bigCursor":"Cursore grande","feature.hideImages":"Nascondi le immagini","feature.alignStart":"Allinea all'inizio","option.contrast.high":"Alto","option.contrast.invert":"Invertito","option.contrast.grayscale":"Scala di grigi","option.readingHelp.guide":"Guida","option.readingHelp.mask":"Maschera"};var J={en:D,es:rt,it:lt},S="en";function V(i,e){let t=i.toLowerCase();if(e[t])return t;let a=t.split("-")[0];return a&&e[a]?a:null}function ct(i,e,t){let a={...J};for(let[m,M]of Object.entries(t??{})){let w=m.toLowerCase();a[w]={...a[w]??{},...M}}let n=!i||i==="auto"?document.documentElement.getAttribute("lang")||e:i,r=V(n,a)??V(e,a)??S,c=a[r]??{},x=a[V(e,a)??S]??D;return{locale:r,t(m,M){let w=c[m]??x[m]??D[m]??m;return M?w.replace(/\{(\w+)\}/g,(k,_)=>String(M[_]??k)):w}}}var Lt=encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M5 2l14 9-6.2 1.4L10.6 20z" fill="#fff" stroke="#000" stroke-width="1.4"/></svg>'),dt=`
:root{
  --a11y-scale:1; --a11y-letter:normal; --a11y-word:normal; --a11y-line:normal;
  --a11y-focus-color:#1d4ed8;
  --a11y-dyslexia-font:"OpenDyslexic","Open Dyslexic","Atkinson Hyperlegible","Comic Sans MS",Verdana,sans-serif;
}

/* Scaling the root pulls along everything sized in rem. A site with hardcoded
   px type will not scale — an honest limitation, not something to paper over. */
html[data-a11y-font-size="1"]{--a11y-scale:1.125}
html[data-a11y-font-size="2"]{--a11y-scale:1.25}
html[data-a11y-font-size="3"]{--a11y-scale:1.5}
html[data-a11y-font-size="4"]{--a11y-scale:2}
html[data-a11y-font-size]{font-size:calc(100% * var(--a11y-scale))!important}

/* Level 2 is exactly what WCAG 1.4.12 asks for. */
html[data-a11y-text-spacing="1"]{--a11y-letter:.06em;--a11y-word:.1em;--a11y-line:1.6}
html[data-a11y-text-spacing="2"]{--a11y-letter:.12em;--a11y-word:.16em;--a11y-line:1.8}
html[data-a11y-text-spacing="3"]{--a11y-letter:.18em;--a11y-word:.24em;--a11y-line:2.1}
html[data-a11y-text-spacing] body *:not([data-a11y-root]):not(svg):not(svg *){
  letter-spacing:var(--a11y-letter)!important;
  word-spacing:var(--a11y-word)!important;
  line-height:var(--a11y-line)!important;
}

/* High contrast sets colours outright rather than filtering, so text wins. */
html[data-a11y-contrast="high"] body,
html[data-a11y-contrast="high"] body *:not([data-a11y-root]){
  background-color:#000!important;color:#fff!important;
  border-color:#fff!important;text-shadow:none!important;box-shadow:none!important;
}
html[data-a11y-contrast="high"] body :is(a,a *):not([data-a11y-root]){color:#ff0!important}
html[data-a11y-contrast="high"] body :is(button,summary,[role="button"]):not([data-a11y-root]){
  outline:2px solid #fff!important;outline-offset:1px;
}

/* Inverting filters the root, then un-inverts media and the panel itself. */
html[data-a11y-contrast="invert"]{filter:invert(1) hue-rotate(180deg)!important;background:#fff}
html[data-a11y-contrast="invert"] :is(img,picture,video,iframe,canvas),
html[data-a11y-contrast="invert"] [data-a11y-root]{filter:invert(1) hue-rotate(180deg)!important}

html[data-a11y-contrast="grayscale"]{filter:grayscale(1)!important}

html[data-a11y-dyslexia] body *:not([data-a11y-root]){font-family:var(--a11y-dyslexia-font)!important}

html[data-a11y-links] body a:not([data-a11y-root]){
  text-decoration:underline!important;text-underline-offset:.2em!important;
  outline:1px dashed currentColor!important;outline-offset:2px;
}

html[data-a11y-headings] body :is(h1,h2,h3,h4,h5,h6){
  outline:2px dashed #d97706!important;outline-offset:3px;
}

html[data-a11y-focus-outline] body *:focus{
  outline:3px solid var(--a11y-focus-color)!important;outline-offset:2px!important;
}

/* 1ms rather than 0: transitionend and animationend still fire, so host code
   waiting on them keeps working. */
html[data-a11y-stop-animations] *:not([data-a11y-root]):not([data-a11y-root] *){
  animation-duration:1ms!important;animation-iteration-count:1!important;
  transition-duration:1ms!important;scroll-behavior:auto!important;
}

html[data-a11y-big-cursor] body *:not([data-a11y-root]){
  cursor:url("data:image/svg+xml,${Lt}") 4 2,auto!important;
}

/* visibility, not display: the space is kept and the layout does not jump. */
html[data-a11y-hide-images] body :is(img,picture,video,canvas,svg):not([data-a11y-root]):not([data-a11y-root] *){
  visibility:hidden!important;
}
html[data-a11y-hide-images] body *:not([data-a11y-root]){background-image:none!important}

/* start, not left: forcing left would be wrong in Arabic or Hebrew. */
html[data-a11y-align-start] body *:not([data-a11y-root]){text-align:start!important}

@media print{[data-a11y-root]{display:none!important}}
`,ft=`
:host{
  all:initial;
  --a11y-accent:#0b57d0;
  --a11y-on-accent:#fff;
  --a11y-bg:#fff;
  --a11y-surface:#f4f6fa;
  --a11y-fg:#111827;
  --a11y-muted:#5b6472;
  --a11y-border:#d5dbe6;
  --a11y-radius:16px;
  --a11y-button:52px;
  --a11y-offset:20px;
  --a11y-z:2147483000;
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  color:var(--a11y-fg);
  line-height:1.4;
}
@media (prefers-color-scheme:dark){
  :host{--a11y-bg:#161a21;--a11y-surface:#1e232c;--a11y-fg:#eef2f7;--a11y-muted:#9aa5b5;--a11y-border:#333b48}
}
*,*::before,*::after{box-sizing:border-box}
button{font:inherit;color:inherit;margin:0;cursor:pointer}

/* Each edge falls back to the shared offset, so setting just one of them is
   enough and the other three keep the default. */
.root{
  --a11y-offset-top:var(--a11y-offset);
  --a11y-offset-right:var(--a11y-offset);
  --a11y-offset-bottom:var(--a11y-offset);
  --a11y-offset-left:var(--a11y-offset);
}

.launcher{
  position:fixed;z-index:var(--a11y-z);
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  width:var(--a11y-button);height:var(--a11y-button);padding:0;
  border:0;border-radius:50%;
  background:var(--a11y-accent);color:var(--a11y-on-accent);
  box-shadow:0 4px 14px rgba(0,0,0,.28);
  transition:transform .18s ease,box-shadow .18s ease;
}
.launcher:hover{transform:scale(1.06)}
.launcher:focus-visible{outline:3px solid var(--a11y-accent);outline-offset:3px}
.launcher svg{width:60%;height:60%;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}

/* 44px is the smallest touch target WCAG 2.5.5 will accept. */
[data-size="sm"]{--a11y-button:44px}
[data-size="lg"]{--a11y-button:62px}

[data-shape="rounded"] .launcher{border-radius:16px}
[data-shape="square"] .launcher{border-radius:6px}
[data-shape="pill"] .launcher{width:auto;height:calc(var(--a11y-button) - 6px);border-radius:999px;padding:0 20px 0 16px}
[data-shape="pill"] .launcher svg{width:24px;height:24px;flex:none}
.launcher .label{display:none;font-size:15px;font-weight:600;white-space:nowrap}
[data-shape="pill"] .launcher .label{display:inline}

[data-pos="bottom-right"] .launcher{bottom:var(--a11y-offset-bottom);right:var(--a11y-offset-right)}
[data-pos="bottom-left"]  .launcher{bottom:var(--a11y-offset-bottom);left:var(--a11y-offset-left)}
[data-pos="top-right"]    .launcher{top:var(--a11y-offset-top);right:var(--a11y-offset-right)}
[data-pos="top-left"]     .launcher{top:var(--a11y-offset-top);left:var(--a11y-offset-left)}
[data-pos="middle-right"] .launcher{top:50%;right:var(--a11y-offset-right);transform:translateY(-50%)}
[data-pos="middle-left"]  .launcher{top:50%;left:var(--a11y-offset-left);transform:translateY(-50%)}
[data-pos="middle-right"] .launcher:hover{transform:translateY(-50%) scale(1.06)}
[data-pos="middle-left"]  .launcher:hover{transform:translateY(-50%) scale(1.06)}

.backdrop{position:fixed;inset:0;z-index:calc(var(--a11y-z) - 1);background:rgba(0,0,0,.4)}

.panel{
  position:fixed;z-index:var(--a11y-z);
  width:min(384px,calc(100vw - 24px));max-height:min(620px,calc(100vh - 24px));
  display:flex;flex-direction:column;overflow:hidden;
  background:var(--a11y-bg);border:1px solid var(--a11y-border);
  border-radius:var(--a11y-radius);box-shadow:0 18px 50px rgba(0,0,0,.32);
}
[data-pos$="-right"] .panel{right:var(--a11y-offset-right)}
[data-pos$="-left"]  .panel{left:var(--a11y-offset-left)}
[data-pos^="bottom"] .panel{bottom:calc(var(--a11y-offset-bottom) + var(--a11y-button) + 12px)}
[data-pos^="top"]    .panel{top:calc(var(--a11y-offset-top) + var(--a11y-button) + 12px)}
[data-pos^="middle"] .panel{top:50%;transform:translateY(-50%)}

.head{display:flex;align-items:center;gap:8px;padding:14px 14px 12px;border-bottom:1px solid var(--a11y-border)}
.head h2{margin:0;font-size:17px;font-weight:700;flex:1}
.icon-button{
  display:grid;place-items:center;width:36px;height:36px;flex:none;
  border:1px solid var(--a11y-border);border-radius:10px;background:var(--a11y-surface);
}
.icon-button:hover{border-color:var(--a11y-accent)}
.icon-button:focus-visible,.card:focus-visible,.foot a:focus-visible{outline:3px solid var(--a11y-accent);outline-offset:2px}
.icon-button svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}

.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px;overflow-y:auto;flex:1}

.card{
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
  text-align:center;padding:12px 8px;min-height:96px;
  border:1px solid var(--a11y-border);border-radius:12px;
  background:var(--a11y-surface);
}
.card:hover{border-color:var(--a11y-accent)}
.card svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.card .name{font-size:13px;font-weight:600;line-height:1.25}
.card .value{font-size:11px;color:var(--a11y-muted)}
.card[aria-pressed="true"],.card[data-active="true"]{
  background:var(--a11y-accent);color:var(--a11y-on-accent);border-color:var(--a11y-accent);
}
.card[aria-pressed="true"] .value,.card[data-active="true"] .value{color:inherit;opacity:.85}

.pips{display:flex;gap:4px}
.pips i{width:14px;height:4px;border-radius:2px;background:currentColor;opacity:.28}
.pips i.on{opacity:1}

.foot{
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  padding:10px 14px;border-top:1px solid var(--a11y-border);
  font-size:12px;color:var(--a11y-muted);
}
.foot a{color:var(--a11y-accent)}

.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}

/* Reading aids live in the shadow root so the host DOM stays untouched. */
.guide{
  position:fixed;left:0;right:0;height:0;
  border-top:4px solid var(--a11y-accent);box-shadow:0 0 0 1px rgba(255,255,255,.6);
  z-index:calc(var(--a11y-z) - 2);pointer-events:none;
}
.mask{
  position:fixed;inset:0;z-index:calc(var(--a11y-z) - 2);pointer-events:none;
  background:rgba(0,0,0,.72);
  clip-path:polygon(0 0,100% 0,100% var(--top),0 var(--top),0 var(--bottom),100% var(--bottom),100% 100%,0 100%);
}

@media (max-width:600px){
  .panel{left:12px;right:12px;bottom:12px;top:auto;width:auto;transform:none;max-height:78vh}
  [data-pos^="top"] .panel,[data-pos^="middle"] .panel{top:auto;bottom:12px;transform:none}
}
@media (prefers-reduced-motion:reduce){
  .launcher{transition:none}
}
`;var I="a11y-prefs",pt={universal:'<circle cx="12" cy="12" r="9.2"/><circle cx="12" cy="7.1" r="1.35"/><path d="M6.9 10.1 12 11.1l5.1-1M12 11.1v3.2M12 14.3 9.7 19.6M12 14.3l2.3 5.3"/>',person:'<circle cx="12" cy="5" r="2.2"/><path d="M5 10.5 12 12l7-1.5M12 12v4M12 16l-3 6M12 16l3 6"/>',eye:'<path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',wheelchair:'<circle cx="13" cy="4" r="2"/><path d="M11 8v5h5l3 7M8.5 11a6 6 0 1 0 7.6 8.4"/>'},zt='<path d="M6 6l12 12M18 6 6 18"/>',It='<path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"/>',U={locale:"auto",fallbackLocale:S,position:"bottom-right",offset:"20px",shape:"circle",size:"md",accent:"#0b57d0",storageKey:"a11y-prefs"},j={};function ot(i){j={...j,...i}}var ut=!1;function Pt(){if(ut||document.getElementById("a11y-prefs-styles"))return;let i=document.createElement("style");i.id="a11y-prefs-styles",i.textContent=dt,document.head.append(i),ut=!0}function Tt(i){let e=i.trim().replace("#",""),t=e.length===3?e.replace(/./g,r=>r+r):e;if(!/^[0-9a-f]{6}$/i.test(t))return"#fff";let a=r=>{let c=parseInt(t.slice(r,r+2),16)/255;return c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4)};return .2126*a(0)+.7152*a(2)+.0722*a(4)>.42?"#111827":"#fff"}var q=i=>`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${i}</svg>`,d,R,v,y,A,L,C,u,g,b,$,H,z,s,T,ht,gt,W,Z,Q,X,mt,tt,yt,vt,et,K,at,bt,F=class extends HTMLElement{constructor(){super();f(this,s);f(this,d);f(this,R);f(this,v);f(this,y);f(this,A);f(this,L);f(this,C,null);f(this,u,{});f(this,g);f(this,b,!1);f(this,$,!1);f(this,H,null);f(this,z,t=>l(this,s,mt).call(this,t.clientY));p(this,d,this.attachShadow({mode:"open"}))}static get observedAttributes(){return["locale","fallback-locale","messages","position","offset","offset-top","offset-right","offset-bottom","offset-left","shape","size","accent","accent-contrast","icon","label","features","statement-url","storage-key","z-index"]}connectedCallback(){Pt(),this.setAttribute("data-a11y-root",""),l(this,s,gt).call(this),l(this,s,tt).call(this);for(let t of E)l(this,s,Z).call(this,t)}disconnectedCallback(){document.removeEventListener("pointermove",o(this,z))}attributeChangedCallback(){o(this,$)&&l(this,s,tt).call(this)}open(){o(this,b)||(p(this,b,!0),p(this,H,o(this,d).activeElement??document.activeElement),o(this,y).hidden=!1,o(this,A).hidden=!1,o(this,v).setAttribute("aria-expanded","true"),o(this,y).querySelector(".icon-button")?.focus())}close(){if(!o(this,b))return;p(this,b,!1),o(this,y).hidden=!0,o(this,A).hidden=!0,o(this,v).setAttribute("aria-expanded","false");let t=o(this,H);(t instanceof HTMLElement&&t!==this&&t.isConnected?t:o(this,v)).focus()}toggle(){o(this,b)?this.close():this.open()}getState(){return{...o(this,u)}}set(t,a){a===null?delete o(this,u)[t]:o(this,u)[t]=a,l(this,s,Z).call(this,t),l(this,s,W).call(this),l(this,s,K).call(this),this.dispatchEvent(new CustomEvent("a11y-prefs-change",{detail:{id:t,value:a,state:this.getState()},bubbles:!0,composed:!0}))}reset(){for(let t of E)delete o(this,u)[t],document.documentElement.removeAttribute(N(t));l(this,s,X).call(this),l(this,s,W).call(this),l(this,s,K).call(this),l(this,s,at).call(this,o(this,g).t("ui.didReset")),this.dispatchEvent(new CustomEvent("a11y-prefs-change",{detail:{state:{}},bubbles:!0,composed:!0}))}};d=new WeakMap,R=new WeakMap,v=new WeakMap,y=new WeakMap,A=new WeakMap,L=new WeakMap,C=new WeakMap,u=new WeakMap,g=new WeakMap,b=new WeakMap,$=new WeakMap,H=new WeakMap,z=new WeakMap,s=new WeakSet,T=function(){let t=c=>this.getAttribute(c)??void 0,a=t("features"),n=t("messages"),r;if(n)try{r={...j.messages,...JSON.parse(n)}}catch{}return{...U,...j,...r&&{messages:r},...t("locale")&&{locale:t("locale")},...t("fallback-locale")&&{fallbackLocale:t("fallback-locale")},...t("position")&&{position:t("position")},...t("offset")&&{offset:t("offset")},...t("offset-top")&&{offsetTop:t("offset-top")},...t("offset-right")&&{offsetRight:t("offset-right")},...t("offset-bottom")&&{offsetBottom:t("offset-bottom")},...t("offset-left")&&{offsetLeft:t("offset-left")},...t("shape")&&{shape:t("shape")},...t("size")&&{size:t("size")},...t("accent")&&{accent:t("accent")},...t("accent-contrast")&&{accentContrast:t("accent-contrast")},...t("icon")&&{icon:t("icon")},...t("label")&&{label:t("label")},...t("statement-url")&&{statementUrl:t("statement-url")},...t("storage-key")&&{storageKey:t("storage-key")},...t("z-index")&&{zIndex:Number(t("z-index"))},...a&&{features:a.split(",").map(c=>c.trim()).filter(c=>E.includes(c))}}},ht=function(){let t=o(this,s,T).features;return t?.length?t:[...E]},gt=function(){try{let t=localStorage.getItem(o(this,s,T).storageKey??U.storageKey);t&&p(this,u,JSON.parse(t))}catch{}},W=function(){try{localStorage.setItem(o(this,s,T).storageKey??U.storageKey,JSON.stringify(o(this,u)))}catch{}},Z=function(t){let a=o(this,u)[t],n=document.documentElement;a===void 0?n.removeAttribute(N(t)):n.setAttribute(N(t),a),t==="readingHelp"&&l(this,s,Q).call(this)},Q=function(){let t=o(this,u).readingHelp;if(l(this,s,X).call(this),!t)return;let a=document.createElement("div");a.className=t==="mask"?"mask":"guide",a.style.setProperty("--top","45vh"),a.style.setProperty("--bottom","55vh"),t==="guide"&&(a.style.top="50vh"),o(this,R).append(a),p(this,C,a),document.addEventListener("pointermove",o(this,z),{passive:!0})},X=function(){document.removeEventListener("pointermove",o(this,z)),o(this,C)?.remove(),p(this,C,null)},mt=function(t){let a=o(this,C);a&&(o(this,u).readingHelp==="mask"?(a.style.setProperty("--top",`${Math.max(0,t-60)}px`),a.style.setProperty("--bottom",`${t+60}px`)):a.style.top=`${t}px`)},tt=function(){let t=o(this,s,T);p(this,g,ct(t.locale,t.fallbackLocale??S,t.messages));let a=o(this,g).t,n=t.icon??"universal",r=n in pt?pt[n]:String(n),c=t.label??a("ui.open"),x=t.accent??U.accent,m=t.accentContrast??Tt(x),M={"--a11y-accent":x,"--a11y-on-accent":m,"--a11y-offset":t.offset,"--a11y-offset-top":t.offsetTop,"--a11y-offset-right":t.offsetRight,"--a11y-offset-bottom":t.offsetBottom,"--a11y-offset-left":t.offsetLeft,"--a11y-z":t.zIndex},w=Object.entries(M).filter(([,k])=>k!==void 0&&k!=="").map(([k,_])=>`${k}:${_}`).join(";");o(this,d).innerHTML=`
      <style>${ft}</style>
      <div class="root"
           data-pos="${t.position}"
           data-shape="${t.shape}"
           data-size="${t.size}"
           style="${w}">
        <button class="launcher" type="button" aria-haspopup="dialog" aria-expanded="false"
                aria-label="${a("ui.open")}">
          ${q(r)}<span class="label">${c}</span>
        </button>

        <div class="backdrop" hidden></div>

        <div class="panel" role="dialog" aria-modal="true" aria-label="${a("ui.title")}" hidden>
          <div class="head">
            <h2>${a("ui.title")}</h2>
            <button class="icon-button reset" type="button"
                    title="${a("ui.reset")}" aria-label="${a("ui.reset")}">${q(It)}</button>
            <button class="icon-button dismiss" type="button"
                    title="${a("ui.close")}" aria-label="${a("ui.close")}">${q(zt)}</button>
          </div>
          <div class="grid"></div>
          <div class="foot">
            <span>${a("ui.hint")}</span>
            ${t.statementUrl?`<a href="${t.statementUrl}">${a("ui.statement")}</a>`:""}
          </div>
        </div>

        <div class="sr-only" role="status" aria-live="polite"></div>
      </div>`,p(this,R,o(this,d).querySelector(".root")),p(this,v,o(this,d).querySelector(".launcher")),p(this,y,o(this,d).querySelector(".panel")),p(this,A,o(this,d).querySelector(".backdrop")),p(this,L,o(this,d).querySelector(".sr-only")),o(this,v).addEventListener("click",()=>this.toggle()),o(this,A).addEventListener("click",()=>this.close()),o(this,d).querySelector(".dismiss").addEventListener("click",()=>this.close()),o(this,d).querySelector(".reset").addEventListener("click",()=>this.reset()),o(this,y).addEventListener("keydown",k=>l(this,s,bt).call(this,k)),l(this,s,yt).call(this),p(this,$,!0),l(this,s,K).call(this),l(this,s,Q).call(this),o(this,b)&&(o(this,y).hidden=!1,o(this,A).hidden=!1,o(this,v).setAttribute("aria-expanded","true"))},yt=function(){let t=o(this,d).querySelector(".grid");t.replaceChildren();for(let a of o(this,s,ht)){let n=P(a);if(!n)continue;let r=document.createElement("button");r.type="button",r.className="card",r.dataset.id=a,r.innerHTML=q(n.icon)+`<span class="name">${o(this,g).t(`feature.${a}`)}</span>`+(n.kind==="step"?`<span class="pips">${n.options.map(()=>"<i></i>").join("")}</span>`:"")+'<span class="value"></span>',n.kind==="toggle"&&r.setAttribute("aria-pressed","false"),r.addEventListener("click",()=>l(this,s,vt).call(this,a)),t.append(r)}},vt=function(t){let a=P(t);if(!a)return;let n=o(this,u)[t],r=n?a.options.indexOf(n):-1;this.set(t,a.options[r+1]??null);let c=l(this,s,et).call(this,t)||o(this,g).t("ui.off");l(this,s,at).call(this,`${o(this,g).t(`feature.${t}`)}: ${c}`)},et=function(t){let a=P(t),n=o(this,u)[t];return!a||!n?"":a.kind==="toggle"?o(this,g).t("ui.on"):a.kind==="step"?o(this,g).t("ui.level",{n:a.options.indexOf(n)+1,max:a.options.length}):o(this,g).t(`option.${t}.${n}`)},K=function(){for(let t of o(this,d).querySelectorAll(".card")){let a=t.dataset.id,n=P(a);if(!n)continue;let r=o(this,u)[a],c=r!==void 0;n.kind==="toggle"?t.setAttribute("aria-pressed",String(c)):t.dataset.active=String(c),t.querySelector(".value").textContent=l(this,s,et).call(this,a);let x=c?n.options.indexOf(r)+1:0;t.querySelectorAll(".pips i").forEach((m,M)=>m.classList.toggle("on",M<x))}},at=function(t){o(this,L).textContent="",setTimeout(()=>o(this,L).textContent=t,60)},bt=function(t){if(t.key==="Escape"){t.stopPropagation(),this.close();return}if(t.key!=="Tab")return;let a=[...o(this,y).querySelectorAll("button, a[href]")].filter(x=>!x.hasAttribute("disabled")),n=a[0],r=a[a.length-1];if(!n||!r)return;let c=o(this,d).activeElement;t.shiftKey&&c===n?(t.preventDefault(),r.focus()):!t.shiftKey&&c===r&&(t.preventDefault(),n.focus())};function B(){typeof customElements<"u"&&!customElements.get(I)&&customElements.define(I,F)}function it(i={}){if(typeof window>"u")return null;ot(i),B();let e=document.querySelector(I);if(e)return e;let t=document.createElement(I);return(i.container??document.body).append(t),t}var xt=document.currentScript;function Ft(i){if(!i)return{};let e=i.dataset,t={};if(e.locale&&(t.locale=e.locale),e.fallbackLocale&&(t.fallbackLocale=e.fallbackLocale),e.position&&(t.position=e.position),e.offset&&(t.offset=e.offset),e.offsetTop&&(t.offsetTop=e.offsetTop),e.offsetRight&&(t.offsetRight=e.offsetRight),e.offsetBottom&&(t.offsetBottom=e.offsetBottom),e.offsetLeft&&(t.offsetLeft=e.offsetLeft),e.shape&&(t.shape=e.shape),e.size&&(t.size=e.size),e.accent&&(t.accent=e.accent),e.accentContrast&&(t.accentContrast=e.accentContrast),e.icon&&(t.icon=e.icon),e.label&&(t.label=e.label),e.statementUrl&&(t.statementUrl=e.statementUrl),e.storageKey&&(t.storageKey=e.storageKey),e.zIndex&&(t.zIndex=Number(e.zIndex)),e.features&&(t.features=e.features.split(",").map(a=>a.trim())),e.messages)try{t.messages=JSON.parse(e.messages)}catch{}return t}var Rt={...window.a11yPrefsConfig,...Ft(xt)};B();xt?.dataset.auto!=="false"&&nt(()=>it(Rt));return St($t);})();
