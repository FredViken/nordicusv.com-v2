<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type {
		NavigationItemSlice,
		NavigationItemSliceWithDropdownPrimaryItemsItem
	} from '../../../../prismicio-types';
	import { slide } from 'svelte/transition';
	import { navbarState } from './state.svelte';

	let { data }: { data: NavigationItemSlice } = $props();
</script>

{#snippet itemLink(item: NavigationItemSliceWithDropdownPrimaryItemsItem)}
	<li>
		<PrismicLink
			field={item.link}
			class="group flex w-full items-center justify-between rounded-md p-4 duration-200 ease-in-out hover:bg-muted/50"
		>
			<div class="flex gap-4">
				<div
					class="flex items-center justify-between text-muted-foreground group-hover:text-primary"
				>
					{@render icon(item.icon?.toString())}
				</div>
				{item.link.text}
			</div>
			<i
				class="far fa-arrow-right -translate-x-4 opacity-0 duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
			></i>
		</PrismicLink>
	</li>
{/snippet}

{#snippet icon(icon: string | undefined)}
	{#if icon}
		<div class="inline-flex size-8 items-center justify-center rounded-sm border">
			<i class="far fa-{icon} duration-200 ease-in-out group-hover:scale-[1.05]"></i>
		</div>
	{/if}
{/snippet}

{#if data.variation === 'withDropdown' && !navbarState.isMobile}
	<div class="grid h-full grid-cols-3 justify-between gap-6 px-6 py-12 lg:container md:px-12">
		<div class="col-span-1 text-balance rounded-none border-r bg-muted/0 p-4">
			<h2 class="font-heading text-xl font-semibold">{data.primary.link.text}</h2>
			<p class="text-sm text-muted-foreground">{data.primary.description}</p>
		</div>

		<nav class="col-span-2">
			<ul class="grid grid-cols-2 gap-2">
				{#if data.primary.items}
					{#each data.primary.items as item}
						{@render itemLink(item)}
					{/each}
				{/if}
			</ul>
		</nav>
	</div>
{:else if data.variation === 'withDropdown'}
	<nav>
		<ul class="flex flex-col gap-2 border-b py-3">
			{#each data.primary.items as item}
				<li class="contents">
					<PrismicLink
						field={item.link}
						class="group flex w-full items-center gap-2 rounded-md px-3 py-3 text-muted-foreground duration-200 hover:bg-muted/50 hover:text-primary"
					>
						{@render icon(item.icon?.toString())}
						{item.link.text}
					</PrismicLink>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
