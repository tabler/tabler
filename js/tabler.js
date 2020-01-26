'use strict';

import {CountUp} from "countup.js";
import {Dropdown, Tooltip, Popover} from 'bootstrap';
import 'popper.js';


(function() {
	/**
	 * Dropdown
	 */
	var dropdownElementList = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]'))
	dropdownElementList.map(function (dropdownToggleEl) {
		console.log('dropdownToggleEl', dropdownToggleEl);
		return new Dropdown(dropdownToggleEl, {})
	});
	
	/**
	 * Tooltip
	 */
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new Tooltip(tooltipTriggerEl, {})
	});

	/*
	Popover
	 */
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
	popoverTriggerList.map(function (popoverTriggerEl) {
		return new Popover(popoverTriggerEl, {
			autoHide: true
		})
	});

	/*
	  CountUp
	*/
	let countupTriggerList = [].slice.call(document.querySelectorAll("[data-countup]"));
	countupTriggerList.map(function (countupTriggerEl) {
		let dataCountUp = JSON.parse(countupTriggerEl.getAttribute("data-countup"));
		return (new CountUp(countupTriggerEl, parseFloat(countupTriggerEl.innerText), dataCountUp)).start();
	});
})();