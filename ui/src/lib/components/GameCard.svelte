<script lang="ts">
  export let game: {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    genre: string;
    platform: string;
    release_date: string;
  };
</script>

<div class="bg-rose-pine-surface border border-rose-pine-highlight-med rounded-lg overflow-hidden hover:bg-rose-pine-overlay transition-colors group cursor-pointer">
  <div class="aspect-video overflow-hidden">
    <img 
      src={game.thumbnail} 
      alt={game.title}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  
  <div class="p-4">
    <h3 class="text-rose-pine-text font-semibold text-lg mb-2 group-hover:text-rose-pine-love transition-colors">
      {game.title}
    </h3>
    
    <p class="text-rose-pine-subtle text-sm mb-3 line-clamp-2">
      {game.short_description}
    </p>
    
    <div class="flex items-center justify-between">
      <span class="text-rose-pine-pine text-xs bg-rose-pine-base px-2 py-1 rounded">
        {game.genre}
      </span>
      <span class="text-rose-pine-muted text-xs">
        {game.platform}
      </span>
    </div>
  </div>
</div>
