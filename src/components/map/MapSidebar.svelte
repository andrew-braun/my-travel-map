<script lang="ts">
	import { visited } from "stores/countries";
	import { page } from "$app/stores";
	import DOMPurify from "isomorphic-dompurify";
	import type { Country, CountryId } from "ts/countries";
	import { searchCountries } from "lib/utils/search";

	let visitedCountries: CountryId[] = [];
	const countryData: { [key: string]: Country } = $page.data.countryData;

	visited.subscribe((countries) => {
		visitedCountries = countries;
	});

	let countryDropdownActive = false;

	let currentSearchValue: string = "";
	const handleSearchInput = (event: any) => {
		currentSearchValue = DOMPurify.sanitize(event.target.value);
	};

	const handleCountryDropdownItemClick = (event: any) => {
		console.log(event.target);
	};

	const handleCountryKeydown = (event: any) => {
		console.log(event.target);
	};
</script>

<div class="map-sidebar">
	<h2>Visited Countries</h2>
	<div class="search">
		<div class="combobox">
			<input
				placeholder="Search"
				on:input={(event) => handleSearchInput(event)}
				on:focusin={() => (countryDropdownActive = true)}
				on:focusout={() => (countryDropdownActive = false)}
			/>
			<div class={`select-list ${countryDropdownActive ? "active" : ""}`}>
				{#each searchCountries(Object.values(countryData), currentSearchValue) as country}
					<div
						class="select-list-item"
						on:click={(event) => handleCountryDropdownItemClick}
						on:keydown={(event) => handleCountryKeydown(event)}
					>
						{country.country_name}
					</div>
				{/each}
			</div>
		</div>
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
			.combobox {
				position: relative;
				.select-list {
					display: none;
					position: absolute;
					top: 100%;
					left: 0;
					z-index: 1;
					width: 100%;
					max-height: 200px;
					border: 1px solid #ccc;
					border-radius: 0.25rem;
					overflow-y: auto;
					background: #fff;

					&.active {
						display: block;
					}
				}
			}
		}
	}
</style>
