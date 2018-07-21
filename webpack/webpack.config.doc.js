'use strict';
var base = require('./webpack.config.base.js');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var env = 'development';

var config = {
    resolve: base.resolve,
    output: {
        path: path.resolve('./dev/'),
        filename: '[name].js',
    },
    module: {
        loaders: base.loaders.concat([{
            test: /\.scss$/,
            loaders: ['css', 'sass']
        }])
    },
    babel: base.babel,
    node: base.node,
    debug: false,
    bail: true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new CopyWebpackPlugin([
            {
                from: './doc-src/lib/',
                to: './doc-src/lib/'
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: './demos/resource/',
                to: './resource/'
            }
        ]),
    ],
};

module.exports = config;
