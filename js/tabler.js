import {CountUp} from "countup.js";

document.addEventListener("DOMContentLoaded", function () {
	/**
	 * Tooltip
	 */
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl, {})
	});

	/*
	Popover
	 */
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
	popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl, {
			autoHide: true
		})
	});

	/*
	  CountUp
	*/
	let countups = document.querySelectorAll("[data-countup]");
	for (let i = 0; i < countups.length; i++) {
		let dataCountUp;
		if (countups[i].getAttribute("data-countup")) {
			dataCountUp = JSON.parse(countups[i].getAttribute("data-countup"));
		}
		let countup = new CountUp(countups[i], parseFloat(countups[i].innerText), dataCountUp);
		countup.start();
	}
});