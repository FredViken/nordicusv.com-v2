<script lang="ts">
	import { dropdownItemStyle } from ".";

	export let href = '#';
	export let icon: string | null = null;
</script>

<li class="w-full">
	<a {href} class="{dropdownItemStyle} group">
		<span>
			{#if icon}
				<i class="fa-regular mr-2 duration-300 fa-{icon}" />
			{/if}
			<span>
				<slot />
			</span>
		</span>
    <i class="far fa-arrow-right hidden md:block opacity-0 group-hover:opacity-100 duration-500 ease-in-out -translate-x-4 group-hover:-translate-x-0"/>
	</a>
</li>

<!-- <style lang="postcss">
  a {
    @apply flex items-center justify-between gap-6 md:rounded-md py-6 p-4 duration-500 md:text-base border-b md:border-none text-xl;
  }

  a:hover {
    @apply bg-muted;
  } 

  a > i {
    @apply -translate-x-2 opacity-0 duration-500 ease-in-out;
  }

  a:hover > i {
    @apply translate-x-0 md:opacity-100;
  }

  a:hover > span i {
    @apply text-primary;
  }

  li{
    @apply  px-6 md:px-0;
  }
</style> -->
