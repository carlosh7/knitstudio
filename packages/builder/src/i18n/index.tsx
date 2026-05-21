import { createContext, useContext, type ReactNode } from "react";
import enMessages from "./en";
import esMessages from "./es";
import type { MessageKey } from "./en";

type Locale = "en" | "es";

const messages: Record<Locale, Record<MessageKey, string>> = {
  en: enMessages,
  es: esMessages,
};

interface I18nContextType {
  locale: Locale;
  t: (key: MessageKey) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  t: (key) => enMessages[key] || key,
  setLocale: () => {},
});

export function I18nProvider({ locale = "en", children }: { locale?: Locale; children: ReactNode }) {
  const t = (key: MessageKey) => messages[locale]?.[key] || enMessages[key] || key;

  return (
    <I18nContext.Provider value={{ locale, t, setLocale: () => {} }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
