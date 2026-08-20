/*! a11y-prefs v0.1.0 | MIT | github.com/EFEELE/a11y-prefs */
"use strict";var A11yPrefs=(()=>{var j=Object.defineProperty;var Me=Object.getOwnPropertyDescriptor;var Ae=Object.getOwnPropertyNames;var ke=Object.prototype.hasOwnProperty;var oe=o=>{throw TypeError(o)};var we=(o,a)=>{for(var e in a)j(o,e,{get:a[e],enumerable:!0})},Ee=(o,a,e,t)=>{if(a&&typeof a=="object"||typeof a=="function")for(let s of Ae(a))!ke.call(o,s)&&s!==e&&j(o,s,{get:()=>a[s],enumerable:!(t=Me(a,s))||t.enumerable});return o};var Se=o=>Ee(j({},"__esModule",{value:!0}),o);var B=(o,a,e)=>a.has(o)||oe("Cannot "+e);var i=(o,a,e)=>(B(o,a,"read from private field"),e?e.call(o):a.get(o)),p=(o,a,e)=>a.has(o)?oe("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(o):a.set(o,e),u=(o,a,e,t)=>(B(o,a,"write to private field"),t?t.call(o,e):a.set(o,e),e),l=(o,a,e)=>(B(o,a,"access private method"),e);var He={};we(He,{A11yPrefsElement:()=>$,BUNDLED_LOCALES:()=>Y,DEFAULT_LOCALE:()=>k,FEATURES:()=>R,FEATURE_IDS:()=>A,TAG_NAME:()=>z,configure:()=>te,defineA11yPrefs:()=>ae,registerA11yPrefs:()=>_});function ie(o){typeof document>"u"||(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",o,{once:!0}):o())}var h=o=>`<path d="${o}"/>`,R=[{id:"fontSize",kind:"step",options:["1","2","3","4"],icon:h("M3 20 9 4h2l6 16M5.5 14h9M16 20l3-8h1l3 8M17.2 17.5h4.6")},{id:"textSpacing",kind:"step",options:["1","2","3"],icon:h("M3 5h18M3 19h18M7 9h10M7 12h10M7 15h10")},{id:"contrast",kind:"enum",options:["high","invert","grayscale"],icon:`<circle cx="12" cy="12" r="9"/>${h("M12 3v18a9 9 0 0 0 0-18Z")}`},{id:"dyslexia",kind:"toggle",options:["on"],icon:h("M4 19V7a3 3 0 0 1 6 0v12M4 13h6M14 5h6l-6 14h6")},{id:"links",kind:"toggle",options:["on"],icon:h("M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1")},{id:"headings",kind:"toggle",options:["on"],icon:h("M5 5v14M13 5v14M5 12h8M17 19v-8l4 8v-8")},{id:"focusOutline",kind:"toggle",options:["on"],icon:'<circle cx="12" cy="12" r="3"/>'+h("M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3")},{id:"stopAnimations",kind:"toggle",options:["on"],icon:`<circle cx="12" cy="12" r="9"/>${h("M9 9h2v6H9zM13 9h2v6h-2z")}`},{id:"readingHelp",kind:"enum",options:["guide","mask"],icon:h("M3 6h18M3 12h18M3 18h18M7 12l-2 2 2 2")},{id:"bigCursor",kind:"toggle",options:["on"],icon:h("M5 3l14 9-6 1.5L10.5 20z")},{id:"hideImages",kind:"toggle",options:["on"],icon:h("M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6")+'<circle cx="8.5" cy="9" r="1.5"/>'+h("M3 3l18 18")},{id:"alignStart",kind:"toggle",options:["on"],icon:h("M3 5h18M3 9h12M3 13h18M3 17h12")}],A=R.map(o=>o.id),Ce=new Map(R.map(o=>[o.id,o])),I=o=>Ce.get(o),O=o=>`data-a11y-${o.replace(/[A-Z]/g,a=>"-"+a.toLowerCase())}`;var N={"ui.title":"Accessibility","ui.open":"Accessibility options","ui.close":"Close","ui.reset":"Reset all","ui.statement":"Accessibility statement","ui.on":"on","ui.off":"off","ui.level":"Level {n} of {max}","ui.didReset":"Preferences reset","ui.hint":"Your preferences are stored in this browser only.","feature.fontSize":"Text size","feature.textSpacing":"Text spacing","feature.contrast":"Contrast","feature.dyslexia":"Dyslexia-friendly font","feature.links":"Highlight links","feature.headings":"Highlight headings","feature.focusOutline":"Visible focus","feature.stopAnimations":"Stop animations","feature.readingHelp":"Reading help","feature.bigCursor":"Big cursor","feature.hideImages":"Hide images","feature.alignStart":"Align to start","option.contrast.high":"High","option.contrast.invert":"Inverted","option.contrast.grayscale":"Grayscale","option.readingHelp.guide":"Guide","option.readingHelp.mask":"Mask"};var ne={"ui.title":"Accesibilidad","ui.open":"Opciones de accesibilidad","ui.close":"Cerrar","ui.reset":"Restablecer todo","ui.statement":"Declaración de accesibilidad","ui.on":"activado","ui.off":"desactivado","ui.level":"Nivel {n} de {max}","ui.didReset":"Preferencias restablecidas","ui.hint":"Tus preferencias se guardan solo en este navegador.","feature.fontSize":"Tamaño del texto","feature.textSpacing":"Espaciado del texto","feature.contrast":"Contraste","feature.dyslexia":"Fuente para dislexia","feature.links":"Resaltar enlaces","feature.headings":"Resaltar títulos","feature.focusOutline":"Foco visible","feature.stopAnimations":"Detener animaciones","feature.readingHelp":"Ayuda de lectura","feature.bigCursor":"Cursor grande","feature.hideImages":"Ocultar imágenes","feature.alignStart":"Alinear al inicio","option.contrast.high":"Alto","option.contrast.invert":"Invertido","option.contrast.grayscale":"Escala de grises","option.readingHelp.guide":"Guía","option.readingHelp.mask":"Máscara"};var se={"ui.title":"Accessibilità","ui.open":"Opzioni di accessibilità","ui.close":"Chiudi","ui.reset":"Reimposta tutto","ui.statement":"Dichiarazione di accessibilità","ui.on":"attivo","ui.off":"disattivato","ui.level":"Livello {n} di {max}","ui.didReset":"Preferenze reimpostate","ui.hint":"Le tue preferenze restano solo in questo browser.","feature.fontSize":"Dimensione del testo","feature.textSpacing":"Spaziatura del testo","feature.contrast":"Contrasto","feature.dyslexia":"Font per dislessia","feature.links":"Evidenzia i link","feature.headings":"Evidenzia i titoli","feature.focusOutline":"Focus visibile","feature.stopAnimations":"Ferma le animazioni","feature.readingHelp":"Aiuto alla lettura","feature.bigCursor":"Cursore grande","feature.hideImages":"Nascondi le immagini","feature.alignStart":"Allinea all'inizio","option.contrast.high":"Alto","option.contrast.invert":"Invertito","option.contrast.grayscale":"Scala di grigi","option.readingHelp.guide":"Guida","option.readingHelp.mask":"Maschera"};var Y={en:N,es:ne,it:se},k="en";function G(o,a){let e=o.toLowerCase();if(a[e])return e;let t=e.split("-")[0];return t&&a[t]?t:null}function re(o,a,e){let t={...Y};for(let[y,b]of Object.entries(e??{})){let L=y.toLowerCase();t[L]={...t[L]??{},...b}}let s=!o||o==="auto"?document.documentElement.getAttribute("lang")||a:o,r=G(s,t)??G(a,t)??k,c=t[r]??{},v=t[G(a,t)??k]??N;return{locale:r,t(y,b){let L=c[y]??v[y]??N[y]??y;return b?L.replace(/\{(\w+)\}/g,(be,xe)=>String(b[xe]??be)):L}}}var ze=encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M5 2l14 9-6.2 1.4L10.6 20z" fill="#fff" stroke="#000" stroke-width="1.4"/></svg>'),le=`
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
  cursor:url("data:image/svg+xml,${ze}") 4 2,auto!important;
}

