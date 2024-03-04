const gulp = require('gulp')

require('./gulp/dev.js')
require('./gulp/dist.js')

gulp.task(
  'default', gulp.series(
    'clean:dev',
    gulp.parallel('twig:dev', 'css:dev', 'js:dev', 'js-plugins:dev', 'js-vday:dev', 'assets:dev', 'fonts:dev'),
    gulp.parallel('twig-admin:dev', 'css-admin:dev', 'js-admin:dev', 'js-admin-modules:dev', 'fonts-admin:dev', 'assets-admin:dev'),
    gulp.parallel('watch:dev')
  )
)

gulp.task(
  'build', gulp.series(
    'clean:build',
    gulp.parallel('twig:build', 'css:build', 'js:build', 'js-plugins:build', 'js-vday:build', 'assets:build', 'fonts:build'),
    gulp.parallel('twig-admin:build', 'css-admin:build', 'js-admin:build', 'fonts-admin:build', 'assets-admin:build')
  )
)