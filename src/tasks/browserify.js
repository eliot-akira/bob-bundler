import path from 'path'
import gulp from 'gulp'
import browserify from 'gulp-bro'
import rename from 'gulp-rename'
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import $if from 'gulp-if'
import createBabelConfig from '../babel/config'
import fileExists from '../utils/fileExists'

export default function browserifyTask(config) {

  const {
    src, dest, dev = false,
    log, relative, chalk
  } = config

  const srcDir = path.dirname(src)
  const destDir = path.dirname(dest)
  const destFile = path.basename(dest)

  const extensions = ['.js', '.jsx', '.json', '.ts', '.tsx']

  if (!fileExists(src)) {
    log.error('browserify', `File doesn't exist: ${src}`)
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {

    return gulp.src(src, {
      read: false, // recommended option for gulp-bro
      allowEmpty: true
    })
      .pipe(browserify({
        extensions,
        debug: dev, // Source maps
        transform: [
          babelify.configure({
            extensions,
            ...createBabelConfig(config)
          })
        ],
        // Resolve require paths for client source
        // For server-side babel, define NODE_PATH
        paths: [path.resolve(srcDir)]
      }))
      .pipe($if(!dev, uglify()))
      .pipe(rename(destFile))
      .pipe(gulp.dest(destDir))
      .on('error', function(e) {
        log.error('browserify', e.message)
        this.emit('end')
        reject()
      })
      .on('end', () => {
        log('browserify', `${relative(src)} -> ${chalk.green(relative(dest))}`)
        resolve()
      })
  })
}
