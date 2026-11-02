'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import { PublicationAuthors, PublicationVenue } from '@/components/publications/PublicationMeta';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="shrink-0 whitespace-nowrap ml-4 text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    {messages.home.viewAll} →
                </Link>
            </div>
            <p className="text-xs text-neutral-500 mb-3">{messages.publications.authorLegend}</p>
            <div className="space-y-4">
                {publications.filter(pub => pub.status === 'published').map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-md transition-shadow duration-200"
                    >
                        <h3 className="font-semibold text-primary mb-2 leading-tight">
                            {pub.doi ? <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline"><FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} /></a> : <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-1">
                            <PublicationAuthors publication={pub} />                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-2">
                            <PublicationVenue publication={pub} />
                        </p>
                        {(pub.summary || pub.description) && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
                                {pub.summary || pub.description}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
