import path from 'path'
import gulp from 'gulp'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import minifyCSS from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import $if from 'gulp-if'

export default function sassTask({ src, dest, dev = false, log, relative }) {

  const destDir = path.dirname(dest)
  const destFile = path.basename(dest)

  return new Promise((resolve, reject) => {

    gulp.src(src)
      .pipe($if(dev, sourcemaps.init()))
      .pipe(sass({
        keepSpecialComments: false,
        // Resolve require paths for client and shared lib
        //includePaths: [`${src}/lib`, `${src}/shared`, `${root}/shared`],
        //relativeTo: './app',
        processImport: false // ?
      }))
      .on('error', function(e) {
        log.error('Sass', e.message)
        this.emit('end')
        reject()
      })
      .pipe(autoprefixer({ browsers: ['last 2 versions', 'IE 10', '> 1%'], cascade: false }))
      .pipe($if(!dev, minifyCSS()))
      .pipe(rename(destFile))
      .pipe($if(dev, sourcemaps.write()))
      .pipe(gulp.dest(destDir))
      .on('end', () => {
        log('Sass', `${relative(src)} -> ${relative(dest)}`)
        resolve()
      })
  })
}
