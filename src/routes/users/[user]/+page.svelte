<script lang="ts">
	import type { User } from "ts/users";
	export let data;
	const { name, countries } = data.user;
</script>

<h1>{name}</h1>
<ul>
	{#each countries as country}
		<li>
			{country}
		</li>
	{/each}
</ul>
