// Plugins
const gulp = require('gulp')
const data = require('gulp-data')
const path = require('path')
const fs = require('fs')
const clean = require('gulp-clean')
const changed = require('gulp-changed')
const server = require('gulp-server-livereload');
// HTML
const fileInclude = require('gulp-file-include')
const prettyHtml = require('gulp-pretty-html')
// Twig
const twig = require('gulp-twig')
// CSS
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const groupMedia = require('gulp-group-css-media-queries');
// JS
const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const minify = require('gulp-minify')
// Other
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

// Utils
const settings = {
  fileInclude: { prefix: '@@', basepath: '@file' },
  server: { livereload: true, open: true },
  assets: { verbose: true }
}
const setPlumberNotify = (errorTitle) => {
  return {
    errorHandler: notify.onError({
      title: errorTitle,
      message: 'ERROR <%= error.message %>',
      sound: false
    })
  }
}


// Root
const root = {
  src: {
    _: './src/',
    html: './src/html/*.html',
    scss: './src/scss/*.scss',
    adminSCSS: './src/scss/admin/*.scss',
    adminJS: {
      _: './src/js/admin/*.js',
      lib: {
        jquery: './src/js/admin/lib/jquery.js',
        lottie: './src/js/admin/lib/lottie.js',
        air_datepicker: './src/js/admin/lib/air-datepicker.js',
      },
      bundle: {
        main: './src/js/admin/main.js'
      }
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
        pace: './src/js/plugins/pace/pace.min.js',
        popper: './src/js/popper.js',
        tippy: './src/js/tippy.js',
        parsley: './src/js/parsley.min.js',
        zoom: './src/js/jQuery-zoom.js',
        fancybox: './src/js/fancybox.min.js',
        sirv: './src/js/sirv.js'
      },
      bundle: {
        main: './src/js/main.js',
        main_v2: './src/js/main_v2.js',
        login: './src/js/login.js',
        cartMail: './src/js/cart-mail.js',
      },
      promo: {
        lib: './src/js/promo/libraries/*.js',
        main: './src/js/promo/*.js'
      },
      xmas: {
        lib: './src/js/xmas/libraries/*.js',
        main: './src/js/xmas/*.js'
      },
      newyear: {
        lib: './src/js/new-year/libraries/*.js',
        main: './src/js/new-year/*.js'
      },
      vday: {
        lib: './src/js/vday/libraries/*.js',
        main: './src/js/vday/*.js'
      }
    },
    assets: './src/assets/**/*',
    adminAssets: './src/templates/admin/assets/**/*',
    fonts: './src/fonts/*',
    templates: './src/templates/*.twig',
    adminTemplates: './src/templates/admin/*.twig',
    data: './src/templates/data/',
    adminData: './src/templates/data/admin/'
  },
  build: {
    _: './build/',
    html: './build/html/',
    adminPages: './build/admin/',
    adminCSS: './build/admin/css/',
    adminJS: './build/admin/js/',
    adminFonts: './build/admin/fonts/',
    css: './build/css/',
    js: './build/js/',
    jsPlugins: './build/js/plugins/',
    assets: './build/assets/',
    adminAssets: './build/admin/assets/',
    fonts: './build/fonts/'
  }
}



// Tasks
gulp.task('include:build',
  () => {
    return gulp
      .src(root.src.html)
      .pipe(changed(root.build.html, { hasChanged: changed.compareContents }))
      .pipe(plumber(setPlumberNotify('HTML')))
      .pipe(fileInclude(settings.fileInclude))
      .pipe(gulp.dest(root.build.html))
  }
)

//  ADMIN
gulp.task('twig-admin:build',
  () => {
    return gulp
      .src(root.src.adminTemplates)
      .pipe(changed(root.build.adminPages))
      .pipe(plumber(setPlumberNotify('ADMIN TWIG')))
      .pipe(data(function () {
        return JSON.parse(fs.readFileSync(`src/templates/data/admin/data.json`));
      }))
      .pipe(data(function (file) {
        return JSON.parse(fs.readFileSync(root.src.adminData + path.basename(file.path) + '.json'));
      }))
      .pipe(twig({ base: 'src/templates', errorLogToConsole: true }))
      .pipe(prettyHtml())
      .pipe(gulp.dest(root.build.adminPages))
  }
)

