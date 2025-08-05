// Plugins
const gulp = require('gulp');
const data = require('gulp-data');
const path = require('path');
const fs = require('fs');
const clean = require('gulp-clean');
const changed = require('gulp-changed');
const server = require('gulp-server-livereload');
const webserver = require('gulp-webserver');
// HTML
const fileInclude = require('gulp-file-include');
const prettyHtml = require('gulp-pretty-html');
// Twig
const twig = require('gulp-twig');
// CSS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
// JS
const esbuild = require('gulp-esbuild');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const browserify = require('browserify');
const babelify = require('babelify');
const aliasify = require('aliasify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const mergeStream = require('merge-stream');
// Other
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

// Utils
const settings = {
  fileInclude: { prefix: '@@', basepath: '@file' },
  server: {
    livereload: true,
    open: true,
    port: 8080,
    host: '0.0.0.0',
  },
  assets: { verbose: true },
};

const setPlumberNotify = errorTitle => {
  return {
    errorHandler: notify.onError({
      title: errorTitle,
      message: 'ERROR <%= error.message %>',
      sound: false,
    }),
  };
};

// Root
const root = {
  src: {
    _: './src/',
    html: './src/html/*.html',
    scss: './src/scss/*.scss',
    scssPromo: './src/scss/modules/promo/**/*.scss',
    scssPromoRoot: './src/js/promo',
    assets: './src/assets/*',
    adminSCSS: './src/scss/admin/*.scss',
    adminJS: {
      _: './src/js/admin/*.js',
      lib: {
        jquery: './src/js/admin/lib/jquery.js',
        lottie: './src/js/admin/lib/lottie.js',
        air_datepicker: './src/js/admin/lib/air-datepicker.js',
        select2: './src/js/admin/lib/select2.js',
        splide: './src/js/admin/lib/splide.js',
      },
      bundle: {
        main: './src/js/admin/main.js',
      },
      ts: './src/js/admin/ts/*.ts',
      modules: './src/js/admin/modules/*.mjs',
    },
    js: {
      _: './src/js/*.js',
      plugins: './src/js/plugins/**',
      lib: {
        jquery: './src/js/jquery.js',
        jqueryCrs: './src/js/jquery.crs.min.js',
        splide: './src/js/splide.js',
        splideGrid: './src/js/splide-grid.js',
        intlTelInput: './src/js/intlTelInput.js',
        popper: './src/js/popper.js',
        tippy: './src/js/tippy.js',
        parsley: './src/js/parsley.min.js',
        zoom: './src/js/jQuery-zoom.js',
        fancybox: './src/js/fancybox.min.js',
        sirv: './src/js/sirv.js',
        zenscroll: './src/js/zenscroll.js',
      },
      bundle: {
        main: './src/js/main.js',
        vendor: './src/js/vendor.js',
        admin: './src/js/admin/main.js',
        main_v2: './src/js/main_v2.js',
        login: './src/js/login.js',
        cartMail: './src/js/cart-mail.js',
      },
      promo: {
        _: './src/js/promo/**/*.js',
        root: './src/js/promo',
        lib: './src/js/promo/libraries/*.js',
        main: './src/js/promo/*.js',
      },
      xmas: {
        lib: './src/js/xmas/libraries/*.js',
        main: './src/js/xmas/*.js',
      },
      newyear: {
        lib: './src/js/new-year/libraries/*.js',
        main: './src/js/new-year/*.js',
      },
      vday: {
        lib: './src/js/vday/libraries/*.js',
        main: './src/js/vday/*.js',
      },
    },
    assets: './src/assets/**/*',
    adminAssets: './src/templates/admin/assets/**/*',
    fonts: './src/fonts/*',
    templates: './src/templates/*.twig',
    adminTemplates: './src/templates/admin/*.twig',
    data: './src/templates/data/',
    adminData: './src/templates/data/admin/',
  },
  dev: {
    _: './dev/',
    html: './dev/html/',
    adminPages: './dev/admin/',
    adminCSS: './dev/admin/css/',
    adminJS: './dev/admin/js/',
    adminJSModules: './dev/admin/js/modules',
    adminFonts: './dev/admin/fonts/',
    css: './dev/css/',
    cssPromo: './dev/css/promo',
    js: './dev/js/',
    jsPromo: './dev/js/promo',
    jsPlugins: './dev/js/plugins/',
    assets: './dev/assets/',
    adminAssets: './dev/admin/assets/',
    fonts: './dev/fonts/',
  },
};

// Tasks

//  ADMIN
gulp.task('twig-admin:dev', () => {
  return gulp
    .src(root.src.adminTemplates)
    .pipe(changed(root.dev.adminPages))
    .pipe(plumber(setPlumberNotify('ADMIN TWIG')))
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`src/templates/data/admin/data.json`));
      }),
    )
    .pipe(
      data(function (file) {
        return JSON.parse(fs.readFileSync(root.src.adminData + path.basename(file.path) + '.json'));
      }),
    )
    .pipe(twig({ base: 'src/templates', errorLogToConsole: true }))
    .pipe(prettyHtml())
    .pipe(gulp.dest(root.dev.adminPages));
});

