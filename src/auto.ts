import { whenReady } from "./dom";
import { defineA11yPrefs } from "./index";

// `import "a11y-prefs/auto"` and nothing else. An <a11y-prefs> already present
// in the markup is reused rather than duplicated.
whenReady(() => defineA11yPrefs());

export * from "./index";
