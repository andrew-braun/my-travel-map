import type { Country } from "ts/countries";

export function searchCountries(countries: Country[], query: string) {
	/* A basic search function to find countries with matching name, code, continent, or capital
	 ** Could be replaced by a more complex search library later, but this is straightforward
	 */

	const filtered = countries.filter((country) => {
		if (!country.country_name) {
			return;
		}
		return (
			country?.country_name.toLowerCase().includes(query.toLowerCase()) ||
			country.iso2?.toLowerCase().includes(query.toLowerCase()) ||
			country.iso3?.toLowerCase().includes(query.toLowerCase()) ||
			country.local_name?.toLowerCase().includes(query.toLowerCase()) ||
			country.continent?.toLowerCase().includes(query.toLowerCase()) ||
			country.capital_city?.toLowerCase().includes(query.toLowerCase())
		);
	});
	console.log(filtered);

	return filtered.sort((a, b) => {
		if (a.country_name && b.country_name) {
			return a.country_name > b.country_name;
		}
		return 0;
	});
}
