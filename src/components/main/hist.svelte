<script lang="ts">
  import * as Pancake from "@sveltejs/pancake";
  import type { Hist } from "$src/stores/imaging";

  export let hist: Hist;
  let max: number;

  function range(a, b, step) {
    const array = [];
    for (; a <= b; a += step) array.push(a);
    return array;
  }

  function gen_xy(bin_edges: number[], counts: number[]): { x: number; y: number }[] {
    return bin_edges.map((x: number, i: number) => ({ x, y: counts[i] }));
  }

  let f: { x: number; y: number }[] = [
    { x: 0, y: 0 },
    { x: 2000, y: 10 },
  ];

  $: {
    if (hist) {
      f = gen_xy(hist.bin_edges, hist.counts);
      max = Math.max(...hist.counts);
    }
  }
</script>

<div class="w-full h-full box-border">
  <Pancake.Chart x1={-10} x2={4096 + 10} y1={0} y2={max}>
    <!-- <Pancake.Grid horizontal count={5} let:value>
        <div class="relative left-0 block w-full border-b border-gray-100" />
        <span class="y label">{value}</span>
      </Pancake.Grid> -->

    <Pancake.Columns data={f} width={80}>
      <div class="absolute w-full bg-blue-800 bottom-6 h-[90%] opacity-60" />
    </Pancake.Columns>

    <Pancake.Grid vertical count={5} let:value>
      <span class="absolute bottom-0 right-0 text-sm text-center translate-x-1 vert">{value}</span>
    </Pancake.Grid>
  </Pancake.Chart>
</div>

<style lang="postcss">
  .vert::before {
    content: "";
    left: calc(50% - 1px);
    @apply absolute -mt-1.5 w-[1px] h-1.5 top-0 rounded bg-gray-500/[0.8];
  }

  .horizontal {
    width: 100%;
    left: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }

  .label {
    position: absolute;
    font-size: 14px;
    color: #666;
    line-height: 1;
    white-space: nowrap;
  }

  .y.label {
    left: calc(100% + 1em);
    bottom: -1em;
    line-height: 1;
  }

  .foreground .x.label {
    bottom: -36px;
  }

  .column.m {
    background-color: #1f77b4;
  }

  .f {
    background-color: #e377c2;
  }

  .medium .slider-container span {
    font-size: 3.5em;
  }

  .large .slider-container span {
    font-size: 5em;
  }
</style>
