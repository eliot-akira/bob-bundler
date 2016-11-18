import path from 'path'
import getBundles from './getBundles'
import withDefaults from '../defaults'

export default function getAllBobs(config) {

  const { args, relative } = config

  const bundles = getBundles(config)

  let allBobs = {}

  bundles.forEach(bundle => {

    if (!bundle.json || !bundle.json.bob) return

    const root = bundle.root
    const relativeRoot = relative(root)

    // If project dirs specified
    if (args.length
      && args.indexOf(relativeRoot ? relativeRoot : '.') < 0
    ) return

    let bob = withDefaults(bundle.json.bob)

    Object.keys(bob).forEach(task => {

      let bobWithRelativePaths = []

      bob[task].forEach(b => {
        // Append relative root to these keys
        ['src', 'dest', 'watch'].forEach(key => {
          if (!b[key]) return
          b[key] = path.join(relativeRoot, b[key])
        })
        bobWithRelativePaths.push(b)
      })

      if (!allBobs[task]) allBobs[task] = []
      allBobs[task].push(...bobWithRelativePaths)
    })
  })

  return allBobs
}
