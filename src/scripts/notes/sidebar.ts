const storageKey = 'notes-sidebar-hidden';
const wide = window.matchMedia('(min-width: 1000px)');
const phone = window.matchMedia('(max-width: 699px)');

const getApp = () => document.querySelector<HTMLElement>('.notes-app');
const getToggles = () => document.querySelectorAll<HTMLButtonElement>('.notes-sidebar-toggle');

function isOpen(app: HTMLElement) {
	return wide.matches
		? !app.classList.contains('notes-app--sidebar-closed')
		: app.classList.contains('notes-app--sidebar-open');
}

function isListOpen(app: HTMLElement) {
	return app.classList.contains('notes-app--list-open');
}

function syncToggles(app: HTMLElement) {
	getToggles().forEach((toggle) => {
		const open = toggle.dataset.target === 'list' ? isListOpen(app) : isOpen(app);
		toggle.setAttribute('aria-expanded', String(open));
	});
}

function setOpen(app: HTMLElement, open: boolean) {
	app.classList.add('notes-app--animate');
	if (wide.matches) {
		app.classList.toggle('notes-app--sidebar-closed', !open);
		try {
			sessionStorage.setItem(storageKey, open ? '' : '1');
		} catch {}
	} else {
		app.classList.toggle('notes-app--sidebar-open', open);
	}
	syncToggles(app);
}

function setListOpen(app: HTMLElement, open: boolean) {
	app.classList.add('notes-app--animate');
	app.classList.toggle('notes-app--list-open', open);
	syncToggles(app);
}

function reset() {
	const app = getApp();
	if (!app) return;
	app.classList.remove(
		'notes-app--animate',
		'notes-app--sidebar-open',
		'notes-app--sidebar-closed',
		'notes-app--list-open',
	);
	let hidden = false;
	try {
		hidden = sessionStorage.getItem(storageKey) === '1';
	} catch {}
	if (wide.matches && hidden) app.classList.add('notes-app--sidebar-closed');
	syncToggles(app);
}

export function initSidebar() {
	reset();
	const app = getApp();
	if (!app) return;
	getToggles().forEach((toggle) => {
		toggle.addEventListener('click', () => {
			if (toggle.dataset.target === 'list') setListOpen(app, !isListOpen(app));
			else setOpen(app, !isOpen(app));
		});
	});
}

export function bindSidebarGlobals() {
	wide.addEventListener('change', reset);
	phone.addEventListener('change', reset);
}
