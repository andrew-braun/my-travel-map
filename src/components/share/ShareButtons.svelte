<script lang="ts">
	import LinkBold from "~icons/ph/link-bold";
	import FacebookLogo from "~icons/ph/facebook-logo";
	import { visited } from "stores/countries";

	import { browser } from "$app/environment";

	let currentUrl = browser ? window.location.href : "";

	visited.subscribe(() => {
		currentUrl = window.location.href;
	});

	const handleCopyUrlClick = (event: Event) => {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
	};
</script>

<div class="container">
	<button class="share-button copy-url" on:click={(event) => handleCopyUrlClick(event)}
		><LinkBold /></button
	>
	<a
		href={`https://www.facebook.com/share.php?u=${currentUrl}`}
		class="share-link facebook"
		target="_blank"><FacebookLogo /></a
	>
</div>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
		padding: var(--spacing-sm) 0;

		.share-button {
			&.copy-url {
				margin-right: var(--spacing-sm);
			}
		}
	}
</style>
