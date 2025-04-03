const gulp = require("gulp");

require("./gulp/dev.js");
require("./gulp/dist.js");
require("./gulp/sw.js");
require("./gulp/sw-dist.js");

gulp.task(
  "default",
  gulp.series(
    "clean:dev",
    gulp.parallel(
      "twig:dev",
      "css:dev",
      "js:dev",
      "js-plugins:dev",
      "assets:dev",
      "fonts:dev",
      "js-promo:dev",
      "css-promo:dev"
    ),
    gulp.parallel(
      "twig-admin:dev",
      "js-admin:dev",
      "fonts-admin:dev",
      "css-admin:dev",
      "assets-admin:dev"
    ),
    gulp.parallel("watch:dev")
  )
);

gulp.task(
  "build",
  gulp.series(
    "clean:build",
    gulp.parallel(
      "twig:build",
      "css:build",
      "css-promo:build",
      "js:build",
      "js-promo:build",
      "js-plugins:build",
      "js-vday:build",
      "assets:build",
      "fonts:build"
    ),
    gulp.parallel(
      "twig-admin:build",
      "css-admin:build",
      "js-admin:build",
      "fonts-admin:build",
      "assets-admin:build"
    )
  )
);

gulp.task(
  "sw",
  gulp.series(
    "sw-clean:dev",
    gulp.parallel("sw-twig:dev", "sw-css:dev", "sw-js:dev", "sw-fonts:dev"),
    gulp.parallel("sw-watch:dev")
  )
);

gulp.task(
  "sw-build",
  gulp.series(
    "sw-clean:build",
    gulp.parallel(
      "sw-twig:build",
      "sw-css:build",
      "sw-js:build",
      "sw-fonts:build"
    )
  )
);
