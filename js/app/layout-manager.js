'use strict';

class TablerLayoutManager {
  static init() {
    this.elem = document.getElementById('layout-manager');

    if(this.elem) {
      this.renderHtml();
    }
  }

  static renderHtml() {
    this.elem.innerHTML = 'test';
  }
}

document.addEventListener("DOMContentLoaded", function() {
  TablerLayoutManager.init();
});
