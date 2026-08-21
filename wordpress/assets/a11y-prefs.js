/*! a11y-prefs v0.4.0 | MIT | github.com/EFEELE/a11y-prefs */
"use strict";var A11yPrefs=(()=>{var G=Object.defineProperty;var kt=Object.getOwnPropertyDescriptor;var wt=Object.getOwnPropertyNames;var Mt=Object.prototype.hasOwnProperty;var st=i=>{throw TypeError(i)};var At=(i,e)=>{for(var t in e)G(i,t,{get:e[t],enumerable:!0})},St=(i,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of wt(e))!Mt.call(i,n)&&n!==t&&G(i,n,{get:()=>e[n],enumerable:!(a=kt(e,n))||a.enumerable});return i};var Et=i=>St(G({},"__esModule",{value:!0}),i);var Y=(i,e,t)=>e.has(i)||st("Cannot "+t);var o=(i,e,t)=>(Y(i,e,"read from private field"),t?t.call(i):e.get(i)),h=(i,e,t)=>e.has(i)?st("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),u=(i,e,t,a)=>(Y(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),l=(i,e,t)=>(Y(i,e,"access private method"),t);var Ft={};At(Ft,{A11yPrefsElement:()=>$,BUNDLED_LOCALES:()=>W,DEFAULT_LOCALE:()=>C,FEATURES:()=>O,FEATURE_IDS:()=>E,TAG_NAME:()=>R,configure:()=>ot,defineA11yPrefs:()=>it,registerA11yPrefs:()=>K});function nt(i){typeof document>"u"||(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",i,{once:!0}):i())}var d=i=>`<path d="${i}"/>`,O=[{id:"fontSize",kind:"step",options:["1","2","3","4"],icon:d("M3 20 9 4h2l6 16M5.5 14h9M16 20l3-8h1l3 8M17.2 17.5h4.6")},{id:"textSpacing",kind:"step",options:["1","2","3"],icon:d("M3 5h18M3 19h18M7 9h10M7 12h10M7 15h10")},{id:"contrast",kind:"enum",options:["high","invert","grayscale"],icon:`<circle cx="12" cy="12" r="9"/>${d("M12 3v18a9 9 0 0 0 0-18Z")}`},{id:"dyslexia",kind:"toggle",options:["on"],icon:d("M4 19V7a3 3 0 0 1 6 0v12M4 13h6M14 5h6l-6 14h6")},{id:"links",kind:"toggle",options:["on"],icon:d("M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1")},{id:"newTab",kind:"toggle",options:["on"],icon:d("M14 4h6v6M20 4l-8 8M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5")},{id:"headings",kind:"toggle",options:["on"],icon:d("M5 5v14M13 5v14M5 12h8M17 19v-8l4 8v-8")},{id:"focusOutline",kind:"toggle",options:["on"],icon:'<circle cx="12" cy="12" r="3"/>'+d("M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3")},{id:"fields",kind:"toggle",options:["on"],icon:d("M3 8h18v8H3zM7 11v2M10 11h7")},{id:"stopAnimations",kind:"toggle",options:["on"],icon:`<circle cx="12" cy="12" r="9"/>${d("M9 9h2v6H9zM13 9h2v6h-2z")}`},{id:"noSticky",kind:"toggle",options:["on"],icon:d("M9 4h6l-1 5 3 3v2h-4M12 14v6M3 3l18 18")},{id:"readingHelp",kind:"enum",options:["guide","mask"],icon:d("M3 6h18M3 12h18M3 18h18M7 12l-2 2 2 2")},{id:"bigCursor",kind:"toggle",options:["on"],icon:d("M5 3l14 9-6 1.5L10.5 20z")},{id:"hideImages",kind:"toggle",options:["on"],icon:d("M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6")+'<circle cx="8.5" cy="9" r="1.5"/>'+d("M3 3l18 18")},{id:"alignStart",kind:"toggle",options:["on"],icon:d("M3 5h18M3 9h12M3 13h18M3 17h12")},{id:"selection",kind:"toggle",options:["on"],icon:`${d("M5 4h14v16H5z")}<rect x="8" y="9" width="8" height="3"/>`}],E=O.map(i=>i.id),Ct=new Map(O.map(i=>[i.id,i])),P=i=>Ct.get(i),N=i=>`data-a11y-${i.replace(/[A-Z]/g,e=>"-"+e.toLowerCase())}`;var B={"ui.title":"Accessibility","ui.open":"Accessibility options","ui.close":"Close","ui.reset":"Reset all","ui.statement":"Accessibility statement","ui.on":"on","ui.off":"off","ui.level":"Level {n} of {max}","ui.didReset":"Preferences reset","ui.hint":"Your preferences are stored in this browser only.","feature.fontSize":"Text size","feature.textSpacing":"Text spacing","feature.contrast":"Contrast","feature.dyslexia":"Dyslexia-friendly font","feature.links":"Highlight links","feature.headings":"Highlight headings","feature.focusOutline":"Visible focus","feature.stopAnimations":"Stop animations","feature.readingHelp":"Reading help","feature.bigCursor":"Big cursor","feature.hideImages":"Hide images","feature.alignStart":"Align to start","feature.newTab":"Mark new-tab links","feature.fields":"Outline form fields","feature.noSticky":"Unstick fixed bars","feature.selection":"High-contrast selection","option.contrast.high":"High","option.contrast.invert":"Inverted","option.contrast.grayscale":"Grayscale","option.readingHelp.guide":"Guide","option.readingHelp.mask":"Mask"};var rt={"ui.title":"Accesibilidad","ui.open":"Opciones de accesibilidad","ui.close":"Cerrar","ui.reset":"Restablecer todo","ui.statement":"Declaración de accesibilidad","ui.on":"activado","ui.off":"desactivado","ui.level":"Nivel {n} de {max}","ui.didReset":"Preferencias restablecidas","ui.hint":"Tus preferencias se guardan solo en este navegador.","feature.fontSize":"Tamaño del texto","feature.textSpacing":"Espaciado del texto","feature.contrast":"Contraste","feature.dyslexia":"Fuente para dislexia","feature.links":"Resaltar enlaces","feature.headings":"Resaltar títulos","feature.focusOutline":"Foco visible","feature.stopAnimations":"Detener animaciones","feature.readingHelp":"Ayuda de lectura","feature.bigCursor":"Cursor grande","feature.hideImages":"Ocultar imágenes","feature.alignStart":"Alinear al inicio","feature.newTab":"Marcar enlaces externos","feature.fields":"Perfilar campos de formulario","feature.noSticky":"Soltar barras fijas","feature.selection":"Selección de alto contraste","option.contrast.high":"Alto","option.contrast.invert":"Invertido","option.contrast.grayscale":"Escala de grises","option.readingHelp.guide":"Guía","option.readingHelp.mask":"Máscara"};var lt={"ui.title":"Accessibilità","ui.open":"Opzioni di accessibilità","ui.close":"Chiudi","ui.reset":"Reimposta tutto","ui.statement":"Dichiarazione di accessibilità","ui.on":"attivo","ui.off":"disattivato","ui.level":"Livello {n} di {max}","ui.didReset":"Preferenze reimpostate","ui.hint":"Le tue preferenze restano solo in questo browser.","feature.fontSize":"Dimensione del testo","feature.textSpacing":"Spaziatura del testo","feature.contrast":"Contrasto","feature.dyslexia":"Font per dislessia","feature.links":"Evidenzia i link","feature.headings":"Evidenzia i titoli","feature.focusOutline":"Focus visibile","feature.stopAnimations":"Ferma le animazioni","feature.readingHelp":"Aiuto alla lettura","feature.bigCursor":"Cursore grande","feature.hideImages":"Nascondi le immagini","feature.alignStart":"Allinea all'inizio","feature.newTab":"Segnala i link esterni","feature.fields":"Contorna i campi","feature.noSticky":"Sblocca le barre fisse","feature.selection":"Selezione ad alto contrasto","option.contrast.high":"Alto","option.contrast.invert":"Invertito","option.contrast.grayscale":"Scala di grigi","option.readingHelp.guide":"Guida","option.readingHelp.mask":"Maschera"};var W={en:B,es:rt,it:lt},C="en";function V(i,e){let t=i.toLowerCase();if(e[t])return t;let a=t.split("-")[0];return a&&e[a]?a:null}function ct(i,e,t){let a={...W};for(let[y,k]of Object.entries(t??{})){let S=y.toLowerCase();a[S]={...a[S]??{},...k}}let n=!i||i==="auto"?document.documentElement.getAttribute("lang")||e:i,r=V(n,a)??V(e,a)??C,c=a[r]??{},x=a[V(e,a)??C]??B;return{locale:r,t(y,k){let S=c[y]??x[y]??B[y]??y;return k?S.replace(/\{(\w+)\}/g,(w,_)=>String(k[_]??w)):S}}}var Lt=encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M5 2l14 9-6.2 1.4L10.6 20z" fill="#fff" stroke="#000" stroke-width="1.4"/></svg>'),dt=`
:root{
  --a11y-scale:1; --a11y-letter:normal; --a11y-word:normal; --a11y-line:normal;
  --a11y-focus-color:#1d4ed8;
  --a11y-field-color:#1d4ed8;
  --a11y-selection-bg:#ffd400;
  --a11y-selection-fg:#000;
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

/* Inverting filters the root, then un-inverts media so photographs still look
   like photographs.

   The panel is NOT un-inverted here. Putting a filter on the host makes the
   host the containing block for its own position:fixed launcher, which then
   sits at the foot of the document instead of the corner of the screen and
   vanishes the moment you scroll. The filter on <html> is fine — the root
   element is a special case — so the panel counters it from inside its shadow
   root, on each fixed element individually. */
html[data-a11y-contrast="invert"]{filter:invert(1) hue-rotate(180deg)!important;background:#fff}
html[data-a11y-contrast="invert"] :is(img,picture,video,iframe,canvas){filter:invert(1) hue-rotate(180deg)!important}

html[data-a11y-contrast="grayscale"]{filter:grayscale(1)!important}

html[data-a11y-dyslexia] body *:not([data-a11y-root]){font-family:var(--a11y-dyslexia-font)!important}

html[data-a11y-links] body a:not([data-a11y-root]){
  text-decoration:underline!important;text-underline-offset:.2em!important;
  outline:1px dashed currentColor!important;outline-offset:2px;
}

/* The A11Y Project checklist asks that links opening elsewhere say so. The
   marker is decorative; the accessible name is unchanged. */
html[data-a11y-new-tab] body a[target="_blank"]:not([data-a11y-root])::after{
  content:"\\2197";margin-inline-start:.2em;font-size:.9em;
}

html[data-a11y-headings] body :is(h1,h2,h3,h4,h5,h6){
  outline:2px dashed #d97706!important;outline-offset:3px;
}

/* WCAG 1.4.11 wants 3:1 on the border of a control. Plenty of themes ship
   1px of #ddd, which is nowhere near. */
html[data-a11y-fields] body :is(input,select,textarea):not([type="hidden"]):not([data-a11y-root] *){
  outline:2px solid var(--a11y-field-color)!important;outline-offset:1px!important;
}
html[data-a11y-fields] body :is(button,[role="button"]):not([data-a11y-root]):not([data-a11y-root] *){
  outline:2px solid var(--a11y-field-color)!important;outline-offset:1px!important;
}

/* A sticky header eats the viewport once the text is at 200%, which is what
   WCAG 1.4.10 Reflow is about.

   CSS has no way to select "whatever computes to position: fixed", so this is
   a heuristic over the elements that are nearly always the culprits. Blanket
   "position: static" on everything would catch the rest, and break every
   dropdown, modal and carousel on the page along with it. */
html[data-a11y-no-sticky] body :is(
  header,nav,aside,footer,
  [role="banner"],[role="navigation"],
  [class*="sticky" i],[class*="fixed" i],[class*="header" i],[class*="navbar" i],[class*="topbar" i],
  [style*="position:fixed" i],[style*="position: fixed" i],
  [style*="position:sticky" i],[style*="position: sticky" i]
):not([data-a11y-root]):not([data-a11y-root] *){
  position:static!important;
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

/* Themes love a custom ::selection, and they rarely check it for contrast. */
html[data-a11y-selection] ::selection{
  background:var(--a11y-selection-bg)!important;color:var(--a11y-selection-fg)!important;
}

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

/* The browser hides [hidden] with a UA rule of the lowest possible
   specificity, so any author "display" beats it. .panel sets display:flex,
   which meant the panel was painted on every page whether or not it was
   "closed" — the attribute went on and off and nothing moved. */
[hidden]{display:none!important}

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
  border:0;
  /* The shape picks a base radius; a per-corner override wins over it when one
     is set, which is why this is a var fallback rather than two rules. */
  --a11y-shape-radius:50%;
  border-radius:
    var(--a11y-corner-top-left,var(--a11y-shape-radius))
    var(--a11y-corner-top-right,var(--a11y-shape-radius))
    var(--a11y-corner-bottom-right,var(--a11y-shape-radius))
    var(--a11y-corner-bottom-left,var(--a11y-shape-radius));
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

[data-shape="rounded"] .launcher{--a11y-shape-radius:16px}
[data-shape="square"] .launcher{--a11y-shape-radius:6px}
[data-shape="pill"] .launcher{width:auto;height:calc(var(--a11y-button) - 6px);--a11y-shape-radius:999px;padding:0 20px 0 16px}
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

/* Counter-filter for the page's invert mode. It goes on each fixed element
   rather than on a shared wrapper, because a filter on an ancestor would make
   that ancestor the containing block and knock the panel out of the viewport.
   A filter on the fixed element itself only affects its descendants, so the
   positioning survives. */
[data-contrast="invert"] .launcher,
[data-contrast="invert"] .panel,
[data-contrast="invert"] .backdrop,
[data-contrast="invert"] .guide,
[data-contrast="invert"] .mask{filter:invert(1) hue-rotate(180deg)}

.panel{
  position:fixed;z-index:var(--a11y-z);
  width:min(384px,calc(100vw - 24px));max-height:min(620px,calc(100vh - 24px));
  display:flex;flex-direction:column;overflow:hidden;
  background:var(--a11y-bg);border:1px solid var(--a11y-border);
  border-radius:var(--a11y-radius);box-shadow:0 18px 50px rgba(0,0,0,.32);
}
[data-pos$="-right"] .panel{right:var(--a11y-offset-right)}
[data-pos$="-left"]  .panel{left:var(--a11y-offset-left)}
/* max-height has to leave room for the launcher and its offset, or on a short
   viewport the panel overflows off the top of the screen — taking the close
   button, which lives in its header, with it. */
[data-pos^="bottom"] .panel{
  bottom:calc(var(--a11y-offset-bottom) + var(--a11y-button) + 12px);
  max-height:min(620px,calc(100vh - var(--a11y-offset-bottom) - var(--a11y-button) - 24px));
}
[data-pos^="top"] .panel{
  top:calc(var(--a11y-offset-top) + var(--a11y-button) + 12px);
  max-height:min(620px,calc(100vh - var(--a11y-offset-top) - var(--a11y-button) - 24px));
}
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
`;var R="a11y-prefs",pt={universal:'<circle cx="12" cy="12" r="9.2"/><circle cx="12" cy="7.1" r="1.35"/><path d="M6.9 10.1 12 11.1l5.1-1M12 11.1v3.2M12 14.3 9.7 19.6M12 14.3l2.3 5.3"/>',person:'<circle cx="12" cy="5" r="2.2"/><path d="M5 10.5 12 12l7-1.5M12 12v4M12 16l-3 6M12 16l3 6"/>',eye:'<path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',wheelchair:'<circle cx="13" cy="4" r="2"/><path d="M11 8v5h5l3 7M8.5 11a6 6 0 1 0 7.6 8.4"/>'},zt='<path d="M6 6l12 12M18 6 6 18"/>',Tt='<path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"/>',D={locale:"auto",fallbackLocale:C,position:"bottom-right",offset:"20px",shape:"circle",size:"md",accent:"#0b57d0",storageKey:"a11y-prefs"},q={};function ot(i){q={...q,...i}}var ht=!1;function Rt(){if(ht||document.getElementById("a11y-prefs-styles"))return;let i=document.createElement("style");i.id="a11y-prefs-styles",i.textContent=dt,document.head.append(i),ht=!0}function Pt(i){let e=i.trim().replace("#",""),t=e.length===3?e.replace(/./g,r=>r+r):e;if(!/^[0-9a-f]{6}$/i.test(t))return"#fff";let a=r=>{let c=parseInt(t.slice(r,r+2),16)/255;return c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4)};return .2126*a(0)+.7152*a(2)+.0722*a(4)>.42?"#111827":"#fff"}var U=i=>`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${i}</svg>`,f,M,v,m,A,z,L,p,g,b,F,H,T,s,I,ut,gt,J,Z,Q,X,yt,tt,mt,vt,et,j,at,bt,$=class extends HTMLElement{constructor(){super();h(this,s);h(this,f);h(this,M);h(this,v);h(this,m);h(this,A);h(this,z);h(this,L,null);h(this,p,{});h(this,g);h(this,b,!1);h(this,F,!1);h(this,H,null);h(this,T,t=>l(this,s,yt).call(this,t.clientY));u(this,f,this.attachShadow({mode:"open"}))}static get observedAttributes(){return["locale","fallback-locale","messages","position","offset","offset-top","offset-right","offset-bottom","offset-left","radius-top-left","radius-top-right","radius-bottom-right","radius-bottom-left","shape","size","accent","accent-contrast","icon","label","features","statement-url","storage-key","z-index"]}connectedCallback(){Rt(),this.setAttribute("data-a11y-root",""),l(this,s,gt).call(this),l(this,s,tt).call(this);for(let t of E)l(this,s,Z).call(this,t)}disconnectedCallback(){document.removeEventListener("pointermove",o(this,T))}attributeChangedCallback(){o(this,F)&&l(this,s,tt).call(this)}open(){o(this,b)||(u(this,b,!0),u(this,H,o(this,f).activeElement??document.activeElement),o(this,m).hidden=!1,o(this,A).hidden=!1,o(this,v).setAttribute("aria-expanded","true"),o(this,m).querySelector(".icon-button")?.focus())}close(){if(!o(this,b))return;u(this,b,!1),o(this,m).hidden=!0,o(this,A).hidden=!0,o(this,v).setAttribute("aria-expanded","false");let t=o(this,H);(t instanceof HTMLElement&&t!==this&&t.isConnected?t:o(this,v)).focus()}toggle(){o(this,b)?this.close():this.open()}getState(){return{...o(this,p)}}set(t,a){a===null?delete o(this,p)[t]:o(this,p)[t]=a,l(this,s,Z).call(this,t),l(this,s,J).call(this),l(this,s,j).call(this),this.dispatchEvent(new CustomEvent("a11y-prefs-change",{detail:{id:t,value:a,state:this.getState()},bubbles:!0,composed:!0}))}reset(){for(let t of E)delete o(this,p)[t],document.documentElement.removeAttribute(N(t));l(this,s,X).call(this),l(this,s,J).call(this),l(this,s,j).call(this),l(this,s,at).call(this,o(this,g).t("ui.didReset")),this.dispatchEvent(new CustomEvent("a11y-prefs-change",{detail:{state:{}},bubbles:!0,composed:!0}))}};f=new WeakMap,M=new WeakMap,v=new WeakMap,m=new WeakMap,A=new WeakMap,z=new WeakMap,L=new WeakMap,p=new WeakMap,g=new WeakMap,b=new WeakMap,F=new WeakMap,H=new WeakMap,T=new WeakMap,s=new WeakSet,I=function(){let t=c=>this.getAttribute(c)??void 0,a=t("features"),n=t("messages"),r;if(n)try{r={...q.messages,...JSON.parse(n)}}catch{}return{...D,...q,...r&&{messages:r},...t("locale")&&{locale:t("locale")},...t("fallback-locale")&&{fallbackLocale:t("fallback-locale")},...t("position")&&{position:t("position")},...t("offset")&&{offset:t("offset")},...t("offset-top")&&{offsetTop:t("offset-top")},...t("offset-right")&&{offsetRight:t("offset-right")},...t("offset-bottom")&&{offsetBottom:t("offset-bottom")},...t("offset-left")&&{offsetLeft:t("offset-left")},...t("radius-top-left")&&{radiusTopLeft:t("radius-top-left")},...t("radius-top-right")&&{radiusTopRight:t("radius-top-right")},...t("radius-bottom-right")&&{radiusBottomRight:t("radius-bottom-right")},...t("radius-bottom-left")&&{radiusBottomLeft:t("radius-bottom-left")},...t("shape")&&{shape:t("shape")},...t("size")&&{size:t("size")},...t("accent")&&{accent:t("accent")},...t("accent-contrast")&&{accentContrast:t("accent-contrast")},...t("icon")&&{icon:t("icon")},...t("label")&&{label:t("label")},...t("statement-url")&&{statementUrl:t("statement-url")},...t("storage-key")&&{storageKey:t("storage-key")},...t("z-index")&&{zIndex:Number(t("z-index"))},...a&&{features:a.split(",").map(c=>c.trim()).filter(c=>E.includes(c))}}},ut=function(){let t=o(this,s,I).features;return t?.length?t:[...E]},gt=function(){try{let t=localStorage.getItem(o(this,s,I).storageKey??D.storageKey);t&&u(this,p,JSON.parse(t))}catch{}},J=function(){try{localStorage.setItem(o(this,s,I).storageKey??D.storageKey,JSON.stringify(o(this,p)))}catch{}},Z=function(t){let a=o(this,p)[t],n=document.documentElement;a===void 0?n.removeAttribute(N(t)):n.setAttribute(N(t),a),t==="readingHelp"&&l(this,s,Q).call(this),t==="contrast"&&o(this,M)&&(o(this,M).dataset.contrast=a??"")},Q=function(){let t=o(this,p).readingHelp;if(l(this,s,X).call(this),!t)return;let a=document.createElement("div");a.className=t==="mask"?"mask":"guide",a.style.setProperty("--top","45vh"),a.style.setProperty("--bottom","55vh"),t==="guide"&&(a.style.top="50vh"),o(this,M).append(a),u(this,L,a),document.addEventListener("pointermove",o(this,T),{passive:!0})},X=function(){document.removeEventListener("pointermove",o(this,T)),o(this,L)?.remove(),u(this,L,null)},yt=function(t){let a=o(this,L);a&&(o(this,p).readingHelp==="mask"?(a.style.setProperty("--top",`${Math.max(0,t-60)}px`),a.style.setProperty("--bottom",`${t+60}px`)):a.style.top=`${t}px`)},tt=function(){let t=o(this,s,I);u(this,g,ct(t.locale,t.fallbackLocale??C,t.messages));let a=o(this,g).t,n=t.icon??"universal",r=n in pt?pt[n]:String(n),c=t.label??a("ui.open"),x=t.accent??D.accent,y=t.accentContrast??Pt(x),k={"--a11y-accent":x,"--a11y-on-accent":y,"--a11y-offset":t.offset,"--a11y-offset-top":t.offsetTop,"--a11y-offset-right":t.offsetRight,"--a11y-offset-bottom":t.offsetBottom,"--a11y-offset-left":t.offsetLeft,"--a11y-corner-top-left":t.radiusTopLeft,"--a11y-corner-top-right":t.radiusTopRight,"--a11y-corner-bottom-right":t.radiusBottomRight,"--a11y-corner-bottom-left":t.radiusBottomLeft,"--a11y-z":t.zIndex},S=Object.entries(k).filter(([,w])=>w!==void 0&&w!=="").map(([w,_])=>`${w}:${_}`).join(";");o(this,f).innerHTML=`
      <style>${ft}</style>
      <div class="root"
           data-pos="${t.position}"
           data-shape="${t.shape}"
           data-size="${t.size}"
           style="${S}">
        <button class="launcher" type="button" aria-haspopup="dialog" aria-expanded="false"
                aria-label="${a("ui.open")}">
          ${U(r)}<span class="label">${c}</span>
        </button>

        <div class="backdrop" hidden></div>

        <div class="panel" role="dialog" aria-modal="true" aria-label="${a("ui.title")}" hidden>
          <div class="head">
            <h2>${a("ui.title")}</h2>
            <button class="icon-button reset" type="button"
                    title="${a("ui.reset")}" aria-label="${a("ui.reset")}">${U(Tt)}</button>
            <button class="icon-button dismiss" type="button"
                    title="${a("ui.close")}" aria-label="${a("ui.close")}">${U(zt)}</button>
          </div>
          <div class="grid"></div>
          <div class="foot">
            <span>${a("ui.hint")}</span>
            ${t.statementUrl?`<a href="${t.statementUrl}">${a("ui.statement")}</a>`:""}
          </div>
        </div>

        <div class="sr-only" role="status" aria-live="polite"></div>
      </div>`,u(this,M,o(this,f).querySelector(".root")),u(this,v,o(this,f).querySelector(".launcher")),u(this,m,o(this,f).querySelector(".panel")),u(this,A,o(this,f).querySelector(".backdrop")),u(this,z,o(this,f).querySelector(".sr-only")),o(this,v).addEventListener("click",()=>this.toggle()),o(this,A).addEventListener("click",()=>this.close()),o(this,f).querySelector(".dismiss").addEventListener("click",()=>this.close()),o(this,f).querySelector(".reset").addEventListener("click",()=>this.reset()),o(this,m).addEventListener("keydown",w=>l(this,s,bt).call(this,w)),l(this,s,mt).call(this),u(this,F,!0),l(this,s,j).call(this),l(this,s,Q).call(this),o(this,M).dataset.contrast=o(this,p).contrast??"",o(this,b)&&(o(this,m).hidden=!1,o(this,A).hidden=!1,o(this,v).setAttribute("aria-expanded","true"))},mt=function(){let t=o(this,f).querySelector(".grid");t.replaceChildren();for(let a of o(this,s,ut)){let n=P(a);if(!n)continue;let r=document.createElement("button");r.type="button",r.className="card",r.dataset.id=a,r.innerHTML=U(n.icon)+`<span class="name">${o(this,g).t(`feature.${a}`)}</span>`+(n.kind==="step"?`<span class="pips">${n.options.map(()=>"<i></i>").join("")}</span>`:"")+'<span class="value"></span>',n.kind==="toggle"&&r.setAttribute("aria-pressed","false"),r.addEventListener("click",()=>l(this,s,vt).call(this,a)),t.append(r)}},vt=function(t){let a=P(t);if(!a)return;let n=o(this,p)[t],r=n?a.options.indexOf(n):-1;this.set(t,a.options[r+1]??null);let c=l(this,s,et).call(this,t)||o(this,g).t("ui.off");l(this,s,at).call(this,`${o(this,g).t(`feature.${t}`)}: ${c}`)},et=function(t){let a=P(t),n=o(this,p)[t];return!a||!n?"":a.kind==="toggle"?o(this,g).t("ui.on"):a.kind==="step"?o(this,g).t("ui.level",{n:a.options.indexOf(n)+1,max:a.options.length}):o(this,g).t(`option.${t}.${n}`)},j=function(){for(let t of o(this,f).querySelectorAll(".card")){let a=t.dataset.id,n=P(a);if(!n)continue;let r=o(this,p)[a],c=r!==void 0;n.kind==="toggle"?t.setAttribute("aria-pressed",String(c)):t.dataset.active=String(c),t.querySelector(".value").textContent=l(this,s,et).call(this,a);let x=c?n.options.indexOf(r)+1:0;t.querySelectorAll(".pips i").forEach((y,k)=>y.classList.toggle("on",k<x))}},at=function(t){o(this,z).textContent="",setTimeout(()=>o(this,z).textContent=t,60)},bt=function(t){if(t.key==="Escape"){t.stopPropagation(),this.close();return}if(t.key!=="Tab")return;let a=[...o(this,m).querySelectorAll("button, a[href]")].filter(x=>!x.hasAttribute("disabled")),n=a[0],r=a[a.length-1];if(!n||!r)return;let c=o(this,f).activeElement;t.shiftKey&&c===n?(t.preventDefault(),r.focus()):!t.shiftKey&&c===r&&(t.preventDefault(),n.focus())};function K(){typeof customElements<"u"&&!customElements.get(R)&&customElements.define(R,$)}function it(i={}){if(typeof window>"u")return null;ot(i),K();let e=document.querySelector(R);if(e)return e;let t=document.createElement(R);return(i.container??document.body).append(t),t}var xt=document.currentScript;function It(i){if(!i)return{};let e=i.dataset,t={};if(e.locale&&(t.locale=e.locale),e.fallbackLocale&&(t.fallbackLocale=e.fallbackLocale),e.position&&(t.position=e.position),e.offset&&(t.offset=e.offset),e.offsetTop&&(t.offsetTop=e.offsetTop),e.offsetRight&&(t.offsetRight=e.offsetRight),e.offsetBottom&&(t.offsetBottom=e.offsetBottom),e.offsetLeft&&(t.offsetLeft=e.offsetLeft),e.radiusTopLeft&&(t.radiusTopLeft=e.radiusTopLeft),e.radiusTopRight&&(t.radiusTopRight=e.radiusTopRight),e.radiusBottomRight&&(t.radiusBottomRight=e.radiusBottomRight),e.radiusBottomLeft&&(t.radiusBottomLeft=e.radiusBottomLeft),e.shape&&(t.shape=e.shape),e.size&&(t.size=e.size),e.accent&&(t.accent=e.accent),e.accentContrast&&(t.accentContrast=e.accentContrast),e.icon&&(t.icon=e.icon),e.label&&(t.label=e.label),e.statementUrl&&(t.statementUrl=e.statementUrl),e.storageKey&&(t.storageKey=e.storageKey),e.zIndex&&(t.zIndex=Number(e.zIndex)),e.features&&(t.features=e.features.split(",").map(a=>a.trim())),e.messages)try{t.messages=JSON.parse(e.messages)}catch{}return t}var $t={...window.a11yPrefsConfig,...It(xt)};K();xt?.dataset.auto!=="false"&&nt(()=>it($t));return Et(Ft);})();
