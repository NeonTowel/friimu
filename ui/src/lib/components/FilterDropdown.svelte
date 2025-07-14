<script lang="ts">
  export let label: string;
  export let options: string[];
  export let selected: string;
  
  let isOpen = false;
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  
  function selectOption(option: string) {
    selected = option;
    isOpen = false;
  }
</script>

<div class="relative">
  <button 
    type="button"
    class="bg-rose-pine-surface border border-rose-pine-highlight-med rounded-lg px-4 py-2 text-rose-pine-text hover:bg-rose-pine-overlay transition-colors flex items-center space-x-2"
    on:click={toggleDropdown}
  >
    <span>{selected}</span>
    <svg class="h-4 w-4 text-rose-pine-subtle transform {isOpen ? 'rotate-180' : ''} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  {#if isOpen}
    <div class="absolute top-full left-0 mt-1 bg-rose-pine-surface border border-rose-pine-highlight-med rounded-lg shadow-lg z-10 min-w-full">
      {#each options as option}
        <button
          type="button"
          class="w-full text-left px-4 py-2 text-rose-pine-text hover:bg-rose-pine-overlay transition-colors first:rounded-t-lg last:rounded-b-lg"
          on:click={() => selectOption(option)}
        >
          {option}
        </button>
      {/each}
    </div>
  {/if}
</div>
