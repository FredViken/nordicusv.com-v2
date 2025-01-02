<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type {
		NavigationItemSlice,
		NavigationItemSliceWithDropdownPrimaryItemsItem
	} from '../../../../prismicio-types';

	let { data }: { data: NavigationItemSlice } = $props();
</script>

{#snippet itemLink(item: NavigationItemSliceWithDropdownPrimaryItemsItem)}
	<li>
		<PrismicLink
			field={item.link}
			class="group flex w-full items-center justify-between rounded-md p-4 duration-200 ease-in-out hover:bg-muted/50"
		>
			<div class="flex gap-4">
				<div class="flex items-center justify-between text-muted-foreground group-hover:text-primary">
					<i class="far fa-{item.icon}"></i>
				</div>
				{item.link.text}
			</div>
			<i
				class="far fa-arrow-right -translate-x-4 opacity-0 duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
			></i>
		</PrismicLink>
	</li>
{/snippet}

{#if data.variation === 'withDropdown'}
	<div class="grid lg:container px-6 md:px-12 h-full grid-cols-3 justify-between gap-6 py-12">
		<div class="col-span-1 text-balance rounded-none bg-muted/0 p-4 border-r">
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
{/if}