gulp.task('css-admin:build',
  () => {
    return gulp
      .src(root.src.adminSCSS)
      .pipe(changed(root.build.adminCSS))
      .pipe(plumber(setPlumberNotify('ADMIN SCSS')))
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(groupMedia())
      .pipe(gulp.dest(root.build.adminCSS))
  }
)

gulp.task('js-admin:build',
  () => {
    return gulp
      .src([
        root.src.adminJS.lib.jquery,
        root.src.adminJS.lib.lottie,
        root.src.adminJS.lib.air_datepicker,
        root.src.adminJS.bundle.main
      ])
      .pipe(changed(root.build.adminJS))
      .pipe(plumber(setPlumberNotify('ADMIN JAVASCRIPT')))
      .pipe(concat('partial.js'))
      .pipe(minify())
      .pipe(gulp.dest(root.build.adminJS))
  })

gulp.task('fonts-admin:build',
  () => {
    return gulp
      .src(root.src.fonts)
      .pipe(changed(root.build.adminFonts))
      .pipe(gulp.dest(root.build.adminFonts))
  }
)

gulp.task('assets-admin:build',
  () => {
    return gulp
      .src(root.src.adminAssets)
      .pipe(changed(root.build.adminAssets))
      .pipe(gulp.dest(root.build.adminAssets))
  }
)
// ADMIN END


gulp.task('twig:build',
  () => {
    return gulp
      .src(root.src.templates, `!${root.src._}templates/test-backup.twig`)
      .pipe(changed(root.build._))
      .pipe(plumber(setPlumberNotify('TWIG')))
      .pipe(data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}data.json`));
      }))
      .pipe(data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}header.json`));
      }))
      .pipe(data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}footer.json`));
      }))
      .pipe(data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}cart.json`));
      }))
      .pipe(data(function () {
        return JSON.parse(fs.readFileSync(`${root.src.data}blog.json`));
      }))
      .pipe(data(function (file) {
        return JSON.parse(fs.readFileSync(root.src.data + path.basename(file.path) + '.json'));
      }))
      .pipe(twig({ base: 'src/templates', errorLogToConsole: true }))
      .pipe(prettyHtml())
      .pipe(gulp.dest(root.build._))
  }
)

gulp.task('css:build',
  () => {
    return gulp
      .src(root.src.scss)
      .pipe(changed(root.build.css))
      .pipe(plumber(setPlumberNotify('SCSS')))
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(groupMedia())
      .pipe(gulp.dest(root.build.css))
  }
)


gulp.task('js:build',
  () => {
    return gulp
      .src([
        root.src.js.lib.jquery,
        root.src.js.lib.jqueryCrs,
        root.src.js.lib.splide,
        root.src.js.lib.splideGrid,
        root.src.js.lib.intlTelInput,
        root.src.js.lib.pace,
        root.src.js.lib.popper,
        root.src.js.lib.tippy,
        root.src.js.lib.parsley,
        root.src.js.lib.zoom,
        root.src.js.lib.fancybox,
        // root.src.js.lib.sirv,
        root.src.js.bundle.main,
        root.src.js.bundle.login,
        root.src.js.bundle.cartMail
      ])
      .pipe(changed(root.build.js))
      .pipe(plumber(setPlumberNotify('JAVASCRIPT')))
      .pipe(concat('partial.js'))
      .pipe(minify())
      // .pipe(babel())
      // .pipe(webpack(require('./../webpack.config.js')))
      .pipe(gulp.dest(root.build.js))
  })

gulp.task('js2:build',
  () => {
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
      .pipe(changed(root.build.js))
      .pipe(plumber(setPlumberNotify('JAVASCRIPT')))
      .pipe(concat('partial2.js'))
      .pipe(minify())
      .pipe(gulp.dest(root.build.js))
  })

gulp.task('js-promo:build',
  () => {
    return gulp
      .src([
        root.src.js.promo.lib,
        root.src.js.promo.main
      ])
      .pipe(changed(root.build.js))
      .pipe(plumber(setPlumberNotify('JS-PROMO')))
      .pipe(concat('promo.js'))
      .pipe(minify())
      .pipe(gulp.dest(root.build.js))
  })

