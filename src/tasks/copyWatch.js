import path from 'path'
import gulp from 'gulp'

export default function copyTask({ src, dest, root, dev, log, relative, globalIgnore = [] }) {

  return gulp.watch([`${src}/**/*`].concat(globalIgnore))
    .on('change', (filePath) => {
      return gulp.src(filePath, { base: src })
        .on('error', function(e) {
          log.error('copy', e.message)
          this.emit('end')
        })
        .pipe(gulp.dest(dest))
        .on('end', () => {
          log('copy', `${relative(filePath)} -> ${relative(dest)}`)
        })
    })
}
