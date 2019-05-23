import fs from 'fs'
import path from 'path'
import fileExists from '../utils/fileExists'

// Installed inside, i.e., via npm link
let moduleDir = path.join(__dirname, '../../node_modules')

// Test if installed as devDependency
if (!fileExists(path.join(moduleDir, '@babel/preset-env'))) {
  moduleDir = path.join(__dirname, '../../..')
}

export default function createBabelConfig(config = {}) {

  const resolvePaths = {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    root: [
      moduleDir,
      ...(
        config.root
          ? (Array.isArray(config.root) ? config.root : [config.root])
            .map(f => path.join(config.bundleRoot, path.relative(config.bundleRoot, f)))
          : []
      ),
      path.join(config.bundleRoot, 'node_modules')
    ],
    alias: {
      ...(config.alias || {}),
    },
    ...(config.resolve || {})
  }

  const babelConfig = {
    presets: [
      config.isServer
        ? [ require.resolve('@babel/preset-env'),
          { 'modules': 'commonjs',
            'targets': { 'node': 'current' },
          }
        ]
        : [ require.resolve('@babel/preset-env'),
          { 'modules': 'commonjs',

            // Allow config to bundle polyfills instead of relying on global

            ...(config.includePolyfill ? {
              useBuiltIns: 'usage', corejs: 3,
            } : {}),

            'targets': { 'browsers': [
              'last 2 versions',
              'ie >= 10'
            ] }
          }
        ],
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-typescript'),
    ],
    plugins: [

      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),

      require.resolve('babel-plugin-transform-node-env-inline'),

      require.resolve('@mna/builder/config/babel-plugin-react-require'),
      require.resolve('babel-plugin-add-module-exports'),
      require.resolve('babel-plugin-inline-json-import'),

      require.resolve('@babel/plugin-transform-modules-commonjs'),
      ...(
        config.isServer ?
          []
          :
          [
            //https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime
            [require.resolve('@babel/plugin-transform-runtime'), {
              //corejs: 3,
              corejs: false, helpers: true, regenerator: true//, useESModules: true,
            }]
          ]
      ),

      [require.resolve('babel-plugin-module-resolver'), resolvePaths]
    ],
    //extends // Get from config?
    //babelrc: false
  }

  return babelConfig
}
