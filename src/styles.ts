/** Big cursor as a data URI, so the widget never makes a network request. */
const CURSOR = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">' +
    '<path d="M5 2l14 9-6.2 1.4L10.6 20z" fill="#fff" stroke="#000" stroke-width="1.4"/></svg>',
);

/**
 * Styles that apply to the HOST PAGE. Injected once into <head>, because styles
 * living in a shadow root do not reach outside of it.
 *
 * Everything hangs off `data-a11y-*` attributes on <html>, so the JavaScript
 * only ever sets and removes attributes: the visual logic lives here, in one
 * place, and stays inspectable from devtools. `[data-a11y-root]` is the widget
 * itself and is always excluded.
 */
export const pageStyles: string = `
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
  cursor:url("data:image/svg+xml,${CURSOR}") 4 2,auto!important;
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
`;

/** Styles for the panel itself. These live in the shadow root. */
export const panelStyles: string = `
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
`;
