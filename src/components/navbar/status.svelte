<script lang="ts">
  import { browser } from "$app/env";
  import Spinning from "$comps/spinning.svelte";
  import tooltip from "$src/tooltip";
  import Prism from "prismjs";
  import { statusStore as ss } from "../../stores/store";
  import { flash } from "../../utils";
  import "./prism.css";
  let message = "Idle";
  const re = /(ing)/;

  let div: HTMLElement;
  let latest: number;
  $: {
    if (browser && latest !== $ss.msg.t) {
      message = $ss.msg.msg;
      latest = $ss.msg.t;
      flash(div);
    }
  }
</script>

<div class="grid w-full grid-cols-2">
  <div class="relative flex items-center py-2 font-mono text-base font-semibold text-gray-800" use:tooltip={message}>
    <div class="ml-2">
      {#if message.search("Error") != -1}
        <svg role="img" height="16" viewBox="0 0 16 16" version="1.1" fill="rgb(207, 34, 46)" class="pl-1">
          <path
            fill-rule="evenodd"
            d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
          />
        </svg>
      {:else if message.search(re) == -1}
        <svg aria-label="connected" class="w-5 h-5" role="img" viewBox="0 0 16 16" fill="rgb(26, 127, 55)">
          <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
        </svg>
      {:else}
        <div class="w-5 h-5 translate-x-0.5 translate-y-0.5"><Spinning /></div>
      {/if}
    </div>
    <!-- Text -->
    <code class="max-w-full px-2 py-2 mx-1 overflow-hidden rounded-lg overflow-ellipsis whitespace-nowrap" bind:this={div}>
      {@html Prism.highlight(message, Prism.languages.javascript, "javascript")}
    </code>
  </div>

  <code class="relative flex items-center py-2 font-mono text-sm text-gray-800 overflow-x-ellipsis whitespace-nowrap">
    {$ss.msg2.msg}
  </code>
</div>
