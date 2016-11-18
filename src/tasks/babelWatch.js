import gulp from 'gulp'
import babel from 'gulp-babel'
import babelConfig from '../babel.config'
//import reloadAfterNodemon from '../utils/reloadAfterNodemon'

module.exports = function babelWatch({ src, dest, log, relative }) {

  // Watch & compile each changed file

  gulp.watch(`${src}/**/*.js`, (file) => {
    return gulp.src(file.path, { base: src })
      .pipe(babel(babelConfig))
      .on('error', function(e) {
        log.error('Watch', `Error building: ${e.message}`)
        console.log(e)
        this.emit('end')
      })
      .pipe(gulp.dest(dest))
      .on('end', () => {
        log('Watch: build', relative(file.path))
        // Reload client
        //reloadAfterNodemon()
      })
  })
}
