<nav class="nav">
	<a href="/" class="nav-item">Home</a>
	<a href="/about" class="nav-item">About</a>
</nav>

<style lang="scss">
	@use "src/styles/mixins" as mixins;
	.nav {
		display: flex;
		align-items: center;

		.nav-item {
			@include mixins.basic-button;
		}
	}
</style>
