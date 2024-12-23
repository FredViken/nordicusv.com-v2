<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	let { children, data }: { children: Snippet, data: LayoutData} = $props();
</script>


{@render children()}
