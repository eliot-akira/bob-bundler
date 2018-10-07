import path from 'path'
import glob from 'glob'
import fileExists from './fileExists'
import getPackageJSON from './getPackageJSON'

export default function getBundles(config) {

  const { root, log, options } = config
  const bundles = []

  const paths = [root]

  paths.forEach(thisPath => {

    const packageName = 'package.json'

    const globPath = options.sub
      ? `${thisPath}/**/${packageName}` // Include sub folders
      : `${thisPath}/${packageName}`

    const packages = glob.sync(globPath, {
      ignore: ['**/.git/**',
        '**/_*/**',
        `**/node_modules/**`]
    })

    if (!packages.length && !options.sub) {
      packages.push(path.join(thisPath, 'package.json'))
    }

    packages.forEach(packagePath => {
      const root = path.dirname(packagePath)
      const bundle = {
        root,
        json: getPackageJSON(config)
      }

      bundles.push(bundle)
    })
  })

  if (!bundles.length) {
    log.error('No projects found', paths)
    return process.exit(1)
  }

  return bundles
}
