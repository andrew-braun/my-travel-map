import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

import type { UserConfig } from "vite";

const config: UserConfig = {
	plugins: [sveltekit(), tsConfigPaths()]
};

export default defineConfig(config);
