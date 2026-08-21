/**
 * Every preference the panel can offer. The order here is irrelevant — what the
 * user sees is decided by `config.features`.
 */
export type FeatureId =
  | "fontSize"
  | "textSpacing"
  | "contrast"
  | "dyslexia"
  | "links"
  | "newTab"
  | "headings"
  | "focusOutline"
  | "fields"
  | "stopAnimations"
  | "noSticky"
  | "readingHelp"
  | "bigCursor"
  | "hideImages"
  | "alignStart"
  | "selection";

export type Position =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "middle-right"
  | "middle-left";

/** Launcher shape. `pill` is the only one that shows the label. */
export type Shape = "circle" | "rounded" | "square" | "pill";

export type Size = "sm" | "md" | "lg";

/** Bundled icons. The `icon` option also takes a raw SVG string. */
export type IconName = "universal" | "person" | "eye" | "wheelchair";

/** Flat dictionary. Easier to override one key at a time than a nested one. */
export type Messages = Record<string, string>;

export interface A11yPrefsConfig {
  /**
   * Language of the PANEL, not of the site. `"auto"` reads `<html lang>` and
   * falls back to `fallbackLocale` when there is no matching dictionary.
   */
  locale?: string;
  fallbackLocale?: string;
  /**
   * Add new languages or override single keys of the bundled ones:
   * `{ pt: { "ui.title": "Acessibilidade" } }`
   */
  messages?: Record<string, Messages>;
  position?: Position;
  /** Distance from the edges. Any CSS length. Shorthand for all four. */
  offset?: string;
  /** Per-edge overrides. Whichever is left out falls back to `offset`. */
  offsetTop?: string;
  offsetRight?: string;
  offsetBottom?: string;
  offsetLeft?: string;
  /** Corner radius of the launcher. Overrides whatever `shape` would use. */
  radiusTopLeft?: string;
  radiusTopRight?: string;
  radiusBottomRight?: string;
  radiusBottomLeft?: string;
  shape?: Shape;
  size?: Size;
  /** Brand colour of the launcher and of the active controls. */
  accent?: string;
  /** Colour used on top of `accent`. Derived from luminance when omitted. */
  accentContrast?: string;
  icon?: IconName | (string & {});
  /** Launcher text in `pill` shape. Defaults to the translated `ui.open`. */
  label?: string;
  /** Which preferences to show, and in which order. Defaults to all of them. */
  features?: FeatureId[];
  /** localStorage key. Change it if several sites share one domain. */
  storageKey?: string;
  /** Link to your accessibility statement. Hidden when not set. */
  statementUrl?: string;
  zIndex?: number;
  /** Where to insert the element when `defineA11yPrefs` creates it. */
  container?: HTMLElement;
}

export type A11yPrefsState = Partial<Record<FeatureId, string>>;
