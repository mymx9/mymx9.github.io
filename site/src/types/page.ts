import type { Publication } from './publication';
export interface BasePageConfig {
  type: 'about' | 'publication' | 'card' | 'text' | 'research';
  title: string;
  description?: string;
}
export interface PublicationPageConfig extends BasePageConfig {
  type: 'publication';
  source: string;
  entries?: Record<string, { summary: string; contribution: string; research_title: string }>;
}
export interface TextPageConfig extends BasePageConfig {
  type: 'text';
  source: string;
  pdf_url?: string;
}
export interface CardItem { title: string; subtitle?: string; date?: string; content?: string; tags?: string[]; }
export interface CardPageConfig extends BasePageConfig { type: 'card'; items: CardItem[]; }
export interface ResearchWork {
  id?: string;
  title?: string;
  status?: string;
  summary?: string;
  contribution?: string;
  publication_id?: string;
  publication?: Publication;
}
export interface ResearchPageConfig extends BasePageConfig {
  type: 'research';
  themes: { id: string; title: string; question: string; overview: string; works: ResearchWork[] }[];
}
