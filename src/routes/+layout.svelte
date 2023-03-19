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

<header>
	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
	</nav>
</header>
<slot />
<footer>Made by Andri Braun</footer>

<style></style>
