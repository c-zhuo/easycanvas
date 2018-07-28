'use strict';

var webpack = require('webpack');

var config = require('./webpack.easycanvas.dist.js');

config.output.filename = '[name].standalone.dev.js';

config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: false,
        output: {
            comments: false,
            beautify: true
        }
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('develop')
    })
]);

module.exports = config;
