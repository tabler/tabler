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
		const seconds = Math.floor((new Date() - date) / 1000);

		let interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
			return interval + " years ago";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months ago";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days ago";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours ago";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes ago";
		}
		if (seconds > 0) {
			return Math.floor(seconds) + " seconds ago";
		}

		return "now";
	})


	/**
	 * Shortcodes
	 */
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
