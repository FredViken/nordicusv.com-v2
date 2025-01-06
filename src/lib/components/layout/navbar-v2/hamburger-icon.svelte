<script lang="ts">
	export let open: boolean = false;
</script>

<div class:open>
	<span />
	<span />
	<span />
</div>

<style lang="postcss">
	div {
		@apply flex h-4 w-4 flex-col items-center justify-center;
	}

	div > span {
		@apply block h-[2px] w-4 origin-center rounded-full bg-current duration-500 ease-in-out;
	}

	div > span:nth-child(1) {
		@apply -translate-y-[4px];
	}

	div > span:nth-child(2) {
		@apply translate-y-[0px];
	}

	div > span:nth-child(3) {
		@apply translate-y-[4px];
	}

	div.open > span:nth-child(1) {
		@apply translate-y-[2px] rotate-45 scale-x-125;
	}

	div.open > span:nth-child(2) {
		@apply scale-x-0 opacity-75;
	}

	div.open > span:nth-child(3) {
		@apply translate-y-[-2px] -rotate-45 scale-x-125;
	}
</style>
