const gulp = require('gulp'),
      sass = require('gulp-sass'),
      prefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create(),
      concat = require('gulp-concat');
      clean = require('gulp-clean');

const path = {
    dist: {
        self: "./dist/",
        html: "dist/",
        css: "dist/css/",
        js: "dist/js/",
        img: "dist/img"
    },
    src: {
        html: "src/**/*.html",
        scss: "src/scss/style.scss",
        js: "src/**/*.js",
        img: "src/img/**/*"
    },
    watch: {
        scss: "src/**/*.scss"
    }
};

/*** CREATING FUNCTIONS ***/
const buildHTML = () => (
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dist.html))
);

const buildSCSS = () => (
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer({
            cascade: false
        }))
        .pipe(gulp.dest(path.dist.css))
);

const buildJS = () => (
    gulp.src(path.src.js)
        .pipe(concat("script.js"))
        .pipe(gulp.dest(path.dist.js))
);

const buildIMG = () => (
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img))
);

const cleanDist = () => (
    gulp.src(path.dist.self,{allowEmpty:true})
        .pipe(clean())
);

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: path.dist.self
        }
    });

    gulp.watch(path.src.html, buildHTML).on('change', browserSync.reload);
    gulp.watch(path.watch.scss, buildSCSS).on('change', browserSync.reload);
    gulp.watch(path.src.js, buildJS).on('change', browserSync.reload);
    gulp.watch(path.src.img, buildIMG).on('change', browserSync.reload);
};

/*** CREATING TASKS ***/
gulp.task('html', buildHTML);
gulp.task('scss', buildSCSS);

gulp.task('default', gulp.series(
    cleanDist,
    buildHTML,
    buildSCSS,
    buildJS,
    buildIMG,
    watcher
));