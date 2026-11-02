'use client';
import ReactMarkdown from 'react-markdown';
import type {CardPageConfig} from '@/types/page';
export default function CardPage({config}: {config: CardPageConfig}) {
  return <><header className="page-heading"><h1>{config.title}</h1>{config.description && <ReactMarkdown>{config.description}</ReactMarkdown>}</header>{config.items.map(item => <section className="research-theme" key={item.title}><h2>{item.title}</h2>{item.content && <ReactMarkdown>{item.content}</ReactMarkdown>}</section>)}</>;
}
