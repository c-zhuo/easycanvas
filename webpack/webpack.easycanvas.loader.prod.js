'use strict';

var base = require('./webpack.config.base.js');
var config = require('./webpack.easycanvas.dist.js');

config.entry = config.entry('babel-loader.js');
config.output.filename = '[name].umd.prod.js';
config.output.libraryTarget = 'umd';
config.mode = 'production';
config.node = {
    fs: 'empty'
};

config.optimization = base.optimization(config.mode);

module.exports = config;
