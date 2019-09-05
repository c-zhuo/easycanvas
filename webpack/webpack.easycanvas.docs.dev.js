'use strict';

var path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var base = require('./webpack.config.base.js');
var docConfig = require('./webpack.config.doc.js');

var js = glob.sync('./doc-src/main.js').reduce(function (prev, curr) {
    prev[curr.slice(2, -3)] = [curr];
    return prev;
}, {});

var html = glob.sync('./doc-src/index.html').map(function (item) {
    return new HtmlWebpackPlugin({
        filename: item.substr(0),
        template: item,
        inject: false
    });
});

var config = docConfig;
config.output = {
    path: path.resolve('./'),
    filename: '[name].js',
    publicPath: '/',
    sourcePrefix: '',
    chunkFilename: '[name].bundle.js'
};

config.entry = js;
config.mode = 'development';
config.plugins = config.plugins.concat(html);
config.node = {
    fs: 'empty' // https://github.com/webpack-contrib/css-loader/issues/447
};

config.devtool = '#cheap-module-eval-source-map';
config.devServer = base.devServer;

module.exports = config;