var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(gulp.dest('build/scripts'));
});

gulp.task('css', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['cover 99.5%'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('build/css'));
});

gulp.task('sass', () => {
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('src/css/**/*.css', gulp.series('css')).on('change', browserSync.reload);
    gulp.watch('src/img/**/*', gulp.series('img')).on('change', browserSync.reload);
    gulp.watch('src/sass/**/*.sass', gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch('src/scripts/*.js', gulp.series('js')).on('change', browserSync.reload);
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('default', gulp.series(
    gulp.parallel(
        'html',
        'js',
        'css',
        'sass',
        'img'
    ),
    gulp.parallel(
        'serve',
        'watch'
    )
));