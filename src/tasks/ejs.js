import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import replace from 'gulp-replace'
import ejs from 'gulp-ejs'

export default function ejsTask(config) {

  const {
    src, dest,
    dev = true,
    livereload = false,
    electron = false,
    log, relative
  } = config

  const script = injectScript({ dev, livereload, electron })

  return new Promise(function(resolve, reject) {
    gulp.src(`${src}`)
      .pipe(ejs({}, { ext: '.html' }))
      .pipe(replace('</body>', `${script}</body>`))
      .pipe(gulp.dest(dest))
      .on('error', function(e) {
        log.error('ejs', e.message)
        this.emit('end')
        reject()
      })
      .on('end', () => {
        log('ejs', `${relative(src)} -> ${relative(dest)}`)
        resolve()
      })
  })
}

function injectScript({ dev, livereload, electron }) {

  let script = null

  if (dev && livereload) {

    const liveReloadClient = fs.readFileSync(
      path.join(__dirname, '../live-reload/client.js'), 'utf-8'
    )

    script = `<script>${liveReloadClient}</script>`

  } else if (electron) {

    script =
      `<script>electron = require('electron');${
        // TODO: Load the script directly from file
        dev ? `require(process.cwd()+'/electron-connect').client.create()` : ''
      }</script>`
  }

  return script
}