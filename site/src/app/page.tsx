import { getConfig } from '@/lib/config';
import { getMarkdownContent, getPageConfig } from '@/lib/content';
import { getPublications } from '@/lib/publications';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import HomePageClient, { type HomePageLocaleData } from '@/components/home/HomePageClient';
export default function Home() {
  const runtime = getRuntimeI18nConfig(getConfig().i18n);
  const dataByLocale: Record<string, HomePageLocaleData> = {};
  for (const locale of runtime.locales) {
    const config = getConfig(locale);
    const about = getPageConfig<{application: string}>('about', locale);
    dataByLocale[locale] = {
      author: config.author, social: config.social,
      bio: getMarkdownContent('bio.md', locale),
      application: about?.application || '',
      publications: getPublications(locale).filter(p => p.selected && p.status === 'published'),
    };
  }
  return <HomePageClient dataByLocale={dataByLocale} defaultLocale={runtime.defaultLocale} />;
}
