import path from 'path'

const modulePath = m => path.join(__dirname, '../node_modules', m)

export default {
  presets: [
    modulePath('babel-preset-es2015'),
    modulePath('babel-preset-stage-0'),
  ]
}