import path from 'path'
import gulp from 'gulp'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import minifyCSS from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import $if from 'gulp-if'
import fileExists from '../utils/fileExists'

export default function sassTask({
  src, dest, bundleRoot, dev = false,
  log, relative, chalk
}) {

  const rootSrc = path.join(bundleRoot, 'src')
  const destDir = path.dirname(dest)
  const destFile = path.basename(dest)

  if (!fileExists(src)) {
    log.error('sass', `File doesn't exist: ${src}`)
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {

    gulp.src(src, {
      allowEmpty: true
    })
      .pipe($if(dev, sourcemaps.init()))
      .pipe(sass({
        keepSpecialComments: false,
        // Resolve require paths for client source
        includePaths: [rootSrc],
        //relativeTo: root, //'./app',
        processImport: false // ?
      }))
      .on('error', function(e) {
        log.error('sass', e.message)
        this.emit('end')
        reject()
      })
      .pipe(autoprefixer({ browsers: ['last 2 versions', 'IE 10', '> 1%'], cascade: false }))
      .pipe($if(!dev, minifyCSS()))
      .pipe(rename(destFile))
      .pipe($if(dev, sourcemaps.write()))
      .pipe(gulp.dest(destDir))
      .on('end', () => {
        log('sass', `${relative(src)} -> ${chalk.green(relative(dest))}`)
        resolve()
      })
  })
}
