<nav class="nav">
	<a href="/" class="nav-item">Home</a>
	<a href="/about" class="nav-item">About</a>
</nav>

<style lang="scss">
	.nav {
		display: flex;
		align-items: center;

		.nav-item {
			padding: var(--spacing-sm) var(--spacing-md);
			font-size: var(--font-size-md);
			border-radius: var(--border-radius-md);
			transition: var(--ease-in-out-md);

			&:hover {
				background-color: var(--highlight-color);
				color: var(--text-highlight-color);
			}
		}
	}
</style>