gulp.task('js-xmas:build',
  () => {
    return gulp
      .src([
        root.src.js.xmas.lib,
        root.src.js.xmas.main
      ])
      .pipe(changed(root.build.js))
      .pipe(plumber(setPlumberNotify('JS-XMAS')))
      .pipe(concat('xmas.js'))
      .pipe(minify())
      .pipe(gulp.dest(root.build.js))
  })

gulp.task('js-new-year:build',
  () => {
    return gulp
      .src([
        root.src.js.newyear.lib,
        root.src.js.newyear.main
      ])
      .pipe(changed(root.build.js))
      .pipe(plumber(setPlumberNotify('JS-NEW-YEAR')))
      .pipe(concat('newyear.js'))
      .pipe(minify())
      .pipe(gulp.dest(root.build.js))
  })

gulp.task('js-vday:build',
  () => {
    return gulp
      .src([
        root.src.js.vday.lib,
        root.src.js.vday.main
      ])
      .pipe(changed(root.build.js))
      .pipe(plumber(setPlumberNotify('JS-VDAY')))
      .pipe(concat('vday.js'))
      .pipe(minify())
      .pipe(gulp.dest(root.build.js))
  })


gulp.task('js-plugins:build',
  () => {
    return gulp
      .src(root.src.js.plugins)
      .pipe(plumber(setPlumberNotify('JS-PLUGIN')))
      .pipe(fileInclude(settings.fileInclude))
      .pipe(gulp.dest(root.build.jsPlugins))
  }
)

gulp.task('assets:build',
  () => {
    return gulp
      .src(root.src.assets)
      .pipe(changed(root.build.assets))
      .pipe(gulp.dest(root.build.assets))
  }
)

gulp.task('fonts:build',
  () => {
    return gulp
      .src(root.src.fonts)
      .pipe(changed(root.build.fonts))
      .pipe(gulp.dest(root.build.fonts))
  }
)

gulp.task('clean:build', (done) => {
  if (fs.existsSync(root.build._)) {
    return gulp
      .src(root.build._, { read: false }) 
      .pipe(clean({ force: true }))
  }
  done()
}
)

gulp.task('watch:build',
  () => {
    gulp.watch('./src/templates/**/*.twig', gulp.parallel('twig:build')),
      gulp.watch('./src/scss/**/*.scss', gulp.parallel('css:build')),
      gulp.watch('./src/js/**/*.js', gulp.parallel('js:build')),
      gulp.watch('./src/js/**/*.js', gulp.parallel('js2:build')),
      // gulp.watch('./src/templates/data/*.json', gulp.parallel('js:build')),
      gulp.watch('./assets/**/*', gulp.parallel('assets:build'))
  }
)

gulp.task('server:build',
  () => {
    return gulp
      .src('./build/')
      .pipe(server(settings.server))
  }
)



// // Plugins
// const gulp = require('gulp')
// const data = require('gulp-data')
// const path = require('path')
// const fs = require('fs')
// const clean = require('gulp-clean')
// const changed = require('gulp-changed')
// const rename = require('gulp-rename')
// // HTML
// const fileInclude = require('gulp-file-include')
// const prettyHtml = require('gulp-pretty-html')
// const htmlmin = require('gulp-htmlmin')
// // Twig
// const twig = require('gulp-twig')
// // CSS
// const autoprefixer = require('gulp-autoprefixer')
// const sass = require('gulp-sass')(require('sass'))
// const sassGlob = require('gulp-sass-glob')
// const groupMedia = require('gulp-group-css-media-queries');
// const cleanCSS = require('gulp-clean-css');
// // JS
// const concat = require('gulp-concat')
// const minify = require('gulp-minify')
// const eslint = require('gulp-eslint')
// // Other
// const plumber = require('gulp-plumber')
// const notify = require('gulp-notify')

// // Utils
// const settings = {
//   fileInclude: { prefix: '@@', basepath: '@file' },
//   server: { livereload: true, open: true },
//   assets: { verbose: true }
// }
// const setPlumberNotify = (errorTitle) => {
//   return {
//     errorHandler: notify.onError({
//       title: errorTitle,
//       message: 'ERROR <%= error.message %>',
//       sound: false
//     })
//   }
// }


