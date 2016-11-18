import withDefaultFile from './withDefaultFile'
import splitDir from '../utils/splitDir'

export default function withDefaults(bob) {

  let bobWithDefaults = {}

  Object.keys(bob).forEach(key => {

    // Support multiple bundles
    if (!Array.isArray(bob[key])) bob[key] = [bob[key]]

    bobWithDefaults[key] = []

    bob[key].forEach(bundle => {

      // Defaults

      bundle.src = bundle.src || 'src'
      bundle.dest = bundle.dest || 'build'

      const { dir } = splitDir(bundle.src)

      if (key==='browserify') {
        bundle.src = withDefaultFile(bundle.src, 'index.js')
        bundle.dest = withDefaultFile(bundle.dest, 'app.js')
        bundle.watch = bundle.watch || `${dir}/**/*.js`
      } else if (key==='sass') {
        bundle.src = withDefaultFile(bundle.src, 'index.scss')
        bundle.dest = withDefaultFile(bundle.dest, 'app.css')
        bundle.watch = bundle.watch || `${dir}/**/*.scss`
      } else if (key==='babel') {
        bundle.watch = bundle.watch || `${dir}/**/*.js`
      }

      bobWithDefaults[key].push(bundle)
    })
  })

  return bobWithDefaults
}