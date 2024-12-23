<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';

	export let slice: Content.HeroSlice;

	// Determine theme classes based on the theme field
	$: isDark = slice.primary.theme === 'dark';
	$: themeClasses = {
		section: isDark ? 'text-white' : 'text-gray-900',
		overlay: isDark ? 'bg-sky-950/40' : 'bg-white/40',
		primaryButton: isDark 
			? 'bg-white text-black hover:bg-opacity-90' 
			: 'bg-sky-950 text-white hover:bg-sky-900',
		secondaryButton: isDark
			? 'border-white text-white hover:bg-white/10'
			: 'border-sky-950 text-sky-950 hover:bg-sky-950/10'
	};
</script>

<section 
	data-slice-type={slice.slice_type} 
	data-slice-variation={slice.variation}
	class="relative w-full min-h-[80vh] flex items-center justify-center {themeClasses.section}"
>
	<!-- Background -->
	{#if slice.variation === 'withVideo' && "url" in slice.primary.video_background}
		<video 
			autoplay 
			muted 
			loop 
			playsinline
			class="absolute inset-0 w-full h-full object-cover"
		>
			<source src={slice.primary.video_background.url} type="video/mp4">
		</video>
	{:else if slice.variation == "default"}
		<PrismicImage 
			field={slice.primary.background}
			class="absolute inset-0 w-full h-full object-cover"
		/>
	{/if}

	<!-- Overlay -->
	 {#if slice.primary.overlay}
	<div class="absolute inset-0 {themeClasses.overlay}"></div>
	{/if}

	<!-- Content -->
	<div class="relative container mx-auto px-4 max-w-6xl">
		<div class="max-w-3xl">
			{#if slice.primary.heading}
				<h1 class="text-5xl md:text-6xl font-bold mb-4">
					{slice.primary.heading}
				</h1>
			{/if}

			{#if slice.primary.subheading}
				<p class="text-xl md:text-2xl mb-8 opacity-90">
					{slice.primary.subheading}
				</p>
			{/if}

			<div class="flex flex-wrap gap-4">
				{#if slice.primary.cta_link}
					<PrismicLink 
						field={slice.primary.cta_link}
						class="px-6 py-3 rounded-lg font-medium transition-colors {themeClasses.primaryButton}"
					>
						{slice.primary.cta_link.text || 'Learn More'}
					</PrismicLink>
				{/if}

				{#if slice.primary.cta_secondary_link}
					<PrismicLink 
						field={slice.primary.cta_secondary_link}
						class="border px-6 py-3 rounded-lg font-medium transition-colors {themeClasses.secondaryButton}"
					>
						{slice.primary.cta_secondary_link.text || 'Contact Us'}
					</PrismicLink>
				{/if}
			</div>
		</div>
	</div>
</section>
