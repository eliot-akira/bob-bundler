import getAllBobs from '../utils/getAllBobs'

export default function help(config) {

  const { log, relative } = config

  log.title('Use', 'bob [command]')

  log.title('Commands')

  log('bob dev', 'Build project and watch files for changes')
  log('bob build', 'Build project for production')

  log.title('Current project')

  const allBobs = getAllBobs(config)

  Object.keys(allBobs).forEach(task => {

    log(task)

    const bundles = allBobs[task].reduce((obj, b) => {
      Object.keys(b).forEach(key => {
        if (!obj[key]) obj[key] = []
        obj[key].push(b[key])
      })
      return obj
    }, {})

    Object.keys(bundles).forEach(key => {

      let value = bundles[key]

      if (!Array.isArray()) value = [value]

      log.info(`    ${key}: ${value.join(', ')}`)
    })
  })
}