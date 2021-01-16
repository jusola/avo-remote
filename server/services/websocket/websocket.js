import WebSocket from 'ws'

const WSPORT = 4000
const wss = WebSocket({ port: WSPORT })

function heartbeat () {
  this.isAlive = true
}

// on new connection
wss.on('connection', (ws) => {
  ws.isAlive = true
  ws.on('pong', heartbeat) // when ponged, do heartbeat
})

// ping clients every 2 seconds
const pingInterval = setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false) return ws.terminate()
    ws.isAlive = false
    ws.ping(() => {

    })
  }, 2000)
})

wss.on('close', () => {
  clearInterval(pingInterval)
})
