import path from 'path'

export default function splitDir(filePath) {

  const parts = filePath.split('/')
  const dir = parts.slice(0, -1).join('/')
  const file = parts[parts.length-1]

  // File name contains dot and doesn't start with one
  if (file.indexOf('.') > 0) return { dir, file }

  // Only dir name is set
  return { dir: filePath, file: '' }
}