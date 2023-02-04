<script lang="ts">
	import { onMount } from "svelte";
	import mapboxgl, { Map } from "mapbox-gl";
	// import type { MapboxGeoJSONFeature } from "mapbox-gl";
	import type { MapboxCountryBoundaryFeatureProperties } from "ts/maps";
	import "mapbox-gl/dist/mapbox-gl.css";

	import { PUBLIC_MAPBOX_API_KEY } from "$env/static/public";

	// Props
	export const center: [number, number] | undefined = [0, 0];
	export const zoom: number | undefined = 1;
	export const style: string | undefined = "light-v11";

	const mapAccessToken = PUBLIC_MAPBOX_API_KEY;

	// Initialize map
	let map: Map;
	let hoveredCountryId: string | number | undefined | null = null;
	let visitedCountries: {
		id: string | number | undefined;
		iso_3166_1: string;
		iso_3166_1_alpha_3: string;
	}[] = [];

	// Centralize map colors
	let colors: { hover: string; visited: string } = {
		hover: "firebrick",
		visited: "rebeccapurple"
	};

	/* Users can switch between "visited", "wantToVisit", and "planToVisit" selection modes.
	 ** Each mode is stored in a separate array and has its own associated color.
	 */
	let selectionMode: keyof typeof colors = "visited";
	$: currentSelectionColor = colors[selectionMode];

	onMount(async () => {
		mapboxgl.accessToken = mapAccessToken;
		map = new Map({
			container: "map-container",
			center,
			zoom,
			style: `mapbox://styles/mapbox/${style}`,
			projection: { name: "winkelTripel" }
		});

		/* All map manipulations must be included in the async onload function*/
		map.on("load", () => {
			// Resize map to fit container
			map.resize();

			// The country boundary source
			map.addSource("country-boundaries", {
				type: "vector",
				url: "mapbox://mapbox.country-boundaries-v1",
				promoteId: "iso_3166_1"
			});

			let worldviewFilter = [
				"any",
				["==", "all", ["get", "worldview"]],
				["in", "US", ["get", "worldview"]]
			];

			/* The layer includes a paint effect that sets opacity based on the value of
			 ** hover in feature state, which is set in the onMouseMove and onMouseLeave functions*/
			map.addLayer(
				{
					id: "country-boundaries-hover",
					type: "fill",
					source: "country-boundaries",
					"source-layer": "country_boundaries",
					filter: worldviewFilter,
					paint: {
						"fill-color": colors.hover,
						"fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 1, 0]
					}
				},
				"country-label"
			);

			/* There might be a more efficient way to persist selected countries separate from hover
			 ** effects, but this works!
			 */
			map.addLayer(
				{
					id: "country-boundaries-select",
					type: "fill",
					source: "country-boundaries",
					"source-layer": "country_boundaries",
					filter: worldviewFilter,
					paint: {
						"fill-color": [
							"case",
							["boolean", ["feature-state", "selected"], false],
							currentSelectionColor,
							"transparent"
						],
						"fill-opacity": ["case", ["boolean", ["feature-state", "selected"], false], 1, 0]
					}
				},
				"country-label"
			);

			/* Create hover effects by manipulating feature states */
			map.on("mousemove", "country-boundaries-hover", (event) => {
				if (!event?.features) {
					return;
				}

				/* Every setFeatureState call requires both the source and the sourceLayer to work */
				if (event.features.length > 0) {
					const feature = event.features[0];

					if (hoveredCountryId !== null) {
						map.setFeatureState(
							{
								source: "country-boundaries",
								sourceLayer: "country_boundaries",
								id: hoveredCountryId
							},
							{ hover: false }
						);
					}
					hoveredCountryId = feature.id;

					map.setFeatureState(
						{
							source: "country-boundaries",
							sourceLayer: "country_boundaries",
							id: hoveredCountryId
						},
						{ hover: true }
					);

					map.getCanvas().style.cursor = "pointer";
				}
			});

			map.on("mouseleave", "country-boundaries-hover", () => {
				if (hoveredCountryId !== null) {
					map.setFeatureState(
						{
							source: "country-boundaries",
							sourceLayer: "country_boundaries",
							id: hoveredCountryId
						},
						{ hover: false }
					);
				}

				hoveredCountryId = null;
				map.getCanvas().style.cursor = "grab";
			});

			map.on("click", "country-boundaries-select", (event) => {
				if (!event?.features) {
					return;
				}
				const feature = event.features[0];
				const { properties }: { properties: any } = feature;
				const { id } = feature;
				const { iso_3166_1, iso_3166_1_alpha_3 } =
					properties as MapboxCountryBoundaryFeatureProperties;

				const visitedCountriesIndex = visitedCountries.findIndex(
					(country) => country.id === iso_3166_1
				);

				if (visitedCountriesIndex === -1) {
					visitedCountries.push({ id, iso_3166_1, iso_3166_1_alpha_3 });

					map.setFeatureState(
						{
							source: "country-boundaries",
							sourceLayer: "country_boundaries",
							id: id
						},
						{ selected: true, visited: true }
					);
				}
				console.log(visitedCountries);

				if (visitedCountriesIndex !== -1) {
					visitedCountries.splice(visitedCountriesIndex, 1);

					map.setFeatureState(
						{
							source: "country-boundaries",
							sourceLayer: "country_boundaries",
							id: id
						},
						{ selected: false, visited: false }
					);
				}
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
