import gulp from "gulp";
gulp.task("deploy", ["default"], () => {
  return gulp.src("build/**/*").pipe($.ghPages());
});
