import watch from 'gulp-watch'
import build from './build'

module.exports = function dev(config) {

  build({ ...config, dev: true })

  .then(({ bob, tasks }) => {

    const { log, relative } = config
    const common = { log, relative }

    Object.keys(bob).forEach(key => {

      // Each task

      bob[key].forEach(bundle => {

        // Each bundle

        if (!bundle.watch) return

        log(`Watch:${key}`, bundle.watch)

        const watchConfig = { ...bundle, ...common, dev: true }

        if (['browserify', 'sass'].indexOf(key) >= 0) {

          // Watch all files, compile from entry on change
          watch(bundle.watch, () => tasks[key](watchConfig))

        } else if (key==='babel') {

          // Watch all files, compile each changed file
          require('../tasks/babelWatch')(watchConfig)
        }
      })
    })
  })
}
