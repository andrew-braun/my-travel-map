import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import Icons from "unplugin-icons/vite";

import type { UserConfig } from "vite";

const config: UserConfig = {
	plugins: [
		sveltekit(),
		tsConfigPaths(),
		Icons({
			compiler: "svelte"
		})
	]
};

export default defineConfig(config);
