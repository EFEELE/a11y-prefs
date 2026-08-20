import { build, context } from "esbuild";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const watch = process.argv.includes("--watch");

const common = {
  bundle: true,
  minify: !watch,
  target: ["es2020"],
  charset: "utf8",
  logLevel: "info",
  banner: { js: `/*! a11y-prefs v${pkg.version} | MIT | github.com/EFEELE/a11y-prefs */` },
};

// Same source, three entry points:
//   index  - explicit, for bundlers. Registering is up to the caller so that
//            SSR does not blow up on a missing customElements.
//   auto   - import and forget.
//   script - classic <script> tag, configured through data-* attributes.
const targets = [
  { ...common, entryPoints: ["src/index.ts"], outfile: "dist/index.js", format: "esm" },
  { ...common, entryPoints: ["src/auto.ts"], outfile: "dist/auto.js", format: "esm" },
  {
    ...common,
    entryPoints: ["src/script.ts"],
    outfile: "dist/a11y-prefs.js",
    format: "iife",
    globalName: "A11yPrefs",
  },
];

if (watch) {
  for (const target of targets) (await context(target)).watch();
} else {
  await Promise.all(targets.map((target) => build(target)));
}
