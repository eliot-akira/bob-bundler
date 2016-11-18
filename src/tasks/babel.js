import gulp from 'gulp'
import babel from 'gulp-babel'
import babelConfig from '../babel.config'

module.exports = function babelTask({ src, dest, log, relative }) {

  return new Promise((resolve, reject) => {
    gulp.src(`${src}/**/*.js`)
      .pipe(babel(babelConfig))
      .on('error', (e) => {
        log.error('Babel', e.message)
        this.emit('end')
      })
      .pipe(gulp.dest(dest))
      .on('end', () => {
        log('Babel', `${relative(src)} -> ${relative(dest)}`)
        resolve()
      })
  })
}