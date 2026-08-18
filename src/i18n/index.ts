import type { Messages } from "../types";
import { en } from "./en";
import { es } from "./es";
import { it } from "./it";

/** English is the base: every other dictionary is allowed to be incomplete. */
export const BUNDLED_LOCALES: Record<string, Messages> = { en, es, it };

export const DEFAULT_LOCALE = "en";

/** Resolves "es-MX" to "es". Returns null when nothing matches. */
function resolve(tag: string, dictionaries: Record<string, Messages>): string | null {
  const lower = tag.toLowerCase();
  if (dictionaries[lower]) return lower;
  const base = lower.split("-")[0];
  return base && dictionaries[base] ? base : null;
}

export interface Translator {
  locale: string;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

/**
 * `locale` is either a language tag ("it", "pt-BR") or "auto" to read it from
 * `<html lang>`. `extra` is merged on top of the bundled dictionaries, so it
 * works both for fixing one string and for adding a whole new language.
 */
export function createTranslator(
  locale: string | undefined,
  fallback: string,
  extra?: Record<string, Messages>,
): Translator {
  const dictionaries: Record<string, Messages> = { ...BUNDLED_LOCALES };
  for (const [tag, messages] of Object.entries(extra ?? {})) {
    const key = tag.toLowerCase();
    dictionaries[key] = { ...(dictionaries[key] ?? {}), ...messages };
  }

  const wanted =
    !locale || locale === "auto"
      ? document.documentElement.getAttribute("lang") || fallback
      : locale;

  const chosen =
    resolve(wanted, dictionaries) ?? resolve(fallback, dictionaries) ?? DEFAULT_LOCALE;
  const primary = dictionaries[chosen] ?? {};
  const secondary = dictionaries[resolve(fallback, dictionaries) ?? DEFAULT_LOCALE] ?? en;

  return {
    locale: chosen,
    t(key, vars) {
      const template = primary[key] ?? secondary[key] ?? en[key] ?? key;
      return vars
        ? template.replace(/\{(\w+)\}/g, (match, name: string) => String(vars[name] ?? match))
        : template;
    },
  };
}
