'use client';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Profile from './Profile';
import SelectedPublications from './SelectedPublications';
import type { SiteConfig } from '@/lib/config';
import type { Publication } from '@/types/publication';
import { useLocaleStore } from '@/lib/stores/localeStore';
export interface HomePageLocaleData {
  author: SiteConfig['author']; social: SiteConfig['social'];
  bio: string; application: string; publications: Publication[];
}
export default function HomePageClient({ dataByLocale, defaultLocale }: {dataByLocale: Record<string, HomePageLocaleData>; defaultLocale: string}) {
  const locale = useLocaleStore(s => s.locale);
  const data = dataByLocale[locale] || dataByLocale[defaultLocale];
  const zh = locale === 'zh';
  return <div className="page-shell home-page">
    <Profile author={data.author} social={data.social} />
    <div className="bio-copy"><ReactMarkdown>{data.bio}</ReactMarkdown></div>
    <p className="application-note">{data.application}</p>
    <div className="home-research-link"><Link href="/projects/">{zh ? '研究方向与个人贡献' : 'Research directions and contributions'} <span aria-hidden="true">→</span></Link></div>
    <SelectedPublications publications={data.publications} />
  </div>;
}
