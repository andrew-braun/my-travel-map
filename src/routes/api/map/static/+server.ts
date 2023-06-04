/* eslint @typescript-eslint/no-var-requires: "off" */
// import { mapElement } from "stores/maps.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { error } from "@sveltejs/kit";
const mbxStatic = require("@mapbox/mapbox-sdk/services/static");
import simplify from "simplify-geojson";
import { PUBLIC_MAPBOX_API_KEY } from "$env/static/public";
import type { MapData } from "ts/maps";
import type { GeoJsonOverlay } from "@mapbox/mapbox-sdk/services/static";

async function generateStaticMap({
	mapData,
	overlay
}: {
	mapData: MapData;
	overlay?: GeoJsonOverlay[];
}) {
	try {
		// console.log(overlay);
		// Only works on the server

		const { style } = mapData;

		const staticClient = mbxStatic({ accessToken: PUBLIC_MAPBOX_API_KEY });
		const simplifiedGeoJson = overlay?.map((feature) => {
			const { geoJson } = feature;
			const { type, id, state, geometry, layer } = geoJson as any;

			const newObject = {
				geometry,
				id,
				layer: {
					id: layer.id,
					type: layer.type,
					paint: layer.paint
				},
				type,
				state
			};

			const simplifiedFeature = simplify(newObject, 5);

			// return { ...feature, geoJson: simplify(feature.geoJson, 0.1) };
			return { geoJson: simplifiedFeature };
		});

		console.log(simplifiedGeoJson);

		const staticImageResponse = await staticClient.getStaticImage({
			ownerId: "mapbox",
			styleId: style ?? "streets-v11",
			width: 1280,
			height: 720,
			position: {
				coordinates: [12, 13],
				zoom: 1
			},
			overlays: simplifiedGeoJson
		});
		console.log(staticImageResponse);
		const staticImageUrl = await staticImageResponse.url();

		return { url: staticImageUrl, simplifiedGeoJson };
	} catch (error) {
		console.error(error);
		return { error };
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const body = await request.json();
		const { mapData, overlay }: { mapData: MapData; overlay: GeoJsonOverlay[] } = body;

		const mapUrl = await generateStaticMap({ mapData, overlay });

		return new Response(String(JSON.stringify({ ...mapUrl })));
	} catch (err) {
		throw error(500, JSON.stringify(err));
	}
}
