import path from 'path'
import fs from 'fs'
import fileExists from './fileExists'

export default function getPackageJSON(root) {

  const packagePath = path.join(root, 'package.json')
  const bobConfigPath = path.join(root, 'bob.config.js')

  try {
    let json = {}
    if (fileExists(packagePath)) {
      try {
        json = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
      } catch (e) {
        //
      }
    }
    if (fileExists(bobConfigPath)) {
      json.bob = require(bobConfigPath)()
    }

    return json
  } catch (e) {
    return {}
  }
}