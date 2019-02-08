var path = require('path');

module.exports = {
    resolve: {
        alias: {
            constants: path.join(__dirname, '../constants.js'),
            src: path.join(__dirname, '../src'),
            class: path.join(__dirname, '../src/class'),
            lib: path.join(__dirname, '../src/lib'),
            utils: path.join(__dirname, '../src/utils'),
        },
    },

    loaders: [{
        test: /\.js$/,
        loader: 'babel',
    }, {
        test: /\.jsx$/,
        loaders: ['babel', path.resolve('./src/loader.js')]
    }],

    babel: {
        presets: ['es2015'],
        plugins: [
            'transform-object-assign'
        ]
    },

    node: {
        process: false,
        setImmediate: false
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
