const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const glob = require('glob');
const env = process.env.NODE_ENV;

console.log('Building for', env);

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        disableHostCheck: true,
        port: 8080
    },
    optimization: {
        // usedExports: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    ecma: 6,
                    compress: {},
                    toplevel: true,
                    ie8: true,
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
            }),
        ],
    },
    mode: env,
    devtool: env === 'development' && '#eval-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve('./dist/'),
        filename: 'index.js',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.jsx$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['easycanvas/build/babel-plugin']
                        }
                    }
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