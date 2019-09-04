'use strict';

var base = require('./webpack.config.base.js');
var config = require('./webpack.easycanvas.dist.js');

config.entry = config.entry('!(loader|babel-plugin|components).js');
config.output.filename = '[name].common.prod.js';
config.output.libraryTarget = 'commonjs';
config.mode = 'production';

config.optimization = base.optimization(config.mode);

module.exports = config;
