const gulp = require('gulp')

require('./gulp/dev.js')
require('./gulp/dist.js')

gulp.task(
  'default', gulp.series(
    'clean:dev',
    gulp.parallel('twig:dev', 'css:dev', 'js:dev', 'assets:dev', 'fonts:dev'),
    gulp.parallel('watch:dev')
  )
)

gulp.task(
  'build', gulp.series(
    'clean:build',
    gulp.parallel('twig:build', 'css:build', 'js:build', 'assets:build', 'fonts:build'),
  )
)