// karma tests with yarn installing will throw an error
// https://github.com/karma-runner/karma-phantomjs-launcher/issues/120

var webpack = require('webpack')
var webpackBase = require('../webpack/webpack.config.base.js');
var path = require('path');
var base = require('../webpack/webpack.config.base.js');

var webpackConfig = {
    resolve: {
        alias: Object.assign(base.resolve.alias, {
            karma: path.join(__dirname, '../karma/'),
        }),
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }],
    },
    babel: {
        presets: ['es2015'],
        plugins: [
            'transform-object-assign',
            'syntax-dynamic-import'
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            }
        })
    ],
    devtool: '#inline-source-map'
}

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Safari', 'PhantomJS'],
    // browsers: ['Chrome'],
    // browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,


    webpack: webpackConfig,
    // webpackMiddleware: {
        // noInfo: true
    // },
    // list of files / patterns to load in the browser
    files: [
        {
            pattern: './karma/cases/**.js', included: true
        }
    ],
    preprocessors: {
        './karma/cases/**.js': ['webpack', 'sourcemap']
    },


    plugins: [
        'karma-jasmine',
        // 'karma-mocha-reporter',
        'karma-sourcemap-loader',
        'karma-webpack',
        'karma-babel-preprocessor',
        'karma-chrome-launcher',
        'karma-safari-launcher',
        'karma-phantomjs-launcher'
        // 'karma-firefox-launcher',
    ]

  })
}
