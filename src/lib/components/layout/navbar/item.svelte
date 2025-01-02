<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { NavigationItemSlice } from '../../../../prismicio-types';
	import { navbarState } from './state.svelte';
	import { NavigationMenu, Portal } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { asLink } from '@prismicio/client';
	import DropdownContent from './dropdown-content.svelte';

	let { data }: { data: NavigationItemSlice } = $props();
  let value = $state(data.primary.link.text);

	const classList =
		'px-3 h-16 flex items-center flex text-nowrap group justify-center focus-visible:outline-none focus-visible:ring-2 ring-ring';
</script>

<NavigationMenu.Item>
	{#if data.variation === 'default'}
		<NavigationMenu.Link class={classList} href={asLink(data.primary.link)}>
			{data.primary.link.text}
		</NavigationMenu.Link>
	{:else}
		<NavigationMenu.Trigger class={classList}>
			{data.primary.link.text}
      <i class="far fa-chevron-down group-data-[state=open]:rotate-180 duration-100 text-xs ml-1"></i>
		</NavigationMenu.Trigger>
		<NavigationMenu.Content
			class="navigation-menu-content w-screen left-0 top-0 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 absolute"
		>
        <div class="w-screen">
          <DropdownContent data={data} />
        </div>

		</NavigationMenu.Content>
	{/if}
</NavigationMenu.Item>
