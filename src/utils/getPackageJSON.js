import path from 'path'
import fs from 'fs'
import fileExists from './fileExists'

export default function getPackageJSON(root) {

  const packagePath = path.join(root, 'package.json')

  try {
    return fileExists(packagePath)
      ? JSON.parse(fs.readFileSync(packagePath, 'utf8'))
      : {}
  } catch (e) {
    return {}
  }
}