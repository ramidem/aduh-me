function isMac() {
	return /Mac|iPhone|iPad/.test(navigator.platform);
}

function isTyping(target: EventTarget | null) {
	const element = target as HTMLElement | null;
	return !!element && (element.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName));
}

export function bindSearchGlobals() {
	document.addEventListener('keydown', (event) => {
		const input = document.querySelector<HTMLInputElement>('.notes-search input');
		if (!input) return;
		const modifierK = event.key.toLowerCase() === 'k' && (isMac() ? event.metaKey : event.ctrlKey);
		const slash = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !isTyping(event.target);
		if (!modifierK && !slash) return;
		event.preventDefault();
		input.focus();
		input.select();
	});
}

export function initSearch(destination: URL) {
	const app = document.querySelector<HTMLElement>('.notes-app');
	const input = document.querySelector<HTMLInputElement>('.notes-search input');
	const scroll = document.querySelector<HTMLElement>('.notes-scroll');
	if (!app || !input || !scroll) return;

	const results = document.createElement('ul');
	results.className = 'notes-results';
	const none = document.createElement('p');
	none.className = 'notes-empty notes-no-results';
	none.textContent = 'No results.';
	none.hidden = true;
	scroll.append(results, none);

	const onNotePage = !!document.querySelector('.notes-app--note');
	const currentLink = onNotePage
		? document.querySelector('.notes-scroll .note-row[aria-current="true"]')
		: null;
	const currentPath = currentLink?.getAttribute('href') ?? null;

	const withQuery = (path: string) => {
		const query = input.value.trim();
		return query ? `${path}?${new URLSearchParams({ q: query })}` : path;
	};

	const marked = (text: string, query: string) => {
		const fragment = document.createDocumentFragment();
		const lower = text.toLowerCase();
		const needle = query.toLowerCase();
		let from = 0;
		let at = lower.indexOf(needle);
		while (at !== -1) {
			fragment.append(text.slice(from, at));
			const mark = document.createElement('mark');
			mark.textContent = text.slice(at, at + needle.length);
			fragment.append(mark);
			from = at + needle.length;
			at = lower.indexOf(needle, from);
		}
		fragment.append(text.slice(from));
		return fragment;
	};

	const row = (url: string, title: DocumentFragment, excerpt: DocumentFragment) => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.className = 'note-row';
		a.href = withQuery(url);
		if (url === currentPath) a.setAttribute('aria-current', 'true');
		const strong = document.createElement('strong');
		strong.append(title);
		const preview = document.createElement('span');
		preview.className = 'note-row-excerpt';
		preview.append(excerpt);
		a.append(strong, preview);
		li.append(a);
		return li;
	};

	const filterList = (query: string) => {
		const needle = query.toLowerCase();
		const rows: HTMLElement[] = [];
		scroll.querySelectorAll<HTMLAnchorElement>('ul:not(.notes-results) .note-row').forEach((link) => {
			const meta = link.querySelector('.note-row-meta');
			const preview = meta ? (meta.cloneNode(true) as HTMLElement) : document.createElement('span');
			preview.querySelectorAll('time').forEach((time) => time.remove());
			const title = link.querySelector('strong')?.textContent ?? '';
			const text = preview.textContent ?? '';
			if (!`${title}\n${text}`.toLowerCase().includes(needle)) return;
			rows.push(row(link.getAttribute('href') ?? '', marked(title, query), marked(text, query)));
		});
		results.replaceChildren(...rows);
		none.hidden = rows.length > 0;
	};

	const remember = (query: string, updateAddress: boolean) => {
		if (updateAddress) {
			const url = new URL(location.href);
			if (query) url.searchParams.set('q', query);
			else url.searchParams.delete('q');
			if (url.href !== location.href) history.replaceState(history.state, '', url);
		}
	};

	let restoring = false;

	input.addEventListener('input', () => {
		const query = input.value.trim();
		app.classList.toggle('notes-app--searching', query !== '');
		remember(query, !restoring);
		if (!query) {
			none.hidden = true;
			return;
		}
		filterList(query);
	});

	const hint = document.querySelector('.notes-search-hint');
	if (hint) hint.textContent = isMac() ? '⌘K' : 'Ctrl K';

	input.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape') return;
		event.stopPropagation();
		if (input.value) {
			input.value = '';
			input.dispatchEvent(new Event('input'));
		} else {
			input.blur();
		}
	});

	const saved = destination.searchParams.get('q');
	if (saved) {
		input.value = saved;
		restoring = true;
		input.dispatchEvent(new Event('input'));
		restoring = false;
	}
}
