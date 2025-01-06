<script lang="ts">
	import { navbarState } from './state.svelte';
	import HamburgerIcon from './hamburger-icon.svelte';
	import type { Snippet } from 'svelte';
	import { NavigationMenu } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import { animate, stagger } from 'motion';
	import { fade } from 'svelte/transition';

	let { children, cta }: { children: Snippet; cta: Snippet } = $props();

	// Base styles that are always applied
	const baseStyles = {
		nav: 'fixed left-0 right-0 top-0 z-50 h-16 w-full duration-300',
		container:
			'container relative z-50 mx-auto flex h-full items-center justify-between px-6 md:px-12',
		viewport:
			'origin-top-center relative h-[var(--bits-navigation-menu-viewport-height)] w-full overflow-hidden bg-background text-popover-foreground shadow-lg md:w-[var(--bits-navigation-menu-viewport-width)]'
	};

	// State-based style variants
	const variants = {
		theme: {
			light: 'text-base-950',
			dark: 'text-base-50'
		},
		visibility: {
			visible: 'translate-y-0',
			hidden: '-translate-y-full'
		},
		background: {
			transparent: 'bg-transparent',
			solid: 'bg-base-50/75 text-base-950 backdrop-blur-md shadow-sm'
		}
	};

	// Compute navbar state classes
	let navClasses = $derived(
		cn(
			baseStyles.nav,
			variants.theme[navbarState.theme],
			navbarState.isVisible ? variants.visibility.visible : variants.visibility.hidden,
			navbarState.isScrolled || navbarState.mobileExpanded || navbarState.dropdown
				? variants.background.solid
				: variants.background.transparent
		)
	);

	function animateMobileMenu(element: HTMLElement) {
		console.log(element.querySelectorAll('.stagger-item'));
		animate(
			element.querySelectorAll('.stagger-item'), // Target all list items
			{
				y: [30, 0],
				opacity: [0, 1]
			},
			{
				delay: stagger(0.075) // 100ms delay between each item
			}
		);
	}
</script>

<NavigationMenu.Root
	data-state={navbarState.dropdown ? 'open' : 'closed'}
	onValueChange={(value) => {
		navbarState.dropdown = value;
	}}
	class={navClasses}
>
	<div>
		<div
			class="relative z-50 mx-auto flex h-full items-center justify-between px-6 text-sm lg:container md:grid md:grid-cols-[1fr,auto,1fr] md:px-12"
		>
			<!-- Logo -->
			<div class="flex items-center justify-between py-4">
				<a href="/" class="flex items-center gap-2 truncate">
					<img src="/logo.svg" alt="Logo" class="h-8" />
					<span class="truncate font-squada text-2xl uppercase">Nordic USV</span>
				</a>
			</div>

			<!-- Nav items (desktop) -->

			<NavigationMenu.List class="mx-auto hidden h-16 items-center justify-center gap-2 md:flex">
				{@render children()}
			</NavigationMenu.List>

			<NavigationMenu.List class="mx-auto hidden h-full items-center justify-end gap-2 md:flex">
				{@render cta()}
			</NavigationMenu.List>

			<!-- Nav items (mobile) -->
			<div class="md:hidden">
				<!-- Hamburger icon -->
				<button
					class="flex size-8 items-center justify-center rounded-sm delay-0"
					onclick={() => navbarState.toggleMobileDropdown()}
				>
					<HamburgerIcon open={navbarState.mobileExpanded} />
				</button>

				<!-- Nav content -->
				{#if navbarState.mobileExpanded && navbarState.isMobile}
					<div
						transition:fade={{ duration: 100 }}
						use:animateMobileMenu
						class="mobile-nav fixed left-0 top-16 flex h-[calc(100vh-4rem)] w-full flex-col gap-4 overflow-y-auto overscroll-contain border-t bg-background text-base-950 md:hidden"
					>
						<ul class="flex flex-col p-6">
							{@render children()}
						</ul>
						<ul
							class="sticky bottom-0 left-0 mt-auto grid w-full grid-cols-2 gap-4 border-t bg-background/50 p-6 backdrop-blur-md"
						>
							{@render cta()}
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class=" left-0 top-[calc(4rem-4px)] z-50 flex w-full justify-center overflow-hidden">
		<NavigationMenu.Viewport
			class="relative h-[var(--bits-navigation-menu-viewport-height)] w-full overflow-hidden border-y bg-background text-popover-foreground shadow-lg data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in md:w-[var(--bits-navigation-menu-viewport-width)]"
		/>
	</div>
</NavigationMenu.Root>
