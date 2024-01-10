/**
 * 
 * This will allow you to load dark/light theme wihtout reloading the page
 * and without depending on the link variables 
 * default theme is light and can be default dark by changing the specified code below
 */

var themeStorageKey = "tablerTheme";
var storedTheme = localStorage.getItem(themeStorageKey);

// Change "light" to "dark" to set default theme dark 
var defaultTheme = "light";

selectedTheme = storedTheme ? storedTheme : defaultTheme;

setTheme(selectedTheme)
$(".switchMode").on('click', function (e) {
  let body = document.querySelector("body")
  let currentMode = body.getAttribute('data-bs-theme');
  let mode = currentMode == 'dark' ? "light" : 'dark';
  setTheme(mode);
})


function setTheme(mode) {
  let body = document.querySelector("body")
  body.setAttribute('data-bs-theme', mode)
  localStorage.setItem(themeStorageKey, mode);
}
