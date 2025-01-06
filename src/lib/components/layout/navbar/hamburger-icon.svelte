<script lang="ts">
	import { animate, motionValue } from 'motion';
	import { onMount } from 'svelte';
	let { open }: { open: boolean } = $props();
	// let initalLoad = $state(false);

	const SPACING = 4;
	// const spans = node.querySelectorAll('span');
	let top: HTMLSpanElement;
	let middle: HTMLSpanElement;
	let bottom: HTMLSpanElement;
	let opacity = motionValue(1);

	function play(reverse: boolean = false) {
		const animation = animate([
			[top, { translateY: [`0px`, `${SPACING + 2}px`] }, { duration: 0.3, at: 0 }],
			[bottom, { translateY: [`0px`, `-${SPACING + 2}px`] }, { duration: 0.3, at: 0 }],
			[top, { rotate: ['0deg', '45deg'] }, { duration: 0.3, at: 0.3 }],
			[bottom, { rotate: ['0deg', '-45deg'] }, { duration: 0.3, at: 0.3 }],
			// [opacity, [1,0], { duration: 0.2, at: 0 }],
			[middle, { scaleX: [1, 0] }, { duration: 0.1, at: 0.2 }]
			// [middle, { scaleX: [0, 0] }, { duration: 0.3, at: 0.3 }]
		]);

		// animation.pause();

		if (reverse) {
			console.log(animation.time);
			animation.time = animation.duration;
			console.log(animation.time);
			console.log(animation.speed);
			animation.speed = -1.5;
			console.log(animation.speed);
		}
		console.log(animation.speed);
		// animation.play();
		// console.log('mounted');
	}

	$effect(() => {
		if (open) {
			console.log('open');
			play();
		} else {
			console.log('close');
			play(true);
		}
	});
</script>

<div class="relative flex h-4 w-4 flex-col items-center justify-center gap-[4px]">
	<span bind:this={top}></span>
	<span bind:this={middle}></span>
	<span bind:this={bottom}></span>
</div>

<style lang="postcss">
	span {
		@apply block h-[2px] w-4 origin-center rounded-full bg-current;
		/* Remove transition since we're using Motion One */
		will-change: transform, opacity;
	}
</style>
