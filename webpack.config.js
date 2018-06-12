const webpack = require('webpack');

module.exports = {
    entry: {
        tabler: './src/assets/js/tabler.js'
    },
    output: {
        path: __dirname,
        filename: '[name].js'
    }
};