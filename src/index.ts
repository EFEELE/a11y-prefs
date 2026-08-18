import { A11yPrefsElement, TAG_NAME, configure } from "./element";
import type { A11yPrefsConfig } from "./types";

export { A11yPrefsElement, TAG_NAME, configure };
export { FEATURES, FEATURE_IDS } from "./features";
export { BUNDLED_LOCALES, DEFAULT_LOCALE } from "./i18n";
export type {
  A11yPrefsConfig,
  A11yPrefsState,
  FeatureId,
  IconName,
  Messages,
  Position,
  Shape,
  Size,
} from "./types";

/** Defines the custom element once. Safe to call on every render. */
export function registerA11yPrefs(): void {
  if (typeof customElements !== "undefined" && !customElements.get(TAG_NAME)) {
    customElements.define(TAG_NAME, A11yPrefsElement);
  }
}

/**
 * Registers the element, stores the shared configuration and appends an
 * instance if the page does not already have one.
 *
 * Nothing runs on import: there is no `customElements` during SSR, so callers
 * using a bundler decide when this happens. For the lazy path there is
 * `a11y-prefs/auto`.
 */
export function defineA11yPrefs(config: A11yPrefsConfig = {}): A11yPrefsElement | null {
  if (typeof window === "undefined") return null;

  configure(config);
  registerA11yPrefs();

  const existing = document.querySelector<A11yPrefsElement>(TAG_NAME);
  if (existing) return existing;

  const element = document.createElement(TAG_NAME) as A11yPrefsElement;
  (config.container ?? document.body).append(element);
  return element;
}

declare global {
  interface HTMLElementTagNameMap {
    "a11y-prefs": A11yPrefsElement;
  }
}
