import http from 'http'
import nodeStatic from 'node-static'

export default function({ src, port = 3000, dev = false, log, relative, chalk }) {

  // Reference: https://github.com/cloudhead/node-static

  const staticServer = new nodeStatic.Server(src, { cache: !dev })

  http.createServer((req, res) => {
    req.addListener('end', () => staticServer.serve(req, res)).resume()
  }).listen(port)

  log('Static', `Serving at ${chalk.green('localhost:'+port)} from ${relative(src)}`)
}
