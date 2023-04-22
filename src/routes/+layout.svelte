<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import type { LayoutData } from "./$types";

	import Header from "components/layout/header/Header.svelte";

	import "styles/variables.css";
	import "styles/global.scss";

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate("supabase:auth");
		});

		return () => subscription.unsubscribe();
	});
</script>

<Header />
<main class="main">
	<slot />
</main>
<footer class="footer">Made by Andri Braun</footer>

<style lang="scss">
	.main {
		padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 0;
		max-width: var(--site-width);
		margin: auto;
	}
	.footer {
		padding: var(--spacing-sm) var(--spacing-md);
		max-width: var(--site-width);
		margin: auto;
	}
</style>
