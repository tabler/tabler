const elements = document.querySelectorAll('[data-countup]');

if (elements.length) {
	elements.forEach(function (element) {
		let options = {};
		try {
			options = element.getAttribute('data-countup') ? JSON.parse(element.getAttribute('data-countup')) : {};
		} catch (error) {}

		const value = parseInt(element.innerHTML, 10);

		const countUp = new window.countUp.CountUp(element, value, options);
		if (!countUp.error) {
			countUp.start();
		}
	});
}