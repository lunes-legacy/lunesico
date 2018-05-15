'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import watch from 'gulp-watch';
import plumber from 'gulp-plumber';
import cleanCss from 'gulp-clean-css';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import htmlmin from 'gulp-htmlmin';

const js_path = [
    'src/js/main.js',
    'src/js/lightslider.js',
];

const css_path = [
    'src/css/main.css',
    'src/css/lightslider.css',
    'src/css/reset.css',
    'src/css/aos.css'
];

const html_path = 'src/html/*.html';

// Minificação dos arquivos .js
gulp.task('js', function() {
    return (gulp
        // Define a origem dos arquivos .js
        .src(js_path)
        // Prevençãao de erros
        .pipe(plumber())
        // Suporte para o padrão ES6
        .pipe(
            babel({
                presets: ['env']
            })
        )
        // Realiza minificação
        .pipe(uglify())
        // Altera a extenção do arquivo
        // .pipe(concat('app.min.js'))
        // Salva os arquivos minificados na pasta de destino
        .pipe(gulp.dest('js')));
});

gulp.task('css', function() {
    return (gulp
        // Define a origem dos arquivos .scss
        .src(css_path)
        // Realiza a minificação do css
        .pipe(cleanCss({ processImport: false }))
        // Altera a extenção do arquivo
        // .pipe(concat('style.min.css'))
        // Salva os arquivos processados na pasta de destino
        .pipe(gulp.dest('css')));
});

gulp.task('html', function() {
    return gulp
        .src('src/html/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.start('default');
    gulp.watch(js_path, ['js']);
    gulp.watch(css_path, ['css']);
    gulp.watch(html_path, ['html']);
});

gulp.task('default', ['js', 'css', 'html']);
