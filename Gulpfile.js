'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
//const imagemin = require('gulp-imagemin');

const dartSass = require('sass');
const gulpSass =  require('gulp-sass');
const sass = gulpSass(dartSass);

var paths = {
  styles: {
    src: 'assets/style/app.scss',
    dest: 'build/css'
  },
  scripts: {
    src: 'assets/js/**/*.js',
    dest: 'build/js'
  },
  imagePaths: {
    src: 'assets/images/*',
    dest: 'build/images'
  },
  HTMLPaths: {
    src: '*.html',
    dest: 'build/'
  },
  files: {
    src: 'assets/files/*',
    dest: 'build/files'
  }
};

function scripts() {
  return src(paths.scripts.src, { sourcemaps: true })
    // .pipe(uglify())
    .pipe(dest(paths.scripts.dest));
}

function buildStyles() {
  return src(paths.styles.src)
    // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(dest(paths.styles.dest));
}

function imageMinify() {
  return src(paths.imagePaths.src)
    // .pipe(imagemin())
    .pipe(dest(paths.imagePaths.dest))
}


function minifyHTML() {
  return src(paths.HTMLPaths.src)
  .pipe(dest(paths.HTMLPaths.dest))
}

function moveFiles() {
  return src(paths.files.src)
  .pipe(dest(paths.files.dest))
}

function TaskWatch() {
  watch(paths.scripts.src, scripts);
  watch('assets/style/**/*.scss', buildStyles);
  watch(paths.imagePaths.src, imageMinify);
  watch(paths.HTMLPaths.src, minifyHTML);
  watch(paths.files.src, moveFiles);
};

var build = series(parallel(scripts, buildStyles, imageMinify, moveFiles, minifyHTML, TaskWatch));

exports.scripts = scripts;
exports.buildStyles = buildStyles;
exports.imageMinify = imageMinify;
exports.minifyHTML = minifyHTML;
exports.moveFIles = moveFiles;
exports.watch = watch;
exports.build = build;

exports.default = build;
