<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$utils';
	import { animate, scroll } from 'motion';
	import { onMount } from 'svelte';

	interface Props {
		slice: Content.HeroSlice;
	}

	let backgroundRef: HTMLElement | undefined = $state();

	let { slice }: Props = $props();

	let darkClass = $derived(slice.primary.theme === 'dark' ? 'dark' : '');
	let alignment = $derived(slice.primary.alignment || 'left');

	onMount(() => {
		// Create a subtle scale effect on scroll
		if (backgroundRef) {
			const animation = animate(backgroundRef, { scale: [1.0, 1.2] });
			scroll(animation, {
				target: backgroundRef,
				offset: ['start start', 'end start']
			});
		}
	});
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="{darkClass} relative text-{alignment} flex min-h-[75vh] w-full items-center justify-center overflow-hidden"
>
	<!-- Background with parallax -->
	{#if slice.variation === 'withVideo' && 'url' in slice.primary.video_background}
		<video
			bind:this={backgroundRef}
			autoplay
			muted
			loop
			playsinline
			class="absolute inset-0 h-full w-full origin-center object-cover will-change-transform"
		>
			<source src={slice.primary.video_background.url} type="video/mp4" />
		</video>
	{:else if slice.variation == 'default'}
		<div
			bind:this={backgroundRef}
			class="absolute inset-0 h-full w-full origin-center will-change-transform"
		>
			<PrismicImage field={slice.primary.background} class="h-full w-full object-cover" />
		</div>
	{/if}

	<!-- Overlay -->
	{#if slice.primary.overlay}
		<div class="absolute inset-0 bg-base-50/75 dark:bg-brand-950/60"></div>
	{/if}

	<!-- Content -->
	<div class="container relative mx-auto px-6 py-24 text-brand-950 dark:text-white md:px-12">
		<div
			class="flex max-w-2xl flex-col {alignment == 'center'
				? 'mx-auto items-center text-center'
				: alignment == 'right'
					? 'ml-auto items-end text-right'
					: 'mr-auto items-start text-left'}"
		>
			{#if slice.primary.heading}
				<h1 class="mb-4 scroll-m-20 text-balance text-3xl font-semibold tracking-tight lg:text-4xl">
					{slice.primary.heading}
				</h1>
			{/if}

			{#if slice.primary.subheading}
				<p class="mb-8 text-pretty text-xl text-muted-foreground">
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
						class={cn(buttonVariants({ variant: 'cta' }), 'group relative flex items-center gap-4')}
					>
						{slice.primary.cta_link.text || 'Kontakt oss'}<i
							class="far fa-arrow-right -translate-x-1 duration-500 group-hover:translate-x-0"
						></i>
					</PrismicLink>
				{/if}

				{#if slice.primary.cta_secondary_link}
					<PrismicLink
						field={slice.primary.cta_secondary_link}
						class={buttonVariants({ variant: 'cta-secondary' })}
					>
						{slice.primary.cta_secondary_link.text || 'Log inn'}
					</PrismicLink>
				{/if}
			</div>
		</div>
	</div>
</section>