gulp.task('css-admin:dev', () => {
  return (
    gulp
      .src(root.src.adminSCSS)
      .pipe(changed(root.dev.adminCSS))
      .pipe(plumber(setPlumberNotify('ADMIN SCSS')))
      .pipe(sourceMaps.init())
      // .pipe(sassGlob())
      .pipe(
        sass({
          includePaths: [path.resolve(__dirname, 'src/scss')],
        }).on('error', sass.logError),
      )
      // .pipe(groupMedia())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest(root.dev.adminCSS))
  );
});

gulp.task('js-admin-modules:dev', () => {
  return gulp.src(root.src.adminJS.modules).pipe(changed(root.dev.adminJS)).pipe(gulp.dest(root.dev.adminJSModules));
});

gulp.task('ts-admin:dev', () => {
  return gulp
    .src(root.src.adminJS.ts)
    .pipe(changed(root.dev.adminJS))
    .pipe(plumber(setPlumberNotify('ADMIN TYPESCRIPT')))
    .pipe(
      ts({
        noImplicitAny: true,
        outFile: 'typescript.js',
      }),
    )
    .pipe(gulp.dest(root.dev.adminJS));
});

gulp.task('fonts-admin:dev', () => {
  return gulp.src(root.src.fonts).pipe(changed(root.dev.adminFonts)).pipe(gulp.dest(root.dev.adminFonts));
});

gulp.task('assets-admin:dev', () => {
  return gulp.src(root.src.adminAssets).pipe(changed(root.dev.adminAssets)).pipe(gulp.dest(root.dev.adminAssets));
});
// ADMIN END

