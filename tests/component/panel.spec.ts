import { expect, test } from "@playwright/test";
import { DEMO, computed, dialog, dismiss, launcher, panel, reset } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto(DEMO);
  await reset(page);
});

test.describe("opening and closing", () => {
  test("the launcher opens the panel and reports it", async ({ page }) => {
    await expect(dialog(page)).toBeHidden();
    await expect(launcher(page)).toHaveAttribute("aria-expanded", "false");

    await launcher(page).click();

    await expect(dialog(page)).toBeVisible();
    await expect(launcher(page)).toHaveAttribute("aria-expanded", "true");
    await expect(dialog(page)).toHaveAttribute("role", "dialog");
    await expect(dialog(page)).toHaveAttribute("aria-modal", "true");
  });

  test("the close button closes it and gives focus back", async ({ page }) => {
    await launcher(page).click();
    await dismiss(page).click();

    await expect(dialog(page)).toBeHidden();
    // document.activeElement only ever reports the host, so ask the shadow root.
    const focused = await page.evaluate(() => {
      const host = document.querySelector("a11y-prefs")!;
      return host.shadowRoot!.activeElement?.className ?? null;
    });
    expect(focused).toContain("launcher");
  });

  test("escape closes it", async ({ page }) => {
    await launcher(page).click();
    await page.keyboard.press("Escape");
    await expect(dialog(page)).toBeHidden();
  });

  test("the backdrop closes it", async ({ page }) => {
    await launcher(page).click();
    await page.locator("a11y-prefs .backdrop").click({ position: { x: 5, y: 5 } });
    await expect(dialog(page)).toBeHidden();
  });

  test("a second click on the launcher closes it", async ({ page }) => {
    await launcher(page).click();
    await launcher(page).click();
    await expect(dialog(page)).toBeHidden();
  });
});

test("changing an attribute does not slam the panel shut", async ({ page }) => {
  await launcher(page).click();
  await expect(dialog(page)).toBeVisible();

  // This is what the WordPress settings preview does on every keystroke.
  await panel(page).evaluate((element) => element.setAttribute("accent", "#0f766e"));

  await expect(dialog(page)).toBeVisible();
  await expect(launcher(page)).toHaveAttribute("aria-expanded", "true");
});

test("the panel and its close button stay on screen in a short window", async ({ page }) => {
  // A laptop in landscape, or a phone turned sideways. The panel used to
  // overflow off the top here, taking the close button in its header with it.
  await page.setViewportSize({ width: 1000, height: 420 });

  for (const position of ["bottom-right", "top-right", "middle-right"]) {
    await panel(page).evaluate(
      (element, value) => element.setAttribute("position", value),
      position,
    );
    await launcher(page).click();

    const box = await dialog(page).boundingBox();
    expect(box, `${position}: no panel`).not.toBeNull();
    expect(box!.y, `${position}: overflows the top`).toBeGreaterThanOrEqual(-1);
    expect(box!.y + box!.height, `${position}: overflows the bottom`).toBeLessThanOrEqual(421);

    await expect(dismiss(page), `${position}: close button off screen`).toBeInViewport();
    await dismiss(page).click();
  }
});

test.describe("keyboard", () => {
  test("focus is trapped inside the panel", async ({ page }) => {
    await launcher(page).click();

    // Compare identity, not class names: the last focusable is the statement
    // link in the footer, which carries no class at all.
    const where = () =>
      page.evaluate(() => {
        const root = document.querySelector("a11y-prefs")!.shadowRoot!;
        const active = root.activeElement;
        const focusable = [...root.querySelectorAll(".panel button, .panel a[href]")];
        return {
          inside: !!active && focusable.includes(active),
          index: active ? focusable.indexOf(active) : -1,
          last: focusable.length - 1,
        };
      });

    // Opens on the first control.
    expect(await where()).toMatchObject({ inside: true, index: 0 });

    // Shift-tabbing off the front must wrap to the back rather than escape
    // into the page behind it.
    await page.keyboard.press("Shift+Tab");
    const wrapped = await where();
    expect(wrapped.inside).toBe(true);
    expect(wrapped.index).toBe(wrapped.last);

    // And forward from the back wraps to the front again.
    await page.keyboard.press("Tab");
    expect(await where()).toMatchObject({ inside: true, index: 0 });
  });

  test("every toggle reports its state", async ({ page }) => {
    await launcher(page).click();
    const card = page.locator('a11y-prefs .card[data-id="links"]');

    await expect(card).toHaveAttribute("aria-pressed", "false");
    await card.click();
    await expect(card).toHaveAttribute("aria-pressed", "true");
  });
});

