let gulp = require('gulp');
let _ = require('lodash');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rev = require('gulp-rev');
let sourcemaps = require('gulp-sourcemaps');
let Midfy = require('../config');

const vendors = {
  list: {
    'react': `${Midfy.ENV_BASEPATH}/node_modules/react/dist/react.min.js`,
    'react-dom': `${Midfy.ENV_BASEPATH}/node_modules/react-dom/dist/react-dom.min.js`,
    'react-redux': `${Midfy.ENV_BASEPATH}/node_modules/react-redux/dist/react-redux.min.js`,
    'redux': `${Midfy.ENV_BASEPATH}/node_modules/redux/dist/redux.min.js`
  },
  path: `${Midfy.ENV_BASEPATH}/build/vendor`
};

const polyfill = {
  lists: [
    {
      'whatwg-fetch': `${Midfy.ENV_BASEPATH}/node_modules/whatwg-fetch/fetch.js`,
      'deviceinfo': `${Midfy.ENV_BASEPATH}/core/selflib/deviceinfo.js`,
    }
  ],
  path: `${Midfy.ENV_BASEPATH}/polyfill`
}

gulp.task('build:vendor', () => {
  gulp.src(_.values(vendors.list))
    .pipe(concat('vendor.js'))
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(vendors.path))
})

gulp.task('build:polyfill', () => {
  polyfill.lists.map((list, i) => {
    gulp.src(_.values(list))
      .pipe(uglify())
      .pipe(concat('polyfill.js'))
      .pipe(rev())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(polyfill.path))
  })
})
