import { FEATURE_IDS, attributeFor, getFeature } from "./features";
import { DEFAULT_LOCALE, createTranslator, type Translator } from "./i18n";
import { pageStyles, panelStyles } from "./styles";
import type { A11yPrefsConfig, A11yPrefsState, FeatureId, IconName } from "./types";

export const TAG_NAME = "a11y-prefs";

const ICONS: Record<IconName, string> = {
  universal:
    '<circle cx="12" cy="12" r="9.2"/><circle cx="12" cy="7.1" r="1.35"/>' +
    '<path d="M6.9 10.1 12 11.1l5.1-1M12 11.1v3.2M12 14.3 9.7 19.6M12 14.3l2.3 5.3"/>',
  person:
    '<circle cx="12" cy="5" r="2.2"/><path d="M5 10.5 12 12l7-1.5M12 12v4M12 16l-3 6M12 16l3 6"/>',
  eye: '<path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  wheelchair:
    '<circle cx="13" cy="4" r="2"/><path d="M11 8v5h5l3 7M8.5 11a6 6 0 1 0 7.6 8.4"/>',
};

const CLOSE_ICON = '<path d="M6 6l12 12M18 6 6 18"/>';
const RESET_ICON = '<path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"/>';

const DEFAULTS = {
  locale: "auto",
  fallbackLocale: DEFAULT_LOCALE,
  position: "bottom-right",
  offset: "20px",
  shape: "circle",
  size: "md",
  accent: "#0b57d0",
  storageKey: "a11y-prefs",
} as const;

let sharedConfig: A11yPrefsConfig = {};

/** Configuration shared by every instance on the page. */
export function configure(config: A11yPrefsConfig): void {
  sharedConfig = { ...sharedConfig, ...config };
}

let stylesInjected = false;

function injectPageStyles(): void {
  if (stylesInjected || document.getElementById("a11y-prefs-styles")) return;
  const style = document.createElement("style");
  style.id = "a11y-prefs-styles";
  style.textContent = pageStyles;
  document.head.append(style);
  stylesInjected = true;
}

/**
 * Black or white on top of the accent, whichever survives. Somebody will set a
 * brand yellow eventually and white-on-yellow fails contrast badly.
 */
