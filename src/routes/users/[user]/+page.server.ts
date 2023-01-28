import { users } from "lib/data/users";
import { error } from "@sveltejs/kit";

import type { User } from "ts/users";
import type { Load } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export const load: Load = async ({ params }) => {
	const user = users.find((user: User) => user.name.toLowerCase() === params.user);

	if (!user) {
		console.log("nooo");
		throw error(404, {
			message: "User not found"
		});
	}
	return {
		user
	};
};
