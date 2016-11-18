import getAllBobs from '../utils/getAllBobs'
import browserify from '../tasks/browserify'
import sass from '../tasks/sass'
import babel from '../tasks/babel'

const definedTasks = ['browserify', 'sass', 'babel']

let tasks = {}

module.exports = function build(config) {

  const { dev, log, relative } = config

  const allBobs = getAllBobs(config)

  log.title(dev ? 'Dev' : 'Build')

  let allTasks = []

  Object.keys(allBobs).forEach(key => {

    if (definedTasks.indexOf(key) < 0) {
      log.error(`Unknown task "${key}"`, allBobs[key])
      return process.exit(1)
    }

    if (!tasks[key]) tasks[key] = require(`../tasks/${key}`)

    allBobs[key].forEach(bundle =>
      allTasks.push(
        tasks[key]({ ...bundle, dev, log, relative })
      )
    )
  })

  return Promise.all(allTasks).then(() => ({ bob: allBobs, tasks }))
}
