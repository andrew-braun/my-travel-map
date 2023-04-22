<script lang="ts">
	import Nav from "components/layout/nav/Nav.svelte";
	import Logo from "components/branding/logo/Logo.svelte";
</script>

<header class="header">
	<Logo />
	<Nav />
</header>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		padding: var(--spacing-sm) var(--spacing-md);
		max-width: var(--site-width);
		margin: auto;
		padding: var(--spacing-sm) var(--gutters);
	}
</style>
