var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
del = require('del');





var config = {
    projectName: 'hic-al',
     sassDir: './src/scss',
     bowerDir: './bower_components' ,
     utils: './recursos' ,
}

var paths = {
   html: [
      'src/html/**/*',
   ],
   stylesheet: config.sassDir + '/app.scss',
   sass: [
      config.bowerDir + '/bootstrap-sass/assets/stylesheets/',
      config.bowerDir + '/font-awesome/scss',
      // config.bowerDir + '/slick-carousel/slick/slick.scss',
      // config.bowerDir + '/slick-carousel/slick/slick-theme.scss',
      // config.bowerDir + '/fullpage.js/jquery.fullPage.scss',
      config.utils + '/style_utils/scss/',
      config.utils + '/js_utils/dist/stylesheet',
      config.sassDir,
   ],
   js: [
      config.bowerDir + '/jquery/dist/jquery.js',
      config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      config.bowerDir + '/imgLiquid/js/imgLiquid-min.js',
      config.bowerDir + '/socket.io-client/socket.io.js',
      config.utils + '/js_utils/dist/js/js_utils.min.js',
      'src/js/scroll.js',
      'src/js/app.js'
   ],
   fonts: [
      config.bowerDir + '/font-awesome/fonts/**.*'
   ]
};




gulp.task('html', function() {
   return gulp.src( paths.html )
   .pipe(gulp.dest('public/'))
   .pipe(notify({ message: 'Html copiado', onLast: true }));

});


// gulp.task('sass', function() {
//   return sass('src/scss/app.scss', { style: 'expanded' })
//     .pipe(autoprefixer('last 2 version'))
//     .pipe(gulp.dest('public/assets/css'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(cssnano())
//     .pipe(gulp.dest('public/assets/css'))
//     .pipe(notify({ message: 'Styles task complete' }));
// });
//


gulp.task('sass',function(){
  return gulp.src( paths.stylesheet )
    .pipe(sass({ includePaths : paths.sass , style: 'expanded' }))
    .pipe(autoprefixer('last 2 version'))
   //  .pipe(concat( config.projectName + '.min.css'))
    .pipe(concat( 'app.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(notify({ message: 'sass listo.' }));

})

gulp.task('fonts', function() { 
   return gulp.src( paths.fonts ) 
   .pipe(gulp.dest('public/assets/fonts')); 
});



gulp.task('js', function() {
   return gulp.src(paths.js)
   // .pipe(jshint('.jshintrc'))
   // .pipe(jshint.reporter('default'))
   .pipe(concat( 'app.min.js'))
   // .pipe(concat( config.projectName + '.min.js'))
   .pipe(uglify())
   .pipe(gulp.dest('public/assets/js'))
   // .pipe(rename({suffix: '.min'}))
   // .pipe(gulp.dest('public/assets/js'))
   .pipe(notify({ message: 'js listos!' }));

});


gulp.task('images', function() {
  // return gulp.src('src/images/**/*')
  //   .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
  //   .pipe(gulp.dest('public/assets/img'))
  //   .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('clean', function() {
    return del(['public/*']);
});


gulp.task('default', ['clean'], function() {
   gulp.start( 'html', 'fonts', 'sass', 'js' );
});


gulp.task('watch', function() {

  gulp.start( 'default' );
  gulp.watch('src/scss/*', ['sass']);
  gulp.watch('src/js/*', ['js']);
  gulp.watch('src/html/*', ['html']);

  // gulp.watch('src/images/**/*', ['images']);
  livereload.listen();

  gulp.watch(['public/**']).on('change', livereload.changed);

});
