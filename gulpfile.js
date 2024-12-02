const gulp = require('gulp')

require('./gulp/dev.js')
require('./gulp/dist.js')

gulp.task(
  'default', gulp.series(
    'clean:dev',
    gulp.parallel('twig:dev', 'css:dev', 'css-promo:dev', 'js:dev', 'js-promo:dev', 'js2:dev', 'js-plugins:dev', 'assets:dev', 'fonts:dev'),
    gulp.parallel('twig-admin:dev', 'css-admin:dev', 'js-admin:dev', 'fonts-admin:dev', 'assets-admin:dev'),
    gulp.parallel('watch:dev')
  )
)

gulp.task(
  'build', gulp.series(
    'clean:build',
    gulp.parallel('twig:build', 'css:build', 'css-promo:build', 'js:build', 'js-promo:build', 'js2:build', 'js-plugins:build', 'js-vday:build', 'assets:build', 'fonts:build'),
    gulp.parallel('twig-admin:build', 'css-admin:build', 'js-admin:build', 'fonts-admin:build', 'assets-admin:build')
  )
)