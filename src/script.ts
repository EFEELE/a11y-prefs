import { whenReady } from "./dom";
import { defineA11yPrefs, registerA11yPrefs } from "./index";
import type { A11yPrefsConfig, FeatureId, Messages } from "./types";

/**
 * Entry point for a plain <script> tag. Configuration comes from three places,
 * lowest priority first: `window.a11yPrefsConfig`, the `data-*` attributes of
 * the script tag itself, and the attributes of a hand-written <a11y-prefs>.
 *
 * The data-* route exists for WordPress and PHP, where emitting an inline
 * config object means fighting both the CSP and the escaping rules.
 */
declare global {
  interface Window {
    a11yPrefsConfig?: A11yPrefsConfig;
  }
}

const currentScript = document.currentScript as HTMLScriptElement | null;

function configFromDataset(script: HTMLScriptElement | null): A11yPrefsConfig {
  if (!script) return {};

  const data = script.dataset;
  const config: A11yPrefsConfig = {};

  if (data.locale) config.locale = data.locale;
  if (data.fallbackLocale) config.fallbackLocale = data.fallbackLocale;
  if (data.position) config.position = data.position as A11yPrefsConfig["position"];
  if (data.offset) config.offset = data.offset;
  if (data.offsetTop) config.offsetTop = data.offsetTop;
  if (data.offsetRight) config.offsetRight = data.offsetRight;
  if (data.offsetBottom) config.offsetBottom = data.offsetBottom;
  if (data.offsetLeft) config.offsetLeft = data.offsetLeft;
  if (data.radiusTopLeft) config.radiusTopLeft = data.radiusTopLeft;
  if (data.radiusTopRight) config.radiusTopRight = data.radiusTopRight;
  if (data.radiusBottomRight) config.radiusBottomRight = data.radiusBottomRight;
  if (data.radiusBottomLeft) config.radiusBottomLeft = data.radiusBottomLeft;
  if (data.shape) config.shape = data.shape as A11yPrefsConfig["shape"];
  if (data.size) config.size = data.size as A11yPrefsConfig["size"];
  if (data.accent) config.accent = data.accent;
  if (data.accentContrast) config.accentContrast = data.accentContrast;
  if (data.icon) config.icon = data.icon;
  if (data.label) config.label = data.label;
  if (data.statementUrl) config.statementUrl = data.statementUrl;
  if (data.storageKey) config.storageKey = data.storageKey;
  if (data.zIndex) config.zIndex = Number(data.zIndex);
  if (data.features) {
    config.features = data.features.split(",").map((entry) => entry.trim()) as FeatureId[];
  }
  if (data.messages) {
    try {
      config.messages = JSON.parse(data.messages) as Record<string, Messages>;
    } catch {
      // Bad JSON falls back to the bundled dictionaries instead of throwing.
    }
  }

  return config;
}

const config: A11yPrefsConfig = {
  ...window.a11yPrefsConfig,
  ...configFromDataset(currentScript),
};

registerA11yPrefs();

// data-auto="false" when you want to place the element yourself.
if (currentScript?.dataset.auto !== "false") {
  whenReady(() => defineA11yPrefs(config));
}

export * from "./index";
