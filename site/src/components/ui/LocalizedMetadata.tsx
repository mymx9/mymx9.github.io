'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocaleStore } from '@/lib/stores/localeStore';
export interface PageMetadata {title: string; description: string;}
export default function LocalizedMetadata({pages}: {pages: Record<string, Record<string,PageMetadata>>}) {
  const locale = useLocaleStore(s => s.locale);
  const pathname = usePathname().replace(/\/$/, '') || '/';
  useEffect(() => {
    const page = pages[locale]?.[pathname] || pages.en?.[pathname];
    if (!page) return;
    // Next can restore the static English title after hydration or navigation.
    // Watch head text changes and replacements, and write only when the title differs.
    const syncTitle = () => {
      if (document.title !== page.title) document.title = page.title;
    };
    syncTitle();
    const observer = new MutationObserver(syncTitle);
    observer.observe(document.head, {childList: true, subtree: true, characterData: true});
    const values: Record<string,string> = {
      'meta[name="description"]': page.description,
      'meta[property="og:title"]': page.title,
      'meta[property="og:description"]': page.description,
      'meta[property="og:locale"]': locale === 'zh' ? 'zh_CN' : 'en_US',
    };
    for (const [selector, value] of Object.entries(values)) {
      document.querySelector(selector)?.setAttribute('content', value);
    }
    return () => observer.disconnect();
  }, [locale, pathname, pages]);
  return null;
}
