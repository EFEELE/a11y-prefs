import type { Locator, Page } from "@playwright/test";

/**
 * The demo page is the fixture. It carries content for every preference and it
 * is the page a contributor already opens by hand, so a test failing here can
 * be reproduced by eye in seconds.
 */
export const DEMO = "/demo/";

/** The element, addressed through the light DOM. */
export const panel = (page: Page): Locator => page.locator("a11y-prefs");

/**
 * Playwright pierces shadow roots in its own selectors, so `.launcher` finds
 * the button inside without any special ceremony.
 */
export const launcher = (page: Page): Locator => page.locator("a11y-prefs .launcher");
export const dialog = (page: Page): Locator => page.locator("a11y-prefs .panel");
export const dismiss = (page: Page): Locator => page.locator("a11y-prefs .dismiss");

/** Turn a preference on through the public API rather than by clicking cards. */
export async function set(page: Page, id: string, value: string | null): Promise<void> {
  await page.evaluate(
    ([featureId, featureValue]) => {
      const element = document.querySelector("a11y-prefs") as HTMLElement & {
        set: (id: string, value: string | null) => void;
      };
      element.set(featureId as string, featureValue as string | null);
    },
    [id, value] as const,
  );
}

export async function reset(page: Page): Promise<void> {
  await page.evaluate(() => {
    const element = document.querySelector("a11y-prefs") as HTMLElement & { reset: () => void };
    element.reset();
  });
}

/** Every data-a11y-* attribute currently on <html>, as a plain object. */
export async function documentState(page: Page): Promise<Record<string, string>> {
  return page.evaluate(() =>
    Object.fromEntries(
      [...document.documentElement.attributes]
        .filter((attribute) => attribute.name.startsWith("data-a11y"))
        .map((attribute) => [attribute.name, attribute.value]),
    ),
  );
}

/**
 * One computed style property of the first element matching `selector`.
 *
 * Playwright's own locators pierce shadow roots, but `document.querySelector`
 * inside the page does not, so a selector aimed at the panel has to be resolved
 * against the shadow root by hand. Prefixing it with `a11y-prefs ` does that.
 */
export function computed(
  page: Page,
  selector: string,
  property: string,
  pseudo?: string,
): Promise<string> {
  return page.evaluate(
    ([target, name, pseudoElement]) => {
      const inPanel = (target as string).startsWith("a11y-prefs ");
      const root = inPanel
        ? document.querySelector("a11y-prefs")!.shadowRoot!
        : document;
      const within = inPanel ? (target as string).slice("a11y-prefs ".length) : (target as string);

      const element = root.querySelector(within);
      if (!element) throw new Error(`no element for ${target}`);

      return getComputedStyle(element, (pseudoElement as string) || undefined).getPropertyValue(
        name as string,
      );
    },
    [selector, property, pseudo ?? ""] as const,
  );
}
