<script lang="ts">
	import { visited } from "stores/countries";
	import type { Country, CountryId } from "ts/countries";

	let visitedCountries: CountryId[] = [];

	visited.subscribe((countries) => {
		visitedCountries = countries;
	});
</script>

<div class="map-sidebar">
	<h2>Visited Countries</h2>
	<ul>
		{#each visitedCountries as country}
			<li>{country}</li>
		{/each}
	</ul>
</div>
