/*!
* Tabler v1.0.0-beta12 (https://tabler.io)
* @version 1.0.0-beta12
* @link https://tabler.io
* Copyright 2018-2022 The Tabler Authors
* Copyright 2018-2022 codecalm.net Paweł Kuna
* Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
*/
!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";var e,t="tablerTheme",n=new Proxy(new URLSearchParams(window.location.search),{get:function(e,t){return e.get(t)}});if(n.theme)localStorage.setItem(t,n.theme),e=n.theme;else{var o=localStorage.getItem(t);e=o||"light"}document.body.classList.remove("theme-dark","theme-light"),document.body.classList.add("theme-".concat(e))}));