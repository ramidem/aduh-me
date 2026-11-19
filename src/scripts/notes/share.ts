export function initShare() {
	const share = document.querySelector<HTMLButtonElement>('.notes-share');
	if (!share) return;

	share.addEventListener('click', () => {
		const url = location.origin + share.dataset.path;

		if (navigator.share) {
			navigator
				.share({ title: share.dataset.title, url })
				.catch(() => {})
				.then(() => share.blur());
		} else if (navigator.clipboard) {
			navigator.clipboard
				.writeText(url)
				.then(() => {
					share.dataset.copied = '';
					setTimeout(() => {
						delete share.dataset.copied;
					}, 1500);
				})
				.catch(() => {});
		}
	});
}
