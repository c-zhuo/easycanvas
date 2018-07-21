'use strict';
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
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
        template: 'ejs-compiled!' + item,
        inject: false
    });
});

var config = docConfig;
config.entry = js;
config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            pure_getters: true,
            screw_ie8: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
        },
        output: {
            comments: false
        }
    }),
]).concat(html);

config.debug = false;
config.bail = false;

config.devServer = {
    host: '0.0.0.0',
    historyApiFallback: true,
    inline: false,
    hot: false,
    disableHostCheck: true,
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }
};

module.exports = config;