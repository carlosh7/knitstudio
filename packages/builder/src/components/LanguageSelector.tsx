import { useState } from "react";
import { useI18n, type Locale } from "../i18n";

const locales: Array<{ code: Locale; label: string; flag: string }> = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  const current = locales.find((l) => l.code === locale) || locales[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-1.5 text-xs rounded-md text-knit-text-muted hover:text-knit-text hover:bg-knit-bg-hover transition flex items-center gap-1"
        title="Change language"
      >
        <span>{current.flag}</span>
        <span className="hidden md:inline">{current.code.toUpperCase()}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-knit-bg-alt border border-knit-border rounded-lg shadow-xl py-1 min-w-[180px]">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLocale(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition ${
                  locale === l.code
                    ? "bg-knit-primary/10 text-knit-primary"
                    : "text-knit-text hover:bg-knit-bg-hover"
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
                {locale === l.code && <span className="ml-auto text-xs">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
