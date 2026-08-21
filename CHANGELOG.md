# Changelog

Kept by [release-please](https://github.com/googleapis/release-please) from the
commit messages. Everything below `0.4.0` was written by hand before that.

This is the changelog for the **component**. The WordPress plugin has its own,
in the format the plugin directory expects, at
[`wordpress/readme.txt`](wordpress/readme.txt).

## 0.4.0

### Features

- Four preferences drawn from The A11Y Project checklist: unstick fixed bars,
  mark links that open in a new tab, outline form fields, and a high-contrast
  text selection. Sixteen in total.
- Per-corner radius on the launcher: `radius-top-left` and friends override
  whatever `shape` would use, and fall back to it when empty.

### Fixes

- The launcher vanished as soon as the page scrolled with inverted contrast. A
  filter on an ancestor makes `position: fixed` resolve against that ancestor
  rather than the viewport, and the panel was filtering its own host. The
  counter-filter now goes on each fixed element from inside the shadow root.
- On a short viewport the panel overflowed off the top of the screen, taking
  the close button in its header with it. `max-height` now subtracts the space
  the launcher and its offset occupy.

## 0.3.0

### Features

- Per-corner radius groundwork and per-edge offsets: `offset-top`,
  `offset-right`, `offset-bottom` and `offset-left`, each falling back to the
  `offset` shorthand.

### Fixes

- Changing any attribute rebuilt the shadow root and closed the panel on
  whoever was using it. It stays open across a re-render now, and focus is
  deliberately left alone.

## 0.2.0

### Features

- Per-edge offsets.

## 0.1.0

First release. Twelve preferences, English, Spanish and Italian, configurable
position, shape, size, icon and accent colour.
