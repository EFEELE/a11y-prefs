import { expect, test } from "@playwright/test";
import { DEMO, computed, documentState, panel, reset, set } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto(DEMO);
  await expect(panel(page)).toHaveAttribute("data-a11y-root", "");
  await reset(page);
});

test.describe("text size", () => {
  // The four levels are the contract, not an implementation detail: a host
  // site can restyle around them and a change here is a breaking change.
  const levels: Array<[string, string]> = [
    ["1", "18px"],
    ["2", "20px"],
    ["3", "24px"],
    ["4", "32px"],
  ];

  for (const [level, size] of levels) {
    test(`level ${level} scales the root to ${size}`, async ({ page }) => {
      expect(await computed(page, "html", "font-size")).toBe("16px");
      await set(page, "fontSize", level);
      expect(await computed(page, "html", "font-size")).toBe(size);
    });
  }

  test("turning it off restores the original size", async ({ page }) => {
    await set(page, "fontSize", "4");
    await set(page, "fontSize", null);
    expect(await computed(page, "html", "font-size")).toBe("16px");
  });
});

test("text spacing level 2 is exactly the WCAG 1.4.12 values", async ({ page }) => {
  await set(page, "textSpacing", "2");

  // 0.12em and 0.16em of a 16px root, and a line height of 1.8.
  expect(await computed(page, ".lead", "letter-spacing")).toBe("1.92px");
  expect(await computed(page, ".lead", "word-spacing")).toBe("2.56px");
  expect(await computed(page, ".lead", "line-height")).toBe("28.8px");
});

test.describe("contrast", () => {
  test("high contrast repaints the page but not the panel", async ({ page }) => {
    const before = await computed(page, "a11y-prefs .panel", "background-color");

    await set(page, "contrast", "high");
    expect(await computed(page, ".lead", "color")).toBe("rgb(255, 255, 255)");

    // The shadow root is the whole point. If this ever fails, the panel is
    // being restyled by the page and the isolation has gone.
    expect(await computed(page, "a11y-prefs .panel", "background-color")).toBe(before);
  });

  test("the launcher stays in the corner while scrolled and inverted", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 600));
    const anchored = await panel(page).locator(".launcher").boundingBox();

    await set(page, "contrast", "invert");
    const inverted = await panel(page).locator(".launcher").boundingBox();

    // A filter on an ancestor makes position:fixed resolve against that
    // ancestor rather than the viewport. This regressed once and put the
    // button at the foot of the document.
    expect(inverted?.y).toBeCloseTo(anchored?.y ?? 0, 0);

    const viewport = page.viewportSize();
    expect(inverted?.y).toBeLessThan(viewport?.height ?? 0);
  });

  test("inverted mode counter-filters the panel so it keeps its colours", async ({ page }) => {
    await set(page, "contrast", "invert");
    expect(await computed(page, "a11y-prefs .launcher", "filter")).toContain("invert(1)");
  });
});

test("unsticking releases fixed and sticky elements, but not the panel", async ({ page }) => {
  expect(await computed(page, ".topbar", "position")).toBe("fixed");
  expect(await computed(page, ".sticky-note", "position")).toBe("sticky");

  await set(page, "noSticky", "on");

  expect(await computed(page, ".topbar", "position")).toBe("static");
  expect(await computed(page, ".sticky-note", "position")).toBe("static");
  // The panel would be unusable if it unpinned itself along with the page.
  expect(await computed(page, "a11y-prefs .launcher", "position")).toBe("fixed");
});

test("new-tab marking only touches links that open elsewhere", async ({ page }) => {
  await set(page, "newTab", "on");

  expect(await computed(page, 'a[target="_blank"]', "content", "::after")).toContain("↗");
  expect(await computed(page, "main a:not([target])", "content", "::after")).toBe("none");
});

test("outlining form fields reaches inputs and buttons", async ({ page }) => {
  await set(page, "fields", "on");
  expect(await computed(page, "fieldset input", "outline-width")).toBe("2px");
  expect(await computed(page, "fieldset button", "outline-width")).toBe("2px");
});

test("aligning to start uses start, not left", async ({ page }) => {
  expect(await computed(page, ".justified", "text-align")).toBe("justify");
  await set(page, "alignStart", "on");
  // start rather than left, so it is still correct in a right-to-left language.
  expect(await computed(page, ".justified", "text-align")).toBe("start");
});

test("hiding images keeps their space", async ({ page }) => {
  const before = await page.locator("figure img").boundingBox();
  await set(page, "hideImages", "on");

  expect(await computed(page, "figure img", "visibility")).toBe("hidden");
  // visibility, not display: the layout must not jump.
  const after = await page.locator("figure img").boundingBox();
  expect(after?.height).toBe(before?.height);
});

test("reset clears every attribute and the stored state", async ({ page }) => {
  await set(page, "fontSize", "3");
  await set(page, "contrast", "high");
  await set(page, "noSticky", "on");
  expect(Object.keys(await documentState(page))).toHaveLength(3);

  await reset(page);

  expect(await documentState(page)).toEqual({});
  expect(await computed(page, "html", "font-size")).toBe("16px");
  const stored = await page.evaluate(() => localStorage.getItem("a11y-prefs"));
  expect(stored).toBe("{}");
});

test("preferences survive a reload", async ({ page }) => {
  await set(page, "fontSize", "3");
  await set(page, "contrast", "grayscale");

  await page.reload();

  expect(await documentState(page)).toEqual({
    "data-a11y-font-size": "3",
    "data-a11y-contrast": "grayscale",
  });
  await reset(page);
});
