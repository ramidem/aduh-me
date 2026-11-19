import { initList } from './list';
import { bindMediaGlobals, initMedia } from './media';
import { bindSearchGlobals, initSearch } from './search';
import { initShare } from './share';
import { bindSidebarGlobals, initSidebar } from './sidebar';

let destination = new URL(location.href);
let listScroll = 0;

function initPage() {
	initList();
	initSidebar();
	initSearch(destination);
	initShare();
	initMedia();
}

document.addEventListener('astro:before-preparation', (event) => {
	destination = (event as Event & { to: URL }).to;
});

document.addEventListener('astro:before-swap', () => {
	listScroll = document.querySelector('.notes-scroll')?.scrollTop ?? 0;
});

document.addEventListener('astro:after-swap', () => {
	initPage();
	const scroll = document.querySelector('.notes-scroll');
	if (scroll) scroll.scrollTop = listScroll;
});

document.addEventListener('astro:page-load', () => {
	destination = new URL(location.href);
});

bindSidebarGlobals();
bindSearchGlobals();
bindMediaGlobals();
initPage();
