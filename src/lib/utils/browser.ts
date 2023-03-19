import { browser } from "$app/environment";
export function getUrlSearchParam(searchParam: string) {
	// Built-in svelte $page.url.searchParams object only works for set, not get
	if (!browser) {
		return;
	}
	const currentUrl = new URL(window.location.toLocaleString());
	const param = currentUrl.searchParams.get(searchParam);
	return param;
}
