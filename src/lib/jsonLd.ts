import { SITE_AUTHOR, SITE_ROLE, SITE_TAGLINE } from '../consts';
import { noteUrl, type Note } from './notes';

type Person = {
	'@context': 'https://schema.org';
	'@type': 'Person';
	name: string;
	url: string;
	jobTitle: string;
	description: string;
	sameAs: string[];
};

type BlogPosting = {
	'@context': 'https://schema.org';
	'@type': 'BlogPosting';
	headline: string;
	description: string;
	datePublished: string;
	dateModified: string;
	author: { '@type': 'Person'; name: string };
	mainEntityOfPage: string;
};

export function jsonLd(site: URL, note?: Note): Person | BlogPosting {
	if (!note) {
		return {
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: SITE_AUTHOR,
			url: site.href,
			jobTitle: SITE_ROLE,
			description: SITE_TAGLINE,
			sameAs: ['https://github.com/ramidem'],
		};
	}
	const published = note.data.date.toISOString();
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: note.data.title,
		description: note.data.description,
		datePublished: published,
		dateModified: published,
		author: { '@type': 'Person', name: SITE_AUTHOR },
		mainEntityOfPage: new URL(noteUrl(note), site).href,
	};
}
