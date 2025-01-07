<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import IntersectionIcon from './intersection-icon.svelte';
	export let slice: Content.BentoGridSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	style="--grid-columns: {slice.primary.columns}; --grid-rows: {slice.primary.rows};"
>
	<!-- <div class="grid grid-cols-[1fr_auto_1fr] w-full">
		<div class="bg-red-500"></div>


		<div class="w-full relative min-w-16 container px-0">
			{@render marginGrid('x')}
			<div
				class="col-span grid w-full border-b border-r"
				style="grid-template-columns: var(--grid-columns); grid-template-rows: var(--grid-rows);"
			>
				{#each slice.primary.items as item}
					{@render gridItem(item)}
				{/each}
			</div>
			{@render marginGrid('x')}
		</div>

		<div class="bg-red-500"></div>
	</div> -->
	<!-- Outer grid -->

	<div
		class="grid-rows-auto grid min-h-64 grid-cols-[1fr_auto_1fr]"
		style="grid-template-rows: var(--grid-rows);"
	>
		{@render marginGrid('y')}

		<div
			class="row-span-full grid w-full max-w-screen-lg grid-rows-subgrid border-r border-b border-dashed"
			style="grid-template-columns: var(--grid-columns);"
		>
			{#each slice.primary.items as item}
				{@render gridItem(item)}
			{/each}
		</div>

		{@render marginGrid('y')}
	</div>
</section>

{#snippet gridItem(item: Content.BentoGridSliceDefaultPrimaryItemsItem)}
	<div
		class="w-full relative border-l border-t p-4  border-dashed"
		style="grid-column: span {item.column_span}; grid-row: span {item.row_span};"
	>
	<IntersectionIcon class="-left-3 -top-3 scale-110 text-primary/50" />
		<IntersectionIcon class="-right-3 -top-3 scale-110 text-primary/50" />
		<IntersectionIcon class="-bottom-3 -right-3 scale-110 text-primary/50" />
		<IntersectionIcon class="-bottom-3 -left-3 scale-110 text-primary/50" />
		<PrismicRichText field={item.heading} />
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam veritatis corrupti error amet debitis
		repellendus totam qui aspernatur quaerat minima!
	</div>
{/snippet}

{#snippet marginGrid(axis: 'x' | 'y')}
	{#if axis === 'x'}
		<div class="grid h-32 border-r" style="grid-template-columns: var(--grid-columns);">
			{#each Array(10)}
				<div class="h-full border-l"></div>
			{/each}
		</div>
	{:else}
		<div class="row-span-full grid w-full min-w-12 grid-rows-subgrid border-b border-dashed">
			{#each Array(2)}
				<div class="h-full border-t  border-dashed"></div>
			{/each}
		</div>
	{/if}
{/snippet}


