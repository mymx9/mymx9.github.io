'use client';
import Link from 'next/link';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { ResearchPageConfig } from '@/types/page';
export default function ResearchPage({config}: {config: ResearchPageConfig}) {
  const zh = useLocaleStore(s => s.locale) === 'zh';
  return <>
    <header className="page-heading"><h1>{config.title}</h1><p>{config.description}</p></header>
    <nav className="research-index" aria-label={zh ? '研究方向' : 'Research directions'}>{config.themes.map((theme, i) => <a key={theme.id} href={`#${theme.id}`}><span aria-hidden="true">0{i+1}</span>{theme.title}</a>)}</nav>
    {config.themes.map((theme, i) => <section className="research-theme" id={theme.id} key={theme.id} aria-labelledby={`${theme.id}-heading`}>
      <div className="theme-heading"><span className="theme-number" aria-hidden="true">0{i+1}</span><h2 id={`${theme.id}-heading`}>{theme.title}</h2></div>
      <p className="research-question">{theme.question}</p><p className="theme-overview">{theme.overview}</p>
      <div className="research-works">{theme.works.map(work => {
        const p = work.publication;
        const title = p?.research_title || work.title;
        const status = p ? (p.status === 'published' ? (zh ? '已发表' : 'Published') : (zh ? '审稿中' : 'Under review')) : work.status;
        return <article className="research-work" key={p?.id || work.id} id={work.id}>
          <p className="work-status">{status}{p?.status === 'published' && ` · ${p.journal}`}</p>
          <h3>{p ? <Link href={`/publications/#${p.id}`}>{title}</Link> : title}</h3>
          <p>{p?.summary || work.summary}</p>
          {(p?.contribution || work.contribution) && <p className="contribution"><strong>{zh ? '个人贡献' : 'My contribution'}</strong>{p?.contribution || work.contribution}</p>}
        </article>;
      })}</div>
    </section>)}
  </>;
}
