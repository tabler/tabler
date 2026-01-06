import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function appFilters(eleventyConfig) {
	/**
	 * Filters
	 */
	eleventyConfig.addFilter("miliseconds_to_minutes", function (value) {
		// Raturn 3:45 time format
		const minutes = Math.floor(value / 60000);
		const seconds = ((value % 60000) / 1000).toFixed(0);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	});

	eleventyConfig.addFilter("relative", (page) => {
		const segments = (page.url || '').replace(/^\//).split('/');
		if (segments.length === 1) {
			return '.';
		} else {
			return '../'.repeat(segments.length - 1).slice(0, -1);
		}
	});

	eleventyConfig.addFilter("escape_attribute", (text) => {
		return text
			.replace(/&/g, '&amp;')
			.replace(/'/g, '&apos;')
			.replace(/"/g, '&quot;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\r\n/g, '&#13;')
			.replace(/[\r\n]/g, '&#13;');
	});

	eleventyConfig.addFilter("contains", (items, item) => {
		return items && Array.isArray(items) && items.includes(item);
	});

	eleventyConfig.addFilter("concat_objects", function (object, object2) {
		if (
			object &&
			object2 &&
			typeof object === 'object' &&
			typeof object2 === 'object' &&
			!Array.isArray(object) &&
			!Array.isArray(object2)
		) {
			return { ...object, ...object2 };
		}
		return object;
	});

	eleventyConfig.addFilter("replace_regex", function (input, regStr, replStr) {
		const regex = new RegExp(regStr, 'gm');
		return input.replace(regex, replStr);
	});

	eleventyConfig.addFilter("timestamp_to_date", function (timestamp) {
		const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
		return date.toISOString().split('T')[0]; // Extract the date in 'YYYY-MM-DD' format
	});

	eleventyConfig.addFilter("split_to_n", function (arr, n) {
		const chunkSize = Math.round(arr.length / n);
		const result = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			result.push(arr.slice(i, i + chunkSize));
		}
		return result;
	})

	eleventyConfig.addFilter("format_number", function (value) {
		return value.toString()
			.split('')
			.reverse()
			.reduce((acc, char, index) => {
				if (index > 0 && index % 3 === 0) {
					acc.push(',');
				}
				acc.push(char);
				return acc;
			}, [])
			.reverse()
			.join('');
	});

	function randomNumber(x, min = 0, max = 100, round = 0) {
		let value = ((x * x * Math.PI * Math.E * (max + 1) * (Math.sin(x) / Math.cos(x * x))) % (max + 1 - min)) + min;

		value = value > max ? max : value;
		value = value < min ? min : value;

		if (round !== 0) {
			value = parseFloat(value.toFixed(round));
		} else {
			value = Math.floor(value);
		}

		return value;
	}

	eleventyConfig.addFilter("random_date_ago", function (x, daysAgo = 100) {
		const today = new Date();
		const randomDaysAgo = randomNumber(x, 0, daysAgo);
		today.setDate(today.getDate() - randomDaysAgo);
		return today;
	});

	eleventyConfig.addFilter("random_date", function (x, startDate = null, endDate = null) {
		const start = new Date(startDate ? startDate : '2024-01-01').getTime() / 1000;
		const end = new Date(endDate ? endDate : '2024-12-30').getTime() / 1000;

		const randomTimestamp = randomNumber(x, start, end);
		return new Date(randomTimestamp * 1000);
	});

	eleventyConfig.addFilter("random_item", function (x, items) {
		const index = randomNumber(x, 0, items.length - 1);
		return items[index];
	});

	eleventyConfig.addFilter("random_number", randomNumber);

	eleventyConfig.addFilter("first_letters", function capitalizeFirstLetter(string) {
		return (string || '').split(' ').map(word => word.charAt(0)).join('');
	})

	eleventyConfig.addFilter("uc_first", function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	})

	eleventyConfig.addFilter("size", function (elem) {
		if (elem instanceof Object) {
			return Object.keys(elem).length;
		}

		if (elem) {
			return elem.length;
		}

		return 0;
	})

	eleventyConfig.addFilter("first", function (elem) {
		if (elem instanceof Object) {
			return elem[Object.keys(elem)[0]];
		}

		return elem ? elem[0] : null;
	})

	// Convert a URL path to an absolute URL
	eleventyConfig.addFilter("absolute_url", function (url) {
		const baseUrl = "https://docs.tabler.io";

		// Ensure url starts with a slash
		if (!url.startsWith('/')) {
			url = '/' + url;
		}

		return baseUrl + url;
	})

	// time ago from today
	eleventyConfig.addFilter("timeago", function (date) {
		let seconds;
		if (typeof date === 'number') {
			seconds = date;
		} else {
			seconds = Math.floor((new Date() - date) / 1000);
		}

		let interval = Math.floor(seconds / 31536000);

		if (interval >= 1) {
			return `${interval} year${interval > 1 ? 's' : ''} ago`;
		}
		interval = Math.floor(seconds / 2592000);
		if (interval >= 1) {
			return `${interval} month${interval > 1 ? 's' : ''} ago`;
		}
		interval = Math.floor(seconds / 86400);
		if (interval >= 1) {
			return `${interval} day${interval > 1 ? 's' : ''} ago`;
		}
		interval = Math.floor(seconds / 3600);
		if (interval >= 1) {
			return `${interval} hour${interval > 1 ? 's' : ''} ago`;
		}
		interval = Math.floor(seconds / 60);
		if (interval >= 1) {
			return `${interval} minute${interval > 1 ? 's' : ''} ago`;
		}
		if (seconds > 0) {
			return `${Math.floor(seconds)} second${Math.floor(seconds) > 1 ? 's' : ''} ago`;
		}

		return "now";
	})

	function buildCollectionTree(flatData) {
		const tree = [];
		const lookup = {};

		flatData
			.filter(item => item.url !== '/')
			.forEach(item => {
				lookup[item.url] = { ...item, children: [] };
			});

		flatData.forEach(item => {
			const parts = item.url.split('/').filter(Boolean);
			if (parts.length === 1) {
				tree.push(lookup[item.url]);
			} else {
				const parentUrl = '/' + parts.slice(0, -1).join('/') + '/';
				if (lookup[parentUrl]) {
					lookup[parentUrl].children.push(lookup[item.url]);
				} else {
					tree.push(lookup[item.url]);
				}
			}
		});

		return tree;
	}

	eleventyConfig.addFilter("collection-tree", function (collection) {
		const a = collection.map(item => {
			return {
				data: item.data,
				page: item.page,
				url: item.url,
				children: []
			}
		}).sort((a, b) => {
			const orderA = a.data.order ?? 999;
			const orderB = b.data.order ?? 999;

			if (orderA !== orderB) {
				return orderA - orderB;
			}

			const titleA = a.data.title ?? '';
			const titleB = b.data.title ?? '';

			return titleA.localeCompare(titleB);
		});

		return buildCollectionTree(a);
	});

	eleventyConfig.addFilter("collection-children", function (collection, page) {
		const url = page.url.split('/').filter(Boolean).join('/');

		const filteredCollection = collection.filter(item => {
			const parts = item.url.split('/').filter(Boolean);
			return parts.length > 1 && parts.slice(0, -1).join('/') === url;
		});

		return filteredCollection.sort((a, b) => {
			return (a.data?.order || 999) - (b.data?.order || 999);
		});
	});

	eleventyConfig.addFilter("next-prev", function (collection, page) {
		const items = collection
			.filter(item => {
				const parts = item.url.split('/').filter(Boolean);
				return parts.length > 1 && parts.slice(0, -1).join('/') === page.url.split('/').filter(Boolean).slice(0, -1).join('/');
			})
			.sort((a, b) => {
				return a.data.title.localeCompare(b.data.title);
			})
			.sort((a, b) => {
				return (a.data?.order || 999) - (b.data?.order || 999);
			});
		const index = items.findIndex(item => item.url === page.url);

		const prevPost = index > 0 ? items[index - 1] : null;
		const nextPost = index < items.length - 1 ? items[index + 1] : null;

		return {
			prev: prevPost ? prevPost : null,
			next: nextPost ? nextPost : null,
		};
	});

	const generateUniqueId = (text) => {
		let id = text
			.replace(/<[^>]+>/g, "")
			.replace(/\s/g, "-")
			.replace(/[^\w-]+/g, "")
			.replace(/--+/g, "-")
			.replace(/^-+|-+$/g, "")
			.toLowerCase();
		
		// Ensure ID doesn't start with a number (invalid HTML)
		if (/^[0-9]/.test(id)) {
			id = "h" + id;
		}
		
		return id;
	}

	eleventyConfig.addFilter("headings-id", function (content) {
		return content.replace(/<h([1-6])>([^<]+)<\/h\1>/g, (match, level, text) => {
			const headingId = generateUniqueId(text);

			return `<h${level} id="${headingId}">${text}</h${level}>`;
		});
	})

	eleventyConfig.addFilter("toc", function (name) {
		const toc = [];

		const contentWithoutExamples = name.replace(/<!--EXAMPLE-->[\s\S]*?<!--\/EXAMPLE-->/g, '');
		const headings = contentWithoutExamples.match(/<h([23])>([^<]+)<\/h\1>/g);

		if (headings) {
			headings.forEach(heading => {
				const level = parseInt(heading.match(/<h([1-6])>/)[1]);
				const text = heading.replace(/<[^>]+>/g, "");
				const id = generateUniqueId(text);

				toc.push({ level, text, id });
			});
		}

		return toc;
	})

	eleventyConfig.addFilter("remove-href", function (content) {
		return content.replace(/href="#"/g, 'href="javascript:void(0)"');
	})


	/**
	 * Shortcodes
	 */
	eleventyConfig.addShortcode('scss-docs', function (name, filename) {
		const file = join(__dirname, `../../core/scss/${filename}`)

		if (existsSync(file)) {
			const content = readFileSync(file, 'utf8');
			const regex = new RegExp(`\/\/\\sscss-docs-start\\s${name}\\n(.+?)\/\/\\sscss-docs-end`, 'gs')

			const m = content.matchAll(regex)

			if (m) {
				const matches = [...m]

				if (matches[0] && matches[0][1]) {
					const lines = matches[0][1].split('\n');

					// Find minimum number of leading spaces in non-empty lines
					const minIndent = lines
						.filter(line => line.trim().length > 0)
						.reduce((min, line) => {
							const match = line.match(/^(\s*)/);
							const leadingSpaces = match ? match[1].length : 0;
							return Math.min(min, leadingSpaces);
						}, Infinity);

					// Remove that many spaces from the start of each line
					const result = lines.map(line => line.startsWith(' '.repeat(minIndent))
						? line.slice(minIndent)
						: line).join('\n');

					return "\n```scss\n" + result.trimRight() + "\n```\n"
				}
			}
		}

		return ''
	})

	const tags = ["capture_global", "endcapture_global", "highlight", "endhighlight"];
	tags.forEach(tag => {
		eleventyConfig.addLiquidTag(tag, function (liquidEngine) {
			return {
				parse: function (tagToken, remainingTokens) {
					this.str = tagToken.args;
				},
				render: function (scope, hash) {
					return "";
				},
			};
		});
	});

	let _CAPTURES = {};
	eleventyConfig.on('beforeBuild', () => {
		_CAPTURES = {};
	});

	['script', 'modal'].forEach((tag) => {
		eleventyConfig.addPairedShortcode(`capture_${tag}`, function (content, inline) {
			if (inline) {
				return content;
			}

			if (!_CAPTURES[tag]) {
				_CAPTURES[tag] = []
			}

			if (!_CAPTURES[tag][this.page.inputPath]) {
				_CAPTURES[tag][this.page.inputPath] = [];
			}

			_CAPTURES[tag][this.page.inputPath].push(content);

			return ''
		})

		eleventyConfig.addShortcode(`${tag}s`, function () {
			if (_CAPTURES[tag] && _CAPTURES[tag][this.page.inputPath]) {
				return _CAPTURES[tag][this.page.inputPath] ? `<!-- BEGIN PAGE ${tag.toUpperCase()}S -->\n${_CAPTURES[tag][this.page.inputPath].join('\n').trim()}\n<!-- END PAGE ${tag.toUpperCase()}S -->` : '';
			}

			return ''
		});
	});

	eleventyConfig.addPairedShortcode(`removeemptylines`, function (content) {
		if (content) {
			return content.split('\n').filter(line => line.trim() !== '').join('\n');
		}

		return '';
	})


	eleventyConfig.addPairedShortcode(`callout`, function (content) {
		if (content) {
			return `<div class="callout">\n${content}\n</div>`;
		}

		return '';
	})

	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
}
