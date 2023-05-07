export interface MapType {
	center: [number, number] | undefined;
	zoom: number | undefined;
	style: string | undefined;
}

export type MapboxCountryBoundaryFeatureProperties = {
	color_group: number;
	disputed: string;
	iso_3166_1: string;
	iso_3166_1_alpha_3: string;
	mapbox_id: string;
	name: string;
	name_en: string;
	region: string;
	subregion: string;
	wikidata_id: string;
	worldview: string;
};

export type MapProjection =
	| "albers"
	| "equalEarth"
	| "equirectangular"
	| "lambertConformalConic"
	| "mercator"
	| "naturalEarth"
	| "winkelTripel"
	| "globe";

export interface MapData {
	style: string;
}
