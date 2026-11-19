export function bindMediaGlobals() {
	document.addEventListener('click', (event) => {
		const target = event.target as Element | null;
		const link = target?.closest<HTMLAnchorElement>('[data-youtube-id]');
		if (!link) return;
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();

		const iframe = document.createElement('iframe');
		iframe.src = `https://www.youtube-nocookie.com/embed/${link.dataset.youtubeId}?autoplay=1`;
		iframe.title = link.dataset.title ?? '';
		iframe.allow =
			'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
		iframe.allowFullscreen = true;
		iframe.referrerPolicy = 'strict-origin-when-cross-origin';
		link.replaceWith(iframe);
		iframe.focus();
	});
}

export function initMedia() {
	if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	document.querySelectorAll<HTMLVideoElement>('video[data-loop]').forEach((video) => {
		video.removeAttribute('autoplay');
		video.pause();
		video.controls = true;
	});
}
