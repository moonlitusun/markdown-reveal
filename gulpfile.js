const {
  parallel,
  series,
  src,
  dest,
  watch
} = require('gulp');
const browsersync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
// const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const newer = require('gulp-newer');
const gulpHtmlMin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');

function entryPrefix(v) {
  return `src${v[0]}`;
}

function outputPrefix(v) {
  return `src/dist${v[0]}`;
}

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: outputPrefix``,
    },
    startPath: '/demo.html',
    port: 3366
  });

  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del([outputPrefix``]);
}

function html() {
  return src(entryPrefix`/*.html`)
    .pipe(newer(outputPrefix``))
    .pipe(gulpHtmlMin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest(outputPrefix``))
    .pipe(browsersync.stream());
}

function images() {
  return src(entryPrefix`/images/**`)
    .pipe(newer(outputPrefix`/images`))
    .pipe(dest(outputPrefix`/images/`));
}

function script() {
  return src(entryPrefix`/js/**/*.js`)
    // .pipe(sourcemaps.init())
    .pipe(babel({
      'presets': [
        [
          '@babel/preset-env',
          {
            'targets': {
              'browsers': [
                'ie >= 10',
              ]
            },
            'modules': false,
          }
        ],
      ],
    }))
    .pipe(uglify())
    // .pipe(sourcemaps.write())
    .pipe(dest(outputPrefix`/js`));
}

function sassTask() {
  return src(entryPrefix`/sass/**/!(_)*.scss`)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.write())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(outputPrefix`/css`))
    .pipe(browsersync.stream());
}

function watchFiles() {
  watch(entryPrefix`/sass/**`, series(sassTask));
  watch(entryPrefix`/*.html`, series(html));
  watch(entryPrefix`/js/**`, series(script, browserSyncReload));
  watch(entryPrefix`/images/**`, series(images));
}

exports.default = series(clean, parallel(sassTask, html, script, images));
exports.watch = parallel(watchFiles, browserSync);