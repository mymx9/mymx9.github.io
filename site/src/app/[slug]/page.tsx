import { notFound } from 'next/navigation';
import { getPageConfig, getMarkdownContent } from '@/lib/content';
import { getPublications, getResearch } from '@/lib/publications';
import { getConfig } from '@/lib/config';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import DynamicPageClient, {type DynamicPageLocaleData} from '@/components/pages/DynamicPageClient';
import type {PublicationPageConfig, TextPageConfig, CardPageConfig, ResearchPageConfig, BasePageConfig} from '@/types/page';
import type {Metadata} from 'next';
const slugs = ['publications', 'projects', 'cv', 'awards'];
export function generateStaticParams() { return slugs.map(slug => ({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  if (!slugs.includes(slug)) return {};
  const page = getPageConfig<BasePageConfig>(slug);
  const site = getConfig().site;
  return {title: page?.title, description: page?.description, openGraph: {title: `${page?.title} | ${site.title}`, description: page?.description || site.description}};
}
export default async function DynamicPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  if (!slugs.includes(slug)) notFound();
  const runtime = getRuntimeI18nConfig(getConfig().i18n);
  const dataByLocale: Record<string, DynamicPageLocaleData> = {};
  for (const locale of runtime.locales) {
    const config = getPageConfig<PublicationPageConfig | TextPageConfig | CardPageConfig | ResearchPageConfig>(slug, locale);
    if (!config) throw new Error(`Missing page: ${slug}/${locale}`);
    if (config.type === 'publication') dataByLocale[locale] = {type: 'publication', config, publications: getPublications(locale)};
    else if (config.type === 'research') dataByLocale[locale] = {type: 'research', config: getResearch(locale)};
    else if (config.type === 'text') { const site = getConfig(locale); dataByLocale[locale] = {type: 'text', config, content: getMarkdownContent(config.source, locale), author: site.author, email: site.social.email}; }
    else dataByLocale[locale] = {type: 'card', config};
  }
  return <DynamicPageClient dataByLocale={dataByLocale} defaultLocale={runtime.defaultLocale}/>;
}
