import type { Database } from "../ts/supabase";
export interface Country {
	id: string | number | undefined;
	iso_3166_1?: string;
	iso_3166_1_alpha_3?: string;
	iso2: string;
	iso3: string | null;
	capital_city: string | null;
	continent: Database["public"]["Enums"]["continents"] | null;
	country_name: string | null;
	latitude: number | null;
	local_name: string | null;
	longitude: number | null;
	region_iso2: string | null;
}
export type CountryId = string | number | undefined;
