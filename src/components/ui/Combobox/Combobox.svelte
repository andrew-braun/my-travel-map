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

	// bindings
	let inputBinding: string = "";

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
		inputBinding = "";
	};

	const handleDropdownItemKeydown = (event: Event) => {};
</script>

<div class="combobox">
	<input
		placeholder="Search"
		class={`combobox-input ${active ? "active-input" : ""}`}
		on:input={(event) => handleSearchInput(event)}
		on:click={() => (active = true)}
		on:focusin={() => (active = true)}
		on:keydown={(event) => handleKeydown(event)}
		bind:value={inputBinding}
	/>

	<ul class={`select-list list-style-1 ${active ? "active" : ""}`}>
		{#each filteredResults as item, index}
			<li>
				<button
					class="select-list-item selectable-list-item {index === selectedItemIndex
						? 'selected'
						: ''}"
					on:click={(event) => handleDropdownItemSelect(event, item.id)}
					on:keydown={(event) => handleDropdownItemKeydown(event)}
					data-index={index}
				>
					{item.label}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.combobox {
		position: relative;
		.combobox-input {
			transition: var(--ease-in-out-med);
			&.active-input {
				border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
			}
		}

		.select-list {
			display: none;
			position: absolute;
			top: 50%;
			left: 0;
			z-index: 1;
			width: 100%;
			max-height: 200px;
			border: 1px solid var(--accent-color-1);
			border-radius: var(--border-radius-sm);
			padding-right: var(--spacing-sm);
			background: var(--primary-background);
			overflow-y: auto;

			&.active {
				display: block;
				border-top: none;
				border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
			}
		}
	}
</style>
