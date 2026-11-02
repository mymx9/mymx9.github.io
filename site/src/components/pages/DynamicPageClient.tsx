'use client';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from './TextPage';
import CardPage from './CardPage';
import ResearchPage from './ResearchPage';
import type { Publication } from '@/types/publication';
import type { SiteConfig } from '@/lib/config';
import type { PublicationPageConfig, TextPageConfig, CardPageConfig, ResearchPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';
export type DynamicPageLocaleData =
 | {type: 'publication'; config: PublicationPageConfig; publications: Publication[]}
 | {type: 'research'; config: ResearchPageConfig}
 | {type: 'text'; config: TextPageConfig; content: string; author: SiteConfig['author']; email?: string}
 | {type: 'card'; config: CardPageConfig};
export default function DynamicPageClient({dataByLocale, defaultLocale}: {dataByLocale: Record<string, DynamicPageLocaleData>; defaultLocale: string}) {
  const locale = useLocaleStore(s => s.locale);
  const page = dataByLocale[locale] || dataByLocale[defaultLocale];
  return <div className="page-shell">
    {page.type === 'publication' && <PublicationsList config={page.config} publications={page.publications}/>}
    {page.type === 'research' && <ResearchPage config={page.config}/>}
    {page.type === 'text' && <TextPage {...page}/>}
    {page.type === 'card' && <CardPage config={page.config}/>}
  </div>;
}
