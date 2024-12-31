<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	import '@fontsource-variable/noto-sans-jp';
	import '@fontsource/squada-one';
	import * as Navbar from '$components/layout/navbar';
	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<Navbar.Root>
	{#each data.settings.data.slices as item}
		<Navbar.Item data={item} />
	{/each}

	{#snippet cta()}
		<Navbar.CtaItem data={data.settings.data.cta_secondary_link} />
		<Navbar.CtaItem primary data={data.settings.data.cta_link} />
	{/snippet}
</Navbar.Root>

{@render children()}

<div class="h-[100vh]"></div>
