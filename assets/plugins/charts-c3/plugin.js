require.config({
    shim: {
        'c3': ['d3', 'core'],
        'd3': ['core'],
    },
    paths: {
        'd3': 'assets/plugins/charts-c3/js/d3.v3.min',
        'c3': 'assets/plugins/charts-c3/js/c3.min',
    }
});