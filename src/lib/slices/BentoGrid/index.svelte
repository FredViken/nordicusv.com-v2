<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.BentoGridSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	style="--grid-columns: {slice.primary.columns}; --grid-rows: {slice.primary.rows};"
>
	<div class="grid grid-cols-[1fr_auto_1fr] w-full">
		<div class="bg-red-500"></div>
		<!-- Margin grid lines-->

		<div class="max-w-xl min-w-full w-full">
			{@render marginGrid('x')}
			<div
				class="col-span grid w-full border-b border-r size-full"
				style="grid-template-columns: var(--grid-columns); grid-template-rows: var(--grid-rows);"
			>
				{#each slice.primary.items as item}
					{@render gridItem(item)}
				{/each}
			</div>
			{@render marginGrid('x')}
		</div>

		<div class="bg-red-500"></div>
	</div>
</section>

{#snippet gridItem(item: Content.BentoGridSliceDefaultPrimaryItemsItem)}
	<div
		class="w-full border-l border-t p-12"
		style="grid-column: span {item.column_span}; grid-row: span {item.row_span};"
	>
		<PrismicRichText field={item.heading} />
	</div>
{/snippet}

{#snippet marginGrid(axis: 'x' | 'y')}
	{#if axis === 'x'}
		<div class="grid h-32 border-r" style="grid-template-columns: var(--grid-columns);">
			{#each Array(10)}
				<div class="h-full border-l"></div>
			{/each}
		</div>
	{/if}
{/snippet}
