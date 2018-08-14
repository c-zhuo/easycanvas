const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

const entryFile = path.resolve(__dirname, './panel/index.js');
const outputPath = path.resolve(__dirname, './dist/panel');

const js = glob.sync(entryFile).reduce(function (prev, curr) {
    prev[curr.split('/').pop().replace(/\.js/, '')] = [curr];
    return prev;
}, {});

const config = {
    entry: js,
    output: {
        path: outputPath,
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            },
        })
    ],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader',
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader?name=[hash:8].[ext]',
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: 'style-loader!css-loader!sass-loader',
                    sass: 'style-loader!css-loader!sass-loader',
                },
            },
        }],
    },
    resolve: {
        alias: {
            constants: path.join(__dirname, '../constants.js'),
        },
    },
    node: {
        process: false,
        setImmediate: false
    },
    performance: {
        hints: false
    },
};

module.exports = config;