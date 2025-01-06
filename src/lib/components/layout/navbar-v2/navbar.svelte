<script lang="ts">
	import HamburgerIcon from './hamburger-icon.svelte';
	import { navState } from './index';
	const navbarHeight = 64;
	let scrollY: number;
	let prevScrollY: number;
	let innerWidth: number;
	$: {
		navState.update((state) => {
			if (state.mobileExpanded) {
				state.visible = true;
			} else if (scrollY > prevScrollY && scrollY > navbarHeight / 2) {
				state.visible = false;
			} else {
				state.visible = true;
			}
			state.scrolled = scrollY >= navbarHeight * 2;
			return state;
		});
		prevScrollY = scrollY;

		if (innerWidth < 768) {
			$navState.mobileExpanded = false;
		}
	}

	function toggleMenu() {
		$navState.mobileExpanded = !$navState.mobileExpanded;
		if (!$navState.mobileExpanded) {
			$navState.dropdown = null;
		}
	}
</script>

<svelte:window bind:scrollY bind:innerWidth />

<nav
	class:scrolled={$navState.scrolled}
	class:visible={$navState.visible}
	class:dropdown={$navState.dropdown !== null}
	class:mobile-expanded={$navState.mobileExpanded}
>
	<div>
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2">
			<img src="/logo/logo.svg" alt="Logo" class="h-8 w-auto" />
			<span class="font-squadaOne text-2xl uppercase">Nordic USV</span>
		</a>
		<!-- Nav items (desktop) -->
		<div class="hidden md:contents">
			<slot />
		</div>

		<button
			class=""
			aria-label="Toggle menu"
			on:click={toggleMenu}
			aria-expanded={$navState.mobileExpanded}
			aria-controls="nav-menu"
			id="nav-toggle"
		>
			<HamburgerIcon open={$navState.mobileExpanded} />
		</button>
		{#if $navState.mobileExpanded}
			<div
				class="absolute left-0 top-full flex h-[calc(100vh-4rem)] w-full flex-col gap-4 border-t bg-background px-6 md:hidden"
			>
				<slot />
			</div>
		{/if}
	</div>
</nav>

<style lang="postcss">
	nav {
		@apply fixed top-0 z-50 w-full -translate-y-full border-border text-background;
		transition:
			background-color 0.9s,
			transform 0.3s,
			border 0.3s;
	}

	nav > div {
		@apply mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between px-6 md:px-16;
	}

	nav.scrolled {
		@apply border-b border-border/50 bg-background/75 py-0 text-foreground backdrop-blur-md;
	}

	nav.visible {
		@apply translate-y-0;
	}

	nav.dropdown,
	nav.mobile-expanded {
		@apply border-b bg-background text-foreground;
	}

	button {
		@apply flex size-10 items-center justify-center rounded-md text-3xl duration-200 hover:bg-foreground/15 md:hidden;
	}

	nav.scrolled button {
		@apply hover:bg-muted;
	}
</style>
