import type { MapData } from "ts/maps";

export async function generateStaticImage(mapData: MapData) {
	try {
		const response = await fetch("/api/map/static", {
			method: "POST",
			body: JSON.stringify({ mapData: mapData }),
			headers: { "content-type": "application/json" }
		});

		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
	}
}
