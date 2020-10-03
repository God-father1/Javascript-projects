const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('sass', function () {
    console.log(1)
    return gulp.src('./styles/**/*.scss')
        .pipe(gulpSass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./styles'));
});