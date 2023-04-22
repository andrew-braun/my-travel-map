import { writable } from "svelte/store";
import type { Map } from "mapbox-gl";

export const currentMapCanvasURL = writable<string>("");
export const mapElement = writable<Map | null>(null);
