<script lang="ts">
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import IntersectionIcon from './intersection-icon.svelte';
	import type { GridSliceDefaultPrimaryItemsItem } from '../../../prismicio-types';
	import { illustrationsDict } from '$lib/components/illustrations';
	export let item: GridSliceDefaultPrimaryItemsItem;
</script>

<div
	class="item group relative col-span-full flex w-full flex-col border-b border-r border-dashed"
	style="grid-column: span {item.column_span}; grid-row: span {item.row_span}; text-align: {item.alignment}"
>
	<IntersectionIcon class="-left-3 -top-3 scale-125 text-primary/50" />
	<IntersectionIcon class="-right-3 -top-3 scale-125 text-primary/50" />
	{#if item.media == 'Image' && item.image.url}
		<div
			class="item-gradient absolute bottom-0 left-0 -z-0 h-64 w-full opacity-0 duration-500 ease-in-out group-hover:opacity-25"
		/>
	{/if}
	<div
		class="prose mx-auto max-w-prose p-8 prose-headings:mb-2 prose-headings:mt-0 prose-p:text-muted-foreground prose-a:text-primary prose-a:hover:text-primary-hover"
	>
		{#if item.badge_text}
			<span class="text-primary duration-200 group-hover:text-brand-800"
				><i class="far fa-{item.icon} mr-1" />{item.badge_text}</span
			>
		{/if}
		<PrismicRichText field={item.heading} />
		<PrismicRichText field={item.body} />
	</div>
	{#if item.media !== 'None'}
	<div
		class="{item.padding_x
			? 'px-8'
			: ''}  relative h-[240px] overflow-hidden flex items-end prose-img:object-cover"
	>
		{#if item.media == 'Image' && item.image}
			<div class={item.shadow ? 'bottom-0 drop-shadow-xl' : ''}>
				<PrismicImage field={item.image} />
			</div>
		{:else if item.media == 'Custom'}
			<div class="relative size-full overflow-hidden object-cover">
				<svelte:component this={illustrationsDict[item.custom_media]} />
			</div>
		{/if}
	</div>
	{/if}
</div>

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

	.item-gradient {
		background: radial-gradient(at bottom left, hsl(var(--brand-200)) 0%, transparent 40%),
			radial-gradient(at bottom right, hsl(var(--brand-500)) 0%, transparent 40%);
	}
</style>
