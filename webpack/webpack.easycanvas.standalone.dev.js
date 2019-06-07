'use strict';

var webpack = require('webpack');

var base = require('./webpack.config.base.js');
var config = require('./webpack.easycanvas.dist.js');

config.entry = config.entry('!(index.wxapp|index.wxgame|loader).js');
config.output.filename = '[name].standalone.dev.js';
config.output.libraryTarget = 'window';
config.mode = 'development';

config.optimization = base.optimization(config.mode);

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('develop'),
    })
]);

module.exports = config;
