<script lang="ts">
	import type { NavigationItemSlice, SettingsDocumentData } from '../../../../prismicio-types';
	import { navbarState } from './state.svelte';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import HamburgerIcon from './hamburger-icon.svelte';
	import Item from './item.svelte';
	import { PrismicLink } from '@prismicio/svelte';
	import type { Snippet } from 'svelte';
	import { NavigationMenu } from 'bits-ui';
	import { slide } from 'svelte/transition';

	let { children, cta }: { children: Snippet; cta: Snippet } = $props();
	const themes = {
		light: 'text-base-950',
		dark: 'text-base-50'
	};
</script>

<NavigationMenu.Root
	data-state={navbarState.dropdown ? 'open' : 'closed'}
	onValueChange={(value) => {
		navbarState.dropdown = value;
		console.log(navbarState.dropdown);
	}}
	class="fixed left-0 right-0 top-0 z-50 h-16 w-full duration-300 {themes[
		navbarState.theme
	]} {!navbarState.isVisible ? '-translate-y-full' : 'translate-y-0'} {navbarState.isScrolled ||
	navbarState.mobileExpanded
		? 'bg-base-50/75 text-base-950 backdrop-blur-md'
		: 'bg-transparent'} data-[state=open]:bg-base-50/75 data-[state=open]:text-base-950 data-[state=open]:backdrop-blur-md"
>
	<div>
		<div
			class="container relative z-50 mx-auto flex h-full items-center justify-between px-6 md:px-12"
		>
			<!-- Logo -->
			<div class="flex items-center justify-between py-4">
				<a href="/" class="flex items-center gap-2">
					<img src="/logo.svg" alt="Logo" class="h-8" />
					<span class="font-squada text-2xl uppercase">Nordic USV</span>
				</a>
			</div>

			<!-- Nav items (desktop) -->

			<NavigationMenu.List class="hidden h-16 items-center justify-center gap-2 md:flex">
				{@render children()}
			</NavigationMenu.List>

			<NavigationMenu.List  class="hidden h-full items-center justify-center gap-2 md:flex">
				{@render cta()}
			</NavigationMenu.List >

			<!-- Nav items (mobile) -->
			<div class="md:hidden">
				<!-- Hamburger icon -->
				<button
					class="flex size-8 items-center justify-center rounded-sm delay-0"
					onclick={() => (navbarState.mobileExpanded = !navbarState.mobileExpanded)}
				>
					<HamburgerIcon open={navbarState.mobileExpanded} />
				</button>

				<!-- Nav content -->
				{#if navbarState.mobileExpanded}
					<div
						class="fixed left-0 top-16 flex h-[calc(100vh-4rem)] w-full flex-col gap-4 overscroll-contain border-t bg-background px-6 text-base-950 md:hidden"
					>
						{@render children()}
						{@render cta()}
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class=" left-0 top-[calc(4rem-4px)] z-50 flex w-full justify-center overflow-hidden">
		<NavigationMenu.Viewport
			class="origin-top-center data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in relative h-[var(--bits-navigation-menu-viewport-height)] w-full overflow-hidden bg-background text-popover-foreground shadow-lg md:w-[var(--bits-navigation-menu-viewport-width)]"
		/>
	</div>
</NavigationMenu.Root>
