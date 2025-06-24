// gulp/dev-sw.ts
const gulp = require("gulp");
const data = require("gulp-data");
const path = require("path");
const fs = require("fs");
const clean = require("gulp-clean");
const changed = require("gulp-changed");
const server = require("gulp-server-livereload");
const prettyHtml = require("gulp-pretty-html");
// Twig
const twig = require("gulp-twig");
// CSS
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const sourceMaps = require("gulp-sourcemaps");
// JS
const esbuild = require("gulp-esbuild");
// Other
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();

// Utils
const settings = {
  fileInclude: { prefix: "@@", basepath: "@file" },
  server: { livereload: true, open: true, port: 8080 },
  assets: { verbose: true },
};

/**
 * Root paths
 */
const root = {
  src: {
    _: "./src-sw/",
    twig: "./src-sw/templates/**/*.twig",
    scssAll: "./src-sw/scss/**/*.scss",
    scss: "./src-sw/scss/*.scss",
    js: "./src-sw/js/**/*.js",
    jsMain: "./src-sw/js/main.js",
    tsMain: "./src-sw/js/main.ts",
    ts: "./src-sw/js/**/*.ts",
    pages: "./src-sw/templates/pages/**/*.twig",
    data: "./src-sw/templates/data/",
    fonts: "./src-sw/fonts/*",
    assets: "./src-sw/assets/*",
    assetsAll: "./src-sw/assets/**/*",
    icons: "./src-sw/templates/icons/**/*.svg",
    json: "./src-sw/templates/data/**/*.json",
  },
  dev: {
    _: "./dev-sw/",
    css: "./dev-sw/css/",
    js: "./dev-sw/js/",
    fonts: "./dev-sw/fonts/",
    assets: "./dev-sw/assets/",
    assetsIcons: "./dev-sw/assets/icons/",
  },
  build: {
    _: "./build-sw/",
    css: "./build-sw/css/",
    js: "./build-sw/js/",
    fonts: "./build-sw/fonts/",
    assets: "./build-sw/assets/",
    assetsIcons: "./build-sw/assets/icons/",
  },
};

/**
 * Set plumber notify
 */
const setPlumberNotify = (errorTitle) => {
  return {
    errorHandler: notify.onError({
      title: errorTitle,
      message: "ERROR <%= error.message %>",
      sound: false,
    }),
  };
};

/**
 * Twig task
 */
gulp.task("twig-sw:dev", () => {
  return gulp
    .src(root.src.pages)
    .pipe(changed(root.dev._))
    .pipe(plumber(setPlumberNotify("TWIG SW")))
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}data.json`));
      }),
    )
    .pipe(
      data(function (file) {
        const pageDataPath = root.src.data + path.basename(file.path) + ".json";
        if (fs.existsSync(pageDataPath)) {
          return JSON.parse(fs.readFileSync(pageDataPath));
        }
        return {};
      }),
    )
    .pipe(
      data((file) => {
        const name = path.parse(file.path).name;
        const url = name === "index" ? "/" : `/${name}`;
        return { currentPath: url };
      }),
    )
    .pipe(twig({ base: "src-sw/templates", errorLogToConsole: true }))
    .pipe(prettyHtml())
    .pipe(gulp.dest(root.dev._));
});

gulp.task("twig-sw:build", () => {
  return gulp
    .src(root.src.pages)
    .pipe(changed(root.build._))
    .pipe(plumber(setPlumberNotify("TWIG SW")))
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}data.json`));
      }),
    )
    .pipe(
      data(function (file) {
        const pageDataPath = root.src.data + path.basename(file.path) + ".json";
        if (fs.existsSync(pageDataPath)) {
          return JSON.parse(fs.readFileSync(pageDataPath));
        }
        return {};
      }),
    )
    .pipe(
      data((file) => {
        const name = path.parse(file.path).name;
        const url = name === "index" ? "/" : `/${name}`;
        return { currentPath: url };
      }),
    )
    .pipe(twig({ base: "src-sw/templates", errorLogToConsole: true }))
    .pipe(prettyHtml())
    .pipe(gulp.dest(root.build._));
});

/**
 * SCSS Task
 */
gulp.task("scss-sw:dev", () => {
  return gulp
    .src(root.src.scss)
    .pipe(changed(root.dev.css))
    .pipe(plumber(setPlumberNotify("SCSS")))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: [path.resolve(__dirname, "src-sw/scss")],
      }).on("error", sass.logError),
    )
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(root.dev.css));
});

