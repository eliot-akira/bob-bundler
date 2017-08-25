import getAllBobs from '../utils/getAllBobs'
import browserify from '../tasks/browserify'
import sass from '../tasks/sass'
import babel from '../tasks/babel'

const definedTasks = [
  'babel',
  'browserify',
  'html',
  'nodemon',
  'sass',
  'copy',
  'static'
]
const noBuild = ['nodemon', 'static']

let tasks = {}

export default function build(config) {

  const { dev, log, relative, globalIgnore } = config

  const allBobs = getAllBobs(config)

  log.title('Build') //, allBobs

  let allTasks = []

  Object.keys(allBobs).forEach(key => {

    if (definedTasks.indexOf(key) < 0) {
      log.error(`Unknown task "${key}"`, allBobs[key])
      return process.exit(1)
    }

    if (noBuild.indexOf(key) >= 0) return

    if (!tasks[key]) tasks[key] = require(`../tasks/${key}`)

    allBobs[key].forEach(bundle =>
      allTasks.push(
        tasks[key]({ ...bundle, dev, log, relative, globalIgnore })
      )
    )
  })

  return Promise.all(allTasks)
    .then(() => ({ bob: allBobs, tasks }))
    .catch(e => log.error(e))
}
