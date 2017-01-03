import ws from 'ws'

export const port = 35729 // Must be the same in client.js
let server
let logger

export default function liveReloadServer({ log }) {

  server = new ws.Server({ port })
  logger = log

  return { reload, reloadCSS }
}

export function reload() {
  logger && logger('Live reload', 'Reload page')
  server && server.clients.forEach(client => {
    client.send(JSON.stringify({ reload: true }))
  })
}

export function reloadCSS() {
  logger && logger('Live reload', 'Reload CSS')
  server && server.clients.forEach(client => {
    client.send(JSON.stringify({ reloadCSS: true }))
  })
}
