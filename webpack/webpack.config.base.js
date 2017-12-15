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
        exclude: /node_modules/
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
};
