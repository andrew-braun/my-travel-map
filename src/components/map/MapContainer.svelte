<script type="ts">
	import Map from "components/map/Map.svelte";
	import MapSidebar from "components/map/MapSidebar.svelte";
</script>

<div class="map-container">
	<div class="map">
		<Map />
	</div>
	<aside class="sidebar">
		<MapSidebar />
	</aside>
</div>

<style lang="scss">
	.map-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.map {
		flex: 1;
		min-width: 80%;
	}

	.sidebar {
		flex: 1;
		max-width: 20%;
		min-width: 200px;
	}
</style>
