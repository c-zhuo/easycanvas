'use strict';

var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var base = require('./webpack.config.base.js');
var docConfig = require('./webpack.config.doc.js');

var js = glob.sync('./doc-src/main.js').reduce(function (prev, curr) {
    prev[curr.slice(2, -3).replace('src', 'src')] = [curr];
    return prev;
}, {});

var html = glob.sync('./doc-src/*.html').map(function (item) {
    return new HtmlWebpackPlugin({
        data: {
            // env: env
        },
        filename: item.substr(0),
        template: item,
        inject: false
    });
});

var config = docConfig;
config.entry = js;
config.mode = 'development';
config.plugins = config.plugins.concat(html);

config.devtool = '#cheap-module-eval-source-map';
config.devServer = base.devServer;

module.exports = config;