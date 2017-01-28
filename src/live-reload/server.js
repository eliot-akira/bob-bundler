import ws from 'ws'

let server
let logger

export default function liveReloadServer(options = {}) {

  // Port must be the same in client.js
  const { port = 35729, log } = options

  logger = log

  if (!server) server = new ws.Server({ port })

  /*server.on('connection', () => {
    logger && logger('Live reload', 'Connected')
  })*/

  return { reload, reloadCSS }
}

let scheduleReload

export function reload() {
  //clearTimeout(scheduleReload)
  //scheduleReload = setTimeout(() => {
    //logger && logger('Live reload', 'Reload page')
    server && server.clients.forEach(client => {
      client.send(JSON.stringify({ reload: true }))
    })
  //}, 1000)
}

export function reloadCSS() {
  logger && logger('Live reload', 'Reload CSS')
  server && server.clients.forEach(client => {
    client.send(JSON.stringify({ reloadCSS: true }))
  })
}
