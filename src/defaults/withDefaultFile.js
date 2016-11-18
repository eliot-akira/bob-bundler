import path from 'path'
import splitDir from '../utils/splitDir'

export default function withDefaultFile(src, defaultFile) {

  const parts = splitDir(src)

  parts.file = parts.file || defaultFile

  return path.join(parts.dir, parts.file)
}
