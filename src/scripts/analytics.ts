import { SITE_GOATCOUNTER } from '../consts';

type GoatCounter = {
	endpoint?: string;
	path?: () => string;
	count?: (vars: { path: string }) => void;
	bind_events?: () => void;
};

declare global {
	interface Window {
		goatcounter?: GoatCounter;
	}
}

function trackPage() {
	if (!import.meta.env.PROD) return;

	window.goatcounter = {
		endpoint: `https://${SITE_GOATCOUNTER}.goatcounter.com/count`,
		path: () => location.pathname,
	};

	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://gc.zgo.at/count.js';
	document.head.append(script);

	let counted = location.pathname;
	document.addEventListener('astro:page-load', () => {
		window.goatcounter?.bind_events?.();
		if (location.pathname === counted) return;
		counted = location.pathname;
		window.goatcounter?.count?.({ path: counted });
	});
}

trackPage();
