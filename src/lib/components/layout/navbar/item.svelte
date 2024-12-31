<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { NavigationItemSlice } from '../../../../prismicio-types';
	import { navbarState } from './state.svelte';
	import { NavigationMenu, Portal } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { asLink } from '@prismicio/client';

	let { data }: { data: NavigationItemSlice } = $props();


	const classList =
		'px-3 h-16 flex items-center justify-center focus-visible:outline-none focus-visible:underline';
</script>

<NavigationMenu.Item>
	{#if data.variation === 'default'}
		<NavigationMenu.Link class={classList} href={asLink(data.primary.link)}>
			{data.primary.link.text}
		</NavigationMenu.Link>
	{:else}
		<NavigationMenu.Trigger class={classList}>
			{data.primary.link.text}
		</NavigationMenu.Trigger>
		<NavigationMenu.Content
			class="navigation-menu-content left-0 top-0 w-[100vw] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 absolute"
		>
			<div class="p-8">{data.primary.description}</div>
		</NavigationMenu.Content>
	{/if}
</NavigationMenu.Item>
