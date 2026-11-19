const storageKey = 'notes-list';

function remember(folder: string) {
	try {
		sessionStorage.setItem(storageKey, folder);
	} catch {}
}

function recall(): string | null {
	try {
		return sessionStorage.getItem(storageKey);
	} catch {
		return null;
	}
}

function restoreFolder(app: HTMLElement) {
	if (!app.classList.contains('notes-app--note')) {
		remember(app.dataset.listFolder ?? '');
		return;
	}

	const folder = recall();
	if (!folder || folder !== app.dataset.noteFolder) return;

	const link = app.querySelector<HTMLAnchorElement>(`.folder-list a[data-folder="${CSS.escape(folder)}"]`);
	if (!link) return;

	app.querySelectorAll<HTMLElement>('.notes-scroll li[data-folder]').forEach((row) => {
		row.hidden = row.dataset.folder !== folder;
	});
	app.querySelectorAll<HTMLElement>('.notes-scroll ul').forEach((group) => {
		const empty = !group.querySelector('li:not([hidden])');
		group.hidden = empty;
		const heading = group.previousElementSibling as HTMLElement | null;
		if (heading?.classList.contains('list-group')) heading.hidden = empty;
	});

	app.querySelector('[data-all-notes]')?.removeAttribute('aria-current');
	link.setAttribute('aria-current', 'true');

	const back = app.querySelector<HTMLAnchorElement>('.notes-back');
	const backLabel = back?.querySelector('span');
	if (back && backLabel) {
		back.href = link.getAttribute('href') ?? back.href;
		backLabel.textContent = folder;
	}
}

export function initList() {
	const app = document.querySelector<HTMLElement>('.notes-app');
	if (app) restoreFolder(app);
}
