<script lang="ts">
	import { page } from "$app/stores";
	import LinkBold from "~icons/ph/link-bold";
	import FacebookLogo from "~icons/ph/facebook-logo";
	import TwitterLogo from "~icons/ph/twitter-logo";
	import DownloadSimple from "~icons/ph/download-simple";
	import { visited } from "stores/countries";
	import { currentMapCanvasURL } from "stores/maps";
	import type { CountryId } from "ts/countries";

	let visitedCountries: CountryId[] = [];
	visited.subscribe((countries) => {
		visitedCountries = countries;
	});

	let currentUrl = "";
	page.subscribe((page) => (currentUrl = page.url.toString()));

	let mapCanvasURL: string = "";
	currentMapCanvasURL.subscribe((url) => {
		mapCanvasURL = url;
	});

	const handleCopyUrlClick = (event: Event) => {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
	};

	const handleImageDownloadClick = (event: Event) => {
		return;
	};
</script>

<div class="container">
	<button class="share-button share-link copy-url" on:click={(event) => handleCopyUrlClick(event)}
		><LinkBold /></button
	>
	<a
		href={`${mapCanvasURL}`}
		download="download-map"
		class="share-link facebook"
		target="_blank"
		on:click={(event) => handleImageDownloadClick(event)}><DownloadSimple /></a
	>
	<a
		href={`https://www.facebook.com/share.php?u=${currentUrl}`}
		class="share-link facebook"
		target="_blank"><FacebookLogo /></a
	>
	<a
		href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
			currentUrl
		)}&text=${encodeURIComponent(
			`I've been to ${visitedCountries.length} countries! How about you?`
		)}`}
		class="share-link twitter"
		target="_blank"><TwitterLogo /></a
	>
</div>

<style lang="scss">
	@use "src/styles/mixins" as mixins;
	.container {
		display: flex;
		align-items: center;
		padding: var(--spacing-sm) 0;

		.share-button,
		.share-link {
			@include mixins.basic-button;

			background: none;
			border: none;
			padding: var(--spacing-sm);
			margin: 0;
		}
	}
</style>
