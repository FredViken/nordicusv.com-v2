<script lang="ts">
	// your script goes here
	import { asLink, type Content } from '@prismicio/client';
	import { NavigationMenu } from 'bits-ui';
	// import type { NavigationItemSliceWithDropdownPrimary } from '../../../../prismicio-types';
	import { cn } from '$utils';
	let { data }: { data: Content.NavigationItemSlice } = $props();

	const style = 'rounded-md hover:bg-muted/50 px-4 py-2 duration-300';
</script>

<NavigationMenu.Item>
	{#if data.variation == 'default'}
		<NavigationMenu.Link class={style} href={asLink(data.primary.link)}
			>{data.primary.link.text}</NavigationMenu.Link
		>
	{:else if data.variation == 'withDropdown'}
		<NavigationMenu.Trigger class={style}>
			{data.primary.link.text}
		</NavigationMenu.Trigger>
		<NavigationMenu.Content
			class="left-0 top-0 z-50 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto"
		>
			<ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
				<li class="row-span-3">
					<NavigationMenu.Link
						href="/"
						class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
					>
						<!-- <Icons.logo class="h-6 w-6" /> -->
						<div class="mb-2 mt-4 text-lg font-medium">{data.primary.link.text}</div>
						<p class="text-sm leading-tight text-muted-foreground">
							{data.primary.description}
						</p>
					</NavigationMenu.Link>
				</li>
			</ul>
		</NavigationMenu.Content>
	{/if}
</NavigationMenu.Item>
