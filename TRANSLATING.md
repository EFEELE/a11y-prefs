# Translating a11y-prefs

Thank you for looking at this. This page is everything you need to know before
you write a single word — read it once, then work from the sheet you were sent.

You do **not** need GitHub, git, or any tooling. Write your suggestions in the
spreadsheet and send it back. A maintainer moves it into the code and credits you.

## What you are translating

a11y-prefs is a small accessibility **preferences panel** that a website can add
to its pages. A visitor opens it and asks for what they need: bigger text, more
contrast, no animations, a bigger mouse pointer. The choice is saved in their own
browser and nowhere else.

It is free software, MIT licensed, not a commercial product and not on its way to
becoming one. Nobody is being paid here, including the people who wrote it.

There are **35 strings**. That is the whole job — it is a couple of hours of care,
not a translation project.

## Why the wording carries more weight than usual

The people most likely to open this panel are the people least able to work
around a confusing label: someone with low vision reading at 200% zoom, someone
using a screen reader who hears the label without seeing the icon, someone with a
cognitive disability for whom a clever turn of phrase is an obstacle.

So: plain, short, boring. The most ordinary word in your language beats the most
precise one. If a term is common in your language's software but unknown outside
it, it is the wrong term.

Several strings are never seen at all — they are only announced by screen
readers. Those are marked in the table below. They have to make sense out loud,
with no icon and no surrounding page to explain them.

## Rules that are not up for discussion

These come from decisions the project has already made. If one of them makes a
string impossible in your language, say so in the notes column — do not work
around it silently.

**Never "widget", never "overlay".** In January 2025 the US FTC fined an overlay
vendor a million dollars over misleading accessibility claims, and the
accessibility community now treats that whole vocabulary as a red flag. This is a
*preferences panel*: the visitor chooses. Pick the word in your language that
says that.

**Never suggest the site becomes compliant, accessible, or WCAG-anything.** The
panel helps a visitor read a page. It does not fix the site, and saying otherwise
is the exact claim that got that vendor fined. No "makes this site accessible",
no "accessible version", no "compliant".

**Keep `{n}` and `{max}` exactly as written.** They are replaced with numbers at
runtime. You may move them anywhere in the sentence — reorder freely for your
grammar — but the braces and the spelling inside them must survive.

**Stay close to the English length.** These are labels in a fixed-width panel
next to an icon. A label twice as long as the English wraps onto three lines at
large text sizes, which is precisely when it matters most. If your language
cannot be that short, flag it rather than squeezing.

**Follow your own language's UI conventions** for capitalisation, spacing and
punctuation. English sentence case is not a rule to copy — do what reads as
normal software in your language.

## The strings

`ui.*` is the panel's own furniture. `feature.*` are the settings themselves.
`option.*` are the choices inside a setting that has more than on/off.

### Panel

| Key | English | Where it appears |
| --- | --- | --- |
| `ui.title` | Accessibility | Heading at the top of the open panel |
| `ui.open` | Accessibility options | **Screen-reader only.** The name of the floating button that opens the panel |
| `ui.close` | Close | Closes the panel |
| `ui.reset` | Reset all | Button that clears every setting at once |
| `ui.statement` | Accessibility statement | Link to the site's own accessibility statement. Only shown when the site provides one |
| `ui.on` | on | **Screen-reader only.** The state of a setting, announced as "Big cursor, on" |
| `ui.off` | off | **Screen-reader only.** The opposite of the above |
| `ui.level` | Level {n} of {max} | The position of a stepped setting — text size runs 1 to 4, spacing 1 to 3 |
| `ui.didReset` | Preferences reset | **Screen-reader only.** Announced after "Reset all" is pressed |
| `ui.hint` | Your preferences are stored in this browser only. | One line at the foot of the panel. It is a privacy promise: nothing is sent anywhere |

### Settings

| Key | English | What it actually does |
| --- | --- | --- |
| `feature.fontSize` | Text size | Scales all page text up, in four steps |
| `feature.textSpacing` | Text spacing | Opens up the space between letters, words and lines, in three steps |
| `feature.contrast` | Contrast | Switches the page between three colour treatments |
| `feature.dyslexia` | Dyslexia-friendly font | Swaps the page font for one some dyslexic readers find easier |
| `feature.links` | Highlight links | Underlines links and makes them stand out from the text |
| `feature.headings` | Highlight headings | Marks headings so the shape of the page is visible |
| `feature.focusOutline` | Visible focus | Draws a strong outline around whatever the keyboard is currently on |
| `feature.stopAnimations` | Stop animations | Freezes animations and transitions on the page |
| `feature.readingHelp` | Reading help | Adds a guide or a mask that follows the pointer while reading |
| `feature.bigCursor` | Big cursor | Enlarges the mouse pointer |
| `feature.hideImages` | Hide images | Hides images, videos and background images, leaving the text |
| `feature.alignStart` | Align to start | Undoes justified and centred text, aligning everything to the edge you read from |
| `feature.newTab` | Mark new-tab links | Marks the links that will open in a new tab, so none of them are a surprise |
| `feature.fields` | Outline form fields | Draws a border around form inputs so they are findable |
| `feature.noSticky` | Unstick fixed bars | Releases headers and bars that follow you down the page |
| `feature.selection` | High-contrast selection | Forces readable colours on selected text |

### Options

| Key | English | Notes |
| --- | --- | --- |
| `option.contrast.high` | High | Stronger contrast, same colours |
| `option.contrast.invert` | Inverted | Colours reversed — light becomes dark |
| `option.contrast.grayscale` | Grayscale | All colour removed |
| `option.readingHelp.guide` | Guide | A bar that follows the pointer, like a ruler under the line |
| `option.readingHelp.mask` | Mask | Everything dimmed except a band around the pointer |

## Notes for specific languages

**Japanese.** Two of these settings were designed around Latin script and we would
rather hear it from you than guess. `feature.dyslexia` switches to a font stack
that has no effect on Japanese text — decide whether the label should say
something different, or whether the honest answer is that the setting does not
belong in a Japanese interface. `feature.textSpacing` adds letter-spacing, which
behaves quite differently in CJK text than the English label implies. Both are
product questions wearing a translator's coat; your answer changes the code, not
just the string.

**English.** You are not translating, you are editing the source. Every other
language is written from your text, so a clumsy English string spreads. Say so if
a string is vague, if two strings collide, or if a label does not match what the
setting does — that is the most useful thing you can send back.

**Catalan and Japanese** do not exist yet; you are writing them from scratch.
**Italian** already exists and is being reviewed — disagree with it freely.

## Sending it back

Fill in the sheet you were sent, one row per string, and use the notes column
generously: a translation you are unsure about with a note is worth more than a
confident one without. Then reply with the sheet. That is the whole process.

If you would rather work in a plain text file, or on paper, or over a call — that
is fine too. The sheet is a convenience, not a requirement.

## What happens next

A maintainer copies your strings into the code, an automated check confirms that
no key or placeholder went missing, and it ships in the next release. Your name
goes on the commit and in the credits unless you would rather it did not — tell
us which, and how you want to be named.

Nothing you send is final. Languages get revised; if you spot something wrong in
six months, that is a two-minute fix, not an imposition.
