import path from 'path'
import gulp from 'gulp'
import browserify from 'gulp-bro'
import rename from 'gulp-rename'
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import $if from 'gulp-if'
import babelConfig from '../babel.config'

export default function browserifyTask({ src, dest, dev = false, log, relative }) {

  const destDir = path.dirname(dest)
  const destFile = path.basename(dest)

  return new Promise((resolve, reject) => {

    gulp.src(src, { read: false }) // recommended option for gulp-bro
      .pipe(browserify({
        debug: dev, // Source maps
        transform: [
          babelify.configure(babelConfig)
        ],
        // Resolve require paths for client and shared lib
        //paths: [`${src}/lib`, `${src}/shared`, `${root}/shared`]
      }))
      .pipe($if(!dev, uglify()))
      .pipe(rename(destFile))
      .pipe(gulp.dest(destDir))
      .on('error', function(e) {
        log.error('Browserify', e.message)
        this.emit('end')
        reject()
      })
      .on('end', () => {
        log('Browserify', `${relative(src)} -> ${relative(dest)}`)
        resolve()
      })
  })
}
