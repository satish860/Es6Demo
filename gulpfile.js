var gulp = require('gulp');
var to5 = require('gulp-6to5');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var assign = Object.assign || require('object-assign');
var changed = require('gulp-changed');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');

var path = {
    source: 'src/**/*.js',
    html: '*.html',
    style: 'styles/**/*.css',
    output: 'dist/',
    doc: './doc'
};

var compilerOptions = {
    filename: '',
    filenameRelative: '',
    blacklist: [],
    whitelist: [],
    modules: '',
    sourceMap: true,
    sourceMapName: '',
    sourceFileName: '',
    sourceRoot: '',
    moduleRoot: '',
    moduleIds: false,
    runtime: false,
    experimental: false,
    format: {
        comments: false,
        compact: false,
        indent: {
            parentheses: true,
            adjustMultilineComment: true,
            style: "  ",
            base: 0
        }
    }
};

gulp.task('clean', function () {
    return gulp.src(path.output)
        .pipe(vinylPaths(del));
});

gulp.task('build-system', function () {
    return gulp.src(path.source)
        .pipe(plumber())
        .pipe(changed(path.output, {
            extension: '.js'
        }))
        .pipe(to5(assign({}, compilerOptions, {
            modules: 'system'
        })))
        .pipe(gulp.dest(path.output));
});


gulp.task('build', function (callback) {
    return runSequence(
        'clean', ['build-system'],
        callback
    );
});

gulp.task('serve', ['build'], function (done) {
    browserSync({
        open: false,
        port: 9000,
        server: {
            baseDir: ['.'],
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});



function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}


gulp.task('watch', ['serve'], function () {
    gulp.watch(path.source, ['build-system', browserSync.reload]).on('change', reportChange);
    gulp.watch(path.html, browserSync.reload).on('change', reportChange);

});