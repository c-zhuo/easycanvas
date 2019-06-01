const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const path = require('path');
const glob = require('glob');
const env = 'development';

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        disableHostCheck: true,
        port: 8080
    },
    mode: env,
    entry: './src/index.js',
    output: {
        path: path.resolve('./dist/'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'easycanvas/build/loader' }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...glob.sync('./src/*.html').map(function (item) {
            return new HtmlWebpackPlugin({
                data: {
                    env: env
                },
                filename: item.split('/').pop(),
                template: path.resolve(__dirname, 'src', item.split('/').pop()),
                inject: false
            });
        })
    ]
};