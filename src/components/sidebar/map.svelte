<script lang="ts">
  import { cmdStore, statusStore as ss, userStore as us, XY } from "$src/stores/store";
  import { raw_to_local } from "../../coords";
  import BigZ from "./slide/big_z.svelte";
  import Slide from "./slide/slide.svelte";
  import Toggle from "./toggle.svelte";

  const focus = (el: HTMLElement) => {
    el.focus;
  };

  let xy: XY = { x: 0, y: 0 };
  $: {
    xy = raw_to_local($us.image_params.fc, $ss.x, $ss.y);
  }

  // let moving = false;

  // function onMouseDown() {
  //   moving = true;
  // }

  // function onMouseMove(e: MouseEvent) {
  //   if (moving) {
  //     left += e.movementX;
  //     top += e.movementY;
  //   }
  // }

  // function onMouseUp() {
  //   moving = false;
  // }
</script>

<li>
  <!-- Toggle -->
  <span class="flex items-center justify-center mb-4 space-x-2 text-lg -translate-y-6 monomedium">
    <div class="transition-all text-gray-500" class:text-gray-800={!$us.image_params.fc} class:font-semibold={!$us.image_params.fc}>A</div>
    <Toggle bind:checked={$us.image_params.fc} />
    <div class="transition-all text-gray-500" class:text-gray-800={$us.image_params.fc} class:font-semibold={$us.image_params.fc}>B</div>
  </span>
  <div class="-mt-4" />
  <Slide name={$us.image_params.fc ? "B" : "A"} x={xy.x} y={xy.y} />

  <!-- Z Objective -->
  <section class="flex self-center flex-grow mt-4 space-x-8">
    <BigZ name="All Tilt" value={`${($ss.z_tilt.reduce((a, b) => a + b) / $ss.z_tilt.length).toFixed(0)} ± ${(Math.max(...$ss.z_tilt) - Math.min(...$ss.z_tilt)) / 2}`} />
    <BigZ name="Objective Z" value={$ss.z_obj} />
  </section>

  <!-- Eject button -->
  <button
    class="self-center w-16 h-8 mt-2 text-white transition-colors bg-gray-500 border rounded-lg shadow-md shadow-gray-300 pretty hover:bg-gray-600 active:bg-gray-700 disabled:bg-gray-200 disabled:shadow-gray-200 focus:ring-gray-400"
    disabled={Boolean($ss.block)}
    on:click={() => {
      $ss.block = "moving";
      $cmdStore = { move: { xy0: [0, -7.5] } };
    }}
  >
    <svg
      class="w-4 h-4 mx-auto -translate-x-0.5 fill-white"
      version="1.1"
      viewBox="0 0 300.02 300.02"
      style="enable-background:new 0 0 300.02 300.02; border-top-right-radius:initial; border-bottom-right-radius:initial;"
      xml:space="preserve"
    >
      <path
        d="M285,260.01H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h270c8.284,0,15-6.716,15-15
          S293.284,260.01,285,260.01z"
      />
      <path
        d="M15,210.01h270c0.006-0.001,0.013-0.001,0.02,0c8.284,0,15-6.716,15-15c0-3.774-1.394-7.223-3.695-9.859
          L161.747,15.682c-2.845-3.583-7.171-5.672-11.747-5.672c-4.576,0-8.901,2.088-11.747,5.672l-135,170
          c-3.58,4.508-4.264,10.667-1.761,15.85C3.995,206.716,9.244,210.01,15,210.01z M150,49.13l103.934,130.88H46.066L150,49.13z"
      />
    </svg>
  </button>
</li>

<!-- <svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} /> -->
<style lang="postcss">
  /* .draggable {
    user-select: none;
    cursor: move;
    position: absolute;
  } */

  .monomedium {
    @apply font-mono font-medium;
  }

  .toggl-dark {
    --tw-bg-opacity: 0.8;
  }

  /* Remove arrows
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  } */

  input:invalid {
    @apply border-red-600 border-2;
  }

  input:valid {
    @apply border;
    border-color: inherit;
  }
</style>
