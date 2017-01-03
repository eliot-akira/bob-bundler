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

    // Live reload default
    let {
      livereload = false,
      ...bob
    } = bundle.json.bob

    bob = withDefaults(bob)

    if (typeof bob.livereload === 'undefined'
      && (bob.static || bob.nodemon) // Server
      && bob.ejs // Ejs is needed for live reload client
    ) livereload = true

    Object.keys(bob).forEach(task => {

      const bobWithRelativePaths = []

      bob[task].forEach(b => {
        // Append relative root to these keys
        ['src', 'dest', 'watch'].forEach(key => {
          if (!b[key]) return
          b[key] = path.join(relativeRoot, b[key])
        })
        b.livereload = typeof b.livereload !== 'undefined'
          ? b.livereload
          : livereload
        bobWithRelativePaths.push(b)
      })

      if (!allBobs[task]) allBobs[task] = []
      allBobs[task].push(...bobWithRelativePaths)
    })
  })

  return allBobs
}
