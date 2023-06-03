import type { MapData } from "ts/maps";

export async function generateStaticImage({
	mapData,
	overlay
}: {
	mapData: MapData;
	overlay: GeoJSON.FeatureCollection;
}) {
	try {
		const response = await fetch("/api/map/static", {
			method: "POST",
			body: JSON.stringify({ mapData, overlay }),
			headers: { "content-type": "application/json" }
		});

		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
	}
}
