<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import mapboxgl, { Map } from "mapbox-gl";
	// import type { MapboxGeoJSONFeature } from "mapbox-gl";

	import type { MapboxCountryBoundaryFeatureProperties, MapData, MapProjection } from "ts/maps";
	import type { CountryId } from "ts/countries";

	import { visited } from "stores/countries";
	import { mapElement } from "stores/maps";

	import { getUrlSearchParam } from "lib/utils/browser";


	import "mapbox-gl/dist/mapbox-gl.css";

	import { PUBLIC_MAPBOX_API_KEY } from "$env/static/public";
	import { dataset_dev } from "svelte/internal";

	// Props
	export const center: [number, number] | undefined = [0, 0];
	export const zoom: number | undefined = 1;
	export const style: string | undefined = "light-v11";

	const mapAccessToken = PUBLIC_MAPBOX_API_KEY;

// Snapshot state
let takingSnapshot = false;

	// Map state
	let map: Map;
	let hoveredCountryId: string | number | undefined | null = null;
	let visitedCountries: CountryId[] = [];
	let mapProjection: MapProjection = "winkelTripel";
	
	let currentZoom = zoom;
	let currentCenter = center;


	let staticMapUrl: string = "";


	/* Subscribe to writable store event on country selection change */
	visited.subscribe((countries) => {
		// Update the visitedCountries URL param with the new list of countries
		visitedCountries = countries;

		countries.length
			? $page.url.searchParams.set("visitedCountries", countries.join(","))
			: $page.url.searchParams.delete("visitedCountries");

		if (!browser) {
			return;
		}

		// If there are countries in the store, update the URL search params
		const searchParams = new URLSearchParams($page.url.searchParams.toString());

		if (!!countries.length) {
			goto(`?${$page.url.searchParams.toString()}`);
		} else if (!countries.length) {
			// If there are no countries in the store, remove the URL search params
			searchParams.delete("visitedCountries");
			goto($page.url.origin);
		}

		mapElement.set(map);
	});

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

// Event listeners
const handleImageGenerateClick = async () => {
takingSnapshot = true

setTimeout(() => {
map.resize();
	map.setZoom(2.9);
}, 200)


setTimeout(() => {
	const mapCanvas = map.getCanvas();
	const mapCanvasData = mapCanvas.toDataURL("image/png");

	const downloadLink = document.createElement("a");
	downloadLink.href = mapCanvasData;
	downloadLink.download = "map.png";
	downloadLink.click();

	takingSnapshot = false
}, 800)

setTimeout(() => {

	map.resize()
}, 1000)



};

	onMount(async () => {
		// Access browser URL search params and, if they contain a list of visited countries, set the visitedCountries store to that list
		function setVisitedCountriesFromSearchParams() {
			// Built-in svelte $page.url.searchParams object only works for set, not get
			const visitedCountryParam = getUrlSearchParam("visitedCountries");

			if (visitedCountryParam) {
				/* Also set the visitedCountries array to the list of countries in the URL search params,
				 ** since one is the local variable and the other is the writable store
				 */

				visitedCountries = visitedCountryParam.split(",");
				visited.set(visitedCountryParam.split(","));
			}
		}

		setVisitedCountriesFromSearchParams();

		mapboxgl.accessToken = mapAccessToken;
		map = new Map({
			container: "map-container",
			center,
			zoom: 2.9,
			antialias: true,
			style: `mapbox://styles/mapbox/${style}`,
			projection: { name: mapProjection },
			preserveDrawingBuffer: true
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

			/* Get all previously selected countries from the store,
			 ** drawn from URL search params and/or database,
			 ** and set their feature states to "selected"
			 */
			visited.subscribe((countries) => {
				for (let country of countries) {
					// Set the feature state to "selected" or "visited" for each country in the store
					map.setFeatureState(
						{
							source: "country-boundaries",
							sourceLayer: "country_boundaries",
							id: country
						},
						{ selected: true, visited: true }
					);
				}

				// Get all countries that are currently selected but not in the store
				const mapboxFeatureState = map.queryRenderedFeatures(undefined, {
					layers: ["country-boundaries-select"]
				});

				// Make sure that any that are in the store but not the string are deselected
				const unselected = mapboxFeatureState
					.filter((feature) => feature.state.selected === true && !countries.includes(feature.id))
					.map((feature) => feature.id);

				// Reset all feature states for countries that are currently selected but not in the store
				for (let country of unselected) {
					map.setFeatureState(
						{
							source: "country-boundaries",
							sourceLayer: "country_boundaries",
							id: country
						},
						{ selected: false, visited: false }
					);
				}

				mapElement.set(map);
			});

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
				/* If the user clicks on a country, add it to the visitedCountries array
				 ** and set the visited writable store to the new array
				 */
				if (!event?.features) {
					return;
				}
				const feature = event.features[0];
				const { properties }: { properties: any } = feature;
				const { id } = feature;
				const { iso_3166_1, iso_3166_1_alpha_3 } =
					properties as MapboxCountryBoundaryFeatureProperties;

				const visitedCountriesIndex = visitedCountries.findIndex(
					(country) => country === iso_3166_1
				);

				// Only add the country to the visitedCountries array if it's not already there
				// and set the feature state to visited
				if (visitedCountriesIndex === -1) {
					visitedCountries.push(id);

					map.setFeatureState(
						{
							source: "country-boundaries",
							sourceLayer: "country_boundaries",
							id: id
						},
						{ selected: true, visited: true }
					);
				}
				// If the country is already in the visitedCountries array, remove it
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

				/* Once local variable is finished with updates, push final result
				 ** to the writable store
				 */
				visited.update((countries) => [...visitedCountries]);

				mapElement.set(map);
			});

			map.on("zoomend", () => {
				mapElement.set(map);
			});

			mapElement.set(map);
		});
	});
</script>

<button
	on:click={() => handleImageGenerateClick()}
	>Download image
</button>

<div class={`map-container ${takingSnapshot ? "snapshot-container" : ""}`} id="map-container" />
<img src={staticMapUrl} alt="static map" />

<style lang="scss">
	.map-container {
		width: 100%;
		height: 540px;
	}
	.snapshot-container {
		// background: lavender;
		position: relative;
		top: 100px;
		left: 0;
		width: 100%;
		min-width: 4096px;
		min-height: 2304px;
	}
</style>
