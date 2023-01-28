<script lang="ts">
	import { onMount } from "svelte";
	import mapboxgl, { Map } from "mapbox-gl";
	import "mapbox-gl/dist/mapbox-gl.css";

	import type { MapboxMap } from "ts/maps";

	import { PUBLIC_MAPBOX_API_KEY } from "$env/static/public";

	// Props
	export const center: [number, number] = [0, 0];
	export const zoom: number = 1;
	export const style: string = "light-v11";

	const mapAccessToken = PUBLIC_MAPBOX_API_KEY;

	// Initialize map
	let mapInstance: Map;

	onMount(async () => {
		mapboxgl.accessToken = mapAccessToken;
		mapInstance = new Map({
			container: "map-container",
			center,
			zoom,
			style: `mapbox://styles/mapbox/${style}`,
			projection: { name: "winkelTripel" }
		});

		mapInstance.on("load", () => {
			// Resize map to fit container
			mapInstance.resize();
		});
	});

	export let map: MapboxMap;
</script>

<div class="map-container" id="map-container" />

<style>
	.map-container {
		width: 100%;
		height: 540px;
	}
</style>
