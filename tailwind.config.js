/** @type {import('tailwindcss').Config} */
// postcss.config.js
module.exports = {
	content: [
		"./ultimate-portfolio.php",
		// Include any other paths where you use Tailwind classes
	],
	plugins: [
		require("tailwindcss"),
		require("autoprefixer"),
		// ... other PostCSS plugins
	],
	prefix: "uptw-",
	variants: {
		extend: {
			backgroundColor: ["uptw-peer-checked"],
		},
	},
};
