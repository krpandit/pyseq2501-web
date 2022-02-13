import { browser } from "$app/env";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import type { Cmds, Reagent, ReagentGroup } from "./cmds";
import { defaults, reagentDefault } from "./cmds";
import websocketStore from "./ws_store";

export let try_connect: boolean = true

export type XY = {
  x: number;
  y: number;
}

export type Status = {
  x: number;
  y: number;
  z_tilt: [number, number, number];
  z_obj: number;
  laser_r: number;
  laser_g: number;
  shutter: boolean;
  moving: boolean;
  msg: string;
};

let status: Status = {
  x: -1,
  y: -1,
  z_tilt: [-1, -1, -1],
  z_obj: -1,
  laser_r: -1,
  laser_g: -1,
  shutter: false,
  moving: false,
  msg: "",
};

export type Recipe = {
  name: string,
  flowcell: 0 | 1,
  reagents: NReagent[],
  cmds: NCmd[],
}

export type ManualParams = {
  name: string,
  path: string,
  channels: [boolean, boolean, boolean, boolean],
  laser_onoff: [boolean, boolean],
  lasers: [number, number],
}

export type UserSettings = {
  n: number;
  x: number
  y: number
  z_tilt: number | [number, number, number],
  z_obj: number,
  laser_r: number,
  laser_g: number,
  flowcell: boolean,
  max_uid: 2,
  mode: "manual" | "automatic" | "editingA" | "editingB",
  recipes: [Recipe | null, Recipe | null],
  man_params: ManualParams
}

export type NReagent = { uid: number; reagent: Reagent | ReagentGroup };
export type NCmd = { uid: number; cmd: Cmds };

export type Hist = {
  counts: number[],
  bin_edges: number[]
}

export type Img = {
  img: string[],
  n: number,
  hist: Hist[],
  channels: [boolean, boolean, boolean, boolean],
}



export const recipeDefault: Recipe = {
  name: "",
  flowcell: 0,
  reagents: [{ uid: 0, reagent: { ...reagentDefault } }],
  cmds: [{ uid: 0, cmd: { ...defaults.image } }]
}

const userDefault: UserSettings = {
  n: 16, x: 0, y: 0, z_tilt: 19850, z_obj: 32000, laser_r: 5, laser_g: 5, flowcell: false, max_uid: 2,
  mode: "automatic", recipes: [{ ...recipeDefault }, { ...recipeDefault }],
  man_params: {
    name: "Test", path: ".", channels: [true, true, true, true], laser_onoff: [true, true],
    lasers: [50, 50],
  }
}

let img: Img = { n: 0, img: "", hist: { counts: [10], bin_edges: [0] } }

export const imgStore: Writable<Img> = (try_connect && browser)
  ? websocketStore(`ws://${ window.location.hostname }:8000/img`, img, (x) => JSON.parse(JSON.parse(x)))
  : writable(img)

export const statusStore: Writable<Status> = (try_connect && browser)
  ? websocketStore(`ws://${ window.location.hostname }:8000/status`, status, (x): Status => JSON.parse(JSON.parse(x)))
  : writable(status)

export const userStore: Writable<UserSettings> = (try_connect && browser)
  ? websocketStore(`ws://${ window.location.hostname }:8000/user`, userDefault, (x): Status => JSON.parse(JSON.parse(x)))
  : writable(userDefault)

export const cmdStore: Writable<undefined> = (try_connect && browser)
  ? websocketStore(`ws://${ window.location.hostname }:8000/cmd`, undefined, (x): Status => JSON.parse(JSON.parse(x)))
  : writable(undefined)

// export let status: Status = {
//   x: 2,
//   y: 5,
//   z_tilt: [0, 1, 2],
//   z_obj: 4,
//   laser_r: 3,
//   laser_g: 5,
//   shutter: false,
// };

// function genSSE(): EventSource {
//   const sse = new EventSource(`http://${ window.location.hostname }:8000/status`);
//   sse.onopen = () => (connected = true);
//   sse.onmessage = (event: MessageEvent<string>) => (status = JSON.parse(event.data));
//   sse.onerror = () => {
//     sse.close()
//     connected = false
//     console.log("Reconnecting SSE")
//     setTimeout(genSSE, 2000)
//   }
//   return sse;
// }

// if (typeof window !== 'undefined') {
//   genSSE()
// }