function readableOn(color: string): string {
  const hex = color.trim().replace("#", "");
  const full = hex.length === 3 ? hex.replace(/./g, (c) => c + c) : hex;
  if (!/^[0-9a-f]{6}$/i.test(full)) return "#fff";
  const channel = (offset: number) => {
    const value = parseInt(full.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  };
  const luminance = 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
  return luminance > 0.42 ? "#111827" : "#fff";
}

const icon = (body: string) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;

export class A11yPrefsElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [
      "locale",
      "fallback-locale",
      "messages",
      "position",
      "offset",
      "shape",
      "size",
      "accent",
      "accent-contrast",
      "icon",
      "label",
      "features",
      "statement-url",
      "storage-key",
      "z-index",
    ];
  }

  #shadow: ShadowRoot;
  #root!: HTMLElement;
  #launcher!: HTMLButtonElement;
  #panel!: HTMLElement;
  #backdrop!: HTMLElement;
  #liveRegion!: HTMLElement;
  #readingLayer: HTMLElement | null = null;
  #state: A11yPrefsState = {};
  #translator!: Translator;
  #isOpen = false;
  #hasRendered = false;
  #previousFocus: Element | null = null;
  #onPointerMove = (event: PointerEvent) => this.#moveReadingLayer(event.clientY);

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  /* ------------------------------------------------------------- config -- */

  get #config(): A11yPrefsConfig {
    const read = (name: string) => this.getAttribute(name) ?? undefined;
    const features = read("features");
    const messages = read("messages");

    let parsedMessages: A11yPrefsConfig["messages"];
    if (messages) {
      try {
        parsedMessages = {
          ...sharedConfig.messages,
          ...(JSON.parse(messages) as NonNullable<A11yPrefsConfig["messages"]>),
        };
      } catch {
        // Malformed JSON in an attribute should not take the panel down with it.
      }
    }

    return {
      ...DEFAULTS,
      ...sharedConfig,
      ...(parsedMessages && { messages: parsedMessages }),
      ...(read("locale") && { locale: read("locale") }),
      ...(read("fallback-locale") && { fallbackLocale: read("fallback-locale") }),
      ...(read("position") && { position: read("position") as A11yPrefsConfig["position"] }),
      ...(read("offset") && { offset: read("offset") }),
      ...(read("shape") && { shape: read("shape") as A11yPrefsConfig["shape"] }),
      ...(read("size") && { size: read("size") as A11yPrefsConfig["size"] }),
      ...(read("accent") && { accent: read("accent") }),
      ...(read("accent-contrast") && { accentContrast: read("accent-contrast") }),
      ...(read("icon") && { icon: read("icon") }),
      ...(read("label") && { label: read("label") }),
      ...(read("statement-url") && { statementUrl: read("statement-url") }),
      ...(read("storage-key") && { storageKey: read("storage-key") }),
      ...(read("z-index") && { zIndex: Number(read("z-index")) }),
      ...(features && {
        features: features
          .split(",")
          .map((entry) => entry.trim())
          .filter((entry): entry is FeatureId => (FEATURE_IDS as string[]).includes(entry)),
      }),
    };
  }

  get #visibleFeatures(): FeatureId[] {
    const chosen = this.#config.features;
    return chosen?.length ? chosen : [...FEATURE_IDS];
  }

  /* ---------------------------------------------------------- lifecycle -- */

  connectedCallback(): void {
    injectPageStyles();
    this.setAttribute("data-a11y-root", "");
    this.#restore();
    this.#render();
    for (const id of FEATURE_IDS) this.#apply(id);
  }

  disconnectedCallback(): void {
    document.removeEventListener("pointermove", this.#onPointerMove);
  }

  attributeChangedCallback(): void {
    if (this.#hasRendered) this.#render();
  }

  /* ------------------------------------------------------- public API --- */

  open(): void {
    if (this.#isOpen) return;
    this.#isOpen = true;
    // shadow.activeElement first: document.activeElement only ever reports the
    // host, which is not focusable, so focus would have nowhere to return to.
    this.#previousFocus = this.#shadow.activeElement ?? document.activeElement;
    this.#panel.hidden = false;
    this.#backdrop.hidden = false;
    this.#launcher.setAttribute("aria-expanded", "true");
    this.#panel.querySelector<HTMLElement>(".icon-button")?.focus();
  }

  close(): void {
    if (!this.#isOpen) return;
    this.#isOpen = false;
    this.#panel.hidden = true;
    this.#backdrop.hidden = true;
    this.#launcher.setAttribute("aria-expanded", "false");
    const previous = this.#previousFocus;
    const target =
      previous instanceof HTMLElement && previous !== this && previous.isConnected
        ? previous
        : this.#launcher;
    target.focus();
  }

  toggle(): void {
    if (this.#isOpen) this.close();
    else this.open();
  }

  getState(): A11yPrefsState {
    return { ...this.#state };
  }

  set(id: FeatureId, value: string | null): void {
    if (value === null) delete this.#state[id];
    else this.#state[id] = value;
    this.#apply(id);
    this.#persist();
    this.#refresh();
    this.dispatchEvent(
      new CustomEvent("a11y-prefs-change", {
        detail: { id, value, state: this.getState() },
        bubbles: true,
        composed: true,
      }),
    );
  }

  reset(): void {
    for (const id of FEATURE_IDS) {
      delete this.#state[id];
      document.documentElement.removeAttribute(attributeFor(id));
    }
    this.#teardownReadingLayer();
    this.#persist();
    this.#refresh();
    this.#announce(this.#translator.t("ui.didReset"));
    this.dispatchEvent(
      new CustomEvent("a11y-prefs-change", {
        detail: { state: {} },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ------------------------------------------------------- persistence -- */

  #restore(): void {
    try {
      const raw = localStorage.getItem(this.#config.storageKey ?? DEFAULTS.storageKey);
      if (raw) this.#state = JSON.parse(raw) as A11yPrefsState;
    } catch {
      // Private browsing, blocked cookies: run without persistence.
    }
  }

  #persist(): void {
    try {
      localStorage.setItem(
        this.#config.storageKey ?? DEFAULTS.storageKey,
        JSON.stringify(this.#state),
      );
    } catch {
      // Same as above.
    }
  }

  /* ------------------------------------------------------------ applying */

  #apply(id: FeatureId): void {
    const value = this.#state[id];
    const html = document.documentElement;
    if (value === undefined) html.removeAttribute(attributeFor(id));
    else html.setAttribute(attributeFor(id), value);
    if (id === "readingHelp") this.#syncReadingLayer();
  }

  #syncReadingLayer(): void {
    const mode = this.#state.readingHelp;
    this.#teardownReadingLayer();
    if (!mode) return;

    const layer = document.createElement("div");
    layer.className = mode === "mask" ? "mask" : "guide";
    layer.style.setProperty("--top", "45vh");
    layer.style.setProperty("--bottom", "55vh");
    if (mode === "guide") layer.style.top = "50vh";
    this.#root.append(layer);
    this.#readingLayer = layer;
    document.addEventListener("pointermove", this.#onPointerMove, { passive: true });
  }

  #teardownReadingLayer(): void {
    document.removeEventListener("pointermove", this.#onPointerMove);
    this.#readingLayer?.remove();
    this.#readingLayer = null;
  }

  #moveReadingLayer(y: number): void {
    const layer = this.#readingLayer;
    if (!layer) return;
    if (this.#state.readingHelp === "mask") {
      layer.style.setProperty("--top", `${Math.max(0, y - 60)}px`);
      layer.style.setProperty("--bottom", `${y + 60}px`);
    } else {
      layer.style.top = `${y}px`;
    }
  }

  /* ----------------------------------------------------------------- UI - */

  #render(): void {
    const config = this.#config;
    this.#translator = createTranslator(
      config.locale,
      config.fallbackLocale ?? DEFAULT_LOCALE,
      config.messages,
    );
    const t = this.#translator.t;

    const chosenIcon = config.icon ?? "universal";
    const launcherIcon = chosenIcon in ICONS ? ICONS[chosenIcon as IconName] : String(chosenIcon);
    const label = config.label ?? t("ui.open");
    const accent = config.accent ?? DEFAULTS.accent;
    const onAccent = config.accentContrast ?? readableOn(accent);

    this.#shadow.innerHTML = `
      <style>${panelStyles}</style>
      <div class="root"
           data-pos="${config.position}"
           data-shape="${config.shape}"
           data-size="${config.size}"
           style="--a11y-accent:${accent};--a11y-on-accent:${onAccent};--a11y-offset:${config.offset}${
             config.zIndex ? `;--a11y-z:${config.zIndex}` : ""
           }">
        <button class="launcher" type="button" aria-haspopup="dialog" aria-expanded="false"
                aria-label="${t("ui.open")}">
          ${icon(launcherIcon)}<span class="label">${label}</span>
        </button>

        <div class="backdrop" hidden></div>

        <div class="panel" role="dialog" aria-modal="true" aria-label="${t("ui.title")}" hidden>
          <div class="head">
            <h2>${t("ui.title")}</h2>
            <button class="icon-button reset" type="button"
                    title="${t("ui.reset")}" aria-label="${t("ui.reset")}">${icon(RESET_ICON)}</button>
            <button class="icon-button dismiss" type="button"
                    title="${t("ui.close")}" aria-label="${t("ui.close")}">${icon(CLOSE_ICON)}</button>
          </div>
          <div class="grid"></div>
          <div class="foot">
            <span>${t("ui.hint")}</span>
            ${config.statementUrl ? `<a href="${config.statementUrl}">${t("ui.statement")}</a>` : ""}
          </div>
        </div>

        <div class="sr-only" role="status" aria-live="polite"></div>
      </div>`;

    this.#root = this.#shadow.querySelector(".root")!;
    this.#launcher = this.#shadow.querySelector(".launcher")!;
    this.#panel = this.#shadow.querySelector(".panel")!;
    this.#backdrop = this.#shadow.querySelector(".backdrop")!;
    this.#liveRegion = this.#shadow.querySelector(".sr-only")!;

    this.#launcher.addEventListener("click", () => this.toggle());
    this.#backdrop.addEventListener("click", () => this.close());
    this.#shadow.querySelector(".dismiss")!.addEventListener("click", () => this.close());
    this.#shadow.querySelector(".reset")!.addEventListener("click", () => this.reset());
    this.#panel.addEventListener("keydown", (event) => this.#onKeydown(event as KeyboardEvent));

    this.#renderCards();
    this.#hasRendered = true;
    this.#refresh();
    this.#syncReadingLayer();
  }

  #renderCards(): void {
    const grid = this.#shadow.querySelector(".grid")!;
    grid.replaceChildren();

    for (const id of this.#visibleFeatures) {
      const feature = getFeature(id);
      if (!feature) continue;

      const card = document.createElement("button");
      card.type = "button";
      card.className = "card";
      card.dataset.id = id;
      card.innerHTML =
        icon(feature.icon) +
        `<span class="name">${this.#translator.t(`feature.${id}`)}</span>` +
        (feature.kind === "step"
          ? `<span class="pips">${feature.options.map(() => "<i></i>").join("")}</span>`
          : "") +
        `<span class="value"></span>`;
      if (feature.kind === "toggle") card.setAttribute("aria-pressed", "false");
      card.addEventListener("click", () => this.#advance(id));
      grid.append(card);
    }
  }

  /** One click moves to the next value and wraps around to off at the end. */
  #advance(id: FeatureId): void {
    const feature = getFeature(id);
    if (!feature) return;
    const current = this.#state[id];
    const index = current ? feature.options.indexOf(current) : -1;
    this.set(id, feature.options[index + 1] ?? null);
    const value = this.#valueLabel(id) || this.#translator.t("ui.off");
    this.#announce(`${this.#translator.t(`feature.${id}`)}: ${value}`);
  }

  #valueLabel(id: FeatureId): string {
    const feature = getFeature(id);
    const value = this.#state[id];
    if (!feature || !value) return "";
    if (feature.kind === "toggle") return this.#translator.t("ui.on");
    if (feature.kind === "step") {
      return this.#translator.t("ui.level", {
        n: feature.options.indexOf(value) + 1,
        max: feature.options.length,
      });
    }
    return this.#translator.t(`option.${id}.${value}`);
  }

  #refresh(): void {
    for (const card of this.#shadow.querySelectorAll<HTMLButtonElement>(".card")) {
      const id = card.dataset.id as FeatureId;
      const feature = getFeature(id);
      if (!feature) continue;

      const value = this.#state[id];
      const active = value !== undefined;
      if (feature.kind === "toggle") card.setAttribute("aria-pressed", String(active));
      else card.dataset.active = String(active);

      card.querySelector(".value")!.textContent = this.#valueLabel(id);

      const level = active ? feature.options.indexOf(value) + 1 : 0;
      card
        .querySelectorAll(".pips i")
        .forEach((pip, index) => pip.classList.toggle("on", index < level));
    }
  }

  #announce(message: string): void {
    // Clearing first: screen readers stay quiet when the text does not change,
    // and switching a level back and forth produces the same string twice.
    this.#liveRegion.textContent = "";
    setTimeout(() => (this.#liveRegion.textContent = message), 60);
  }

  #onKeydown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.close();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = [...this.#panel.querySelectorAll<HTMLElement>("button, a[href]")].filter(
      (element) => !element.hasAttribute("disabled"),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    const active = this.#shadow.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