/* visibility, not display: the space is kept and the layout does not jump. */
html[data-a11y-hide-images] body :is(img,picture,video,canvas,svg):not([data-a11y-root]):not([data-a11y-root] *){
  visibility:hidden!important;
}
html[data-a11y-hide-images] body *:not([data-a11y-root]){background-image:none!important}

/* start, not left: forcing left would be wrong in Arabic or Hebrew. */
html[data-a11y-align-start] body *:not([data-a11y-root]){text-align:start!important}

@media print{[data-a11y-root]{display:none!important}}
`,ce=`
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

[data-pos="bottom-right"] .launcher{bottom:var(--a11y-offset);right:var(--a11y-offset)}
[data-pos="bottom-left"]  .launcher{bottom:var(--a11y-offset);left:var(--a11y-offset)}
[data-pos="top-right"]    .launcher{top:var(--a11y-offset);right:var(--a11y-offset)}
[data-pos="top-left"]     .launcher{top:var(--a11y-offset);left:var(--a11y-offset)}
[data-pos="middle-right"] .launcher{top:50%;right:var(--a11y-offset);transform:translateY(-50%)}
[data-pos="middle-left"]  .launcher{top:50%;left:var(--a11y-offset);transform:translateY(-50%)}
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
[data-pos$="-right"] .panel{right:var(--a11y-offset)}
[data-pos$="-left"]  .panel{left:var(--a11y-offset)}
[data-pos^="bottom"] .panel{bottom:calc(var(--a11y-offset) + var(--a11y-button) + 12px)}
[data-pos^="top"]    .panel{top:calc(var(--a11y-offset) + var(--a11y-button) + 12px)}
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
`;var z="a11y-prefs",de={universal:'<circle cx="12" cy="12" r="9.2"/><circle cx="12" cy="7.1" r="1.35"/><path d="M6.9 10.1 12 11.1l5.1-1M12 11.1v3.2M12 14.3 9.7 19.6M12 14.3l2.3 5.3"/>',person:'<circle cx="12" cy="5" r="2.2"/><path d="M5 10.5 12 12l7-1.5M12 12v4M12 16l-3 6M12 16l3 6"/>',eye:'<path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',wheelchair:'<circle cx="13" cy="4" r="2"/><path d="M11 8v5h5l3 7M8.5 11a6 6 0 1 0 7.6 8.4"/>'},Le='<path d="M6 6l12 12M18 6 6 18"/>',Ie='<path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"/>',D={locale:"auto",fallbackLocale:k,position:"bottom-right",offset:"20px",shape:"circle",size:"md",accent:"#0b57d0",storageKey:"a11y-prefs"},K={};function te(o){K={...K,...o}}var pe=!1;function Pe(){if(pe||document.getElementById("a11y-prefs-styles"))return;let o=document.createElement("style");o.id="a11y-prefs-styles",o.textContent=le,document.head.append(o),pe=!0}function $e(o){let a=o.trim().replace("#",""),e=a.length===3?a.replace(/./g,r=>r+r):a;if(!/^[0-9a-f]{6}$/i.test(e))return"#fff";let t=r=>{let c=parseInt(e.slice(r,r+2),16)/255;return c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4)};return .2126*t(0)+.7152*t(2)+.0722*t(4)>.42?"#111827":"#fff"}var U=o=>`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${o}</svg>`,d,F,x,m,w,S,E,f,g,M,T,H,C,n,P,ue,fe,V,J,W,Z,he,Q,ge,ye,X,q,ee,me,$=class extends HTMLElement{constructor(){super();p(this,n);p(this,d);p(this,F);p(this,x);p(this,m);p(this,w);p(this,S);p(this,E,null);p(this,f,{});p(this,g);p(this,M,!1);p(this,T,!1);p(this,H,null);p(this,C,e=>l(this,n,he).call(this,e.clientY));u(this,d,this.attachShadow({mode:"open"}))}static get observedAttributes(){return["locale","fallback-locale","messages","position","offset","shape","size","accent","accent-contrast","icon","label","features","statement-url","storage-key","z-index"]}connectedCallback(){Pe(),this.setAttribute("data-a11y-root",""),l(this,n,fe).call(this),l(this,n,Q).call(this);for(let e of A)l(this,n,J).call(this,e)}disconnectedCallback(){document.removeEventListener("pointermove",i(this,C))}attributeChangedCallback(){i(this,T)&&l(this,n,Q).call(this)}open(){i(this,M)||(u(this,M,!0),u(this,H,i(this,d).activeElement??document.activeElement),i(this,m).hidden=!1,i(this,w).hidden=!1,i(this,x).setAttribute("aria-expanded","true"),i(this,m).querySelector(".icon-button")?.focus())}close(){if(!i(this,M))return;u(this,M,!1),i(this,m).hidden=!0,i(this,w).hidden=!0,i(this,x).setAttribute("aria-expanded","false");let e=i(this,H);(e instanceof HTMLElement&&e!==this&&e.isConnected?e:i(this,x)).focus()}toggle(){i(this,M)?this.close():this.open()}getState(){return{...i(this,f)}}set(e,t){t===null?delete i(this,f)[e]:i(this,f)[e]=t,l(this,n,J).call(this,e),l(this,n,V).call(this),l(this,n,q).call(this),this.dispatchEvent(new CustomEvent("a11y-prefs-change",{detail:{id:e,value:t,state:this.getState()},bubbles:!0,composed:!0}))}reset(){for(let e of A)delete i(this,f)[e],document.documentElement.removeAttribute(O(e));l(this,n,Z).call(this),l(this,n,V).call(this),l(this,n,q).call(this),l(this,n,ee).call(this,i(this,g).t("ui.didReset")),this.dispatchEvent(new CustomEvent("a11y-prefs-change",{detail:{state:{}},bubbles:!0,composed:!0}))}};d=new WeakMap,F=new WeakMap,x=new WeakMap,m=new WeakMap,w=new WeakMap,S=new WeakMap,E=new WeakMap,f=new WeakMap,g=new WeakMap,M=new WeakMap,T=new WeakMap,H=new WeakMap,C=new WeakMap,n=new WeakSet,P=function(){let e=c=>this.getAttribute(c)??void 0,t=e("features"),s=e("messages"),r;if(s)try{r={...K.messages,...JSON.parse(s)}}catch{}return{...D,...K,...r&&{messages:r},...e("locale")&&{locale:e("locale")},...e("fallback-locale")&&{fallbackLocale:e("fallback-locale")},...e("position")&&{position:e("position")},...e("offset")&&{offset:e("offset")},...e("shape")&&{shape:e("shape")},...e("size")&&{size:e("size")},...e("accent")&&{accent:e("accent")},...e("accent-contrast")&&{accentContrast:e("accent-contrast")},...e("icon")&&{icon:e("icon")},...e("label")&&{label:e("label")},...e("statement-url")&&{statementUrl:e("statement-url")},...e("storage-key")&&{storageKey:e("storage-key")},...e("z-index")&&{zIndex:Number(e("z-index"))},...t&&{features:t.split(",").map(c=>c.trim()).filter(c=>A.includes(c))}}},ue=function(){let e=i(this,n,P).features;return e?.length?e:[...A]},fe=function(){try{let e=localStorage.getItem(i(this,n,P).storageKey??D.storageKey);e&&u(this,f,JSON.parse(e))}catch{}},V=function(){try{localStorage.setItem(i(this,n,P).storageKey??D.storageKey,JSON.stringify(i(this,f)))}catch{}},J=function(e){let t=i(this,f)[e],s=document.documentElement;t===void 0?s.removeAttribute(O(e)):s.setAttribute(O(e),t),e==="readingHelp"&&l(this,n,W).call(this)},W=function(){let e=i(this,f).readingHelp;if(l(this,n,Z).call(this),!e)return;let t=document.createElement("div");t.className=e==="mask"?"mask":"guide",t.style.setProperty("--top","45vh"),t.style.setProperty("--bottom","55vh"),e==="guide"&&(t.style.top="50vh"),i(this,F).append(t),u(this,E,t),document.addEventListener("pointermove",i(this,C),{passive:!0})},Z=function(){document.removeEventListener("pointermove",i(this,C)),i(this,E)?.remove(),u(this,E,null)},he=function(e){let t=i(this,E);t&&(i(this,f).readingHelp==="mask"?(t.style.setProperty("--top",`${Math.max(0,e-60)}px`),t.style.setProperty("--bottom",`${e+60}px`)):t.style.top=`${e}px`)},Q=function(){let e=i(this,n,P);u(this,g,re(e.locale,e.fallbackLocale??k,e.messages));let t=i(this,g).t,s=e.icon??"universal",r=s in de?de[s]:String(s),c=e.label??t("ui.open"),v=e.accent??D.accent,y=e.accentContrast??$e(v);i(this,d).innerHTML=`
      <style>${ce}</style>
      <div class="root"
           data-pos="${e.position}"
           data-shape="${e.shape}"
           data-size="${e.size}"
           style="--a11y-accent:${v};--a11y-on-accent:${y};--a11y-offset:${e.offset}${e.zIndex?`;--a11y-z:${e.zIndex}`:""}">
        <button class="launcher" type="button" aria-haspopup="dialog" aria-expanded="false"
                aria-label="${t("ui.open")}">
          ${U(r)}<span class="label">${c}</span>
        </button>

        <div class="backdrop" hidden></div>

        <div class="panel" role="dialog" aria-modal="true" aria-label="${t("ui.title")}" hidden>
          <div class="head">
            <h2>${t("ui.title")}</h2>
            <button class="icon-button reset" type="button"
                    title="${t("ui.reset")}" aria-label="${t("ui.reset")}">${U(Ie)}</button>
            <button class="icon-button dismiss" type="button"
                    title="${t("ui.close")}" aria-label="${t("ui.close")}">${U(Le)}</button>
          </div>
          <div class="grid"></div>
          <div class="foot">
            <span>${t("ui.hint")}</span>
            ${e.statementUrl?`<a href="${e.statementUrl}">${t("ui.statement")}</a>`:""}
          </div>
        </div>

        <div class="sr-only" role="status" aria-live="polite"></div>
      </div>`,u(this,F,i(this,d).querySelector(".root")),u(this,x,i(this,d).querySelector(".launcher")),u(this,m,i(this,d).querySelector(".panel")),u(this,w,i(this,d).querySelector(".backdrop")),u(this,S,i(this,d).querySelector(".sr-only")),i(this,x).addEventListener("click",()=>this.toggle()),i(this,w).addEventListener("click",()=>this.close()),i(this,d).querySelector(".dismiss").addEventListener("click",()=>this.close()),i(this,d).querySelector(".reset").addEventListener("click",()=>this.reset()),i(this,m).addEventListener("keydown",b=>l(this,n,me).call(this,b)),l(this,n,ge).call(this),u(this,T,!0),l(this,n,q).call(this),l(this,n,W).call(this)},ge=function(){let e=i(this,d).querySelector(".grid");e.replaceChildren();for(let t of i(this,n,ue)){let s=I(t);if(!s)continue;let r=document.createElement("button");r.type="button",r.className="card",r.dataset.id=t,r.innerHTML=U(s.icon)+`<span class="name">${i(this,g).t(`feature.${t}`)}</span>`+(s.kind==="step"?`<span class="pips">${s.options.map(()=>"<i></i>").join("")}</span>`:"")+'<span class="value"></span>',s.kind==="toggle"&&r.setAttribute("aria-pressed","false"),r.addEventListener("click",()=>l(this,n,ye).call(this,t)),e.append(r)}},ye=function(e){let t=I(e);if(!t)return;let s=i(this,f)[e],r=s?t.options.indexOf(s):-1;this.set(e,t.options[r+1]??null);let c=l(this,n,X).call(this,e)||i(this,g).t("ui.off");l(this,n,ee).call(this,`${i(this,g).t(`feature.${e}`)}: ${c}`)},X=function(e){let t=I(e),s=i(this,f)[e];return!t||!s?"":t.kind==="toggle"?i(this,g).t("ui.on"):t.kind==="step"?i(this,g).t("ui.level",{n:t.options.indexOf(s)+1,max:t.options.length}):i(this,g).t(`option.${e}.${s}`)},q=function(){for(let e of i(this,d).querySelectorAll(".card")){let t=e.dataset.id,s=I(t);if(!s)continue;let r=i(this,f)[t],c=r!==void 0;s.kind==="toggle"?e.setAttribute("aria-pressed",String(c)):e.dataset.active=String(c),e.querySelector(".value").textContent=l(this,n,X).call(this,t);let v=c?s.options.indexOf(r)+1:0;e.querySelectorAll(".pips i").forEach((y,b)=>y.classList.toggle("on",b<v))}},ee=function(e){i(this,S).textContent="",setTimeout(()=>i(this,S).textContent=e,60)},me=function(e){if(e.key==="Escape"){e.stopPropagation(),this.close();return}if(e.key!=="Tab")return;let t=[...i(this,m).querySelectorAll("button, a[href]")].filter(v=>!v.hasAttribute("disabled")),s=t[0],r=t[t.length-1];if(!s||!r)return;let c=i(this,d).activeElement;e.shiftKey&&c===s?(e.preventDefault(),r.focus()):!e.shiftKey&&c===r&&(e.preventDefault(),s.focus())};function _(){typeof customElements<"u"&&!customElements.get(z)&&customElements.define(z,$)}function ae(o={}){if(typeof window>"u")return null;te(o),_();let a=document.querySelector(z);if(a)return a;let e=document.createElement(z);return(o.container??document.body).append(e),e}var ve=document.currentScript;function Fe(o){if(!o)return{};let a=o.dataset,e={};if(a.locale&&(e.locale=a.locale),a.fallbackLocale&&(e.fallbackLocale=a.fallbackLocale),a.position&&(e.position=a.position),a.offset&&(e.offset=a.offset),a.shape&&(e.shape=a.shape),a.size&&(e.size=a.size),a.accent&&(e.accent=a.accent),a.accentContrast&&(e.accentContrast=a.accentContrast),a.icon&&(e.icon=a.icon),a.label&&(e.label=a.label),a.statementUrl&&(e.statementUrl=a.statementUrl),a.storageKey&&(e.storageKey=a.storageKey),a.zIndex&&(e.zIndex=Number(a.zIndex)),a.features&&(e.features=a.features.split(",").map(t=>t.trim())),a.messages)try{e.messages=JSON.parse(a.messages)}catch{}return e}var Te={...window.a11yPrefsConfig,...Fe(ve)};_();ve?.dataset.auto!=="false"&&ie(()=>ae(Te));return Se(He);})();
