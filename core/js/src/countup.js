const elements = document.querySelectorAll('[data-countup]');

if (elements.length) {
	elements.forEach(function (element) {
		let options = {};
		try {
			const dataOptions = element.getAttribute('data-countup') ? JSON.parse(element.getAttribute('data-countup')) : {};
			options = Object.assign({
				'enableScrollSpy': true
			}, dataOptions);
			
		} catch (error) {}

		const value = parseInt(element.innerHTML, 10);

		if (window.countUp && window.countUp.CountUp) {
			const countUp = new window.countUp.CountUp(element, value, options);
			if (!countUp.error) {
				countUp.start();
			}
		}
	});
}
