<script lang="ts">
  import { statusStore as ss } from "$src/stores/store";
</script>

<div class="dot left top-10">
  <div>Tilt 3</div>
  <p>{$ss.z_tilt[2]}</p>
</div>

<span class="dot left top-[18rem]">
  Tilt 2
  <p>{$ss.z_tilt[1]}</p>
</span>

<span class="dot right">
  Tilt 1
  <p class="translate-x-[1px]">{$ss.z_tilt[0]}</p>
</span>

<style lang="postcss">
  .dot {
    @apply absolute text-sm w-16 leading-4;
  }

  .dot span {
    @apply font-mono;
  }

  p {
    @apply font-mono text-base text-gray-700;
  }

  .right {
    @apply top-[18rem] left-36;
  }

  .left {
    @apply text-right float-right right-40;
  }
</style>
