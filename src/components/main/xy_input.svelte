<script lang="ts">
  import { raw_to_local } from "$src/coords";
  import { cmdStore, statusStore as status, userStore as us, statusStore as ss } from "$src/stores/store";
  import { checkRange } from "$src/utils";
  import { createEventDispatcher } from "svelte";
  import Go from "./go.svelte";

  const dispatch = createEventDispatcher();
  export let i: 0 | 1;
  export let xy: [number, number] = [-1, -1];

  function copyCurrent() {
    const { x, y } = raw_to_local($us.image_params.fc, $status.x, $status.y);
    xy[0] = Math.round((x + Number.EPSILON) * 100) / 100; // How is it possible that there are no better ways to round??
    xy[1] = Math.round((y + Number.EPSILON) * 100) / 100;
  }
  let disabled = false;
  $: disabled = Boolean($ss.block);
</script>

<!-- XY Input -->
<div class="flex gap-x-2">
  <div class="flex font-medium">
    <span class="flex items-center border-l rounded-l-lg color-group" class:span-disabled={$ss.block}>X</span>
    <input
      bind:value={xy[0]}
      on:change={() => dispatch("change")}
      type="number"
      min="-5"
      max="30"
      step="0.01"
      use:checkRange={[-5, 30]}
      class="z-10 h-10 text-center rounded-none pretty w-28"
      {disabled}
    />
    <span class="flex items-center color-group" class:span-disabled={$ss.block}>Y</span>
    <input
      bind:value={xy[1]}
      on:change={() => dispatch("change")}
      type="number"
      min="-5"
      max="80"
      use:checkRange={[-5, 80]}
      step="0.01"
      class="z-10 h-10 text-center rounded-l-none rounded-r-lg pretty w-28"
      {disabled}
    />
  </div>

  <Go
    {disabled}
    on:click={() => {
      $ss.block = "moving";
      $cmdStore = { move: i === 0 ? { xy0: xy } : { xy1: xy } };
    }}
  />

  <button
    type="button"
    class="px-4 py-1 text-sm font-medium text-gray-900 rounded-lg white-button disabled:bg-gray-50 disabled:hover:bg-gray-50 disabled:active:bg-gray-50 disabled:text-gray-500"
    {disabled}
    on:click={copyCurrent}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
      />
    </svg>
    Current
  </button>
</div>

<style lang="postcss">
  .span-disabled {
    @apply text-gray-500 bg-gray-50 border-gray-200;
  }
</style>
