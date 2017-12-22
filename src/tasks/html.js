import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import replace from 'gulp-replace'
//import ejs from 'gulp-ejs'
import ejt from '../ejt/gulp'
import fileExists from '../utils/fileExists'

export default function htmlTask(config) {

  const {
    src, dest,
    dev,
    livereload = false,
    electron = false,
    log, relative, chalk,
    globalIgnore = []
  } = config

  /*if (!fileExists(src)) {
    log.error('html', `File doesn't exist: ${src}`)
    return Promise.resolve()
  }*/

  const srcParts = src.split('/')
  let srcRoot = ''
  for (let part of srcParts) {
    if (part[0]==='*' || part.indexOf('.')>=0) break
    srcRoot += part+'/'
  }
  // Pass source root for HTML template includes
  srcRoot = path.join(process.cwd(), srcRoot)

  const script = createScript({ dev, livereload, electron })

  return new Promise(function(resolve, reject) {
    gulp.src([`${src}`].concat(globalIgnore), {
      allowEmpty: true
    })
      .pipe(ejt({ ext: '.html', srcRoot }))
      .on('error', function(e) {
        log.error('html', e)
        this.emit('end')
        resolve()
        //reject()
      })
      .on('end', () => {
        log('html', `${relative(src)} -> ${chalk.green(relative(dest))}`)
        resolve()
      })
      .pipe(replace('</body>', `${script}</body>`))
      .pipe(gulp.dest(dest))
  })
}

function createScript({ dev, livereload, electron }) {

  let script = ''

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