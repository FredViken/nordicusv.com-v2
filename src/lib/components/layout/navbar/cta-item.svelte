<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { NavigationItemSlice } from '../../../../prismicio-types';
	import { navbarState } from './state.svelte';
	import { NavigationMenu, Portal } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { asLink, type LinkField } from '@prismicio/client';
	import { cn } from '$lib/utils';

	let { data, primary }: { data: LinkField; primary?: boolean } = $props();

	const styles = {
		base: "rounded-md px-4 py-2 duration-300 text-nowrap",
		variants: {
			theme: {
				light: {
					primary: "bg-brand-950 text-base-50 hover:bg-brand-900",
					secondary: "border border-brand-950 text-brand-950 hover:bg-brand-950/10"
				},
				dark: {
					primary: "bg-base-50 text-brand-950 hover:bg-base-200",
					secondary: "border border-base-50 text-base-50 hover:bg-base-50/10"
				}
			},
			state: {
				default: "",
				solid: {
					primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
					secondary: "border-primary text-primary hover:bg-primary/10"
				}
			}
		}
	};

	// Simplified class computation
	let buttonClasses = $derived(cn(
		styles.base,
		// Theme styles
		primary 
			? styles.variants.theme[navbarState.theme].primary
			: styles.variants.theme[navbarState.theme].secondary,
		// State styles - combined condition
		(navbarState.isScrolled || navbarState.dropdown) && (
			primary 
				? styles.variants.state.solid.primary
				: styles.variants.state.solid.secondary
		)
	));
</script>

<NavigationMenu.Item>
	<NavigationMenu.Link 
		class={buttonClasses} 
		href={asLink(data)}
	>
		{data.text}
	</NavigationMenu.Link>
</NavigationMenu.Item>
