<script lang="ts">
	import { onMount } from "svelte";
  import { itemStyle, itemStyleScrolled, navState } from './index';
  export let href;

  $: scrolled = $navState.scrolled;

</script>

<li on:mouseenter on:mouseleave class="h-full flex items-center md:px-2">
  <a {href} class:scrolled class="{itemStyle} hover:underline md:hover:no-underline {scrolled ? itemStyleScrolled : ''}">
    <slot />
  </a>
  <slot name="dropdown" />
</li>

<style lang="postcss">
  /* a {
    @apply px-4 py-6 md:py-2 md:text-base text-xl md:rounded-md duration-300 w-full border-b md:border-none;
  }

  a:hover{
    @apply bg-foreground/15 ;
  } */

  /* a.primary{
    @apply bg-background text-primary outline outline-background -outline-offset-1 hover:bg-background/50 hover:text-background;
  }

  a.primary.scrolled{
    @apply bg-primary ring-primary outline-none text-primary-foreground hover:bg-primary-hover;
  } */

  a.secondary{
    @apply outline outline-background -outline-offset-1 hover:bg-background/30;
  }

  a.secondary.scrolled{
    @apply outline-none text-primary bg-foreground/10 hover:bg-foreground/20;
  }
/* 
  li{
    @apply h-full flex items-center px-6 md:px-2;
  } */
</style>