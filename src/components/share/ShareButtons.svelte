<script lang="ts">
	const handleCopyUrlClick = (event: Event) => {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
	};
</script>

<div class="container">
	<button class="share-button copy-url" on:click={(event) => handleCopyUrlClick(event)}
		>Copy URL</button
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
