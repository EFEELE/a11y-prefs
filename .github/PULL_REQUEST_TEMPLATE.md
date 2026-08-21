## What this changes

<!-- And why. If it fixes an issue, "Closes #12". -->

## Checklist

- [ ] The component still never touches the host page's DOM — no markup walked,
      rewritten or wrapped. See the top of [CONTRIBUTING.md](../CONTRIBUTING.md).
- [ ] `npm run build` and `npx tsc --noEmit` pass.
- [ ] If anything under `src/` changed: `npm run wp:sync`, and the regenerated
      `wordpress/assets/a11y-prefs.js` is committed. CI compares it by content, so a
      stale copy with the same byte count is still caught.
- [ ] If anything under `wordpress/` changed: `npm run wp:test` passes, and any new
      shipped PHP file has its `defined( 'ABSPATH' ) || exit;` guard.
- [ ] If a preference was added: it is in `src/features.ts`, its CSS is in
      `pageStyles`, and it has an English label. Spanish and Italian can follow later.

## How you tested it

<!--
Which rows of the table in TESTING.md you went through, and in which browser. If you
changed styles.ts or element.ts, the contrast-while-scrolled and short-window rows
are the two that have regressed before.
-->
