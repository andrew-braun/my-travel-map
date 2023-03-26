<script lang="ts" context="module">
	// types
	export interface ComboboxItem {
		label: string;
		value: string;
		id: string;
		searchKeywords: string[];
	}
</script>

<script lang="ts">
	// props
	export let items: ComboboxItem[];
	export let onItemSelect: (event: any, countryCode: string) => void | null = () => null;

	// state
	let active: boolean = false;
	let filteredResults: ComboboxItem[] = items;
	let selectedItemIndex: number = 0;

	// event handlers
	const handleSearchInput = (event: Event) => {
		const target = event.target as HTMLInputElement;

		function searchArrayForSubString(array: ComboboxItem[], subStrings: string) {
			return array.filter((item) => {
				return item.searchKeywords.some((keyword) => {
					return keyword.toLowerCase().includes(subStrings.toLowerCase());
				});
			});
		}

		if (event.target) {
			filteredResults = searchArrayForSubString(Object.values(items), target.value);
		}
	};

	const handleKeydown = (event: Event) => {
		// console.log(event);
	};

	const handleDropdownItemSelect = (event: Event, id: string) => {
		onItemSelect(event, id);
		active = false;
	};

	const handleDropdownItemKeydown = (event: Event) => {};
</script>

<div class="combobox">
	<input
		placeholder="Search"
		on:input={(event) => handleSearchInput(event)}
		on:click={() => (active = true)}
		on:focusin={() => (active = true)}
		on:focusout={() => (active = false)}
		on:keydown={(event) => handleKeydown(event)}
	/>

	<ul class={`select-list ${active ? "active" : ""}`}>
		{#each filteredResults as item, index}
			<li
				class="select-list-item {index === selectedItemIndex ? 'selected' : ''}"
				on:click={(event) => handleDropdownItemSelect(event, item.id)}
				on:keydown={(event) => handleDropdownItemKeydown(event)}
				data-index={index}
			>
				{item.label}
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
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
</style>
