/*!
 * Tabler v1.4.0 (https://tabler.io)
 * Copyright 2018-2025 The Tabler Authors
 * Copyright 2018-2025 codecalm.net Paweł Kuna
 * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
 */
!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){"use strict";const e={theme:"light","theme-base":"gray","theme-font":"sans-serif","theme-primary":"blue","theme-radius":"1"},t=new Proxy(new URLSearchParams(window.location.search),{get:(e,t)=>e.get(t)});for(const n in e){const o=t[n];let a;if(o)localStorage.setItem("tabler-"+n,o),a=o;else{a=localStorage.getItem("tabler-"+n)||e[n]}a!==e[n]?document.documentElement.setAttribute("data-bs-"+n,a):document.documentElement.removeAttribute("data-bs-"+n)}});
//# sourceMappingURL=tabler-theme.min.js.map