<script lang="ts">
	import { onMount } from "svelte";
	import mapboxgl, { Map } from "mapbox-gl";
	import "mapbox-gl/dist/mapbox-gl.css";

	import { PUBLIC_MAPBOX_API_KEY } from "$env/static/public";

	// Props
	export const center: [number, number] | undefined = [0, 0];
	export const zoom: number | undefined = 1;
	export const style: string | undefined = "light-v11";

	const mapAccessToken = PUBLIC_MAPBOX_API_KEY;

	// Initialize map
	let map: Map;

	onMount(async () => {
		console.log("hi");
		mapboxgl.accessToken = mapAccessToken;
		map = new Map({
			container: "map-container",
			center,
			zoom,
			style: `mapbox://styles/mapbox/${style}`,
			projection: { name: "winkelTripel" }
		});

		map.on("load", () => {
			// Resize map to fit container
			map.resize();
		});
	});
</script>

<div class="map-container" id="map-container" />

<style>
	.map-container {
		width: 100%;
		height: 540px;
	}
</style>
