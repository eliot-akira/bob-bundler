import path from 'path'
import glob from 'glob'
import fileExists from './fileExists'
import getPackageJSON from './getPackageJSON'

export default function getBundles({ root, log }) {

  let bundles = []

  const paths = [root]

  paths.forEach(thisPath => {

    const packageName = 'package.json'

    const packages = glob.sync(`${thisPath}/**/${packageName}`, {
      ignore: ['**/.git/**', '**/_*/**', `**/node_modules/**`]
    })

    packages.forEach(packagePath => {
      const root = path.dirname(packagePath)
      const bundle = {
        root,
        json: getPackageJSON(root)
      }

      bundles.push(bundle)
    })
  })

  if (!bundles.length) {
    log.error('No projects found')
    return process.exit(1)
  }

  return bundles
}
