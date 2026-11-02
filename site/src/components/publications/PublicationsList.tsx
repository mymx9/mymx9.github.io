'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Publication } from '@/types/publication';
import type { PublicationPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { PublicationAuthors, PublicationVenue } from './PublicationMeta';
function Citation({publication, zh}: {publication: Publication; zh: boolean}) {
  const [feedback, setFeedback] = useState('');
  const copy = async () => {
    try { await navigator.clipboard.writeText(publication.bibtex || ''); setFeedback(zh ? '已复制' : 'Copied'); }
    catch { setFeedback(zh ? '请选中下方引文手动复制。' : 'Please select and copy the citation below.'); }
  };
  return <details className="citation" onToggle={() => setFeedback('')}>
    <summary>BibTeX<span className="sr-only"> — {publication.title}</span></summary>
    <div className="citation-panel"><div className="citation-toolbar"><button type="button" onClick={copy}>{zh ? '复制引文' : 'Copy citation'}</button><span role="status">{feedback}</span></div><pre tabIndex={0} aria-label={zh ? 'BibTeX 引文' : 'BibTeX citation'}><code>{publication.bibtex}</code></pre></div>
  </details>;
}
export default function PublicationsList({config, publications}: {config: PublicationPageConfig; publications: Publication[]}) {
  const zh = useLocaleStore(s => s.locale) === 'zh';
  const groups = [
    {id: 'published', title: zh ? '已发表论文' : 'Published articles', statuses: ['published']},
    {id: 'accepted', title: zh ? '已接收论文' : 'Accepted articles', statuses: ['accepted']},
    {id: 'review', title: zh ? '在审稿件' : 'Manuscripts under review', statuses: ['under-review', 'submitted']},
  ];
  return <>
    <header className="page-heading"><h1>{config.title}</h1><p>{config.description}</p></header>
    <p className="author-legend">{zh ? '* 共同第一作者；# 通讯作者。' : '* Joint first author; # Corresponding author.'}</p>
    {groups.map(group => {
      const items = publications.filter(p => group.statuses.includes(p.status));
      return items.length ? <section className="publication-group" key={group.id} aria-labelledby={`group-${group.id}`}>
        <h2 id={`group-${group.id}`}>{group.title}</h2>
        {items.map(pub => <article className="publication-row" id={pub.id} key={pub.id}>
          <h3 lang="en">{pub.doi ? <a href={`https://doi.org/${pub.doi}`}>{pub.title}</a> : pub.title}</h3>
          <p className="publication-authors"><PublicationAuthors publication={pub}/></p>
          <p className="publication-venue">{pub.status === 'published' || pub.status === 'accepted' ? <><PublicationVenue publication={pub}/>{pub.status === 'accepted' && (zh ? ' · 已接收' : ' · Accepted')}</> : <>{pub.status === 'submitted' ? (zh ? '已投稿' : 'Submitted') : (zh ? '审稿中' : 'Under review')}{pub.reviewVenue ? ` · ${pub.reviewVenue}` : ''}</>}</p>
          <div className="publication-actions">{pub.doi && <a href={`https://doi.org/${pub.doi}`}>{zh ? '论文原文' : 'Article'} <span aria-hidden="true">↗</span></a>}{pub.status === 'published' && pub.bibtex && <Citation publication={pub} zh={zh}/>}</div>
        </article>)}
      </section> : null;
    })}
    <p className="page-endnote">{zh ? '在研项目与个人贡献见' : 'For ongoing work and individual contributions, see'} <Link href="/projects/">{zh ? '研究页' : 'Research'}</Link>{zh ? '。' : '.'}</p>
  </>;
}
