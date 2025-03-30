import { readFileSync } from "fs";
import { dirname } from "path";

export function getCopyList () {
	let copy = {
		"node_modules/@tabler/core/dist": "dist",
	}

	const libs = JSON.parse(readFileSync('../preview/pages/_data/libs.json'));

	let files = []

	Object.keys(libs.js).forEach((lib) => {
		files.push(Array.isArray(libs.js[lib]) ? libs.js[lib] : [libs.js[lib]])
	})

	Object.keys(libs.css).forEach((lib) => {
		files.push(Array.isArray(libs.css[lib]) ? libs.css[lib] : [libs.css[lib]])
	})

	Object.keys(libs['js-copy']).forEach((lib) => {
		files.push(libs['js-copy'][lib])
	})

	files = files.flat()

	files.forEach((file) => {
		if (!file.match(/^https?/)) {
			copy[`node_modules/${dirname(file)}`] = `libs/${dirname(file)}`;
		}
	})

	return copy;
}

export function appData(eleventyConfig) {
	eleventyConfig.addGlobalData("site", {
		title: "Tabler",
		description: "Premium and Open Source dashboard template with responsive and high quality UI.",
		themeColor: "#066fd1",

		email: "support@tabler.io",
		homepage: "https://tabler.io",
		githubUrl: "https://github.com/tabler/tabler",
		githubSponsorsUrl: "https://github.com/sponsors/codecalm",
		changelogUrl: "https://github.com/tabler/tabler/releases",
		sponsorUrl: "https://github.com/sponsors/codecalm",
		previewUrl: "https://preview.tabler.io",
		docsUrl: "https://tabler.io/docs",

		mapboxKey: "pk.eyJ1IjoidGFibGVyIiwiYSI6ImNscHh3dnhndjB2M3QycW85bGd0NXRmZ3YifQ.9LfHPsNoEXQH-xzz-81Ffw",
		googleMapsKey: "AIzaSyAr5mRB4U1KRkVznIrDWEvZjroYcD202DI",
		googleMapsDevKey: "AIzaSyCL-BY8-sq12m0S9H-S_yMqDmcun3A9znw",
		npmPackage: "@tabler/core",

		tablerCssPlugins: [
			"tabler-flags",
			"tabler-socials",
			"tabler-payments",
			"tabler-vendors",
			"tabler-marketing"
		],

		icons: {
			link: "https://tabler.io/icons"
		},
		emails: {
			price: "$29",
			buy_link: "https://r.tabler.io/buy-emails"
		},
		illustrations: {
			price: "$59",
			count: 50,
			buy_link: "https://r.tabler.io/buy-illustrations"
		},

		colors: {
			"blue": {
				class: "blue",
				hex: "#066fd1",
				title: "Blue"
			},
			"azure": {
				class: "azure",
				hex: "#45aaf2",
				title: "Azure"
			},
			"indigo": {
				class: "indigo",
				hex: "#6574cd",
				title: "Indigo"
			},
			"purple": {
				class: "purple",
				hex: "#a55eea",
				title: "Purple"
			},
			"pink": {
				class: "pink",
				hex: "#f66d9b",
				title: "Pink"
			},
			"red": {
				class: "red",
				hex: "#fa4654",
				title: "Red"
			},
			"orange": {
				class: "orange",
				hex: "#fd9644",
				title: "Orange"
			},
			"yellow": {
				class: "yellow",
				hex: "#f1c40f",
				title: "Yellow"
			},
			"lime": {
				class: "lime",
				hex: "#7bd235",
				title: "Lime"
			},
			"green": {
				class: "green",
				hex: "#5eba00",
				title: "Green"
			},
			"teal": {
				class: "teal",
				hex: "#2bcbba",
				title: "Teal"
			},
			"cyan": {
				class: "cyan",
				hex: "#17a2b8",
				title: "Cyan"
			}
		},
		skinColors: {
			"rose": {
				hex: "#FFCB9D",
				title: "Rose",
				class: "rose"
			},
			"yellow": {
				hex: "#F0BA60",
				title: "Yellow",
				class: "yellow"
			},
			"skin-1": {
				hex: "#e2c6a7",
				title: "Skin 1",
				class: "skin-1"
			},
			"skin-2": {
				hex: "#c7a786",
				title: "Skin 2",
				class: "skin-2"
			},
			"skin-3": {
				hex: "#a68063",
				title: "Skin 3",
				class: "skin-3"
			},
			"skin-4": {
				hex: "#926241",
				title: "Skin 4",
				class: "skin-4"
			},
			"skin-5": {
				hex: "#654c45",
				title: "Skin 5",
				class: "skin-5"
			},
			"gray": {
				hex: "#d5d7dd",
				title: "Gray",
				class: "gray"
			}
		},
		socialColors: {
			"facebook": { title: "Facebook", hex: "#1877F2" },
			"twitter": { title: "Twitter", hex: "#1da1f2" },
			"linkedin": { title: "Linkedin", hex: "#0a66c2" },
			"google": { title: "Google", hex: "#dc4e41" },
			"youtube": { title: "Youtube", hex: "#ff0000" },
			"vimeo": { title: "Vimeo", hex: "#1ab7ea" },
			"dribbble": { title: "Dribbble", hex: "#ea4c89" },
			"github": { title: "Github", hex: "#181717" },
			"instagram": { title: "Instagram", hex: "#e4405f" },
			"pinterest": { title: "Pinterest", hex: "#bd081c" },
			"vk": { title: "VK", hex: "#6383a8" },
			"rss": { title: "RSS", hex: "#ffa500" },
			"flickr": { title: "Flickr", hex: "#0063dc" },
			"bitbucket": { title: "Bitbucket", hex: "#0052cc" },
			"tabler": { title: "Tabler", hex: "#066fd1" }
		},
		grayColors: {
			"gray-50": {
				hex: "#f9fafb",
				title: "Gray 50"
			},
			"gray-100": {
				hex: "#f3f4f6",
				title: "Gray 100"
			},
			"gray-200": {
				hex: "#e5e7eb",
				title: "Gray 200"
			},
			"gray-300": {
				hex: "#d1d5db",
				title: "Gray 300"
			},
			"gray-400": {
				hex: "#9ca3af",
				title: "Gray 400"
			},
			"gray-500": {
				hex: "#6b7280",
				title: "Gray 500"
			},
			"gray-600": {
				hex: "#4b5563",
				title: "Gray 600"
			},
			"gray-700": {
				hex: "#374151",
				title: "Gray 700"
			},
			"gray-800": {
				hex: "#1f2937",
				title: "Gray 800"
			},
			"gray-900": {
				hex: "#111827",
				title: "Gray 900"
			},
			"gray-950": {
				hex: "#030712",
				title: "Gray 950"
			}
		},
		colorsExtra: {
			"white": {
				hex: "#ffffff",
				title: "White"
			},
			"dark": {
				hex: "#303645",
				title: "Dark"
			},
			"gray": {
				hex: "#868e96",
				title: "Gray"
			}
		},
		variants: [
			{
				"name": "success",
				"icon": "check"
			},
			{
				"name": "info",
				"icon": "info-circle"
			},
			{
				"name": "warning",
				"icon": "alert-triangle"
			},
			{
				"name": "danger",
				"icon": "alert-circle"
			}
		],
		"themeColors": {
			"primary": {
				class: "primary",
				title: "Primary"
			},
			"secondary": {
				class: "secondary",
				title: "Secondary"
			},
			"success": {
				class: "success",
				title: "Success"
			},
			"warning": {
				class: "warning",
				title: "Warning"
			},
			"danger": {
				class: "danger",
				title: "Danger"
			},
			"info": {
				class: "info",
				title: "Info"
			},
			"dark": {
				class: "dark",
				title: "Dark"
			},
			"light": {
				class: "light",
				title: "Light"
			}
		},
		"buttonStates": [
			{
				class: null,
				title: "Normal"
			},
			{
				class: "active",
				title: "Active state"
			},
			{
				class: "disabled",
				title: "Disabled"
			}
		],
		"socials": {
			"x": {
				"icon": "brand-x",
				title: "X"
			},
			"facebook": {
				"icon": "brand-facebook",
				title: "Facebook"
			},
			"twitter": {
				"icon": "brand-twitter",
				title: "Twitter"
			},
			"google": {
				"icon": "brand-google",
				title: "Google"
			},
			"youtube": {
				"icon": "brand-youtube",
				title: "Youtube"
			},
			"vimeo": {
				"icon": "brand-vimeo",
				title: "Vimeo"
			},
			"dribbble": {
				"icon": "brand-dribbble",
				title: "Dribbble"
			},
			"github": {
				"icon": "brand-github",
				title: "Github"
			},
			"instagram": {
				"icon": "brand-instagram",
				title: "Instagram"
			},
			"pinterest": {
				"icon": "brand-pinterest",
				title: "Pinterest"
			},
			"vk": {
				"icon": "brand-vk",
				title: "VK"
			},
			"rss": {
				"icon": "rss",
				title: "RSS"
			},
			"flickr": {
				"icon": "brand-flickr",
				title: "Flickr"
			},
			"bitbucket": {
				"icon": "brand-bitbucket",
				title: "Bitbucket"
			},
			"tabler": {
				"icon": "brand-tabler",
				title: "Tabler"
			}
		},
		"months-short": [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		],
		"months-long": [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		]
	});
}