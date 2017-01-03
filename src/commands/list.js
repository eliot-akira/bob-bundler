import getBundles from '../utils/getBundles'

export default function list(config) {

  const { log, relative } = config

  const bundles = getBundles(config)

  log.title('Projects')

  bundles.forEach(b => log(relative(b.root) || '.'))
}