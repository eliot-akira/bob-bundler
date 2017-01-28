import path from 'path'
import gulp from 'gulp'
import browserify from 'gulp-bro'
import rename from 'gulp-rename'
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import $if from 'gulp-if'
import createBabelConfig from '../createBabelConfig'

export default function browserifyTask({ src, dest, root, dev = false, log, relative }) {

  const rootSrc = path.join(root, 'src')
  const destDir = path.dirname(dest)
  const destFile = path.basename(dest)

  return new Promise((resolve, reject) => {

    gulp.src(src, { read: false }) // recommended option for gulp-bro
      .pipe(browserify({
        debug: dev, // Source maps
        transform: [
          babelify.configure(createBabelConfig())
        ],
        // Resolve require paths for client source
        // For server-side babel, define NODE_PATH
        paths: [rootSrc]
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
        log('browserify', `${relative(src)} -> ${relative(dest)}`)
        resolve()
      })
  })
}
