<script lang="ts">
	import { visited } from "stores/countries";
	import { page } from "$app/stores";
	// import { browser } from "$app/environment";
	// import DOMPurify from "isomorphic-dompurify";
	import type { Country, CountryId } from "ts/countries";
	import Combobox from "components/ui/Combobox/Combobox.svelte";
	import type { ComboboxItem } from "components/ui/Combobox/Combobox.svelte";
	import ShareButtons from "components/share/ShareButtons.svelte";

	// state
	let visitedCountries: CountryId[] = [];
	const countryData: { [key: string]: Country } = $page.data.countryData;
	let comboboxItems: ComboboxItem[] =
		Object.values(countryData)
			.sort((a, b) => {
				if (!!a?.country_name && !!b?.country_name) {
					return a.country_name.localeCompare(b.country_name);
				} else if (!!a?.iso2 && !!b?.iso2) {
					return a.iso2.localeCompare(b.iso2);
				}
				return 0; // Add a default return value to handle the case when no comparison is made
			})
			.map((country: Country) => {
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

	const handleComboboxItemSelect = (event: any, countryCode: string) => {
		// Add the selected country to the visitedCountries array
		visitedCountries.push(countryCode);

		// Update the visitedCountries store
		visited.update((countries) => {
			const combinedValues = Array.from(new Set([...countries, ...visitedCountries]));
			return combinedValues;
		});
	};

	function deleteListItem(id: string) {
		visitedCountries = visitedCountries.filter((country) => country !== id);

		visited.set(Array.from(new Set([...visitedCountries])));
	}

	const handleListItemDeleteClick = (event: Event, id: string) => {
		deleteListItem(id);
	};

	const handleListItemDeleteKeydown = (event: Event, id: string) => {};
</script>

<div class="map-sidebar">
	<h2>Visited Countries</h2>
	<div><ShareButtons /></div>
	<div class="search">
		<Combobox items={comboboxItems} onItemSelect={handleComboboxItemSelect} />
	</div>
	<div class="data">
		<p>Visited: {visitedCountries.length}</p>
	</div>
	<ul class="location-list list-style-1">
		{#each visitedCountries as country}
			{#if country}
				<li class="location-item selectable-list-item">
					<span>{countryData[country].country_name}</span>
					<span
						class="delete"
						on:click={(event) => {
							if (!country) {
								return;
							}
							handleListItemDeleteClick(event, countryData[country].iso2);
						}}
						on:keydown={(event) => {
							if (!country) {
								return;
							}
						}}>X</span
					>
				</li>
			{/if}
		{/each}
	</ul>
</div>

<style lang="scss">
	.map-sidebar {
		padding: 0 var(--spacing-md);
		.search {
			position: static;
		}
		.data {
			padding-left: var(--spacing-xxs);
		}
		.location-list {
			padding-left: var(--spacing-xxs);

			.location-item {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.delete {
					cursor: pointer;
				}
			}
		}
	}
</style>
