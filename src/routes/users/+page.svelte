<script lang="ts">
	export let data;

	const users: { slug: string; title: string; countries: string[] }[] = data.users;
</script>

<h1>Users</h1>

<ul>
	{#each users as { slug, title }}
		<li><a href="/blog/{slug}">{title}</a></li>
	{/each}
</ul>
