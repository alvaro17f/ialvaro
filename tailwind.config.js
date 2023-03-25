const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				azama: {
					text: {
						white: "#e0def4",
						dark: "#2a273f",
					},
					base: "#232136",
					primary: "#ea9a97",
					secondary: "#908caa",
					success: "#9ccfd8",
					danger: "#eb6f92",
					warning: "#f6c177",
					info: "#3e8fb0",
					muted: "#6e6a86",
					black: "#000000",
					white: "#ffffff",
				},
			},
			fontFamily: {
				sans: ["var(--font-poppins)", ...fontFamily.sans],
			},
		},
	},
	plugins: [],
};
