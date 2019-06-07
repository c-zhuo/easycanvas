const path = require('path');
// const uglifyjs = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');

module.exports = {
    js: (name) => {
        return glob.sync('./src/' + name);
    },

    resolve: {
        alias: {
            constants: path.join(__dirname, '../constants.js'),
            src: path.join(__dirname, '../src'),
            class: path.join(__dirname, '../src/class'),
            lib: path.join(__dirname, '../src/lib'),
            utils: path.join(__dirname, '../src/utils'),
        },
    },

    optimization: (env) => {
        return {
            minimizer: [
                new TerserPlugin({
                    cache: env === 'development',
                    parallel: true,
                    terserOptions: {
                        ecma: 6,
                        compress: {},
                        toplevel: true,
                        ie8: true,
                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    }
                }),

                // new uglifyjs({
                //     cache: env === 'development',
                //     parallel: true,
                //     uglifyOptions: {
                //         compress: env === 'production',
                //         ecma: 6,
                //         mangle: true
                //     },
                //     sourceMap: env === 'development',
                // })
            ]
        }
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
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    { loader: path.resolve('./src/loader.js') }
                ]
            }
        ]
    },

    devServer: {
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
    },
};
