require.config({
    shim: {
        'bootstrap': ['jquery'],
        'sparkline': ['jquery'],
        'tablesorter': ['jquery'],
        'vector-map': ['jquery'],
        'vector-map-de': ['vector-map', 'jquery'],
        'vector-map-world': ['vector-map', 'jquery'],
        'core': ['bootstrap'],
    },
    paths: {
        'core': 'assets/js/core',
        'jquery': 'assets/js/vendors/jquery-3.2.1.min',
        'popper': 'assets/js/vendors/popper.min',
        'chart': 'assets/js/vendors/chart.bundle.min',
        'bootstrap': 'assets/js/vendors/bootstrap.min',
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
    colors: {"blue":"#467fcf","azure":"#45aaf2","indigo":"#6574cd","purple":"#a55eea","pink":"#f66d9b","red":"#e74c3c","orange":"#fd9644","yellow":"#f1c40f","lime":"#7bd235","green":"#5eba00","teal":"#2bcbba","cyan":"#17a2b8","gray":"#868e96","gray-dark":"#343a40"}
};

require(['core']);