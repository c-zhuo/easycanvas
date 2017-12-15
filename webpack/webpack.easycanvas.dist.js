'use strict';

var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var base = require('./webpack.config.base.js');

var js = glob.sync('./src/*.js').reduce(function (prev, curr) {
    prev[curr.slice(6, -3).replace('index', 'easycanvas')] = [curr];
    return prev;
}, {});

var config = {
    entry: js,
    resolve: base.resolve,
    output: {
        path: path.resolve('./build'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: base.loaders
    },
    babel: base.babel,
    plugins: [],
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
