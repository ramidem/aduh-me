const storageKey = 'notes-sidebar-hidden';
const wide = window.matchMedia('(min-width: 1000px)');

const getApp = () => document.querySelector<HTMLElement>('.notes-app');
const getToggle = () => document.querySelector<HTMLButtonElement>('.notes-sidebar-toggle');
const getSidebar = () => document.getElementById('notes-sidebar');

function isOpen(app: HTMLElement) {
	return wide.matches
		? !app.classList.contains('notes-app--sidebar-closed')
		: app.classList.contains('notes-app--sidebar-open');
}

function setOpen(app: HTMLElement, toggle: HTMLElement, open: boolean) {
	if (wide.matches) {
		app.classList.toggle('notes-app--sidebar-closed', !open);
		try {
			sessionStorage.setItem(storageKey, open ? '' : '1');
		} catch {}
	} else {
		app.classList.toggle('notes-app--sidebar-open', open);
	}
	toggle.setAttribute('aria-expanded', String(open));
}

function reset() {
	const app = getApp();
	const toggle = getToggle();
	if (!app || !toggle) return;
	app.classList.remove('notes-app--sidebar-open', 'notes-app--sidebar-closed');
	let hidden = false;
	try {
		hidden = sessionStorage.getItem(storageKey) === '1';
	} catch {}
	if (wide.matches && hidden) app.classList.add('notes-app--sidebar-closed');
	toggle.setAttribute('aria-expanded', String(isOpen(app)));
}

export function initSidebar() {
	reset();
	const app = getApp();
	const toggle = getToggle();
	if (!app || !toggle) return;
	toggle.addEventListener('click', () => setOpen(app, toggle, !isOpen(app)));
}

export function bindSidebarGlobals() {
	document.addEventListener('click', (event) => {
		const app = getApp();
		const toggle = getToggle();
		const sidebar = getSidebar();
		if (!app || !toggle || !sidebar || wide.matches || !isOpen(app)) return;
		const target = event.target as Node;
		if (sidebar.contains(target) || toggle.contains(target)) return;
		setOpen(app, toggle, false);
	});

	document.addEventListener('keydown', (event) => {
		const app = getApp();
		const toggle = getToggle();
		if (!app || !toggle || event.key !== 'Escape' || wide.matches || !isOpen(app)) return;
		setOpen(app, toggle, false);
		toggle.focus();
	});

	wide.addEventListener('change', reset);
}
