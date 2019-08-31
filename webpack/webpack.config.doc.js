const base = require('./webpack.config.base.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const env = 'development';

const config = {
    target: base.base,
    resolve: base.resolve,
    optimization: base.optimization(env),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ['@babel/plugin-syntax-dynamic-import'],
                    }
                }
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                    }, {
                        loader: 'sass-loader',
                    },
                ]
            }]
    },
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
