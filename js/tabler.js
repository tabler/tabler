'use strict';

import {CountUp} from "countup.js";
import noUiSlider from 'nouislider';

(function () {
	/**
	 * Dropdown
	 */
	var dropdownElementList = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]'));
	dropdownElementList.map(function (dropdownToggleEl) {
		return new bootstrap.Dropdown(dropdownToggleEl, {})
	});

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
	NoUiSlider
	*/
	let sliderTriggerList = [].slice.call(document.querySelectorAll("[data-slider]"));
	sliderTriggerList.map(function (sliderTriggerEl){
		let dataSlider;
		if (sliderTriggerEl.getAttribute("data-slider")) {
			dataSlider = JSON.parse(sliderTriggerEl.getAttribute("data-slider"));
		}
		let slider = noUiSlider.create(sliderTriggerEl,dataSlider);
		if(dataSlider['js-name']){
			window[dataSlider['js-name']] = slider;
		}
	});

	/*
	CountUp
	*/
	let countupTriggerList = [].slice.call(document.querySelectorAll("[data-countup]"));
	countupTriggerList.map(function (countupTriggerEl) {
		let dataCountUp;
		if(countupTriggerEl.getAttribute("data-countup") !== "") {
			dataCountUp = JSON.parse(countupTriggerEl.getAttribute("data-countup"));
		}

		return (new CountUp(countupTriggerEl, parseFloat(countupTriggerEl.innerText), dataCountUp)).start();
	});
})();