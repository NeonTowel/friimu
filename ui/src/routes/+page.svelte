<script lang="ts">
	import GameCard from '$lib/components/GameCard.svelte';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';
	
	let selectedGenre = 'All Genres';
	let selectedSort = 'Release Date';
	
	const genreOptions = [
		'All Genres',
		'Action',
		'Adventure',
		'RPG',
		'Strategy',
		'Simulation',
		'Sports',
		'Racing',
		'Fighting',
		'Puzzle'
	];
	
	const sortOptions = [
		'Release Date',
		'Alphabetical',
		'Popularity',
		'Rating'
	];
	
	// Mock game data for demonstration
	const mockGames = [
		{
			id: 1,
			title: 'Cosmic Clash',
			thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=300&fit=crop',
			short_description: 'Epic space battles await in this strategic multiplayer game.',
			genre: 'Strategy',
			platform: 'PC',
			release_date: '2024-01-15'
		},
		{
			id: 2,
			title: 'Mystic Realms',
			thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
			short_description: 'Explore magical worlds filled with ancient mysteries.',
			genre: 'Adventure',
			platform: 'PC',
			release_date: '2024-02-20'
		},
		{
			id: 3,
			title: 'Steel Titans',
			thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
			short_description: 'Pilot giant mechs in futuristic warfare.',
			genre: 'Action',
			platform: 'PC',
			release_date: '2024-03-10'
		},
		{
			id: 4,
			title: 'Shadow Strike',
			thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
			short_description: 'Stealth action game with tactical gameplay.',
			genre: 'Action',
			platform: 'PC',
			release_date: '2024-04-05'
		},
		{
			id: 5,
			title: 'Arcane Legends',
			thumbnail: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&h=300&fit=crop',
			short_description: 'Master magic and embark on epic quests.',
			genre: 'RPG',
			platform: 'PC',
			release_date: '2024-05-12'
		},
		{
			id: 6,
			title: 'Galactic Conquest',
			thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
			short_description: 'Build your empire across the galaxy.',
			genre: 'Strategy',
			platform: 'PC',
			release_date: '2024-06-18'
		}
	];
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold text-rose-pine-text mb-4">
			Free to Play Games
		</h1>
		<p class="text-rose-pine-subtle text-lg max-w-2xl mx-auto">
			Explore a vast library of free-to-play games across various genres. Find your next adventure without spending a dime.
		</p>
	</div>
	
	<div class="flex flex-wrap gap-4 mb-8">
		<FilterDropdown 
			label="Genre"
			options={genreOptions}
			bind:selected={selectedGenre}
		/>
		<FilterDropdown 
			label="Sort"
			options={sortOptions}
			bind:selected={selectedSort}
		/>
	</div>
	
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
		{#each mockGames as game}
			<GameCard {game} />
		{/each}
	</div>
</div>
