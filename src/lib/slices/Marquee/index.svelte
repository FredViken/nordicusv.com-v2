<script lang="ts">
	import { type Content, isFilled } from '@prismicio/client';
	import Marquee from 'svelte-fast-marquee';
	interface Props {
		slice: Content.MarqueeSlice;
	}

	let { slice }: Props = $props();


	const duplicateCount = 10;
	let items = $derived([...slice.primary.items, ...slice.primary.items]);
</script>

<section
	class="relative py-8 text-center"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	{#if slice.primary.heading}
		<h2 class="mb-8 font-semibold">{slice.primary.heading}</h2>
	{/if}
	<Marquee speed={Number(slice.primary.speed)}>
		<ul class="flex w-full gap-8 pr-8 md:gap-12 md:pr-12">
			{#each items as item}
				<li class="logo w-36 p-4 md:w-48 md:px-6 flex justify-center items-center">
					<img class="w-full" src={item.image.url} alt={item.image.alt} />
				</li>
			{/each}
		</ul>
	</Marquee>
	<div
		class="absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent md:w-32"
	></div>
	<div
		class="absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent md:w-32"
	></div>
</section>

<style>
	.logo :global(img) {
		filter: invert(26%) sepia(98%) saturate(401%) hue-rotate(151deg) brightness(80%) contrast(80%);
		max-width: 100%;
		height: auto;
	}
</style>
