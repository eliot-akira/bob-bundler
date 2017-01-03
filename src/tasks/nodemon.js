import nodemon from 'nodemon'

export default function startNodemon({ src, watch, port = 3000, log, relative, reload }) {

  log('Nodemon', `Serve from ${relative(src)}`)
  log('Type `rs` and enter to restart server')

  // Doesn't return promise because it never stops

  nodemon({
    script: src,
    watch: src,
    ignore: ['.git', 'node_modules'],
    args: [`--port="${port}"`],
    //env: {'NODE_ENV': 'development'},
    //exec: "node --harmony"
  })
  //.on('error', (e) => { log.error(e.stack) })
  .on('error', function(e) {
    log.error('Nodemon', e.message)
    this.emit('end')
  })
  .on('restart', () => {
    log('Nodemon', 'Restart')
    if (reload) setTimeout(reload, 500)
  })
  //.on('exit', () => {})

  // Kill nodemon process on Ctrl/Cmd + C
  process.once('SIGINT', function () {
    process.exit()
  })
}
