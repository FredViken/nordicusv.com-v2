<script>
	import { slide } from 'svelte/transition';
	import { navState } from './index';
	export let primary = false;
	export let href = '#';
	let hovered = false;
  $: defaultStyle = `border text-nowrap border-border/50 rounded-md px-4 py-2 md:py-2 duration-300 ${$navState.scrolled || $navState.dropdown ? 'border-border hover:bg-muted' : 'md:hover:bg-base-50/25'}`;
	$: primaryStyle = `flex text-nowrap items-center gap-0 px-4 py-2 mt-4 md:mt-0 md:py-2 rounded-md ring-base-50/25 hover:ring-4 duration-300 ${$navState.scrolled || $navState.dropdown || $navState.mobileExpanded ? 'bg-primary text-primary-foreground' : 'bg-base-50 text-base-950'}`;

</script>

<li class="flex h-full items-center md:px-2">
	<a {href} class={primary ? primaryStyle : defaultStyle} on:mouseenter={() => (hovered = true)} on:mouseleave={() => (hovered = false)} >
		<span><slot /></span>
		{#if hovered && primary}
		<span transition:slide={{axis:'x'}} class="h-full inline-flex items-center justify-center">
			<i  class="far fa-arrow-right pl-1" />
		</span>
		{/if}
	</a>
</li>