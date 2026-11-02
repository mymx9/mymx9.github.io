'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { SiteConfig } from '@/lib/config';
import type { I18nRuntimeConfig } from '@/types/i18n';
export default function Navigation({items, siteTitle, i18n, itemsByLocale, siteTitleByLocale}: {items: SiteConfig['navigation']; siteTitle: string; enableOnePageMode?: boolean; i18n: I18nRuntimeConfig; itemsByLocale?: Record<string, SiteConfig['navigation']>; siteTitleByLocale?: Record<string, string>}) {
  const locale = useLocaleStore(s => s.locale);
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const links = itemsByLocale?.[locale] || items;
  return <header className="site-header"><div className="nav-shell">
    <Link href="/" className="site-name">{siteTitleByLocale?.[locale] || siteTitle}</Link>
    <nav className="main-nav" aria-label={locale === 'zh' ? '主导航' : 'Main navigation'}>{links.map(item => <Link key={item.target} href={item.href} aria-current={pathname === (item.href.replace(/\/$/, '') || '/') ? 'page' : undefined}>{item.title}</Link>)}</nav>
    <div className="display-controls"><LanguageToggle i18n={i18n}/><ThemeToggle/></div>
  </div></header>;
}
