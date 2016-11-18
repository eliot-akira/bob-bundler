import fs from 'fs'

export default function fileExists( file ) {
  try { fs.statSync( file ) }
  catch (e) { return false }
  return true
}
