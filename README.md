# a11y-prefs

An accessibility preferences panel, shipped as a web component. No dependencies,
~9 kB gzipped, translatable, with configurable position and shape. It works the
same in plain HTML, Vite, React, Astro, PHP and WordPress, because the runtime is
the browser rather than a framework.

MIT licensed. Use it, fork it, ship it to clients — no strings, and no obligation
to open your own code (unlike the GPL alternatives in this space).

## What this is, and what it isn't

It is a **preferences panel for your visitors**: whoever lands on your site can
ask for bigger text, more contrast or no animations, and the choice is remembered
in their browser.

It is **not** a product that makes your site accessible on its own. Overlays that
promise this have a poor record — in January 2025 the FTC fined accessiBe one
million dollars over misleading claims about exactly that. Real accessibility is
fixed in your HTML. This panel sits on top; it does not replace the work.

## Install

### A plain script tag — HTML, PHP, anything

```html
<script src="https://cdn.jsdelivr.net/npm/a11y-prefs@0.4.0/dist/a11y-prefs.js"
        data-locale="en" data-position="bottom-right" data-shape="circle"
        defer></script>
```

Every option is a `data-*` attribute on the script itself, so there is no inline
JavaScript to whitelist in your CSP.

### A bundler — Vite, Astro, Next, anything

```bash
npm i a11y-prefs
```

```js
import { defineA11yPrefs } from "a11y-prefs";

defineA11yPrefs({ locale: "es", position: "middle-left", shape: "pill" });
```

Nothing runs on import, because `customElements` does not exist during SSR. Call
it on the client — an Astro `client:load`, a `useEffect`, a `<script>`. If you
want the no-ceremony version, `import "a11y-prefs/auto"`.

### Writing the element yourself

Every option is also an attribute, which is what you need when a backend renders
the markup:

```html
<a11y-prefs locale="it" position="top-right" shape="rounded"
            accent="#0b57d0" statement-url="/accessibility"></a11y-prefs>
```

## Options

| Option | Attribute | Values | Default |
|---|---|---|---|
| `locale` | `locale` | `en`, `es`, `it`, anything you add, or `auto` | `auto` (reads `<html lang>`) |
| `fallbackLocale` | `fallback-locale` | language tag | `en` |
| `messages` | `messages` (JSON) | your own dictionaries | — |
| `position` | `position` | `bottom-right`, `bottom-left`, `top-right`, `top-left`, `middle-right`, `middle-left` | `bottom-right` |
| `offset` | `offset` | any CSS length, shorthand for all four edges | `20px` |
| `offsetTop` | `offset-top` | any CSS length | falls back to `offset` |
| `offsetRight` | `offset-right` | any CSS length | falls back to `offset` |
| `offsetBottom` | `offset-bottom` | any CSS length | falls back to `offset` |
| `offsetLeft` | `offset-left` | any CSS length | falls back to `offset` |
| `shape` | `shape` | `circle`, `rounded`, `square`, `pill` | `circle` |
| `radiusTopLeft` | `radius-top-left` | any CSS length | whatever `shape` uses |
| `radiusTopRight` | `radius-top-right` | any CSS length | whatever `shape` uses |
| `radiusBottomRight` | `radius-bottom-right` | any CSS length | whatever `shape` uses |
| `radiusBottomLeft` | `radius-bottom-left` | any CSS length | whatever `shape` uses |
| `size` | `size` | `sm` (44px), `md` (52px), `lg` (62px) | `md` |
| `accent` | `accent` | colour | `#0b57d0` |
| `accentContrast` | `accent-contrast` | colour | derived from luminance |
| `icon` | `icon` | `universal`, `person`, `eye`, `wheelchair`, or raw SVG | `universal` |
| `label` | `label` | launcher text in `pill` shape | translated `ui.open` |
| `features` | `features` | comma separated list | all of them |
| `statementUrl` | `statement-url` | URL | — |
| `storageKey` | `storage-key` | string | `a11y-prefs` |
| `zIndex` | `z-index` | number | `2147483000` |

## Languages

English, Spanish and Italian ship with the package. English is the base, so any
other dictionary is allowed to be partial — missing keys fall through to
`fallbackLocale` and then to English.

Fix one string or add a whole language without touching the package:

```js
defineA11yPrefs({
  locale: "pt",
  messages: {
    pt: { "ui.title": "Acessibilidade", "feature.fontSize": "Tamanho do texto" },
    en: { "ui.title": "Display settings" },   // overrides just this key
  },
});
```

`locale: "auto"` picks up `<html lang>`, and `es-MX` resolves to `es`.

## Preferences

Text size (4 levels) · Text spacing (3 levels; level 2 is exactly what
[WCAG 1.4.12](https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html)
asks for) · Contrast (high, inverted, grayscale) · Dyslexia-friendly font ·
Highlight links · Highlight headings · Visible focus · Stop animations ·
Reading help (guide or mask) · Big cursor · Hide images · Align to start ·
Mark new-tab links · Outline form fields · Unstick fixed bars ·
High-contrast selection.

Show only the ones you want, in the order you want:

```html
<a11y-prefs features="fontSize,contrast,stopAnimations,links"></a11y-prefs>
```

## How it works

The element **never touches your DOM**. All it does is set `data-a11y-*`
attributes on `<html>` and inject one stylesheet; the sixteen preferences are
plain CSS, inspectable from devtools. If the component fails to load, your page
is exactly as it was.

That also means you can retune it from your own CSS:

```css
:root {
  --a11y-focus-color: #b91c1c;
  --a11y-dyslexia-font: "Atkinson Hyperlegible", sans-serif;
}
```

The panel itself lives in a shadow root, so your styles cannot break it and it
cannot break yours.

### The panel's own accessibility

Real buttons, `role="dialog"` with `aria-modal`, a focus trap, `Esc` to close,
focus returned to the launcher, `aria-pressed` on every toggle, an `aria-live`
region announcing each change, a 44px minimum touch target and
`prefers-reduced-motion` respected. An inaccessible accessibility panel would be
a bad joke.

### Events

```js
document.querySelector("a11y-prefs")
  .addEventListener("a11y-prefs-change", (event) => {
    console.log(event.detail.state);
  });
```

### Known limitation

Text size scales the root font size, so it carries everything defined in `rem`.
A site with hardcoded `px` type will not scale. There is no way to fix that from
the outside without breaking layouts, so it is documented rather than faked.

## Development

```bash
npm install
npm run build
npm run demo     # http://localhost:4333/demo/
```

## Licence

MIT — EFEELE.
