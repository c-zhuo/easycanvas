const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const gulpUtil = require('gulp-util');

const webpackExec = () => {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.log(err);
        }
        gulpUtil.log('[webpack]', stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));
    });
};
gulp.task('watch', ['build'], () => {
    gulp.watch('./panel/**/*.*', ['build']);
});
gulp.task('build', () => {
    webpackExec();
});
