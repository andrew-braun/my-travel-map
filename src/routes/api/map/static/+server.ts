/* eslint @typescript-eslint/no-var-requires: "off" */
import { createRequire } from "module"
const require = createRequire(import.meta.url);
import { error } from "@sveltejs/kit";
const mbxStatic = require("@mapbox/mapbox-sdk/services/static");
import { PUBLIC_MAPBOX_API_KEY } from "$env/static/public";

async function generateStaticMap(mapData ) {
	// Only works on the server

	const staticClient = mbxStatic({ accessToken: PUBLIC_MAPBOX_API_KEY });
	
	const staticImageResponse = await staticClient.getStaticImage({
		ownerId: 'mapbox',
		styleId: 'streets-v11',
		width: 1280, 
		height: 720,
		position: {
			coordinates: [12, 13],
			zoom: 1
		}
	})
	
	const staticImageUrl = staticImageResponse.url();

	return staticImageUrl;


	// Generate a static map using an existing mapbox map element
}

/** @type {import('./$types').RequestHandler} */
export async function POST() {
	try {
		const mapUrl = await generateStaticMap();

		return new Response(String(JSON.stringify({mapUrl})));
		
	} catch (err) {
		throw error(500, JSON.stringify(err));
	}


}
