'use strict';

var webpack = require('webpack');

var config = require('./webpack.easycanvas.dist.js');

config.output.filename = '[name].js';

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env.UMD': JSON.stringify('false')
    })
]);

module.exports = config;
