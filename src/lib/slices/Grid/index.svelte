<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import IntersectionIcon from './intersection-icon.svelte';
	import BorderBeam from '$lib/components/ui/border-beam.svelte'
	import Item from './item.svelte';
	export let slice: Content.GridSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	style="--cols:{slice.primary.columns}; --rows:{slice.primary.rows};"
	class="py-16"
>
	<!-- Gradient fade top -->
	{#if slice.primary.fade_top}
	<div
		class=" mx-auto max-h-24 max-w-screen-xl grid-rows-1 overflow-hidden px-16"
		style="mask-image: linear-gradient(to bottom, transparent 0%, black 75%)"
	>
		<div class="bento-grid grid !grid-rows-1 border-l border-dashed">
			{#each slice.primary.items as item}
				<div class="item h-24 w-full border-r border-dashed"></div>
			{/each}
		</div>
	</div>
	{/if}

	<div class="outer-grid grid-rows-auto hidden md:grid grid-cols-[1fr,auto,1fr]">
		<div
			class="bento-grid md:row-span-full grid w-full min-w-16 !grid-cols-1 grid-rows-subgrid border-t border-dashed"
		>
			{#each slice.primary.items as item}
				<div class="item w-full border-b border-dashed"></div>
			{/each}
		</div>

		<div
			class="bento-grid grid-rows-auto grid-cols-1 row-span-full grid max-w-screen-xl grid-rows-subgrid border-l border-t border-dashed"
		>
			{#each slice.primary.items as item}
				<Item {item} />
			{/each}
		</div>
		<div
			class="bento-grid row-span-full grid w-full min-w-16 !grid-cols-1 grid-rows-subgrid border-t border-dashed"
		>
			{#each slice.primary.items as item}
				<div class="item w-full border-b border-dashed"></div>
			{/each}
		</div>

		
	</div>


	<div class="md:hidden px-6">
		<div class="border-t border-l border-dashed">
		{#each slice.primary.items as item}
				<Item {item} />
			{/each}
		</div>
	</div>

	<!-- Gradient fade bottom -->
	 {#if slice.primary.fade_bottom}
	<div
		class="mx-auto max-h-24 max-w-screen-xl !grid-rows-1 overflow-hidden px-6 md:px-16"
		style="mask-image: linear-gradient(to top, transparent 0%, black 75%)"
	>
		<div class="md:bento-grid grid !grid-rows-1 border-l border-dashed">
			{#each slice.primary.items as item}
				<div class="item h-24 w-full border-r border-dashed"></div>
			{/each}
		</div>
	</div>
	{/if}
</section>

<style lang="postcss">
	.outer-grid {
		grid-template-rows: auto;
	}
	@media (min-width: 768px) {
		.outer-grid {
			grid-template-rows: var(--rows);
		}

		.bento-grid {
			grid-template-columns: var(--cols);
		}
	}
</style>