// // Root
// const root = {
//   src: {
//     _: './src/',
//     html: './src/html/*.html',
//     scss: './src/scss/*.scss',
//     js: {
//       _: './src/js/*.js',
//       lib: {
//         jquery: './src/js/jquery.js',
//         splide: './src/js/splide.js',
//         splideGrid: './src/js/splide-grid.js',
//         intlTelInput: './src/js/intlTelInput.js',
//         popper: './src/js/popper.js',
//         tippy: './src/js/tippy.js'
//       },
//       bundle: {
//         main: './src/js/main.js'
//       }
//     },
//     assets: './src/assets/**/*',
//     fonts: './src/fonts/*',
//     templates: './src/templates/*.twig',
//     data: './src/templates/data/'
//   },
//   build: {
//     _: './build/',
//     html: './build/html/',
//     css: './build/css/',
//     js: './build/js/',
//     assets: './build/assets/',
//     fonts: './build/fonts/'
//   }
// }



// // Tasks
// gulp.task('include:build',
//   () => {
//     return gulp
//       .src(root.src.html)
//       .pipe(changed(root.build.html, { hasChanged: changed.compareContents }))
//       .pipe(plumber(setPlumberNotify('HTML')))
//       .pipe(fileInclude(settings.fileInclude))
//       .pipe(gulp.dest(root.build.html))
//   }
// )


// gulp.task('twig:build',
//   () => {
//     return gulp
//       .src(root.src.templates, `!${root.src._}templates/test-backup.twig`)
//       .pipe(changed(root.build._))
//       .pipe(plumber(setPlumberNotify('TWIG')))
//       .pipe(data(function () {
//         return JSON.parse(fs.readFileSync(`${root.src.data}data.json`));
//       }))
//       .pipe(data(function () {
//         return JSON.parse(fs.readFileSync(`${root.src.data}header.json`));
//       }))
//       .pipe(data(function () {
//         return JSON.parse(fs.readFileSync(`${root.src.data}footer.json`));
//       }))
//       .pipe(data(function () {
//         return JSON.parse(fs.readFileSync(`${root.src.data}cart.json`));
//       }))
//       .pipe(data(function (file) {
//         return JSON.parse(fs.readFileSync(root.src.data + path.basename(file.path) + '.json'));
//       }))
//       .pipe(twig())
//       .pipe(gulp.dest(root.build._))
//   }
// )

// gulp.task('css:build',
//   () => {
//     return gulp
//       .src(root.src.scss)
//       .pipe(changed(root.build.css))
//       .pipe(plumber(setPlumberNotify('SCSS')))
//       .pipe(sassGlob())
//       .pipe(sass())
//       .pipe(autoprefixer())
//       .pipe(groupMedia())
//       .pipe(cleanCSS())
//       .pipe(gulp.dest(root.build.css))
//   }
// )


// gulp.task('js:build',
//   () => {
//     return gulp
//       .src([
//         root.src.js.lib.jquery,
//         root.src.js.lib.splide,
//         root.src.js.lib.splideGrid,
//         root.src.js.lib.intlTelInput,
//         root.src.js.lib.popper,
//         root.src.js.lib.tippy,
//         root.src.js.bundle.main
//       ])
//       .pipe(changed(root.build.js))
//       .pipe(plumber(setPlumberNotify('JAVASCRIPT')))
//       .pipe(concat('partial.js'))
//       .pipe(minify())
//       .pipe(gulp.dest(root.build.js))
//   })

// gulp.task('assets:build',
//   () => {
//     return gulp
//       .src(root.src.assets)
//       .pipe(changed(root.build.assets))
//       .pipe(gulp.dest(root.build.assets))
//   }
// )

// gulp.task('fonts:build',
//   () => {
//     return gulp
//       .src(root.src.fonts)
//       .pipe(changed(root.build.fonts))
//       .pipe(gulp.dest(root.build.fonts))
//   }
// )

// gulp.task('clean:build', (done) => {
//   if (fs.existsSync(root.build._)) {
//     return gulp
//       .src(root.build._, { read: false })
//       .pipe(clean({ force: true }))
//   }
//   done()
// }
// )