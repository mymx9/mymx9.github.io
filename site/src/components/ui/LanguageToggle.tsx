'use client';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { I18nRuntimeConfig } from '@/types/i18n';
export default function LanguageToggle({i18n}: {i18n: I18nRuntimeConfig}) {
  const locale = useLocaleStore(s => s.locale);
  const setLocale = useLocaleStore(s => s.setLocale);
  if (!i18n.enabled || !i18n.switcher || i18n.locales.length < 2) return null;
  const next = i18n.locales[(i18n.locales.indexOf(locale) + 1) % i18n.locales.length];
  return <button className="display-button language-button" type="button" lang={next} onClick={() => setLocale(next)} aria-label={next === 'zh' ? '切换为中文' : 'Switch to English'}>{i18n.labels[next]}</button>;
}
