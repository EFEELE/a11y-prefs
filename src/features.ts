import type { FeatureId } from "./types";

/**
 * `toggle` is on/off, `step` is a level that climbs and wraps back to off, and
 * `enum` is a list of named modes. All three are stored as a plain string, so
 * the whole state serialises to JSON without any special casing.
 */
export type FeatureKind = "toggle" | "step" | "enum";

export interface Feature {
  id: FeatureId;
  kind: FeatureKind;
  /** Valid values. "Off" is not one of them: it means no attribute at all. */
  options: string[];
  /** Body of a `<svg viewBox="0 0 24 24">`. */
  icon: string;
}

const path = (d: string) => `<path d="${d}"/>`;

export const FEATURES: readonly Feature[] = [
  {
    id: "fontSize",
    kind: "step",
    options: ["1", "2", "3", "4"],
    icon: path("M3 20 9 4h2l6 16M5.5 14h9M16 20l3-8h1l3 8M17.2 17.5h4.6"),
  },
  {
    id: "textSpacing",
    kind: "step",
    options: ["1", "2", "3"],
    icon: path("M3 5h18M3 19h18M7 9h10M7 12h10M7 15h10"),
  },
  {
    id: "contrast",
    kind: "enum",
    options: ["high", "invert", "grayscale"],
    icon: `<circle cx="12" cy="12" r="9"/>${path("M12 3v18a9 9 0 0 0 0-18Z")}`,
  },
  {
    id: "dyslexia",
    kind: "toggle",
    options: ["on"],
    icon: path("M4 19V7a3 3 0 0 1 6 0v12M4 13h6M14 5h6l-6 14h6"),
  },
  {
    id: "links",
    kind: "toggle",
    options: ["on"],
    icon: path(
      "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
    ),
  },
  {
    id: "newTab",
    kind: "toggle",
    options: ["on"],
    icon: path("M14 4h6v6M20 4l-8 8M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"),
  },
  {
    id: "headings",
    kind: "toggle",
    options: ["on"],
    icon: path("M5 5v14M13 5v14M5 12h8M17 19v-8l4 8v-8"),
  },
  {
    id: "focusOutline",
    kind: "toggle",
    options: ["on"],
    icon:
      `<circle cx="12" cy="12" r="3"/>` +
      path("M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3"),
  },
  {
    id: "fields",
    kind: "toggle",
    options: ["on"],
    icon: path("M3 8h18v8H3zM7 11v2M10 11h7"),
  },
  {
    id: "stopAnimations",
    kind: "toggle",
    options: ["on"],
    icon: `<circle cx="12" cy="12" r="9"/>${path("M9 9h2v6H9zM13 9h2v6h-2z")}`,
  },
  {
    id: "noSticky",
    kind: "toggle",
    options: ["on"],
    icon: path("M9 4h6l-1 5 3 3v2h-4M12 14v6M3 3l18 18"),
  },
  {
    id: "readingHelp",
    kind: "enum",
    options: ["guide", "mask"],
    icon: path("M3 6h18M3 12h18M3 18h18M7 12l-2 2 2 2"),
  },
  {
    id: "bigCursor",
    kind: "toggle",
    options: ["on"],
    icon: path("M5 3l14 9-6 1.5L10.5 20z"),
  },
  {
    id: "hideImages",
    kind: "toggle",
    options: ["on"],
    icon:
      path("M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6") +
      `<circle cx="8.5" cy="9" r="1.5"/>` +
      path("M3 3l18 18"),
  },
  {
    id: "alignStart",
    kind: "toggle",
    options: ["on"],
    icon: path("M3 5h18M3 9h12M3 13h18M3 17h12"),
  },
  {
    id: "selection",
    kind: "toggle",
    options: ["on"],
    icon: `${path("M5 4h14v16H5z")}<rect x="8" y="9" width="8" height="3"/>`,
  },
];

export const FEATURE_IDS: readonly FeatureId[] = FEATURES.map((feature) => feature.id);

const byId = new Map(FEATURES.map((feature) => [feature.id, feature] as const));

export const getFeature = (id: FeatureId): Feature | undefined => byId.get(id);

/** `fontSize` becomes `data-a11y-font-size`. */
export const attributeFor = (id: FeatureId): string =>
  `data-a11y-${id.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase())}`;
