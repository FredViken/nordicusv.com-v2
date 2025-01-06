<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { NavigationItemSlice } from '../../../../prismicio-types';
	import { navbarState } from './state.svelte';
	import { NavigationMenu, Portal } from 'bits-ui';
	import { fade, slide } from 'svelte/transition';
	import { asLink } from '@prismicio/client';
	import * as Collapsible from '$ui/collapsible';
	import DropdownContent from './dropdown-content.svelte';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import { cn } from '$utils';

	let { data }: { data: NavigationItemSlice } = $props();
	let value = $state(data.primary.link.text);

	const classList =
		'px-3 h-16 flex items-center flex text-nowrap group justify-center focus-visible:outline-none focus-visible:ring-2 ring-ring';

	const mobileClassList =
		'px-3 w-full h-16 flex text-nowrap group items-center border-b hover:bg-accent/50 duration-100';
</script>

{#if !navbarState.isMobile}
	<NavigationMenu.Item>
		{#if data.variation === 'default'}
			<NavigationMenu.Link class={classList} href={asLink(data.primary.link)}>
				{data.primary.link.text}
			</NavigationMenu.Link>
		{:else}
			<NavigationMenu.Trigger class={classList}>
				{data.primary.link.text}
				<i class="far fa-chevron-down ml-1 text-xs duration-100 group-data-[state=open]:rotate-180"
				></i>
			</NavigationMenu.Trigger>
			<NavigationMenu.Content
				class="navigation-menu-content absolute left-0 top-0 w-screen data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52"
			>
				<div class="w-screen">
					<DropdownContent {data} />
				</div>
			</NavigationMenu.Content>
		{/if}
	</NavigationMenu.Item>
{:else if data.variation === 'default'}
	<li class="stagger-item">
		<a href={asLink(data.primary.link)} class={mobileClassList}>
			{data.primary.link.text}
		</a>
	</li>
{:else}
	<li class="stagger-item">
		<Collapsible.Root>
			<Collapsible.Trigger class={cn(mobileClassList, 'fl')}>
				{data.primary.link.text}
				<i
					class="far fa-chevron-down ml-auto text-xs duration-100 group-data-[state=open]:rotate-180"
				></i>
			</Collapsible.Trigger>
			<Collapsible.Content forceMount>
				{#snippet child({ open })}
					{#if open}
						<div transition:slide>
							<DropdownContent {data} />
						</div>
					{/if}
				{/snippet}
			</Collapsible.Content>
		</Collapsible.Root>
	</li>
{/if}
