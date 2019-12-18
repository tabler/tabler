/*!
  * Tabler vv1.0.0-alpha (https://tabler.io)
  * Copyright 2018-2019 codecalm
  * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
  */
'use strict';

(function ($) {
  $(document).ready(function () {
    $().peity &&
    $('[data-spark]').each(function () {
      const $this = $(this),
        data = $this.attr('data-spark'),
        color = $this.attr('data-spark-color') || 'blue',
        bgColor = $this.attr('data-spark-color-bg') || 'blue',
        type = $this.attr('data-spark-type') || 'line';

      const $div = $('<div/>').html(data);
      $this.append($div);

      let fillColor;

      if (type === 'donut' || type === 'pie') {
        fillColor = [color, bgColor];
      } else if (type === 'bar') {
        fillColor = [color];
      } else if (type === 'line') {
        fillColor = bgColor;
      }

      $div.peity(type, {
        width: $this.width(),
        height: $this.height(),
        // max: 100,
        // min: 0,
        stroke: color,
        strokeWidth: 2,
        fill: fillColor,
        padding: 0.2,
        innerRadius: type === 'donut' ? 17 : 0,
      });
    });
  });
})(jQuery);
//# sourceMappingURL=tabler-charts.js.map
