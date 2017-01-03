import gulp from 'gulp'
import babel from 'gulp-babel'
import babelConfig from '../babel.config'
//import reloadAfterNodemon from '../utils/reloadAfterNodemon'

export default function babelWatch({ src, dest, log, relative }) {

  // Watch & compile each changed file
  // Doesn't return promise because it never stops

  gulp.watch(`${src}/**/*.js`, (file) => {
    return gulp.src(file.path, { base: src })
      .pipe(babel(babelConfig))
      .on('error', function(e) {
        log.error('Babel', e.message)
        this.emit('end')
      })
      .pipe(gulp.dest(dest))
      .on('end', () => {
        log('Babel', relative(file.path))
        // Reload client
        //reloadAfterNodemon()
      })
  })
}
