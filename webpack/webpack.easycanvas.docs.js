'use strict';

var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var base = require('./webpack.config.base.js');

var env = 'development';

var mkdirp = require('mkdirp');

var js = glob.sync('./docs/**/*.js').reduce(function (prev, curr) {
    prev[curr.slice(2, -3).replace('src', 'build')] = [curr];
    return prev;
}, {});

var html = glob.sync('./docs/*.html').map(function (item) {
    return new HtmlWebpackPlugin({
        data: {
            env: env
        },
        filename: item.substr(0),
        template: 'ejs-compiled!' + item,
        inject: false
    });
});

var config = {
    entry: js,
    resolve: base.resolve,
    output: {
        path: path.resolve('./dev/'),
        filename: '[name].js'
    },
    module: {
        loaders: base.loaders
    },
    babel: base.babel,
    plugins: ([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ]).concat(html),
    node: base.node,
    debug: false,
    bail: true
};

config.debug = true;
config.bail = false;
config.devtool = '#cheap-module-eval-source-map';
config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
]);

// config.plugins = config.plugins.concat([
//     new webpack.optimize.OccurrenceOrderPlugin(),
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.AggressiveMergingPlugin(),
//     new webpack.optimize.UglifyJsPlugin({
//         sourceMap: false,
//         compress: {
//             pure_getters: true,
//             screw_ie8: true,
//             unsafe: true,
//             unsafe_comps: true,
//             warnings: false
//         },
//         output: {
//             comments: false
//         }
//     })
// ]);

config.devServer = {
    host: '0.0.0.0',
    contentBase: path.resolve('./dev'),
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