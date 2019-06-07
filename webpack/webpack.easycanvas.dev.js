'use strict';

var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var base = require('./webpack.config.base.js');

var env = 'development';

var mkdirp = require('mkdirp');

var js = base.js('*.js').reduce(function (prev, curr) {
    prev[curr.slice(2, -3).replace('src', 'build')] = [curr];
    return prev;
}, {});

// faster in develop
// js = { 'build/index': [ './src/index.js' ]};

Object.assign(js, glob.sync('./demos/js/*.js').reduce(function (prev, curr) {
    prev[curr.slice(2, -3)] = [curr];
    return prev;
}, {}));

// faster in develop
// var html = glob.sync('./demos/webpack-loader.html').map(function (item) {
var html = glob.sync('./demos/*.html').map(function (item) {
    return new HtmlWebpackPlugin({
        data: {
            env: env
        },
        filename: item.substr(0),
        template: item,
        inject: false
    });
});

var config = {
    mode: env,
    entry: js,
    resolve: base.resolve,
    output: {
        path: path.resolve('./dev/'),
        filename: '[name].js',
        globalObject: 'this',
    },
    module: {
        rules: base.module.rules,
        noParse: [
            /src\/lib\//
        ],
        // path.join(__dirname, '../src/lib')
    },
    plugins: ([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new webpack.DefinePlugin({
            'process.env.UMD': JSON.stringify('true')
        }),
        new CopyWebpackPlugin([
            {
                from: './demos/resource',
                to: './resource'
            }
        ]),
    ]).concat(html),

    devServer: base.devServer,
};

config.devtool = '#cheap-module-eval-source-map';

module.exports = config;