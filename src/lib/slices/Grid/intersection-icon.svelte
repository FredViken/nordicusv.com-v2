<script lang="ts">
  import { cn } from "$lib/utils";

  let className: any = "";
  export { className as class };
  export let border:boolean = false;
  export let icon: string| undefined = undefined;
</script>

{#if icon}
<div class={cn(`size-6 dark:text-white flex justify-center items-center text-black absolute rounded-full ${border ? 'border' : ''} bg-background`, className)} >
	<i class="{icon} text-sm" />
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
  class={cn(`dark:text-white text-black border absolute rounded-full ${border ? 'border' : ''} bg-background`, className)}
  {...$$restProps}
>
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
	</svg>
{/if}
