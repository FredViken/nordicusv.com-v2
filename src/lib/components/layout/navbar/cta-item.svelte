<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { NavigationItemSlice } from '../../../../prismicio-types';
	import { navbarState } from './state.svelte';
	import { NavigationMenu, Portal } from 'bits-ui';
	import { fade, slide } from 'svelte/transition';
	import { asLink, type LinkField } from '@prismicio/client';
	import { cn } from '$lib/utils';

	let { data, primary }: { data: LinkField; primary?: boolean } = $props();

	let hovered = $state(false);

	const styles = {
		base: 'group rounded-md inline-flex items-center justify-center text-sm active:scale-95 px-3 py-2 duration-300 text-nowrap w-full text-center md:w-auto md:text-left',
		variants: {
			theme: {
				light: {
					primary: 'bg-brand-950 text-base-50 hover:bg-brand-900',
					secondary: 'text-brand-950 hover:bg-brand-950/10 border border-transparent'
				},
				dark: {
					primary: 'bg-base-50 text-brand-950 hover:bg-base-200',
					secondary: 'text-base-50 hover:bg-base-50/10 border border-transparent'
				}
			},
			state: {
				default: '',
				solid: {
					primary:
						'bg-primary border-2 border-brand-800 hover:border-brand-700 hover:bg-primary/75 text-primary-foreground',
					secondary: 'border border-border bg-background/50 text-primary hover:bg-muted/50'
				}
			}
		}
	};

	// Simplified class computation
	let buttonClasses = $derived(
		cn(
			styles.base,
			// Theme styles
			primary
				? styles.variants.theme[navbarState.theme].primary
				: styles.variants.theme[navbarState.theme].secondary,
			// State styles - combined condition
			(navbarState.isScrolled || navbarState.dropdown || navbarState.isMobile) &&
				(primary ? styles.variants.state.solid.primary : styles.variants.state.solid.secondary)
		)
	);
</script>

{#if !navbarState.isMobile}
	<NavigationMenu.Item>
		<NavigationMenu.Link
			class={buttonClasses}
			href={asLink(data)}
			onmouseenter={() => (hovered = true)}
			onmouseleave={() => (hovered = false)}
		>
			{data.text}
			{#if hovered && primary}
				<span
					transition:slide={{ axis: 'x' }}
					class="inline-flex h-full items-center justify-center"
				>
					<i class="far fa-arrow-right pl-2"></i>
				</span>
			{/if}
		</NavigationMenu.Link>
	</NavigationMenu.Item>
{:else}
	<li class="w-full">
		<PrismicLink field={data} class={buttonClasses}>
			{data.text}
		</PrismicLink>
	</li>
{/if}
