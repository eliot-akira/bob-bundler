import gnodemon from '../utils/gnodemon'
import chalk from 'chalk'

export default function startNodemon({ src, watch, port = 3000, log, relative, reload }) {

  log('nodemon', `Serve from ${relative(src)}: type ${chalk.green('rs')} and enter to restart`)

  // Doesn't return promise because it never stops

  gnodemon({
    script: src,
    watch: watch,
    ignore: ['.git', 'node_modules'],
    args: [`--port="${port}"`], // , `--exec "node --trace-warnings --pending-deprecation"`
    //env: {'NODE_ENV': 'development'},

    // Show deprecation warnings with stack trace
    // https://nodejs.org/en/docs/guides/buffer-constructor-deprecation/
    //execMap: { js: 'node --trace-warnings --pending-deprecation' }

  })
  //.on('error', (e) => { log.error(e.stack) })
    .on('error', function(e) {
      log.error('nodemon', e.message)
      this.emit('end')
    })
    .on('restart', () => {
      log('nodemon', 'Restart')
    //if (reload) setTimeout(reload, 500)
    })
  //.on('exit', () => {})

  // Kill nodemon process on Ctrl/Cmd + C
  process.once('SIGINT', function () {
    process.exit()
  })
}
