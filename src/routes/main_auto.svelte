<script lang="ts">
  import Editor from "$src/components/main/auto/editor.svelte";
  import FlowcellCard from "$src/components/main/auto/flowcell_card.svelte";
  import Modal from "$src/components/modal.svelte";
  import { localStore as ls } from "$src/stores/store";
</script>

<!-- <ProgressAuto /> -->
{#if $ls.mode === "automatic"}
  <p class="inline-block my-4 text-4xl font-extrabold tracking-tight text-gray-700 dark:text-white">Flowcells</p>
  <div class="flex mt-4 max-w-screen-lg space-x-6">
    <FlowcellCard fc={false} />
    <FlowcellCard fc={true} />
  </div>
{:else if $ls.mode === "editingA"}
  <Editor fc_={0} />
  <!-- <Modal /> -->
{:else if $ls.mode === "editingB"}
  <Editor fc_={1} />
{:else}
  <!-- YOU SHOULD NOT SEE THIS -->
{/if}
