import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	server: {
		allowedHosts: ["zenon.lan"],
	},
	resolve: {
		alias: {
			"@": path.resolve("./src"),
		},
	},
});
