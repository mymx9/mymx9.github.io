'use client';
import type { SiteConfig } from '@/lib/config';
import { useLocaleStore } from '@/lib/stores/localeStore';
export default function Profile({author, social}: {author: SiteConfig['author']; social: SiteConfig['social']}) {
  const zh = useLocaleStore(s => s.locale) === 'zh';
  return <header className="profile-header">
    <p className="eyebrow">{zh ? '应用统计 · 健康数据研究' : 'Applied statistics · Health data research'}</p>
    <h1>{author.name}<span className="alternate-name" lang={zh ? 'en' : 'zh'}>{zh ? 'Peng Cai' : '蔡鹏'}</span></h1>
    <p className="profile-affiliation">{author.title}<span aria-hidden="true"> · </span>{author.institution}</p>
    <div className="profile-links">
      {social.email && <a href={`mailto:${social.email}`}>{social.email}</a>}
      {social.google_scholar && <a href={social.google_scholar}>Google Scholar</a>}
      {social.orcid && <a href={social.orcid}>ORCID</a>}
    </div>
  </header>;
}
