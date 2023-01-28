import { users } from "~/lib/data/users";
import type { User } from "~/ts/users";

export function load() {
	return {
		users: users.map((user: User) => ({
			slug: user.name.toLowerCase(),
			title: user.name,
			countries: user.countries
		}))
	};
}
