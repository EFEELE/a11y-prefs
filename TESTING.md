# Testing

Two things to test, and they exercise different code paths. Test both.

## The component

```bash
npm install
npx playwright install chromium   # once
npm run build
npm test
```

Playwright, in a real Chromium. Not jsdom: nearly every assertion here is a
computed style produced by a stylesheet, and jsdom does not resolve those — it
would happily pass a suite that proves nothing.

The tests run against `demo/index.html`, the same page you open by hand, so a
red test can be reproduced by eye in seconds. `npm test -- --headed` watches it
happen; `npm test -- -g "focus"` narrows it down.

To poke at it yourself:

```bash
npm run demo        # http://localhost:4333/demo/
```

**`demo/index.html`** is the test bench. The left column configures the panel;
the right column has content for every preference to act on. The box at the
bottom of the left column shows, live, exactly what the component writes to
`<html>` — if a preference does nothing visible, look there first to see whether
the attribute was set at all.

**`demo/script-tag.html`** is the other path: no `<a11y-prefs>` in the markup,
configuration in `data-*` on the script tag, component mounts itself. It is a
byte-for-byte copy of what the WordPress plugin emits, so it is the cheapest way
to check the two still agree.

### Worth checking after any change to `styles.ts` or `element.ts`

| Check | Expected |
|---|---|
| Text size, all four levels | computed `font-size` on `<html>` scales 1.125 / 1.25 / 1.5 / 2 |
| Text spacing, level 2 | `letter-spacing` is exactly `0.12em` — the WCAG 1.4.12 value |
| Contrast → high | page text turns white on black, **panel keeps its own colours** |
| Contrast → inverted, then scroll | button stays in its corner (see the note below) |
| Unstick fixed bars | the dark top bar and the yellow strip both go `static` |
| Mark new-tab links | only the external link gets the arrow |
| Escape, backdrop, X | all three close the panel, focus returns to the button |
| A short window (~420px tall) | the panel stays inside the viewport and its X is reachable |
| `size="sm"` | 44px, the WCAG 2.5.5 minimum |
| Reset | every `data-a11y-*` attribute gone, localStorage back to `{}` |

Two of those exist because they broke before. A `filter` on an ancestor makes
`position: fixed` resolve against that ancestor instead of the viewport, so
inverted contrast used to send the button to the foot of the document. And the
panel's `max-height` did not subtract the space the button occupies, so on a
short window it overflowed off the top — taking the close button with it.

## The WordPress plugin

```bash
npm run wp:test     # 35 assertions, no WordPress needed
```

That covers option sanitising and the script tag the plugin builds. Everything
else needs a real install.

### On a real site

1. `npm run wp:sync`, then copy `wordpress/` into `wp-content/plugins/a11y-prefs`.
2. Activate. There should be an **Accessibility** entry in the sidebar, not a
   page under Settings.
3. Change position, shape, corner radius and margins — the preview should follow
   as you type, without saving.
4. Switch the preview between Desktop and Mobile. They must look **different**:
   mobile turns the panel into a bottom sheet. If they look the same, the frame
   is being squeezed instead of scaled.
5. Open the panel inside the preview and turn on grayscale. Now reload the
   settings page. The preview must come back in colour — it keeps its own
   storage key, separate from the one real visitors use.
6. Save. Visit the front end and confirm the settings took.
7. Set the site language to Spanish or Italian in Settings → General. The admin
   screen should follow.
8. Deactivate and delete. `a11y_prefs_options` should be gone from `wp_options`.

### A local WordPress without MySQL

WordPress runs on SQLite through the official
[sqlite-database-integration](https://wordpress.org/plugins/sqlite-database-integration/)
plugin: copy its `db.copy` to `wp-content/db.php`, replace the two placeholders,
and serve the folder with `php -S localhost:8080`. No Docker, no database server.

One trap: installing from the CLI leaves `siteurl` empty, because there is no
`HTTP_HOST`. WordPress reads that as a corrupt database and answers *Error
establishing a database connection*, which sends you hunting in entirely the
wrong place. Set `siteurl` and `home` directly in the SQLite file afterwards.

## What still has no tests

The WordPress plugin is only covered where it is pure — sanitising and the
script tag it builds. Nothing exercises it inside a real WordPress: the admin
screen, the settings round trip and the preview are all checked by hand, using
the list further up. `wp-env` would close that, at the cost of Docker in CI.

The panel is not yet tested against an actual screen reader either. No amount
of `aria-*` assertions substitutes for that, and it is the thing this project
would most like help with.
