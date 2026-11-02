'use client';
import { useLocaleStore } from '@/lib/stores/localeStore';
export default function Footer({lastUpdated, lastUpdatedByLocale, defaultLocale='en'}: {lastUpdated?: string; lastUpdatedByLocale?: Record<string,string|undefined>; defaultLocale?: string}) {
  const locale = useLocaleStore(s => s.locale);
  const date = lastUpdatedByLocale?.[locale] || lastUpdatedByLocale?.[defaultLocale] || lastUpdated;
  return <footer className="site-footer"><div><span>{locale === 'zh' ? '蔡鹏的学术主页' : 'Peng Cai’s Academic Homepage'}</span>{date && <span>{locale === 'zh' ? '更新于' : 'Updated'} {date}</span>}</div></footer>;
}
