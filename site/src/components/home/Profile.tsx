'use client';

import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import type { SiteConfig } from '@/lib/config';
import { useMessages } from '@/lib/i18n/useMessages';
import { useLocaleStore } from '@/lib/stores/localeStore';

interface ProfileProps {
    author: SiteConfig['author'];
    social: SiteConfig['social'];
    features: SiteConfig['features'];
    researchInterests?: string[];
}

export default function Profile({ author, social, researchInterests }: ProfileProps) {
    const messages = useMessages();
    const zh = useLocaleStore(state => state.locale) === 'zh';
    return (
        <header className="border-b border-neutral-200 pb-7">
            <p className="text-sm font-medium text-accent mb-2">{author.institution}</p>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-3">{author.name}</h1>
            <p className="text-lg text-neutral-600 mb-5">{author.title}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                {social.email && <a href={`mailto:${social.email}`} className="inline-flex items-center gap-2 text-accent hover:underline break-all">
                    <EnvelopeIcon className="h-4 w-4 shrink-0" aria-hidden="true" />{social.email}
                </a>}
                <Link href="/cv" className="font-medium text-accent hover:underline">{zh ? '查看简历' : 'View CV'} →</Link>
                {social.google_scholar && <a href={social.google_scholar} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Scholar</a>}
                {social.orcid && <a href={social.orcid} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ORCID</a>}
                {social.github && <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a>}
                {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">LinkedIn</a>}
            </div>
            {researchInterests && researchInterests.length > 0 && <div className="mt-6">
                <h2 className="text-sm font-semibold text-primary mb-2">{messages.profile.researchInterests}</h2>
                <ul className="flex flex-wrap gap-2">
                    {researchInterests.map(interest => <li key={interest} className="text-sm text-neutral-600 bg-neutral-100 rounded-md px-3 py-1.5">{interest}</li>)}
                </ul>
            </div>}
        </header>
    );
}
