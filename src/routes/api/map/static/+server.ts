/* eslint @typescript-eslint/no-var-requires: "off" */
// import { mapElement } from "stores/maps.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { error } from "@sveltejs/kit";
const mbxStatic = require("@mapbox/mapbox-sdk/services/static");
import { PUBLIC_MAPBOX_API_KEY } from "$env/static/public";
import type { MapData } from "ts/maps";

async function generateStaticMap({
	mapData,
	overlay
}: {
	mapData: MapData;
	overlay?: GeoJSON.FeatureCollection | null | undefined;
}) {
	console.log(overlay);
	// Only works on the server

	const { style } = mapData;

	const staticClient = mbxStatic({ accessToken: PUBLIC_MAPBOX_API_KEY });

	const staticImageResponse = await staticClient.getStaticImage({
		ownerId: "mapbox",
		styleId: style ?? "streets-v11",
		width: 1280,
		height: 720,
		position: {
			coordinates: [12, 13],
			zoom: 1
		}
	});
	console.log(staticImageResponse);

	const staticImageUrl = await staticImageResponse.url();

	return { url: staticImageUrl };
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const body = await request.json();
		const { mapData, overlay }: { mapData: MapData; overlay: GeoJSON.FeatureCollection } =
			body.mapData;

		const mapUrl = await generateStaticMap({ mapData, overlay });

		return new Response(String(JSON.stringify({ ...mapUrl })));
	} catch (err) {
		throw error(500, JSON.stringify(err));
	}
}
