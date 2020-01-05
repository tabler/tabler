import {CountUp} from "countup.js";

const tabler = {
	toggleFullscreen: function (elem) {
		elem = elem || document.documentElement;
		if (
			!document.fullscreenElement &&
			!document.mozFullScreenElement &&
			!document.webkitFullscreenElement &&
			!document.msFullscreenElement
		) {
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	},
};

$(document).ready(function () {
	const $body = $('body');

	$body.on('click', '[data-toggle="menubar"]', function (e) {
		$body.toggleClass('aside-visible');

		e.preventDefault();
		return false;
	});

	// $('[data-toggle="tooltip"]').tooltip();
	// $('[data-toggle="popover"]').popover();

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

window.tabler = tabler;
