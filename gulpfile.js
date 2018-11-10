var cfg         = require('./cfg');
var gulp        = require("gulp");
var browserSync = require("browser-sync").create();
var $           = require("gulp-load-plugins")();
var cp          = require('child_process');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Task sass  compila e prepara os arquivos para os ambientes
 */

gulp.task('sass', function () {
    return gulp.src('_scss/main.scss')
        .pipe($.sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe($.autoprefixer(["last 5 versions", "> 1%", "ie 8", "ie 7"], {cascade: true}))
        .pipe($.groupCssMediaQueries())
        .pipe($.cleanCss({ compatibility: "ie8" }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/**
 * Task jekyll-build o projeto
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Task browser-sync assiste os arquivos e atualiza quando salva
 */

gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */

gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */

gulp.task('default', ['browser-sync', 'watch']);

///////////