import path from 'path'
import gulp from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import $if from 'gulp-if'
import createBabelConfig from '../babel/config'

export default function babelTask(config) {

  const { src, dest, dev, log, relative, chalk, globalIgnore = [] } = config

  return new Promise((resolve, reject) => {
    gulp.src([`${src}/**/*.js`].concat(globalIgnore))
      .pipe($if(dev, sourcemaps.init()))
      .pipe(babel(createBabelConfig({ ...config, isServer: true })))
      .on('error', function(e) {
        log.error('babel', e.message)
        this.emit('end')
        reject()
      })
      .pipe($if(dev, sourcemaps.write()))
      .pipe(gulp.dest(dest))
      .on('end', () => {
        log('babel', `${relative(src)} -> ${chalk.green(relative(dest))}`)
        resolve()
      })
  })
}