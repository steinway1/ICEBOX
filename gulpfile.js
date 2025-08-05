// gulpfile.js
const gulp = require('gulp');

require('./gulp/dev.js');
require('./gulp/dist.js');
require('./gulp/dev-sw.ts');

// Icebox Default
gulp.task(
  'default',
  gulp.series(
    'clean:dev',
    gulp.parallel(
      'twig:dev',
      'css:dev',
      'js:dev',
      'js-plugins:dev',
      'assets:dev',
      'fonts:dev',
      'js-promo:dev',
      'css-promo:dev',
    ),
    gulp.parallel('twig-admin:dev', 'js-admin:dev', 'fonts-admin:dev', 'css-admin:dev', 'assets-admin:dev'),
    gulp.parallel('serve:dev'),
  ),
);

// Icebox Build
gulp.task(
  'build',
  gulp.series(
    'clean:build',
    gulp.parallel(
      'twig:build',
      'css:build',
      'css-promo:build',
      'js:build',
      'js-promo:build',
      'js-plugins:build',
      'js-vday:build',
      'assets:build',
      'fonts:build',
    ),
    gulp.parallel('twig-admin:build', 'css-admin:build', 'js-admin:build', 'fonts-admin:build', 'assets-admin:build'),
  ),
);

// Swisswatches Default
gulp.task(
  'sw',
  gulp.series(
    'clean-sw:dev',
    gulp.parallel('twig-sw:dev', 'scss-sw:dev', 'js-sw:dev', 'fonts-sw:dev', 'assets-sw:dev', 'icons-sw:dev'),
    'serve-sw:dev',
  ),
);

gulp.task(
  'sw-build',
  gulp.series(
    'clean-sw:build',
    gulp.parallel(
      'twig-sw:build',
      'scss-sw:build',
      'js-sw:build',
      'fonts-sw:build',
      'assets-sw:build',
      'icons-sw:build',
    ),
  ),
);
