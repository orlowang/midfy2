import gulp from 'gulp';
import webpack from 'webpack';
import gutil from 'gulp-util';
import webpackConfig from './webpack_app_prd.conf.babel';

gulp.task("Make vendors", function() {
  
})

gulp.task("Make polyfill", function() {
  
})


gulp.task("webpack:Build App", function() {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:Build APP", err);
    gutil.log("[webpack:Build APP]", stats.toString({
      colors: true
    }));
  })
})