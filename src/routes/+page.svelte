<script lang="ts">
	import Map from "components/map/Map.svelte";
	import type { Load } from "@sveltejs/kit";

	// import type { Map} from "ts/maps"

	// /** @type {import('./$types').PageServerLoad} */
	// let Map: Map ;
	// export const load: Load = async ({ params }) => {
	// 	Map = await import("components/map/Map.svelte");

	// 	return;
	// };
</script>

<div class="map-container">
	<Map />
</div>
