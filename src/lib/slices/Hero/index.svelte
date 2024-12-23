<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	import { cn } from '@/utils';

	interface Props {
		slice: Content.HeroSlice;
	}

	let { slice }: Props = $props();

	// Add dark class to parent when theme is dark
	let darkClass = $derived(slice.primary.theme === 'dark' ? 'dark' : '');
	let alignment = $derived(slice.primary.alignment || 'left');
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="{darkClass} relative text-{alignment} flex min-h-[75vh] w-full items-center justify-center overflow-hidden rounded-b-md"
>
	<!-- Background -->
	{#if slice.variation === 'withVideo' && 'url' in slice.primary.video_background}
		<video autoplay muted loop playsinline class="absolute inset-0 h-full w-full object-cover">
			<source src={slice.primary.video_background.url} type="video/mp4" />
		</video>
	{:else if slice.variation == 'default'}
		<PrismicImage
			field={slice.primary.background}
			class="absolute inset-0 h-full w-full object-cover"
		/>
	{/if}

	<!-- Overlay -->
	{#if slice.primary.overlay}
		<div class="absolute inset-0 bg-brand-100/20 dark:bg-brand-950/60"></div>
	{/if}

	<!-- Content -->
	<div class="container relative mx-auto max-w-screen-xl px-6 text-brand-950 dark:text-white">
		<div
			class="flex max-w-prose flex-col items-{alignment === 'center'
				? 'center'
				: alignment === 'right'
					? 'flex-end'
					: 'flex-start'} text-{alignment} {alignment === 'center'
				? 'mx-auto'
				: alignment === 'right'
					? 'ml-auto'
					: 'mr-auto'}"
		>
			{#if slice.primary.heading}
				<h1
					class="mb-4 scroll-m-20 text-balance font-heading text-3xl font-semibold tracking-tight lg:text-4xl"
				>
					{slice.primary.heading}
				</h1>
			{/if}

			{#if slice.primary.subheading}
				<p class="mb-8 text-xl text-muted-foreground md:text-2xl">
					{slice.primary.subheading}
				</p>
			{/if}

			<div
				class="flex flex-wrap gap-4 justify-{alignment === 'center'
					? 'center'
					: alignment === 'right'
						? 'end'
						: 'start'}"
			>
				{#if slice.primary.cta_link}
					<PrismicLink
						field={slice.primary.cta_link}
						class={cn(buttonVariants({ variant: 'cta', size: 'lg' }), 'group relative')}
					>
						{slice.primary.cta_link.text || 'Kontakt oss'}<i
							class="far fa-arrow-right ml-1 w-0 overflow-hidden transition-all duration-300 group-hover:ml-3 group-hover:w-5"
						></i>
					</PrismicLink>
				{/if}

				{#if slice.primary.cta_secondary_link}
					<PrismicLink
						field={slice.primary.cta_secondary_link}
						class={buttonVariants({ variant: 'cta-secondary', size: 'lg' })}
					>
						{slice.primary.cta_secondary_link.text || 'Log inn'}
					</PrismicLink>
				{/if}
			</div>
		</div>
	</div>
</section>
