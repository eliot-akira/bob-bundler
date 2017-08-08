import watch from 'gulp-watch'
import build from './build'
import liveReloadServer from '../live-reload/server'

export default function dev(config) {

  build({ ...config, dev: true })

  .then(({ bob, tasks }) => {

    const { log, relative, chalk } = config
    const common = { log, relative, chalk }

    let reloadServer, reload = () => {}, reloadCSS = () => {}

    log.title('Watching..')

    Object.keys(bob).forEach(key => {

      // ------------ Each task ------------

      bob[key].forEach(bundle => {

        // ------------ Each bundle ------------

        if (bundle.watch) log('Watch', `${chalk.green(bundle.watch)} for ${chalk.blue(key)}`)

        const watchConfig = {
          ...bundle, ...common, dev: true,
          watch: bundle.watch //&& bundle.watch.split(',')
        }

        if (bundle.livereload && !reloadServer) {
          reloadServer = liveReloadServer(config)
          reload = reloadServer.reload
          reloadCSS = reloadServer.reloadCSS
        }

        if (['browserify', 'html', 'sass'].indexOf(key) >= 0) {

          // Watch all files, compile from entry on change
          watch(watchConfig.watch, () => {
            tasks[key](watchConfig)
            .then(() => {
              if (!bundle.livereload) return
              if (key==='sass') reloadCSS()
              else reload()
            })
            .catch(e => {})
          })

        } else if (key==='babel') {

          // Watch all files, compile each changed file
          require('../tasks/babelWatch')(watchConfig)

        } else if (key==='copy') {

          // Watch all files, copy each changed file
          require('../tasks/copyWatch')(watchConfig)

        } else if (['nodemon', 'static'].indexOf(key) >= 0) {

          log.title('Serve')

          require(`../tasks/${key}`)({ ...watchConfig, reload })
        }
      })
    })

    if (reloadServer) log('Live-reload server started')
  })
  .catch(e => console.error(e))
}
