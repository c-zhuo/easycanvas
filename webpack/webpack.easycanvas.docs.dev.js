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
    ]).concat(html);

config.debug = true;
config.bail = false;
config.devtool = '#cheap-module-eval-source-map';
config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
]);

config.devServer = {
    host: '0.0.0.0',
    // contentBase: path.resolve('./readme'), // static files
    historyApiFallback: true,
    inline: true,
    hot: true,
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