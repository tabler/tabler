require(['jquery', 'vector-map', {% if include.map == 'de_merc' %}'vector-map-de'{% else %}'vector-map-world'{% endif %}], function(){
    $(document).ready(function(){
        var data = {{ include.data | jsonify }};

        {% if include.map == 'de_merc' %}
        var markers = [
            {latLng: [52.50, 13.39], name: 'Berlin'},
            {latLng: [53.56, 10.00], name: 'Hamburg'},
            {latLng: [48.13, 11.56], name: 'Munich'},
            {latLng: [50.95, 6.96], name: 'Cologne'},
            {latLng: [50.11, 8.68], name: 'Frankfurt am Main'},
            {latLng: [48.77, 9.17], name: 'Stuttgart'},
            {latLng: [51.23, 6.78], name: 'Düsseldorf'},
            {latLng: [51.51, 7.46], name: 'Dortmund'},
            {latLng: [51.45, 7.01], name: 'Essen'},
            {latLng: [53.07, 8.80], name: 'Bremen'}
        ];
        {% else %}
        var markers = false;
        {% endif %}

        $('#{{ include.id }}').vectorMap({
            map: '{{ include.map }}',
            zoomButtons : false,
            zoomOnScroll: false,
            panOnDrag: false,
            backgroundColor: 'transparent',
            markers: markers,
            markerStyle: {
                initial: {
                    fill: tabler.colors.blue,
                    stroke: '#fff',
                    "stroke-width": 1,
                    r: 5
                },
            },
            onRegionTipShow: function(e, el, code, f){
                el.html(el.html() + (data[code] ? ': <small>' + data[code]+'</small>' : ''));
            },
            series: {
                regions: [{
                    values: data,
                    scale: ['#EFF3F6', tabler.colors.blue],
                    normalizeFunction: 'polynomial'
                }]
            },
            regionStyle: {
                initial: {
                    fill: '#F4F4F4'
                }
            }
        });
    });
});