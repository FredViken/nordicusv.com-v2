<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.page.data.meta_title}</title>
</svelte:head>

<SliceZone slices={data.page.data.slices} {components} />
