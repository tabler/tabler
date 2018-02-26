---
---
require.config({
    shim: {
        'bootstrap': ['jquery'],
        'sparkline': ['jquery'],
        'tablesorter': ['jquery'],
        'vector-map': ['jquery'],
        'vector-map-de': ['vector-map', 'jquery'],
        'vector-map-world': ['vector-map', 'jquery'],
        'core': ['bootstrap', 'jquery'],
    },
    paths: {
        'core': 'assets/js/core',
        'jquery': 'assets/js/vendors/jquery-3.2.1.min',
        'bootstrap': 'assets/js/vendors/bootstrap.bundle.min',
        'sparkline': 'assets/js/vendors/jquery.sparkline.min',
        'selectize': 'assets/js/vendors/selectize.min',
        'tablesorter': 'assets/js/vendors/jquery.tablesorter.min',
        'vector-map': 'assets/js/vendors/jquery-jvectormap-2.0.3.min',
        'vector-map-de': 'assets/js/vendors/jquery-jvectormap-de-merc',
        'vector-map-world': 'assets/js/vendors/jquery-jvectormap-world-mill',
        'circle-progress': 'assets/js/vendors/circle-progress.min',
    }
});

window.tabler = {
    colors: {
        {% for color in site.colors %}"{{ color[0] }}": "{{ color[1].hex }}"{% unless forloop.last %},{% endunless %}
        {% endfor %}
    }
};

require(['core']);