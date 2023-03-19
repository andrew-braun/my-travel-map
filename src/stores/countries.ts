import { writable } from "svelte/store";
import type { CountryId } from "ts/countries";

export const visited = writable<CountryId[]>([]);
