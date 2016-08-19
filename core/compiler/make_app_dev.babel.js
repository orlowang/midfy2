import gulp from 'gulp';
import shell from 'gulp-shell';
import path from 'path';
import fs from 'fs';
import chalk from "chalk";
import express from 'express';
import gutil from 'gulp-util';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rev from 'gulp-rev';
import webpack from 'webpack';
import {
  getDepsVersion,
  doManifast
} from '../utils/depsutils';
import sourcemaps from 'gulp-sourcemaps';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Midfy from '../config';

const usercfg = require(`${Midfy.ENV_PROJECTPATH}/config.json`);

function buildDLLs(callback) {
  const webpackDllConfig = require('./webpack_dll.conf.babel').default;
  webpack(webpackDllConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:Build DLLs", err);
		gutil.log("[webpack:Build DLLs]", stats.toString({
			colors: true
		}));
    doManifast(usercfg.compile.dlls || Midfy.compile.dlls, callback)
  })
}

function buildAPP(callback) {
  webpack(require('./webpack_app.conf'), function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:Build APP", err);
		gutil.log("[webpack:Build APP]", stats.toString({
			colors: true
		}));
		callback();
  })
}

gulp.task("rundev", ["webpack:Build Schema"], function(){
  const serv = express();
  const webpackConfig = require('./webpack_app.conf.babel').default;
  let deps = getDepsVersion(usercfg.compile.dlls || Midfy.compile.dlls);
  fs.readFile(`${Midfy.compile.dllsOut}/dllsVersion.json`, 'utf8', (err, data) => {
    // create 'dllsVersion.json' if not exist.
    if (err) {
      console.log('[ERR]:'+err)
      buildDLLs(function(){
        serv.use(webpackDevMiddleware(webpack(webpackConfig), {
          noInfo: Midfy.compile.noInfo
        }));
      });
      return;
    }
    // rebuild DLLs if DLLs'version is out of date.
    let version = JSON.parse(data).version;
    if (version != deps.version) {
      buildDLLs(function(){
        serv.use(webpackDevMiddleware(webpack(webpackConfig), {
          noInfo: Midfy.compile.noInfo
        }));
      });
      return;
    }
    serv.use(webpackDevMiddleware(webpack(webpackConfig), {
      noInfo: Midfy.compile.noInfo
    }));
  })
  serv.listen(Midfy.server.devport, function(){
    // console.log("server is start.")
  })
})

// BUILD SCHEMA
gulp.task("webpack:Build Schema", shell.task([
  'babel-node ./make_schema.js'
]))

gulp.task("webpack:Build APP", function(callback) {
  buildAPP(callback)
})

gulp.task("webpack:Build DLLs", function(callback) {
  buildDLLs(callback)
})

gulp.task("webpack:Build POLYFILL", function(callback){
  
})

gulp.task("webpack:Build VENDOR", function(callback){

})
