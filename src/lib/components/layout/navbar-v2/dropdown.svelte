<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { itemStyle, itemStyleScrolled, navState } from './index';
	import { Button } from '$lib/components/ui/button';
	import * as Collapsible from '$lib/components/ui/collapsible';
	export let href: string = '#';
	export let description: string = '';

	$: scrolled = $navState.scrolled;

	function toggleDropdown() {
		$navState.dropdown = $navState.dropdown === href ? null : href;
	}

	function closeDropdown() {
		$navState.dropdown = null;
	}

	function openDropdown() {
		$navState.dropdown = href;
	}
</script>

<li
	class="hidden h-full items-center md:flex"
	on:mouseenter={openDropdown}
	on:mouseleave={closeDropdown}
>
	<a {href} class="{itemStyle} {scrolled ? itemStyleScrolled : ''}">
		<slot />
		<i
			class="far fa-chevron-down ml-1 duration-200 {$navState.dropdown == href ? 'rotate-180' : ''}"
		></i>
	</a>
	{#if $navState.dropdown === href}
		<div
			class="absolute left-0 top-[calc(100%+1px)] z-20 hidden w-full border-b bg-background text-foreground shadow-lg md:block"
			transition:slide={{ delay: 100, duration: 400, easing: quadInOut }}
		>
			<div class="mx-auto grid max-w-screen-xl grid-cols-3 px-16 py-12">
				<div>
					<h2 class="font-heading text-xl font-bold"><slot /></h2>
					<p class="text-muted-foreground">{description}</p>
				</div>
				<ul class="col-span-2 grid grid-cols-2">
					<slot name="content"></slot>
				</ul>
			</div>
		</div>
	{/if}
</li>

<li class="border-b md:hidden">
	<Collapsible.Root>
		<Collapsible.Trigger class="flex w-full items-baseline justify-between {itemStyle} border-b-0">
			<slot />
			<i class="far ml-full fa-chevron-down" />
		</Collapsible.Trigger>
		<Collapsible.Content class="py-4">
			<ul class="">
				<slot name="content"></slot>
			</ul>
		</Collapsible.Content>
	</Collapsible.Root>
</li>

<!-- <li class="flex md:hidden">
	<button on:click={openDropdown}>
		<slot />
		<i class="far ml-full fa-chevron-right" />
	</button>

	{#if $navState.dropdown === href}
		<div
			class="absolute left-0 top-0 z-50 h-[calc(100vh-4rem)] w-full border-b bg-background text-foreground shadow-lg"
		>
			<div class="mx-6 py-6 flex gap-4 items-center border-b">
				<Button variant="ghost" size="icon" on:click={closeDropdown}>
					<i class="far fa-arrow-left text-xl" />
				</Button>
				<h2 class="font-bold text-xl"><slot /></h2>
			</div>

			<ul class="">
				<slot name="content"></slot>
			</ul>
		</div>
	{/if}
</li> -->

<style lang="postcss">
	/* a,
	button {
		@apply flex w-full items-center justify-between border-b py-6 text-xl duration-300 md:rounded-md md:border-none px-4 md:py-2 md:text-base;
	}

	a:hover,
	button:hover {
		@apply bg-foreground/15 ;
	}

	li {
		@apply h-full items-center px-6 md:px-2;
	} */
</style>
