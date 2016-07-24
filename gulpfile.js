var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:true});
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var runSequence = require('run-sequence');
var config = require('./configFile');

gulp.task('default',function () {

    runSequence('js','css','html',function () {
        console.log('Build Process is done!');
    });

    $.nodemon({
        script: 'server.js',
        ext: 'js',
        ignore:['./node_modules/**']
    });

    browserSync.init({
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        proxy: config.devBaseUrl + config.port
    });

    watchForChanges();
});

gulp.task('html',function(){
    buildHtml()
});

gulp.task('reSyncHtml',function () {
    reSync(config.paths.htmlDistPath,buildHtml);
});

gulp.task('js',function(){
    buildJs();
});

gulp.task('reSyncJs',function () {
    reSync(config.paths.jsDistPath,buildJs);
});

gulp.task('css',function(){
    buildCss();
});

gulp.task('reSyncCss',function () {
    reSync(config.paths.cssDistPath,buildCss);
});

var buildHtml =function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.htmlDistPath,{overwrite:true}));
};

var buildJs = function () {
    gulp.src(config.paths.js)
        .pipe($.concat('bundle.js'))
        .pipe(gulp.dest(config.paths.jsDistPath,{overwrite:true}));
};


var buildCss = function () {
    gulp.src(config.paths.css)
        .pipe($.concat('bundle.css'))
        .pipe(gulp.dest(config.paths.cssDistPath,{overwrite:true}));
};

var reSync =function (path,build) {
    gulp.src(path)
        .pipe(vinylPaths(del))
        .pipe($.function(build,'atEnd'))
        .pipe($.function(reload,'atEnd'))
};


var watchForChanges = function () {
    gulp.watch(config.paths.js,['reSyncJs']);
    gulp.watch(config.paths.css,['reSyncCss']);
    gulp.watch(config.paths.html,['reSyncHtml']);

};

var reload = function () {
    browserSync.reload();
};


