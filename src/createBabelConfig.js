import path from 'path'
import fileExists from './utils/fileExists'

// Installed inside, i.e., via npm link
let moduleDir = path.join(__dirname, '../node_modules')

// Installed as devDependency
if (!fileExists(moduleDir)) {
  moduleDir = path.join(__dirname, '../..')
}

const modulePath = m => path.join(moduleDir, m)

export default function createBabelConfig() {
  return {
    presets: [
      modulePath('babel-preset-es2015'),
      modulePath('babel-preset-stage-0'),
    ],
    plugins: [
      modulePath('babel-plugin-add-module-exports'),
      [modulePath("babel-plugin-transform-runtime"), {
        "polyfill": false,
        "regenerator": true
      }]
    ],
    //extends // <-- Get from config
    //babelrc: false // Load .babelrc manually..?
  }
}