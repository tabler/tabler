(function ($) {
  $(document).ready(function () {

    $().peity && $('[data-spark]').each(function () {
      var $this = $(this),
        data = $this.attr('data-spark'),
        color = $this.attr('data-spark-color') || 'blue',
        type = $this.attr('data-spark-type') || 'line';

      var $div = $('<div />').html(data);
      $this.append($div);

      var strokeColor = tabler.colors[color],
        fillColor = tabler.colors[color];

      if (type === 'donut' || type === 'pie') {
        fillColor = [fillColor, tabler.hexToRgbA(fillColor, .1)];
      } else if (type === 'bar') {
        fillColor = [fillColor];
      } else if (type === 'line') {
        fillColor = tabler.hexToRgbA(fillColor, .1);
      }

      $div.peity(type, {
        width: $this.width(),
        height: $this.height(),
        // max: 100,
        // min: 0,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor,
        padding: .2,
        innerRadius: (type === 'donut') ? 17 : 0
      });


    });

  });
})(jQuery);


/*
Apexcharts default configuration
 */
if (window.Apex) {
  Apex.grid = {
    padding: {
      right: 0,
      left: 0,
      bottom: 0,
      top: 0
    }
  };

  Apex.dataLabels = {
    enabled: false
  };

  Apex.plotOptions = {
    pie: {
      expandOnClick: false,
    },
  };

  Apex.chart = {
    toolbar: {
      show: false,
    },
    animations: {
      enabled: false,
    }
  };

  Apex.stroke = {
    width: 2,
    curve: 'smooth',
  };

  Apex.fill = {
    type: 'solid',
    opacity: 1
  };

  Apex.legend = {
    show: false
  };
}