test("the smallest size still meets the 44px touch target", async ({ page }) => {
  await panel(page).evaluate((element) => element.setAttribute("size", "sm"));
  const box = await launcher(page).boundingBox();

  // WCAG 2.5.5. Anything under this and the button fails on a phone.
  expect(box?.width).toBeGreaterThanOrEqual(44);
  expect(box?.height).toBeGreaterThanOrEqual(44);
});

test.describe("configuration", () => {
  test("each shape sets its own radius", async ({ page }) => {
    const shapes: Array<[string, string]> = [
      ["circle", "50%"],
      ["rounded", "16px"],
      ["square", "6px"],
      ["pill", "999px"],
    ];

    for (const [shape, radius] of shapes) {
      await panel(page).evaluate((element, value) => element.setAttribute("shape", value), shape);
      expect(await computed(page, "a11y-prefs .launcher", "border-radius")).toBe(radius);
    }
  });

  test("a single corner overrides the shape and falls back when cleared", async ({ page }) => {
    await panel(page).evaluate((element) => {
      element.setAttribute("shape", "circle");
      element.setAttribute("radius-top-left", "4px");
    });
    expect(await computed(page, "a11y-prefs .launcher", "border-radius")).toBe("4px 50% 50%");

    await panel(page).evaluate((element) => element.removeAttribute("radius-top-left"));
    expect(await computed(page, "a11y-prefs .launcher", "border-radius")).toBe("50%");
  });

  test("each edge offset can be set on its own", async ({ page }) => {
    await panel(page).evaluate((element) => {
      element.setAttribute("position", "top-right");
      element.setAttribute("offset", "20px");
      element.setAttribute("offset-top", "6px");
    });

    const styles = await page.evaluate(() => {
      const found = document.querySelector("a11y-prefs")!.shadowRoot!.querySelector(".launcher")!;
      const computedStyle = getComputedStyle(found);
      return { top: computedStyle.top, right: computedStyle.right };
    });

    expect(styles.top).toBe("6px");
    expect(styles.right).toBe("20px");
  });

  test("the accent colour picks a readable foreground", async ({ page }) => {
    await panel(page).evaluate((element) => element.setAttribute("accent", "#fbbf24"));
    // A brand yellow with white on it fails contrast, so the component flips
    // to dark of its own accord.
    expect(await computed(page, "a11y-prefs .launcher", "color")).toBe("rgb(17, 24, 39)");

    await panel(page).evaluate((element) => element.setAttribute("accent", "#0b57d0"));
    expect(await computed(page, "a11y-prefs .launcher", "color")).toBe("rgb(255, 255, 255)");
  });

  test("features narrows the panel to the listed preferences, in order", async ({ page }) => {
    await panel(page).evaluate((element) =>
      element.setAttribute("features", "contrast,fontSize,links"),
    );
    await launcher(page).click();

    const ids = await page.evaluate(() =>
      [...document.querySelector("a11y-prefs")!.shadowRoot!.querySelectorAll(".card")].map(
        (card) => (card as HTMLElement).dataset.id,
      ),
    );
    expect(ids).toEqual(["contrast", "fontSize", "links"]);
  });
});

test.describe("translation", () => {
  const titles: Array<[string, string]> = [
    ["en", "Accessibility"],
    ["es", "Accesibilidad"],
    ["it", "Accessibilità"],
  ];

  for (const [locale, title] of titles) {
    test(`${locale} translates the panel`, async ({ page }) => {
      await panel(page).evaluate((element, value) => element.setAttribute("locale", value), locale);
      await expect(page.locator("a11y-prefs .head h2")).toHaveText(title);
    });
  }

  test("an unknown locale falls back rather than showing keys", async ({ page }) => {
    await panel(page).evaluate((element) => element.setAttribute("locale", "fi"));
    await expect(page.locator("a11y-prefs .head h2")).toHaveText("Accessibility");
  });

  test("a custom dictionary can add a language", async ({ page }) => {
    await panel(page).evaluate((element) => {
      element.setAttribute("messages", JSON.stringify({ pt: { "ui.title": "Acessibilidade" } }));
      element.setAttribute("locale", "pt");
    });
    await expect(page.locator("a11y-prefs .head h2")).toHaveText("Acessibilidade");
  });
});
