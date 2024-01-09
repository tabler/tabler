/*
   Bootstrap tooltips initialization
*/
import { Tooltip } from 'bootstrap';

const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.forEach(function (tooltipTriggerEl) {
  const options = {
    delay: { show: 50, hide: 50 },
    html: tooltipTriggerEl.getAttribute("data-bs-html") === "true" || false,
    placement: tooltipTriggerEl.getAttribute('data-bs-placement') || 'auto'
  };
  new Tooltip(tooltipTriggerEl, options);
});
