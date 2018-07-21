'use strict';

var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var base = require('./webpack.config.base.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");

var js = glob.sync('./doc-src/main.js').reduce(function (prev, curr) {
    console.log(curr);
    prev[curr.slice(2, -3).replace('doc-src/', '')] = [curr];
    return prev;
}, {});

var html = glob.sync('./doc-src/index.html').map(function (item) {
    return new HtmlWebpackPlugin({
        filename: item.substr(0).replace('doc-src/', ''),
        template: 'ejs-compiled!' + item,
        inject: false
    });
});

var config = {
    entry: js,
    resolve: base.resolve,
    output: {
        path: path.resolve('./docs'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: base.loaders.concat([{
            test: /\.scss$/,
            loaders: ['css', 'sass']
        },
        { 
            test: /\.js$/,
            loader: StringReplacePlugin.replace({
                replacements: [
                    {
                        pattern: /\.\.\/resource\//ig,
                        replacement: function (match, p1, offset, string) {
                            return 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/resource/';
                        }
                    }
                ]
            })
        }])
    },
    babel: base.babel,
    plugins: ([
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
        new CopyWebpackPlugin([
            {
                from: './doc-src/lib/',
                to: './lib/'
            }
        ]),
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify(env)
        })
    ]).concat(html),
    node: base.node,
    debug: false,
    bail: true
};

config.plugins = config.plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
]);

module.exports = config;
