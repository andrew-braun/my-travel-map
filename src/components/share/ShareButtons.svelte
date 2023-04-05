<script lang="ts">
	import { page } from "$app/stores";
	import LinkBold from "~icons/ph/link-bold";
	import FacebookLogo from "~icons/ph/facebook-logo";
	import TwitterLogo from "~icons/ph/twitter-logo";
	import { visited } from "stores/countries";
	import type { CountryId } from "ts/countries";

	let visitedCountries: CountryId[] = [];
	visited.subscribe((countries) => {
		visitedCountries = countries;
	});

	let currentUrl = "";
	page.subscribe((page) => (currentUrl = page.url.toString()));

	const handleCopyUrlClick = (event: Event) => {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
	};
</script>

<div class="container">
	<button class="share-button share-link copy-url" on:click={(event) => handleCopyUrlClick(event)}
		><LinkBold /></button
	>
	<a
		href={`https://www.facebook.com/share.php?u=${currentUrl}`}
		class="share-link facebook"
		target="_blank"><FacebookLogo /></a
	>
	<a
		href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
			currentUrl
		)}?text=${encodeURIComponent(
			`I've been to ${visitedCountries.length} countries! How about you?`
		)}`}
		class="share-link twitter"
		target="_blank"><TwitterLogo /></a
	>
</div>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
		padding: var(--spacing-sm) 0;

		.share-button {
			background: none;
			border: none;
			padding: 0;
			margin: 0;
		}
	}
</style>
