import { getBibtexContent, getPageConfig } from './content';
import { parseBibTeX } from './bibtexParser';
import type { PublicationPageConfig, ResearchPageConfig } from '@/types/page';
export function getPublications(locale?: string) {
  const config = getPageConfig<PublicationPageConfig>('publications', locale);
  if (!config) throw new Error('Missing publication configuration');
  // Bibliographic facts are shared; prose is independently edited in each locale.
  return parseBibTeX(getBibtexContent('publications.bib'), locale).map(publication => {
    const prose = config.entries?.[publication.id];
    if (!prose) throw new Error(`Missing publication text: ${locale}/${publication.id}`);
    return { ...publication, ...prose };
  });
}
export function getResearch(locale?: string): ResearchPageConfig {
  const config = getPageConfig<ResearchPageConfig>('projects', locale);
  if (!config) throw new Error('Missing research configuration');
  const publications = getPublications(locale);
  return { ...config, themes: config.themes.map(theme => ({ ...theme, works: theme.works.map(work => {
    if (!work.publication_id) return work;
    const publication = publications.find(p => p.id === work.publication_id);
    if (!publication) throw new Error(`Unknown research publication: ${work.publication_id}`);
    return { ...work, publication };
  }) })) };
}
