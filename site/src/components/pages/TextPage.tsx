'use client';
import ReactMarkdown from 'react-markdown';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { TextPageConfig } from '@/types/page';
import type { SiteConfig } from '@/lib/config';
export default function TextPage({config, content, author, email}: {config: TextPageConfig; content: string; author?: SiteConfig['author']; email?: string}) {
  const zh = useLocaleStore(s => s.locale) === 'zh';
  return <div className="cv-page">
    <header className="page-heading"><h1>{config.title}</h1><p>{config.description}</p></header>
    {author && <div className="cv-identity"><h2>{author.name}</h2><p>{author.institution}</p>{email && <a href={`mailto:${email}`}>{email}</a>}</div>}
    {config.pdf_url && <p className="pdf-download"><a href={config.pdf_url} download={config.pdf_url.startsWith('/') ? true : undefined}>{zh ? '下载简历（PDF）' : 'Download CV (PDF)'}</a></p>}
    <div className="prose"><ReactMarkdown>{content}</ReactMarkdown></div>
  </div>;
}
