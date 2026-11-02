import type { Publication } from '@/types/publication';
export function PublicationAuthors({ publication }: { publication: Publication }) {
  return <>{publication.authors.map((author, index) => <span key={`${author.name}-${index}`}>
    <span className={author.isHighlighted ? 'self-author' : undefined}>{author.name}</span>
    {author.isCoAuthor && <sup>*</sup>}{author.isCorresponding && <sup>#</sup>}
    {index < publication.authors.length - 1 && ', '}
  </span>)}</>;
}
export function PublicationVenue({ publication: p }: { publication: Publication }) {
  return <><i>{p.journal || p.conference}</i>{p.volume ? ` ${p.volume}` : ''}{p.pages ? `, ${p.pages}` : ''}{` (${p.year})`}</>;
}
