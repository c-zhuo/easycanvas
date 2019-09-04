'use strict';

var webpack = require('webpack');

var base = require('./webpack.config.base.js');
var config = require('./webpack.easycanvas.dist.js');

config.entry = config.entry('!(index.wxapp|index.wxgame).js');
config.output.filename = '[name].standalone.prod.js';
config.output.libraryTarget = 'window';
config.mode = 'production';
config.externals = {
    // '@babel/core': 'Babel',
};

config.optimization = base.optimization(config.mode);

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
    })
]);

module.exports = config;
