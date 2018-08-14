'use strict';

var webpack = require('webpack');

var config = require('./webpack.easycanvas.dist.js');

config.output.filename = '[name].standalone.prod.js';

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
]);

module.exports = config;
