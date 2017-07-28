var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

/*
gulp.task('hello', function() {
    console.log('Hello Zell');
});
*/

gulp.task('sass', function() { //run the task, close and update the output
    return gulp.src('app/sass/**/*.scss') // Gets all files ending with .scss in app/scss and children dira
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        //Defines the place where output code is
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('cache:clear', function(callback) {
    return cache.clearAll(callback)
})

/*
gulp.task('build', ['cache:clear', 'clean:dist', 'sass', 'useref', 'images', 'fonts'], function() {
    console.log('Building files');
})
*/

//when doing changes update the output
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})

gulp.task('build', function(callback) {
    runSequence('clean:dist', 'cache:clear', ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
})