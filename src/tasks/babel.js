import gulp from 'gulp'
import babel from 'gulp-babel'
import babelConfig from '../babel.config'

export default function babelTask({ src, dest, log, relative, globalIgnore = [] }) {

  return new Promise((resolve, reject) => {
    gulp.src([`${src}/**/*.js`].concat(globalIgnore))
      .pipe(babel(babelConfig))
      .on('error', function(e) {
        log.error('Babel', e.message)
        this.emit('end')
        reject()
      })
      .pipe(gulp.dest(dest))
      .on('end', () => {
        log('Babel', `${relative(src)} -> ${relative(dest)}`)
        resolve()
      })
  })
}