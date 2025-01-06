import { page } from '$app/state';
import { IsMobile } from '$lib/hooks/is-mobile.svelte';
import { scrollY } from 'svelte/reactivity/window';

class NavbarState {
	isVisible: boolean = $state(true);
	#isMobile: IsMobile = $state(new IsMobile());
	theme: 'light' | 'dark' = $derived(page.data.page.data.navbar_theme || 'light');
	mobileExpanded: boolean = $state(false);
	dropdown: string | null = $state(null);
	clientHeight: number = $state(64);
	isScrolled: boolean = $derived(scrollY.current ? scrollY.current > this.clientHeight * 2 : false);
	#previousScrollY: number = $state(0);

	constructor() {
		$effect.root(() => {
			$effect(() => {
				// if mobile expanded, alwaysshow navbar
				if (this.mobileExpanded) {
					this.isVisible = true;
				} else if (
					// if scrolled down and scrollY is greater than previous scrollY and scrollY is greater than half of clientHeight, hide navbar
					scrollY.current &&
					scrollY.current > this.#previousScrollY &&
					scrollY.current > this.clientHeight / 2
				) {
					this.isVisible = false;
				} else {
					// if scrolled up and scrollY is less than previous scrollY, show navbar
					this.isVisible = true;
				}

				if (!this.isMobile) {
					this.mobileExpanded = false;
				}

				this.#previousScrollY = scrollY.current || 0;
			});
		});
	}
	toggleMobileDropdown() {
		this.mobileExpanded = !this.mobileExpanded;
	}
	get isMobile() {
		return this.#isMobile.current;
	}
}

export const navbarState = new NavbarState();
