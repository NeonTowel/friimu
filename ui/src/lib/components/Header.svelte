<script lang="ts">
  let searchQuery = '';
</script>

<header class="bg-rose-pine-base border-b border-rose-pine-highlight-med">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <div class="flex items-center">
        <div class="flex-shrink-0 flex items-center">
          <span class="text-rose-pine-love mr-2">✦</span>
          <h1 class="text-xl font-bold text-rose-pine-text">Friimu</h1>
        </div>
      </div>
      
      <div class="flex-1 max-w-md mx-8">
        <div class="relative">
          <input
            type="text"
            placeholder="Search"
            bind:value={searchQuery}
            class="w-full bg-rose-pine-surface border border-rose-pine-highlight-med rounded-lg px-4 py-2 pl-10 text-rose-pine-text placeholder-rose-pine-subtle focus:outline-none focus:ring-2 focus:ring-rose-pine-love focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-rose-pine-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="flex items-center space-x-4">
      </div>
    </div>
  </div>
</header>
