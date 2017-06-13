'use strict';

var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var env = process.env.NODE_ENV || 'development';
env = 'min';

var js = glob.sync('./src/*.js').reduce(function (prev, curr) {
    prev[curr.slice(6, -3)] = [curr];
    return prev;
}, {});

var config = {
    entry: js,
    resolve: {
        root: [
            path.resolve('./src/modules')
        ],
        alias: {
            // js: path.join(__dirname, "./app/src/scripts"),
            framework: path.join(__dirname, "./src/index.js"),
        }
    },
    output: {
        path: path.resolve('./build'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }]
    },
    babel: {
        presets: ['es2015-loose'],
        plugins: [
            'transform-object-assign'
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ],
    node: {
        process: false,
        setImmediate: false
    },
    debug: false,
    bail: true
};

if (env === 'min') {
    config.plugins = config.plugins.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
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
        })
    ]);
}

if (env !== 'min') {
    config.debug = true;
    config.bail = false;
    config.devtool = '#cheap-module-eval-source-map';
}
config.plugins = config.plugins.concat([
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin()
]);
config.devServer = {
    disableHostCheck: true,
    host: '0.0.0.0',
    contentBase: path.resolve('./build'),
    historyApiFallback: true,
    inline: true,
    hot: true,
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }
};
config.module.preLoaders = undefined;

module.exports = config;
