import { browser } from "$app/env";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { experimentDefault, NExperiment } from "./experiment";
import { Cmds, cmdDefaults, TakeImage } from "./command";
import websocketStore from "./ws_store";
import { Img, imgDefault } from "./imaging";
import { Status, statusDefault } from "./status";

let try_connect: boolean = true

export type XY = {
  x: number;
  y: number;
}


export type UserSettings = {
  block: Block
  max_uid: number,
  mode: "manual" | "automatic" | "editingA" | "editingB",
  exps: [NExperiment, NExperiment],
  image_params: TakeImage & { fc: 0 | 1, n: number }
}

export type Block = "" | "moving" | "ejecting" | "capturing" | "previewing" | "all"

const userDefault: Readonly<UserSettings> = {
  block: "",
  max_uid: 2,
  mode: "editingA",
  exps: [{ ...experimentDefault }, { ...experimentDefault }],
  image_params: { ...cmdDefaults["takeimage"], fc: 0, n: 1 }
}

const t: TakeImage = cmdDefaults["takeimage"]
export const imgStore: Writable<Img> = writable({ ...imgDefault })

export const statusStore: Writable<Status> = (try_connect && browser)
  ? websocketStore(`ws://${ window.location.hostname }:8000/status`, { ...statusDefault }, (x): Status => JSON.parse(JSON.parse(x)))
  : writable({ ...statusDefault })

export const userStore: Writable<UserSettings> = (try_connect && browser)
  ? websocketStore(`ws://${ window.location.hostname }:8000/user`, { ...userDefault }, (x): Status => JSON.parse(JSON.parse(x)))
  : writable({ ...userDefault })

export const cmdStore: Writable<string> = (try_connect && browser)
  ? websocketStore(`ws://${ window.location.hostname }:8000/cmd`, "", (x) => x, false)
  : writable("")

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
