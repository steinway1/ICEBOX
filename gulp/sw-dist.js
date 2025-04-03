const gulp = require("gulp");
const fs = require("fs");
const clean = require("gulp-clean");
const changed = require("gulp-changed");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const data = require("gulp-data");
const twig = require("gulp-twig");
const prettyHtml = require("gulp-pretty-html");
const path = require("path");
// CSS
const gulpSass = require("gulp-sass");
const dartSass = require("sass");
const sourceMaps = require("gulp-sourcemaps");
const sassGlob = require("gulp-sass-glob");
const cleanCSS = require("gulp-clean-css");
const sass = gulpSass(dartSass);
// JS
const rename = require("gulp-rename");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

// Utils
const setPlumberNotify = (errorTitle) => {
  return {
    errorHandler: notify.onError({
      title: errorTitle,
      message: "ERROR <%= error.message %>",
      sound: false,
    }),
  };
};

const root = {
  src: {
    scss: "./src/swisswatches/scss/*.scss",
    js: "./src/swisswatches/js/*.js",
    templates: "./src/swisswatches/templates/*.twig",
    fonts: "./src/swisswatches/fonts/*",
  },
  change: {
    twig: "./src/swisswatches/templates/**/*.twig",
    scss: "./src/swisswatches/scss/**/*.scss",
    js: "./src/swisswatches/js/**/*.js",
    data: "./src/swisswatches/data/**/*.json",
  },
  dev: {
    _: "./build-sw/",
    css: "./build-sw/css/",
    js: "./build-sw/js/",
    fonts: "./build-sw/fonts/",
  },
};
const taskname = {
  clean: "sw-clean:build",
  twig: "sw-twig:build",
  css: "sw-css:build",
  watch: "sw-watch:build",
  js: "sw-js:build",
  fonts: "sw-fonts:build",
};

// JS
gulp.task(taskname.js, () => {
  const jsFiles = fs
    .readdirSync("./src/swisswatches/js")
    .filter((file) => file.endsWith(".js"));

  return Promise.all(
    jsFiles.map((file) => {
      return new Promise((resolve, reject) => {
        browserify({
          entries: [`./src/swisswatches/js/${file}`],
          debug: true,
        })
          .transform(babelify, {
            presets: ["@babel/preset-env"],
            global: true,
          })
          .bundle()
          .pipe(source(file))
          .pipe(buffer())
          .pipe(plumber(setPlumberNotify("JAVASCRIPT")))
          .pipe(gulp.dest(root.dev.js))
          .on("end", resolve)
          .on("error", reject);
      });
    })
  );
});

// Clean Files
gulp.task(taskname.clean, (done) => {
  if (fs.existsSync(root.dev._)) {
    return gulp.src(root.dev._, { read: false }).pipe(clean({ force: true }));
  }
  done();
});

// Twig Files
gulp.task(taskname.twig, () => {
  return gulp
    .src(root.src.templates)
    .pipe(changed(root.dev._))
    .pipe(plumber(setPlumberNotify("SWISSWATCHES TWIG")))
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`src/swisswatches/data/data.json`));
      })
    )
    .pipe(
      data(function (file) {
        return JSON.parse(
          fs.readFileSync(
            `src/swisswatches/data/${path.basename(file.path, ".twig")}.json`
          )
        );
      })
    )
    .pipe(twig({ base: "src/swisswatches/templates", errorLogToConsole: true }))
    .pipe(prettyHtml())
    .pipe(gulp.dest(root.dev._));
});

// SCSS Files
gulp.task(taskname.css, () => {
  return gulp
    .src(root.src.scss)
    .pipe(changed(root.dev.css))
    .pipe(plumber(setPlumberNotify("SWISSWATCHES SCSS")))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: ["./src/swisswatches/scss"],
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(cleanCSS())
    .pipe(sourceMaps.write("./"))
    .pipe(gulp.dest(root.dev.css));
});

// Fonts
gulp.task(taskname.fonts, () => {
  return gulp.src(root.src.fonts).pipe(gulp.dest(root.dev.fonts));
});

// Watch
gulp.task(taskname.watch, () => {
  gulp.watch(root.change.twig, gulp.parallel(taskname.twig));
  gulp.watch(root.change.scss, gulp.parallel(taskname.css));
  gulp.watch(root.change.js, gulp.parallel(taskname.js));
  gulp.watch(root.change.data, gulp.parallel(taskname.twig));
});
