import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import enMessages from "./en";
import esMessages from "./es";
import frMessages from "./fr";
import deMessages from "./de";
import itMessages from "./it";
import ptMessages from "./pt";
import zhMessages from "./zh";
import jaMessages from "./ja";
import koMessages from "./ko";
import type { MessageKey } from "./en";

export type Locale = "en" | "es" | "fr" | "de" | "it" | "pt" | "zh" | "ja" | "ko";

interface I18nContextType {
  locale: Locale;
  t: (key: MessageKey) => string;
  setLocale: (locale: Locale) => void;
}

const allMessages: Record<Locale, Record<string, string>> = {
  en: enMessages,
  es: esMessages as unknown as Record<string, string>,
  fr: frMessages as unknown as Record<string, string>,
  de: deMessages as unknown as Record<string, string>,
  it: itMessages as unknown as Record<string, string>,
  pt: ptMessages as unknown as Record<string, string>,
  zh: zhMessages as unknown as Record<string, string>,
  ja: jaMessages as unknown as Record<string, string>,
  ko: koMessages as unknown as Record<string, string>,
};

const STORAGE_KEY = "knitstudio-locale";

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && allMessages[stored]) return stored;
  const nav = navigator.language?.slice(0, 2) as Locale;
  if (allMessages[nav]) return nav;
  return "en";
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  t: (key) => enMessages[key] || key,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem(STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: MessageKey): string => {
      return allMessages[locale]?.[key] || enMessages[key] || key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
