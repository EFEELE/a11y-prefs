# Contributing

Thanks for looking. This is a small project with a few opinions baked in, and
they are worth knowing before you open a pull request.

Two things first: everyone here is held to the
[code of conduct](CODE_OF_CONDUCT.md), and a security problem goes through
[private reporting](.github/SECURITY.md) rather than a public issue.

Accessibility bugs in the panel itself are the most valuable reports this project
can get, and there is [a template](.github/ISSUE_TEMPLATE/accessibility_issue.yml)
for them. You do not need to know any standards to file one.

## The one rule

**The component never touches the host page's DOM.** It sets `data-a11y-*`
attributes on `<html>`, injects one stylesheet, and that is the whole surface
area. All twelve preferences are plain CSS in `src/styles.ts`.

This is load-bearing, not a style preference:

- the effect of every preference is inspectable from devtools
- the host site can override anything it wants with ordinary CSS
- if the script fails to load, the page is exactly as it was

Anything that would require walking, rewriting or reordering host markup does
not belong here, however useful it sounds. That road leads to the overlay
products that break screen readers.

## Other decisions

**MIT, and it stays MIT.** The point of this project is that anyone can ship it
on a client's site without their own code picking up obligations. The comparable
open projects are GPL, which rules them out for exactly that use.

**It is a preferences panel, not an accessibility fix.** Never describe it as
making a site compliant. Visitors choose how they want to read; the actual
accessibility work happens in your HTML. The FTC fined accessiBe a million
dollars in 2025 over claims in the other direction, and the criticism was fair.

**No runtime dependencies, ever.** esbuild and typescript are the only dev
dependencies. The big cursor is a data URI and the dyslexia setting uses a
local-font stack, specifically so the panel makes zero network requests — that
matters for privacy-sensitive sites and for strict CSPs.

**English is the base locale.** Other dictionaries may be partial: missing keys
fall through to `fallbackLocale` and then to English. Adding a language must
never require a new release — `messages` accepts new locales at runtime.

## Layout

```
src/element.ts   the custom element itself
src/styles.ts    pageStyles = host page, panelStyles = shadow root
src/features.ts  the twelve preferences, one source of truth
src/i18n/        en (base), es, it
src/index.ts     defineA11yPrefs / registerA11yPrefs, nothing runs on import
src/auto.ts      side-effect entry point
src/script.ts    <script> entry point, configured through data-* attributes
demo/            test page, served by scripts/serve.mjs
```

`build.mjs` produces three files: `dist/index.js` (esm), `dist/auto.js` (esm
with side effects) and `dist/a11y-prefs.js` (iife, global `A11yPrefs`).

## Checking your work

The component has no unit tests yet — contributions welcome. Verify it in a real
browser and check computed styles rather than trusting the source:

```bash
npm install
npm run build
npm run demo     # http://localhost:4333/demo/
```

`demo/index.html` drives the element through its attributes.
`demo/script-tag.html` reproduces the exact `<script>` tag the WordPress plugin
emits, which is the only place the `data-*` config path and the self-mounting
path get exercised. Change one of those and check both pages.

The WordPress side does have tests, with WordPress itself stubbed out:

```bash
npm run wp:test     # needs php on PATH, 7.4 or newer
```

They cover option sanitising and the script tag the plugin produces. Both are
pure functions, so they need no database and no WordPress install. Anything
depending on real core behaviour should be checked on an actual site instead —
these stubs are deliberately shallow.

They live in `tests/wordpress/`, **not** inside `wordpress/`, and that placement
matters. Whatever sits in `wordpress/` is what gets published and installed on
other people's sites; the stub file declares global functions with no `ABSPATH`
guard, so shipping it would put a directly reachable script in every install.

Keep that rule: **`wordpress/` contains only files that ship.** The alternative
some plugins use is a `.distignore` listing what to strip at deploy time, but
one folder that is exactly the artifact is harder to get wrong than a list that
has to be kept up to date.

After any change to `styles.ts` or `element.ts`, confirm at least:

- computed `font-size` on `<html>` across all four text size levels
- `letter-spacing` at spacing level 2 is exactly `0.12em`, per WCAG 1.4.12
- the panel's own background does **not** change while high contrast is on;
  if it does, shadow isolation has regressed
- `Esc` closes the panel and returns focus to the launcher
- `size="sm"` renders a 44px target, the minimum WCAG 2.5.5 allows

If you add a preference, it needs an entry in `src/features.ts`, its CSS in
`pageStyles`, and a key in all three dictionaries. English is required; the
others can be left to a follow-up.

## Releasing

You do not tag or bump anything by hand. Commit messages do it.

[release-please](https://github.com/googleapis/release-please) reads the
conventional commits on `main` and keeps a **release pull request** open, with the
next version worked out and `CHANGELOG.md` written. It updates itself as more
commits land. Merging it is the release: it tags, creates the GitHub release,
publishes to npm and, once the credentials exist, deploys to WordPress.org.

Which means the prefix on your commit decides the version:

| Commit | Effect while at `0.x` |
|---|---|
| `fix:` | patch — `0.4.0` → `0.4.1` |
| `feat:` | minor — `0.4.0` → `0.5.0` |
| `feat!:` or a `BREAKING CHANGE:` footer | minor as well, because `0.x` promises nothing |
| `docs:`, `chore:`, `test:`, `ci:`, `build:` | no release on their own |

After `1.0.0` a breaking change becomes a major bump. That version is not close:
it waits on a test suite for the component and on the plugin being accepted by
the plugin directory.

Four files carry a version number. `package.json` is the source; the two in
`wordpress/a11y-prefs.php` are updated by release-please through the
`x-release-please-*` annotations around them, and `readme.txt` is brought into
line by `npm run wp:sync` in the release job. CI fails if any of them drift, so
if you edited one by hand, run `wp:sync`.

npm is published over OIDC trusted publishing. There is no token in this
repository and there should never be one.

## Known limitation

Text size scales the root font size, so it only carries type defined in `rem`.
Sites with hardcoded `px` will not scale. This is documented rather than worked
around on purpose — the workaround would mean rewriting host styles, which
breaks the rule at the top of this file.

## Roadmap

1. A WordPress plugin that enqueues `dist/a11y-prefs.js` from inside the plugin
   rather than a CDN, with a settings page. A release step has to copy the built
   file in so the two never drift.
2. Publishing to npm, which brings jsDelivr URLs along with it.
3. React needs no wrapper — the custom element works directly. One gets added
   only if types or SSR turn out to be awkward in practice.
