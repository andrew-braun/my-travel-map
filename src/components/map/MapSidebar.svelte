<script lang="ts">
	import { visited } from "stores/countries";
	import { page } from "$app/stores";
	import type { Country, CountryId } from "ts/countries";

	let visitedCountries: CountryId[] = [];
	const countryData = $page.data.countryData;

	visited.subscribe((countries) => {
		visitedCountries = countries;
	});
</script>

<div class="map-sidebar">
	<h2>Visited Countries</h2>
	<div class="data">
		<p>Number of countries visited: {visitedCountries.length}/{Object.keys(countryData).length}</p>
	</div>
	<ul>
		{#each visitedCountries as country}
			{#if country}
				<li>{countryData[country].country_name}</li>
			{/if}
		{/each}
	</ul>
</div>
