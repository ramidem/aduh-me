import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { SITE_TIMEZONE } from '../consts';

export type Note = CollectionEntry<'notes'>;

export type MonthGroup = { name: string; notes: Note[] };

const NOT_FOUND_ID = 'not-found';

const RESERVED_SLUGS = ['folders', 'tags'];

export async function getNotes(): Promise<Note[]> {
	const now = Date.now();
	const notes = await getCollection(
		'notes',
		({ id, data }) => id !== NOT_FOUND_ID && data.date.valueOf() <= now && !(import.meta.env.PROD && data.draft),
	);
	const reserved = notes.find((note) => RESERVED_SLUGS.includes(note.id));
	if (reserved) throw new Error(`"${reserved.id}" is a reserved URL segment and cannot be a note slug`);
	return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getNotFoundNote(): Promise<Note> {
	const note = await getEntry('notes', NOT_FOUND_ID);
	if (!note) throw new Error(`Missing note "${NOT_FOUND_ID}" in src/content/notes`);
	return note;
}

export function noteUrl(note: Note, folder?: string): string {
	return folder ? `/folders/${folder}/${note.id}/` : `/${note.id}/`;
}

export function folderUrl(folder: string): string {
	return `/folders/${folder}/`;
}

export function folderNames(notes: Note[]): string[] {
	const names = notes.flatMap((note) => (note.data.category ? [note.data.category] : []));
	return [...new Set(names)].sort();
}

export function notesInFolder(notes: Note[], folder: string): Note[] {
	return notes.filter((note) => note.data.category === folder);
}

export function openingNote(notes: Note[]): Note | undefined {
	return notes.find((note) => note.data.pinned) ?? notes[0];
}

function format(date: Date, options: Intl.DateTimeFormatOptions): string {
	return new Intl.DateTimeFormat('en-US', { timeZone: SITE_TIMEZONE, ...options }).format(date);
}

export function formatFullDate(date: Date): string {
	const day = format(date, { month: 'long', day: 'numeric', year: 'numeric' });
	const time = format(date, { hour: 'numeric', minute: '2-digit' });
	return `${day} at ${time}`;
}

export function formatShortDate(date: Date): string {
	return format(date, { month: 'numeric', day: 'numeric', year: '2-digit' });
}

export function formatMonth(date: Date): string {
	return format(date, { month: 'long', year: 'numeric' });
}

export function groupByMonth(notes: Note[]): MonthGroup[] {
	const groups: MonthGroup[] = [];
	for (const note of notes) {
		const name = formatMonth(note.data.date);
		const last = groups.at(-1);
		if (last && last.name === name) last.notes.push(note);
		else groups.push({ name, notes: [note] });
	}
	return groups;
}
