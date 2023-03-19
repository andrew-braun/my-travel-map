import { supabase } from "lib/data/helpers/database/supabaseClient";
// import type { Database } from "ts/supabase";
import type { Country } from "ts/countries";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const countryDataQuery = await supabase.from("countries").select("*");
	const countryData: Record<Country["iso2"], Country> = {};
	if (countryDataQuery.data) {
		for (const country of countryDataQuery.data) {
			countryData[country.iso2] = country;
		}
	}
	return {
		countryData
	};
}
