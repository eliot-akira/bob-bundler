import fs from 'fs'
import path from 'path'
import fileExists from '../utils/fileExists'

// Installed inside, i.e., via npm link
let moduleDir = path.join(__dirname, '../../node_modules')

// Test if installed as devDependency
if (!fileExists(path.join(moduleDir, 'babel-preset-es2015'))) {
  moduleDir = path.join(__dirname, '../../..')
}

const modulePath = m => path.join(moduleDir, m)

export default function createBabelConfig(config = {}) {
  const babelConfig = {
    presets: [
      modulePath('babel-preset-es2015'),
      modulePath('babel-preset-stage-0'),
      modulePath('babel-preset-react'),
    ],
    plugins: [
      modulePath('babel-plugin-transform-node-env-inline'),
      modulePath('babel-plugin-react-require'),
      modulePath('babel-plugin-add-module-exports'),
      //modulePath('babel-plugin-transform-runtime'),
      [modulePath("babel-plugin-transform-runtime"), {
        "polyfill": false,
        "regenerator": true,
        moduleName: modulePath('babel-runtime')
      }],
      path.join(__dirname, 'markdown/transform'),
      [modulePath('babel-plugin-module-resolver'), {
        root: [
          config.src //'.'
        ],
        alias: config.alias || {},
        ...(config.resolve || {})
      }]
    ],
    //extends // <-- Get from config
    //babelrc: false // Load .babelrc manually..?
  }

  return babelConfig
}