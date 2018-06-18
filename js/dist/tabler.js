/*!
  * Tabler v0.0.32 (https://tabler.github.io)
  * Copyright 2018 codecalm
  * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('bootstrap')) :
	typeof define === 'function' && define.amd ? define(['jquery', 'bootstrap'], factory) :
	(global.tabler = factory(global.jquery,global.bootstrap));
}(this, (function (jquery,bootstrap) { 'use strict';

	jquery = jquery && jquery.hasOwnProperty('default') ? jquery['default'] : jquery;
	bootstrap = bootstrap && bootstrap.hasOwnProperty('default') ? bootstrap['default'] : bootstrap;



	return bootstrap;

})));
//# sourceMappingURL=tabler.js.map
