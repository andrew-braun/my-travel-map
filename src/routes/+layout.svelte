<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import type { LayoutData } from "./$types";

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

<header class="header">
	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
	</nav>
</header>
<main class="main">
	<slot />
</main>
<footer class="footer">Made by Andri Braun</footer>

<style>
	.header {
		padding: var(--spacing-sm) var(--spacing-md);
	}
	.main {
		padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 0;
	}
	.footer {
		padding: var(--spacing-sm) var(--spacing-md);
	}
</style>
