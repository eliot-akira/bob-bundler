import gulp from 'gulp'
import babel from 'gulp-babel'
import babelConfig from '../babel.config'
//import reloadAfterNodemon from '../utils/reloadAfterNodemon'

export default function babelWatch({ src, dest, log, relative }) {

  // Watch & compile each changed file
  // Doesn't return promise because it never stops

  return gulp.watch(`${src}/**/*.js`)
    .on('change', (filePath) => {
      return gulp.src(filePath, { base: src })
        .pipe(babel(babelConfig))
        .on('error', function(e) {
          log.error('Babel', e.message)
          this.emit('end')
        })
        .pipe(gulp.dest(dest))
        .on('end', () => {
          log('Babel', relative(filePath))
          // Reload client
          //reloadAfterNodemon()
        })
    })
}
