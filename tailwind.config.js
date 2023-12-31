const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx, json}",
		"./pages/**/*.{js,ts,jsx,tsx, json}",
		"./components/**/*.{js,ts,jsx,tsx, json}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx, json}",
	],
	theme: {
		extend: {
			colors: {
				alvaro: {
					base: "#1e1e2e",
					primary: "#89b4fa",
					secondary: "#cba6f7",
					// secondary: "#f2cdcd",
					success: "#94e2d5",
					danger: "#f38ba8",
					warning: "#f9e2af",
					info: "#89b4fa",
					muted: "#6c7086",
					white: "#cdd6f4",
					dark: "#1e1e2e",
				},
			},
			fontFamily: {
				sans: ["var(--font-poppins)", ...fontFamily.sans],
			},
		},
	},
	plugins: [],
};
