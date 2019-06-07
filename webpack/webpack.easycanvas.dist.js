'use strict';

var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var base = require('./webpack.config.base.js');

var js = function (name) {
    return base.js(name).reduce(function (prev, curr) {
        prev[curr.slice(6, -3).replace('index', 'easycanvas')] = [curr];
        return prev;
    }, {});
};

var config = {
    entry: js,
    resolve: base.resolve,
    output: {
        path: path.resolve('./build'),
        filename: '[name].js',
        globalObject: 'this',
    },
    module: {
        rules: base.module.rules,
    },
    plugins: [],
};

module.exports = config;
