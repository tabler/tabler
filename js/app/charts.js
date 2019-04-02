(function ($) {
    $(document).ready(function () {

        $('[data-spark]').each(function () {
            var $this = $(this),
                data = $this.attr('data-spark'),
                color = $this.attr('data-spark-color') || 'blue',
                type = $this.attr('data-spark-type') || 'line';

            var $div = $('<div />').html(data);
            $this.append($div);

            var strokeColor = uikit.colors[color],
                fillColor = uikit.colors[color];

            if (type === 'donut' || type === 'pie') {
                fillColor = [fillColor, uikit.hexToRgbA(fillColor, .1)];
            } else if (type === 'bar') {
                fillColor = [fillColor];
            } else if (type === 'line') {
                fillColor = uikit.hexToRgbA(fillColor, .1);
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
