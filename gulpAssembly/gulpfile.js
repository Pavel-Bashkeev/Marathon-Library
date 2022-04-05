import gulp from 'gulp';
const { series, parallel, watch, src, dest } = gulp;


import rename from 'gulp-rename';
import gulpIf from 'gulp-if';
import browserSync from 'browser-sync';
import del from 'del';
import gulpPlumber from 'gulp-plumber';
import gulpNotify from 'gulp-notify';
import SourceMap from 'gulp-sourcemaps';
import newer from 'gulp-newer';

// html
import fileInclude from 'gulp-file-include';
// html


// styles
import compilSass from 'sass';
import gulpSass from 'gulp-sass';
import gcmq from 'gulp-group-css-media-queries';
import cleanCss from 'gulp-clean-css';
import autoPrefixer from 'gulp-autoprefixer';

const sass = gulpSass(compilSass);
// styles

// js
import webpackStream from 'webpack-stream';
import terser from 'gulp-terser';
// js

// images

import gulpImage from 'gulp-image';
// import gulpImageAvif from 'gulp-avif';
// import gulpImageWebp from 'gulp-webp';


// images

const srcPath = './src/';
const buildPath = './build/';
let dev = false;

const path = {
  src: {
    base: `${srcPath}`,
    html: `${srcPath}*.html`,
    scss: `${srcPath}scss/*.scss`,
    js: `${srcPath}js/*.js`,
    img: `${srcPath}images/**/*.{jpg,jpeg,png,gif,svg}`,
    fonts: `${srcPath}fonts/**/*.*`,
  },
  build: {
    base: `${buildPath}`,
    html: `${buildPath}`,
    css: `${buildPath}css/`,
    js: `${buildPath}js/`,
    img: `${buildPath}images/`,
    fonts: `${buildPath}fonts/`,
  },
  watch: {
    html: `${srcPath}**/*.html`,
    scss: `${srcPath}scss/**/*.scss`,
    js: `${srcPath}js/**/*.js`,
    img: `${srcPath}images/**/*.{jpg,jpeg,png,gif,svg}`,
    fonts: `${srcPath}fonts/**/*.*`,
  }
}

const html = () => (
  src(path.src.html)
    .pipe(gulpPlumber(
      gulpNotify.onError({
        title: 'HTML',
        messange: "Error: <%= error.messamge %>"
      })
    ))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
);

const styles = () => (
  src(path.src.scss)
    .pipe(gulpPlumber(
      gulpNotify.onError({
        title: "SCSS",
        messange: "Error: <%= error.messamge %>"
      })
    ))
    .pipe(gulpIf(dev, SourceMap.init({
      loadMaps: true
    })))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulpIf(!dev, gcmq()))
    .pipe(gulpIf(!dev, autoPrefixer({
      grid: true,
      overrideBrowserslist: ['last 5 version'],
      cascade: true
    })))
    .pipe(gulpIf(!dev, cleanCss({
      level: {
        1: {
          specialComments: 0,
        },
      },
    })))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulpIf(dev, SourceMap.write()))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream())
)

const scripts = () => (
  src(path.src.js)
    .pipe(gulpPlumber(
      gulpNotify.onError({
        title: "JS",
        messange: "Error: <%= error.messamge %>"
      })
    ))
    .pipe(webpackStream({
      mode: dev ? 'development' : 'production',
      devtool: dev ? 'eval-source-map' : false,
      optimization: {
        minimize: false
      },
      module: {
        rules: [
          {
            test: /\.(js|ts)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-transform-runtime']
                }
              }
            ]
          },
        ],
      },
    }))
    .pipe(gulpIf(!dev, terser()))
    .pipe(rename({
      extname: '.min.js',
    }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
)

const imagesTask = () => (
  src(path.src.img)
    .pipe(newer(path.build.img))
    .pipe(gulpImage({
      pngquant: true,
      optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
      pngquant: ['--speed=1', '--force', 256],
      zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
      jpegRecompress: ['--strip', '--quality', 'medium', '--min', 70, '--max', 80],
      mozjpeg: ['-optimize', '-progressive'],
      gifsicle: ['--optimize'],
      svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
    }))
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream({
      once: true,
    }))
)

const fonts = () => (
  src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.stream({
      once: true,
    }))
)

const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    host: 'localhost',
    // tunnel: true,
    server: {
      baseDir: 'build'
    }
  })

  watch(path.watch.html, html)
  watch(path.watch.scss, styles)
  watch(path.watch.js, scripts)
  watch(path.watch.img, imagesTask)
  watch(path.watch.fonts, fonts);
}

const clear = () => del(path.build.base, {
  force: true
})

const develop = (ready) => {
  dev = true;
  ready();
}


export const baseTasks = parallel(html, styles, scripts, imagesTask, fonts);

export const buildMain = series(clear, baseTasks);

export default series(develop, baseTasks, server);