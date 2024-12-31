<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { NavigationItemSlice } from '../../../../prismicio-types';
	import { navbarState } from './state.svelte';
	import { NavigationMenu, Portal } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { asLink, type LinkField } from '@prismicio/client';

	let { data, primary }: { data: LinkField; primary?: boolean } = $props();





  const variants = {
    default: 'px-3 py-1 rounded-md',
    primary: 'bg-primary text-white'
  }

</script>

<NavigationMenu.Item>

		<NavigationMenu.Link class={[variants.default, primary ? variants.primary : '']} href={asLink(data)}>
			{data.text}
		</NavigationMenu.Link>

</NavigationMenu.Item>
