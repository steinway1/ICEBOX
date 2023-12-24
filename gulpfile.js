const gulp = require('gulp')

require('./gulp/dev.js')
require('./gulp/dist.js')

gulp.task(
  'default', gulp.series(
    'clean:dev',
    gulp.parallel('twig:dev', 'css:dev', 'js:dev', 'js-promo:dev', 'js-xmas:dev', 'js-new-year:dev','js-plugins:dev','assets:dev', 'fonts:dev'),
    gulp.parallel('watch:dev')
  )
)

gulp.task(
  'build', gulp.series(
    'clean:build',
    gulp.parallel('twig:build', 'css:build', 'js:build', 'js-promo:build', 'js-xmas:build', 'js-new-year:build','js-plugins:build', 'assets:build', 'fonts:build'),
  )
)