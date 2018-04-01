'use strict';

var webpack = require('webpack');

var config = require('./webpack.easycanvas.dist.js');

config.output.filename = '[name].standalone.dev.js';

config.plugins = config.plugins.concat([
    // new webpack.optimize.UglifyJsPlugin({
    //     sourceMap: false,
    //     compress: {
    //         pure_getters: true,
    //         screw_ie8: true,
    //         unsafe: true,
    //         unsafe_comps: true,
    //         warnings: false
    //     },
    //     output: {
    //         comments: false
    //     }
    // }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('develop')
    })
]);

module.exports = config;
