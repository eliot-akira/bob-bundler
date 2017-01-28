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
  // Will be overwritten if .babelrc exists
  return {
    presets: [
      modulePath('babel-preset-es2015'),
      modulePath('babel-preset-stage-0'),
    ],
    plugins: [
      modulePath('babel-plugin-add-module-exports')
    ]
  }
}