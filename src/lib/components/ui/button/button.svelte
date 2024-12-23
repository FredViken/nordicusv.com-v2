<script lang="ts" module>
	import { cn } from '@/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:duration-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[.99] duration-500 transition hover:ring-2 ring-foreground/20 hover:scale-[1.01]',
		variants: {
			variant: {
				default:
					'bg-primary dark:bg-brand-600 border  border-primary-hover text-primary-foreground hover:bg-primary-hover ring-primary/25 dark:hover:border-brand-200',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive-hover ring-destructive/25',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground ring-transparent',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary-hover ring-transparent',
				ghost: 'hover:bg-accent hover:text-accent-foreground hover:ring-0',
				link: 'text-primary underline-offset-4 hover:underline hover:ring-0',
				cta: 'bg-base-50 text-base-950 hover:bg-base-100 ring-base-50/50',
				'cta-secondary': 'bg-base-950/15 dark:bg-base-50/25 backdrop-blur-md ',
			},
			size: {
				default: 'px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-6',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			loading?: boolean;
			loadingText?: string;
		};
</script>

<script lang="ts">

	let {
		class: className,
		variant = 'default',
		size = 'default',
		loading = false,
		loadingText = 'Loading...',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a bind:this={ref} class={cn(buttonVariants({ variant, size, className }))} {href} {...restProps}>
		{#if loading}
			<i class="i-lucide-loader animate-spin"></i>
		{:else}
			{@render children?.()}
		{/if}
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn(buttonVariants({ variant, size, className }))}
		{type}
		{...restProps}
	>
		{#if loading}
			<i class="i-lucide-loader animate-spin"></i>
		{:else}
			{@render children?.()}
		{/if}
	</button>
{/if}
