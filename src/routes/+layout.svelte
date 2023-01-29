<script>
	import { onMount } from "svelte";
	import { supabase } from "lib/helpers/database/supabaseClient";
	import { invalidate } from "$app/navigation";

	import "styles/variables.css";
	import "styles/global.scss";

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate("supabase:auth");
		});

		return () => {
			subscription.unsubscribe();
		};
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
