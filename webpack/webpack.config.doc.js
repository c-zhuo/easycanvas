const base = require('./webpack.config.base.js');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const env = 'development';

const config = {
    resolve: base.resolve,
    output: {
        path: path.resolve('./dev/'),
        filename: '[name].js',
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: env === 'development',
                parallel: true,
                terserOptions: {
                    ecma: 6,
                    compress: {},
                    toplevel: true,
                    ie8: true,
                }
            }),
        ]
    },
    module: {
        rules: base.module.rules.concat([{
            test: /\.scss$/,
            use: [
                {
                    loader: 'css-loader',
                }, {
                    loader: 'sass-loader',
                },
            ]
        }])
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
