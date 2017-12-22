import path from 'path'
import gulp from 'gulp'

export default function copyTask({
  src, dest, root, dev,
  log, relative, chalk,
  globalIgnore = []
}) {

  return new Promise((resolve, reject) => {
    gulp.src([src].concat(globalIgnore))
      .on('error', function(e) {
        log.error('copy', e.message)
        this.emit('end')
        reject()
      })
      .pipe(gulp.dest(dest))
      .on('end', () => {
        log('copy', `${relative(src)} -> ${chalk.green(relative(dest))}`)
        resolve()
      })
  })
}