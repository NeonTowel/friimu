<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	
	let { children } = $props();
</script>

<Header />

<main class="min-h-screen bg-rose-pine-base">
	{@render children()}
</main>

<footer class="bg-rose-pine-surface border-t border-rose-pine-highlight-med">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="flex flex-col items-center space-y-4">
			<div class="flex items-center space-x-2">
				<span class="text-rose-pine-love">✦</span>
				<span class="text-rose-pine-text font-semibold">Friimu - Find Free to Play Games</span>
			</div>
			<p class="text-rose-pine-subtle text-sm text-center">
				Discover amazing free-to-play games across all genres
			</p>
		</div>
	</div>
</footer>
