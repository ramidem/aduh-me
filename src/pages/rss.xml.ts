import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE_AUTHOR, SITE_TAGLINE } from '../consts';
import { getNotes, noteUrl } from '../lib/notes';

export const GET: APIRoute = async ({ site }) =>
	rss({
		title: SITE_AUTHOR,
		description: SITE_TAGLINE,
		site: site!,
		items: (await getNotes()).map((note) => ({
			title: note.data.title,
			description: note.data.description,
			pubDate: note.data.date,
			link: noteUrl(note),
		})),
	});