gulp.task("scss-sw:build", () => {
  return gulp
    .src(root.src.scss)
    .pipe(changed(root.build.css))
    .pipe(plumber(setPlumberNotify("SCSS")))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: [path.resolve(__dirname, "src-sw/scss")],
      }).on("error", sass.logError),
    )
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(root.build.css));
});

/**
 * JS Task
 */
gulp.task("js-sw:dev", () => {
  return gulp
    .src(root.src.tsMain)
    .pipe(
      esbuild({
        bundle: true,
        splitting: true,
        format: "esm",
        target: "es2017",
        sourcemap: false,
        minify: true,
        entryNames: "[name]",
        chunkNames: "chunks/[name]-[hash]",
        outdir: "./",
      }),
    )
    .pipe(gulp.dest(root.dev.js));
});

gulp.task("js-sw:build", () => {
  return gulp
    .src(root.src.tsMain)
    .pipe(
      esbuild({
        bundle: true,
        splitting: true,
        format: "esm",
        target: "es2017",
        sourcemap: false,
        minify: true,
        entryNames: "[name]",
        chunkNames: "chunks/[name]-[hash]",
        outdir: "./",
      }),
    )
    .pipe(gulp.dest(root.build.js));
});

/**
 * Fonts
 */
gulp.task("fonts-sw:dev", () => {
  return gulp
    .src(root.src.fonts)
    .pipe(changed(root.dev.fonts))
    .pipe(gulp.dest(root.dev.fonts));
});

gulp.task("fonts-sw:build", () => {
  return gulp
    .src(root.src.fonts)
    .pipe(changed(root.build.fonts))
    .pipe(gulp.dest(root.build.fonts));
});

/**
 * Assets
 */
gulp.task("assets-sw:dev", () => {
  return gulp
    .src(root.src.assetsAll)
    .pipe(changed(root.dev.assets))
    .pipe(gulp.dest(root.dev.assets));
});

gulp.task("assets-sw:build", () => {
  return gulp
    .src(root.src.assetsAll)
    .pipe(changed(root.build.assets))
    .pipe(gulp.dest(root.build.assets));
});

/**
 * Icons
 */
gulp.task("icons-sw:dev", () => {
  return gulp
    .src(root.src.icons)
    .pipe(changed(root.dev.assets))
    .pipe(gulp.dest(root.dev.assetsIcons));
});

gulp.task("icons-sw:build", () => {
  return gulp
    .src(root.src.icons)
    .pipe(changed(root.build.assets))
    .pipe(gulp.dest(root.build.assetsIcons));
});

/**
 * Clean task
 */
gulp.task("clean-sw:dev", (done) => {
  if (fs.existsSync(root.dev._)) {
    return gulp.src(root.dev._, { read: false }).pipe(clean({ force: true }));
  }
  done();
});

gulp.task("clean-sw:build", (done) => {
  if (fs.existsSync(root.build._)) {
    return gulp.src(root.build._, { read: false }).pipe(clean({ force: true }));
  }
  done();
});

/**
 * Server
 */
gulp.task("serve-sw:dev", () => {
  browserSync.init({
    server: { baseDir: "./dev-sw/" },
    open: true,
    port: 8080,
  });

  gulp
    .watch(root.src.twig, gulp.series("twig-sw:dev"))
    .on("change", browserSync.reload);
  gulp
    .watch(root.src.scssAll, gulp.series("scss-sw:dev", "twig-sw:dev"))
    .on("change", browserSync.reload);
  gulp
    .watch([root.src.js, root.src.ts], gulp.series("js-sw:dev"))
    .on("change", browserSync.reload);
  gulp
    .watch(root.src.fonts, gulp.series("fonts-sw:dev"))
    .on("change", browserSync.reload);
  gulp
    .watch(root.src.assetsAll, gulp.series("assets-sw:dev"))
    .on("change", browserSync.reload);
  gulp
    .watch(root.src.icons, gulp.series("icons-sw:dev"))
    .on("change", browserSync.reload);
  gulp
    .watch(
      [root.src.icons, root.src.json],
      gulp.series("twig-sw:dev", "scss-sw:dev"),
    )
    .on("change", browserSync.reload);
});
