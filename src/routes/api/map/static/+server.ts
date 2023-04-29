import { error } from "@sveltejs/kit";
import { generateStaticMap } from "lib/utils/map.js";

/** @type {import('./$types').RequestHandler} */
export function POST({ url }) {
	try {
		// generateStaticMap("map!");
		console.log(url);
	} catch (err) {
		throw error(500, JSON.stringify(err));
	}

	return new Response(String(JSON.stringify({ response: "Hello" })));
}
