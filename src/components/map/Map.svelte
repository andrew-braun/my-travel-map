<script lang="ts">
	import { onMount } from "svelte";
	import mapboxgl, { Map } from "mapbox-gl";
	import "mapbox-gl/dist/mapbox-gl.css";
	import { PUBLIC_MAPBOX_API_KEY } from "$env/static/public";

	// Props
	export const center: [number, number] = [0, 0];
	export const zoom: number = 1;
	export const style: string = "light-v11";

	const mapAccessToken = PUBLIC_MAPBOX_API_KEY;

	// Initialize map
	let map: Map;

	onMount(async () => {
		mapboxgl.accessToken = mapAccessToken;
		map = new Map({
			container: "map-container",
			center,
			zoom,
			style: `mapbox://styles/mapbox/${style}`,
			projection: "winkelTripel"
		});

		map.on("load", () => {
			// Resize map to fit container
			map.resize();
			map.setFog({
				color: "rgb(186, 210, 235)", // Lower atmosphere
				"high-color": "rgb(36, 92, 223)", // Upper atmosphere
				"horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
				"space-color": "rgb(11, 11, 25)", // Background color
				"star-intensity": 0.6 // Background star brightness (default 0.35 at low zoooms )
			});
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
