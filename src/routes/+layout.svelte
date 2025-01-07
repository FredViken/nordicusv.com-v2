<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	import '@fontsource-variable/noto-sans-jp';
	import '@fontsource/squada-one';
	let { children }: { children: Snippet; } = $props();
</script>



{@render children()}


