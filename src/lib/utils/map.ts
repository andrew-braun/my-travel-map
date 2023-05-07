export async function generateStaticImage() {
	const response = await fetch("/api/map/static", {
			method: "POST",
			// body: JSON.stringify({ a: "a" }),
			headers: { "content-type": "application/json" }
		});
	
	const data = await response.json();

	return data
}
