'use strict';

var base = require('./webpack.config.base.js');
var config = require('./webpack.easycanvas.dist.js');

config.entry = config.entry('babel-plugin.js');
config.output.filename = 'babel-plugin.js';
config.output.libraryTarget = 'umd';
config.target = 'node';
config.mode = 'production';
// 项目的依赖中包含这几项
config.externals = {
    '@babel/core': '@babel/core',
    '@babel/helper-builder-react-jsx': '@babel/helper-builder-react-jsx',
    '@babel/plugin-syntax-jsx': '@babel/plugin-syntax-jsx',
    '@babel/helper-plugin-utils': '@babel/helper-plugin-utils'
};

config.optimization = base.optimization(config.mode);

module.exports = config;