gulp.task('twig:dev', () => {
  return gulp
    .src(root.src.templates, `!${root.src._}templates/test-backup.twig`)
    .pipe(changed(root.dev._))
    .pipe(plumber(setPlumberNotify('TWIG')))
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}data.json`));
      }),
    )
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}header.json`));
      }),
    )
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}footer.json`));
      }),
    )
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}cart.json`));
      }),
    )
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}blog.json`));
      }),
    )
    .pipe(
      data(function (file) {
        return JSON.parse(fs.readFileSync(root.src.data + path.basename(file.path) + '.json'));
      }),
    )
    .pipe(twig({ base: 'src/templates', errorLogToConsole: true }))
    .pipe(prettyHtml())
    .pipe(gulp.dest(root.dev._));
});

gulp.task('imagemin:dev', () => {
  return gulp
    .src(root.src.assets)
    .pipe(changed(root.dev.assets))
    .pipe(plumber(setPlumberNotify('IMAGE MINIFY')))
    .pipe(imagemin())
    .pipe(gulp.dest(root.dev.assets));
});

gulp.task('css:dev', () => {
  return (
    gulp
      .src(root.src.scss)
      .pipe(changed(root.dev.css))
      .pipe(plumber(setPlumberNotify('SCSS')))
      .pipe(sourceMaps.init())
      .pipe(sassGlob())
      .pipe(
        sass({
          includePaths: [path.resolve(__dirname, 'src/scss')],
        }).on('error', sass.logError),
      )
      // .pipe(groupMedia())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest(root.dev.css))
  );
});

gulp.task('css-promo:dev', () => {
  return (
    gulp
      .src(root.src.scssPromo)
      .pipe(changed(root.dev.cssPromo))
      .pipe(plumber(setPlumberNotify('PROMO SCSS')))
      .pipe(sourceMaps.init())
      .pipe(sassGlob())
      .pipe(
        sass({
          includePaths: ['./src/scss'],
        }).on('error', sass.logError),
      )
      // .pipe(groupMedia())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest(root.dev.cssPromo))
  );
});

gulp.task('js:dev', () =>
  gulp
    .src(root.src.js.bundle.main)
    .pipe(
      esbuild({
        bundle: true,
        splitting: true,
        format: 'esm',
        target: 'es2017',
        sourcemap: false,
        minify: true,
        entryNames: '[name]',
        chunkNames: 'chunks/[name]-[hash]',
        outdir: './',
      }),
    )
    .pipe(gulp.dest(root.dev.js)),
);

gulp.task('js-admin:dev', () => {
  return (
    browserify({
      entries: [root.src.js.bundle.admin],
      debug: true,
    })
      .transform(babelify, {
        presets: ['@babel/preset-env'],
        global: true,
        ignore: [/node_modules\/ag-grid-community/],
      })
      .bundle()
      .pipe(source('partial.js'))
      .pipe(buffer())
      .pipe(plumber(setPlumberNotify('JAVASCRIPT')))
      // .pipe(terser())
      .pipe(rename('partial-min.js'))
      .pipe(gulp.dest(root.dev.adminJS))
  );
});

gulp.task('js2:dev', () => {
  return gulp
    .src([
      root.src.js.lib.jquery,
      root.src.js.lib.jqueryCrs,
      root.src.js.lib.splide,
      root.src.js.lib.splideGrid,
      root.src.js.lib.parsley,
      root.src.js.lib.intlTelInput,
      root.src.js.bundle.main_v2,
    ])
    .pipe(changed(root.dev.js))
    .pipe(plumber(setPlumberNotify('JAVASCRIPT')))
    .pipe(concat('partial2.js'))
    .pipe(minify())
    .pipe(gulp.dest(root.dev.js));
});

gulp.task('js-promo:dev', () => {
  return gulp
    .src(root.src.js.promo._, { base: root.src.js.promo.root })
    .pipe(changed(root.dev.js))
    .pipe(plumber(setPlumberNotify('JS-PROMO')))
    .pipe(gulp.dest(root.dev.jsPromo))
    .pipe(
      minify({
        ext: {
          min: '.min.js',
        },
        noSource: true,
      }),
    )
    .pipe(gulp.dest(root.dev.jsPromo));
});

gulp.task('js-xmas:dev', () => {
  return gulp
    .src([root.src.js.xmas.lib, root.src.js.xmas.main])
    .pipe(changed(root.dev.js))
    .pipe(plumber(setPlumberNotify('JS-XMAS')))
    .pipe(concat('xmas.js'))
    .pipe(minify())
    .pipe(gulp.dest(root.dev.js));
});

gulp.task('js-new-year:dev', () => {
  return gulp
    .src([root.src.js.newyear.lib, root.src.js.newyear.main])
    .pipe(changed(root.dev.js))
    .pipe(plumber(setPlumberNotify('JS-NEW-YEAR')))
    .pipe(concat('newyear.js'))
    .pipe(minify())
    .pipe(gulp.dest(root.dev.js));
});

gulp.task('js-vday:dev', () => {
  return gulp
    .src([root.src.js.vday.lib, root.src.js.vday.main])
    .pipe(changed(root.dev.js))
    .pipe(plumber(setPlumberNotify('JS-VDAY')))
    .pipe(concat('vday.js'))
    .pipe(minify())
    .pipe(gulp.dest(root.dev.js));
});

gulp.task('js-plugins:dev', () => {
  return gulp
    .src(root.src.js.plugins)
    .pipe(plumber(setPlumberNotify('JS-PLUGIN')))
    .pipe(fileInclude(settings.fileInclude))
    .pipe(gulp.dest(root.dev.jsPlugins));
});

gulp.task('assets:dev', () => {
  return gulp.src(root.src.assets).pipe(changed(root.dev.assets)).pipe(gulp.dest(root.dev.assets));
});

gulp.task('fonts:dev', () => {
  return gulp.src(root.src.fonts).pipe(changed(root.dev.fonts)).pipe(gulp.dest(root.dev.fonts));
});

gulp.task('clean:dev', done => {
  if (fs.existsSync(root.dev._)) {
    return gulp.src(root.dev._, { read: false }).pipe(clean({ force: true }));
  }
  done();
});

gulp.task('watch:dev', () => {
  gulp.watch('./src/templates/**/*.twig', gulp.parallel('twig:dev', 'twig-admin:dev')),
    gulp.watch('./src/templates/data/**', gulp.parallel('twig:dev', 'twig-admin:dev')),
    gulp.watch('./src/templates/admin/svg/**', gulp.parallel('twig-admin:dev')),
    gulp.watch('./src/templates/admin/assets/**/*', gulp.parallel('assets-admin:dev')),
    gulp.watch('./src/assets/**/*', gulp.parallel('assets:dev')),
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('css:dev', 'css-admin:dev', 'css-promo:dev')),
    gulp.watch(['./src/js/*.js', './src/js/modules/**/*.js'], gulp.parallel('js:dev')),
    gulp.watch('./src/js/admin/**/*.js', gulp.parallel('js-admin:dev')),
    gulp.watch('./src/js/promo/**/*.js', gulp.parallel('js-promo:dev'));
});

gulp.task('server:dev', () => {
  return gulp.src('./dev/').pipe(server(settings.server));
});

gulp.task('watch-and-server:dev', gulp.parallel('watch:dev', 'server:dev'));

/**
 * Server
 */
gulp.task('serve:dev', () => {
  browserSync.init({
    server: { baseDir: './dev/' },
    open: true,
    port: 8080,
  });

  gulp.watch('./src/templates/**/*.twig', gulp.parallel('twig:dev', 'twig-admin:dev')).on('change', browserSync.reload);
  gulp.watch('./src/templates/data/**', gulp.parallel('twig:dev', 'twig-admin:dev')).on('change', browserSync.reload);
  gulp.watch('./src/templates/admin/svg/**', gulp.parallel('twig-admin:dev')).on('change', browserSync.reload);
  gulp.watch('./src/templates/admin/assets/**/*', gulp.parallel('assets-admin:dev')).on('change', browserSync.reload);
  gulp.watch('./src/assets/**/*', gulp.parallel('assets:dev')).on('change', browserSync.reload);
  gulp
    .watch('./src/scss/**/*.scss', gulp.parallel('css:dev', 'css-admin:dev', 'css-promo:dev'))
    .on('change', browserSync.reload);
  gulp.watch(['./src/js/*.js', './src/js/modules/**/*.js'], gulp.parallel('js:dev')).on('change', browserSync.reload);
  gulp.watch('./src/js/admin/**/*.js', gulp.parallel('js-admin:dev')).on('change', browserSync.reload);
  gulp.watch('./src/js/promo/**/*.js', gulp.parallel('js-promo:dev')).on('change', browserSync.reload);
  gulp.watch(['./src/templates/data/**/*.json'], gulp.series('twig:dev', 'css:dev')).on('change', browserSync.reload);
});
