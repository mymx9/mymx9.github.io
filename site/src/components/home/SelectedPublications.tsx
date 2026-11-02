'use client';
import Link from 'next/link';
import type { Publication } from '@/types/publication';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { PublicationAuthors, PublicationVenue } from '@/components/publications/PublicationMeta';
export default function SelectedPublications({publications}: {publications: Publication[]}) {
  const zh = useLocaleStore(s => s.locale) === 'zh';
  return <section className="selected-publications" aria-labelledby="selected-heading">
    <div className="section-heading"><h2 id="selected-heading">{zh ? '代表论文' : 'Selected publications'}</h2><Link href="/publications/">{zh ? '全部论文' : 'All publications'} <span aria-hidden="true">→</span></Link></div>
    <p className="author-legend">{zh ? '* 共同第一作者；# 通讯作者。' : '* Joint first author; # Corresponding author.'}</p>
    <div className="publication-list">{publications.map(pub => <article key={pub.id} className="publication-row">
      <p className="publication-kicker">{zh ? '已发表' : 'Published'} · <PublicationVenue publication={pub} /></p>
      <h3><a href={`https://doi.org/${pub.doi}`} lang="en">{pub.title}</a></h3>
      <p className="publication-authors"><PublicationAuthors publication={pub}/></p>
      <p className="publication-summary">{pub.summary}</p>
    </article>)}</div>
  </section>;
}
