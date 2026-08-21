=== a11y-prefs ===
Contributors: efeele
Tags: accessibility, a11y, contrast, font size, wcag
Requires at least: 6.5
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 0.3.0
License: MIT
License URI: https://opensource.org/licenses/MIT

Lets visitors adjust text size, spacing, contrast and motion. Their choice is remembered in their own browser. No external requests, no tracking.

== Description ==

a11y-prefs adds a small button to your site. Behind it sit twelve reading
preferences your visitors can turn on for themselves:

* Text size, in four steps
* Text spacing, in three steps (level 2 matches WCAG 1.4.12 exactly)
* Contrast: high, inverted or grayscale
* A dyslexia-friendly font
* Highlight links
* Highlight headings
* Visible focus outlines
* Stop animations
* Reading help: a guide line or a mask that follows the pointer
* A larger cursor
* Hide images
* Align text to the start of the line

Choices are stored in the visitor's own browser and nowhere else.

= What this plugin is not =

This is a preferences panel, not an accessibility fix. It does not, and cannot,
make an inaccessible site accessible — that work happens in your theme, your
markup and your content. Any plugin claiming otherwise is selling you something:
in January 2025 the FTC fined one such vendor a million dollars over exactly
those claims.

Use this alongside real accessibility work, not instead of it.

= Privacy =

The plugin makes no external requests of any kind. The script is served from
your own site, there are no fonts or images fetched from third parties, nothing
is sent anywhere, and no cookies are set. Visitor preferences live in
localStorage in their browser.

That also means it works on sites behind a strict Content-Security-Policy and on
intranets with no outbound access.

= Configuration =

Settings > Accessibility panel. You can choose where the button sits (six
positions), its shape (circle, rounded, square, or a pill with a label), its
size, its colour, its icon, the panel language, and which of the twelve
preferences to offer.

The panel ships with English, Spanish and Italian, and by default follows your
site language.

= For developers =

Two filters:

`a11y_prefs_enabled` — return false to hide the panel on a given request.

`a11y_prefs_config` — filter the configuration attributes before they are
printed, for example to add a language of your own through `messages`.

The component itself is a dependency-free web component, MIT licensed:
https://github.com/EFEELE/a11y-prefs

== Installation ==

1. Upload the plugin folder to `/wp-content/plugins/`, or install it through
   Plugins > Add New.
2. Activate it.
3. Go to Settings > Accessibility panel to choose position, shape and language.

Nothing else is required — the panel appears on the front end straight away.

== Frequently Asked Questions ==

= Does this make my site WCAG compliant? =

No. No plugin can do that. This one gives your visitors control over how they
read your pages, which is genuinely useful, but the compliance work is in your
markup.

= Does it slow my site down? =

The script is about 9 kB gzipped, has no dependencies, and is deferred, so it
never blocks rendering.

= My text size setting does nothing =

Text size scales the root font size, so it carries anything your theme defines
in `rem`. Themes that hardcode `px` font sizes will not scale. There is no way
around that from outside the theme.

= Does it work with a caching plugin? =

Yes. Everything is static and the visitor's choice is applied client side, so
cached HTML is never wrong.

== Screenshots ==

1. The panel open on a page, showing the twelve preferences.
2. The settings screen.

== Changelog ==

= 0.3.0 =
* The admin screen follows the WordPress language. Spanish and Italian are
  bundled; other locales fall back to English.
* Every preference now shows its own icon, a line explaining what it does, and
  a link to the WCAG success criterion behind it where there is one.
* Icons on each section heading, and Panel is now called Settings.
* The preview no longer shares stored preferences with the site it previews.
  Trying a setting in the admin used to write to the same browser storage a
  real visitor uses, so a stray grayscale left the preview grey for good and
  quietly changed your own browsing of the site.
* The preview takes half the screen instead of a narrow sidebar. It was being
  scaled to about 30%, which made a colourful page look grey and unreadable.
* A phone-sized preview is centred rather than pushed to one side.
* Each of the four corners of the button can be rounded on its own.
* Typing a bare number in a margin or radius box is read as pixels.
* Settings are grouped as Placement, Look, Settings and Preferences instead of
  one long list.
* Requires WordPress 6.5, for the PHP translation file format.

= 0.2.0 =
* Own top level menu instead of a page under Settings, with a live preview
  next to the controls.
* Each of the four edges can be set on its own, so a button in a corner can be
  nudged away from one edge without moving along the other.
* The preview renders at a real device width and scales down, so desktop and
  mobile no longer look identical.
* The panel no longer closes itself every time a setting changes.

= 0.1.0 =
* First release.
