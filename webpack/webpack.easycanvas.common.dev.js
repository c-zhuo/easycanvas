'use strict';

var base = require('./webpack.config.base.js');
var config = require('./webpack.easycanvas.dist.js');

config.entry = config.entry('!(loader|babel-loader|components).js');
config.output.filename = '[name].common.dev.js';
config.output.libraryTarget = 'commonjs';
config.mode = 'development';

config.optimization = base.optimization(config.mode);

module.exports = config;
