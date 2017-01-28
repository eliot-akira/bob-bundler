import path from 'path'
import gulp from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import $if from 'gulp-if'
import createBabelConfig from '../createBabelConfig'
//import reloadAfterNodemon from '../utils/reloadAfterNodemon'

export default function babelWatch({ src, dest, root, dev, log, relative, globalIgnore = [] }) {

  // For server-side render to resolve client require
  process.env.NODE_PATH = process.env.NODE_PATH || dest

  // Watch & compile each changed file
  // Doesn't return promise because it never stops
  return gulp.watch([`${src}/**/*.js`].concat(globalIgnore))
    .on('change', (filePath) => {
      return gulp.src(filePath, { base: src })
        .pipe($if(dev, sourcemaps.init()))
        .pipe(babel(createBabelConfig()))
        .on('error', function(e) {
          log.error('babel', e.message)
          this.emit('end')
        })
        .pipe($if(dev, sourcemaps.write()))
        .pipe(gulp.dest(dest))
        .on('end', () => {
          //log('Babel', relative(filePath))
          log('babel', `${relative(filePath)} -> ${relative(dest)}`)
          // Reload client
          //reloadAfterNodemon()
        })
    })
}
