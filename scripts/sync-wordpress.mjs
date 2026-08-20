/**
 * Copies the built component into the WordPress plugin and keeps the version
 * numbers in step.
 *
 * The plugin has to carry its own copy of the script — WordPress.org does not
 * allow loading assets from a CDN — so this is the one place where the two are
 * allowed to touch. Run it as part of every release; drift between package.json
 * and the plugin header is otherwise very easy to miss.
 */
import { copyFile, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const bundle = new URL("../dist/a11y-prefs.js", import.meta.url);
const pluginDir = new URL("../wordpress/", import.meta.url);

const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const { version } = pkg;

if (!(await stat(bundle).catch(() => null))) {
  console.error("dist/a11y-prefs.js is missing. Run `npm run build` first.");
  process.exit(1);
}

await mkdir(new URL("assets/", pluginDir), { recursive: true });
await copyFile(bundle, new URL("assets/a11y-prefs.js", pluginDir));

/**
 * Rewrites one field in a file, and complains instead of silently doing nothing
 * when the pattern stops matching after a refactor.
 */
async function replaceIn(url, pattern, replacement, what) {
  const original = await readFile(url, "utf8");
  const updated = original.replace(pattern, replacement);
  if (updated === original && !pattern.test(original)) {
    throw new Error(`Could not find ${what} in ${url.pathname}`);
  }
  await writeFile(url, updated);
}

await replaceIn(
  new URL("a11y-prefs.php", pluginDir),
  /^(\s*\*\s*Version:\s*).*$/m,
  `$1${version}`,
  "the plugin header version",
);

await replaceIn(
  new URL("a11y-prefs.php", pluginDir),
  /(define\(\s*'A11Y_PREFS_VERSION',\s*')[^']*(')/,
  `$1${version}$2`,
  "the A11Y_PREFS_VERSION constant",
);

await replaceIn(
  new URL("readme.txt", pluginDir),
  /^(Stable tag:\s*).*$/m,
  `$1${version}`,
  "the readme stable tag",
);

const size = (await stat(new URL("assets/a11y-prefs.js", pluginDir))).size;
console.log(`wordpress/assets/a11y-prefs.js updated (${(size / 1024).toFixed(1)} kB), version ${version}`);
console.log(`plugin root: ${root}wordpress`);
