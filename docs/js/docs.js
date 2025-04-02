import { searchClient } from "@algolia/client-search";

const client = searchClient(
	"ALGOLIA_APPLICATION_ID",
	"ALGOLIA_API_KEY",
	{
		// Adjust timeouts
		timeouts: {
			read: 10000,
			write: 10000,
			connect: 10000,
		},
	},
);