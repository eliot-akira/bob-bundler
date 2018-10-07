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


      // Async/await support

      ...(config.isServer
        ? [] // TODO: How to ignore async/await in Node version that supports it?
        : [

        // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime

        // For standalone *client* libraries
        // TODO: Use polyfill if building whole app

          [modulePath("babel-plugin-transform-runtime"), {
            helpers: false,
            polyfill: false,
            regenerator: true,
            moduleName: modulePath('babel-runtime'),
          // useESModules: true, // if with webpack
          }],
        ]),

      path.join(__dirname, 'markdown/transform'),

      [modulePath('babel-plugin-module-resolver'), {
        root: [ config.src, ...(
          config.root
            ? (Array.isArray(config.root) ? config.root : [config.root])
              .map(f => path.join(config.src, path.relative(config.src, f)))
            : []
        )],
        alias: config.alias || {},
        ...(config.resolve || {})
      }]
    ],
    //extends // <-- Get from config
    //babelrc: false // Load .babelrc manually..?
  }

  return babelConfig
}