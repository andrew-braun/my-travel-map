<script lang="ts">
	import { visited } from "stores/countries";
	import { page } from "$app/stores";
	import { browser } from "$app/environment";
	import DOMPurify from "isomorphic-dompurify";
	import type { Country, CountryId } from "ts/countries";
	import Combobox from "components/ui/Combobox/Combobox.svelte";
	import type { ComboboxItem } from "components/ui/Combobox/Combobox.svelte";

	// state
	let visitedCountries: CountryId[] = [];
	const countryData: { [key: string]: Country } = $page.data.countryData;
	let comboboxItems: ComboboxItem[] =
		Object.values(countryData).map((country: Country) => {
			return {
				label: country.country_name ?? country.iso2,
				value: country.iso2,
				id: country.iso2,
				searchKeywords: [
					country?.country_name ?? "",
					country?.iso2 ?? "",
					country?.iso3 ?? "",
					country?.capital_city ?? "",
					country?.continent ?? "",
					country?.region_iso2 ?? "",
					country?.local_name ?? ""
				]
			};
		}) ?? [];

	visited.subscribe((countries) => {
		visitedCountries = countries;
	});

	// State of item selection
	let selectedItemIndex = 0;
	$: selectedListItem = browser
		? document.querySelector(`.select-list-item[data-index="${selectedItemIndex}"]`)
		: null;

	// Handle selection

	const handleComboboxItemSelect = (event: any, countryCode: string) => {
		// Add the selected country to the visitedCountries array
		visitedCountries.push(countryCode);

		// Update the visitedCountries store
		visited.update((countries) => {
			const combinedValues = Array.from(new Set([...countries, ...visitedCountries]));
			return combinedValues;
		});
	};

	const handleCountryDropdownKeydown = (event: any) => {
		// Handle keyboard navigation and selection

		if (event.key === "ArrowDown") {
			selectedItemIndex += 1;
		} else if (event.key === "ArrowUp") {
			selectedItemIndex -= 1;
		}

		if (selectedListItem) {
			(selectedListItem as HTMLElement).focus();
		}

		// else if (event.key === "Enter") {

		// }
	};

	const handleCountryDropdownItemKeydown = (event: any) => {
		// console.log(event.key);
	};
</script>

<div class="map-sidebar">
	<h2>Visited Countries</h2>
	<div class="search">
		<Combobox items={comboboxItems} onItemSelect={handleComboboxItemSelect} />
	</div>
	<div class="data">
		<p>Visited: {visitedCountries.length}</p>
	</div>
	<ul>
		{#each visitedCountries as country}
			{#if country}
				<li>{countryData[country].country_name}</li>
			{/if}
		{/each}
	</ul>
</div>

<style lang="scss">
	.map-sidebar {
		.search {
			position: static;
		}
	}
</style>
