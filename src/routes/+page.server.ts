import { supabase } from "lib/data/helpers/database/supabaseClient";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const countryData = await supabase.from("countries").select("*");
	console.log(countryData);
	return {
		countryData
	};
}
