const gulp =require('gulp');
const browserSync=require('browser-sync').create();
const sass =require('gulp-sass');
//Compile Sass and inject into Browser
gulp.task('sass',function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());

});


//Move js file to src/js
gulp.task('js',function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js.map','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js','node_modules/popper.js/dist/umd/popper.min.js.map'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());

});
//move fonts folder to src
gulp.task('fonts',function(){
    return gulp.src(['node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest("src/fonts"));
});

gulp.task('fa',gulp.series(function(){
    return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
    .pipe(gulp.dest("src/css"));
}));


// Watch Sass & Server
gulp.task('serve',gulp.series( ['sass'], function(){
    browserSync.init({
      server: "./src"
    });
  
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
  }));
  

gulp.task('default',gulp.parallel('js','serve','fa','fonts'));