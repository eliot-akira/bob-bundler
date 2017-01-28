import path from 'path'
import gulp from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import $if from 'gulp-if'
import createBabelConfig from '../createBabelConfig'

export default function babelTask({ src, dest, root, dev, log, relative, globalIgnore = [] }) {

  return new Promise((resolve, reject) => {
    gulp.src([`${src}/**/*.js`].concat(globalIgnore))
      .pipe($if(dev, sourcemaps.init()))
      .pipe(babel(createBabelConfig()))
      .on('error', function(e) {
        log.error('babel', e.message)
        this.emit('end')
        reject()
      })
      .pipe($if(dev, sourcemaps.write()))
      .pipe(gulp.dest(dest))
      .on('end', () => {
        log('babel', `${relative(src)} -> ${relative(dest)}`)
        resolve()
      })
  })
}