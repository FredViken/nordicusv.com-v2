<script lang="ts">
	import { page } from '$app/state';
	import { NavigationMenu } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import HamburgerIcon from './hamburger-icon.svelte';
	import type { SettingsDocument, SettingsDocumentData } from '../../../../prismicio-types';
	import { asLink } from '@prismicio/client';

	let { children, data }: { children: Snippet; data: SettingsDocumentData } = $props();

	let theme: 'light' | 'dark' = $derived(page.data.page.data.navbar_theme);

	let scrollY = $state(0);
	let navbarHeight = $state(0);

	let mobileExpanded = $state(false);

	const themes = {
		light: 'text-brand-950',
		dark: 'text-base-50',
		scrolled: 'bg-base-50/50 backdrop-blur-sm'
	};
</script>

<svelte:window bind:scrollY />

<NavigationMenu.Root
	class="fixed left-0 right-0 top-0 z-50 w-full duration-300  {scrollY > navbarHeight * 2
		? themes['scrolled']
		: themes[theme]}"
>
	<div
		class="container relative mx-auto flex items-center justify-between px-6 py-4 md:px-12"
		bind:clientHeight={navbarHeight}
	>
		<div class="flex items-center justify-between">
			<a href="/" class="flex items-center gap-2">
				<img src="/logo.svg" alt="Logo" class="h-8" />
				<span class="font-squada text-2xl uppercase">Nordic USV</span>
			</a>
		</div>

		<!-- Nav items (desktop) -->
		<div class="relative">
			<NavigationMenu.List
				class="group hidden flex-1 list-none items-center justify-center space-x-4 md:flex"
			>
				{@render children?.()}
				<NavigationMenu.Indicator
					class="top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in"
				>
					<div
						class="relative top-[70%] size-2 rotate-45 rounded-tl-[2px] bg-border shadow-md"
					></div>
				</NavigationMenu.Indicator>
			</NavigationMenu.List>
			<div class="absolute left-0 top-full flex justify-center">
				<NavigationMenu.Viewport
					class="origin-top-center relative mt-1.5 h-[var(--bits-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-background text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--bits-navigation-menu-viewport-width)]"
				/>
			</div>
		</div>

		<div class="flex items-center gap-4">
			{#if data.cta_secondary_link}
				{@render cta(asLink(data.cta_secondary_link), data.cta_secondary_link.text ?? null, false)}
			{/if}
			{#if data.cta_link}
				{@render cta(asLink(data.cta_link), data.cta_link.text ?? null, true)}
			{/if}
		</div>

		<!-- Nav items (mobile) -->

		<button class="md:hidden" onclick={() => (mobileExpanded = !mobileExpanded)}>
			<HamburgerIcon open={mobileExpanded} />
		</button>
		<!-- <div class="flex md:hidden">
			{@render children?.()}
		</div> -->
	</div>
</NavigationMenu.Root>

{#snippet cta(url: string | null, text: string | null, primary: boolean = false)}
	{#if url}
		<a href={url} class="btn btn-primary">
			{text}
		</a>
	{/if}
{/snippet}
