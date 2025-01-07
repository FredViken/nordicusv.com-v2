<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: any;
		border?: boolean;
		icon?: string | undefined;
		[key: string]: any;
	}

	let { class: className = '', border = false, icon = undefined, ...rest }: Props = $props();
</script>

{#if icon}
	<div
		class={cn(
			`absolute flex size-6 items-center justify-center rounded-full text-black dark:text-white ${border ? 'border' : ''} bg-background`,
			className
		)}
	>
		<i class="{icon} text-sm"></i>
	</div>
{:else}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		stroke-width="1"
		stroke-linecap="round"
		stroke="currentColor"
		class={cn(
			`absolute rounded-full text-black dark:text-white ${border ? 'border' : ''} bg-background border ring-2 ring-background`,
			className
		)}
		{...rest}
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
	</svg>
{/if}
