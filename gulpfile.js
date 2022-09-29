import gulp from 'gulp';
import plumber from 'gulp-plumber';
import srcmap from 'gulp-sourcemaps';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sync from 'browser-sync';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import webp from 'gulp-webp';
import del from 'del';
import htmlmin from 'gulp-htmlmin';

//Styles

gulp.task('styles', async () => {
  return gulp.src("./src/assets/sass/styles.scss")
    .pipe(plumber())
    .pipe(srcmap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(srcmap.write("."))
    .pipe(gulp.dest('./build/css'))
    .pipe(sync.stream());
})


//HTML minify

gulp.task('htmlmin', async () => {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true,
    removeComments: true }))
    .pipe(gulp.dest('./build'));
});


// Watcher

gulp.task("watch", () => {
    sync.init({
		server: "./build/",
		port: 80,
		notify: true
    });

    gulp.watch("./src/**/*", gulp.parallel("build")).on('change', sync.reload);
});

// Webp

gulp.task("webpimg", async () => {
  return gulp.src("./src/assets/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("./build/img"));
})


//Copy

gulp.task("copy", async () => {
  return gulp.src ([
    "./src/assets/fonts/**/*.{woff,woff2}",
    "./src/assets/img/**/*.svg",
    "./src/*.ico",
  ], {
    base: "src"
  })
  .pipe(gulp.dest("./build"));
})


//Delete

gulp.task("clean", async () => {
    del([
        './build/**/*',
      ])
})


gulp.task('build', gulp.parallel("clean", "copy", "styles", "htmlmin", "webpimg"))

gulp.task("default", gulp.parallel("watch", "build"));


gulp.task('start', async () => {
  styles, server, watcher
})
