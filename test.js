var opts = { port: 8181, devMode: true }
var server = require('./')(opts, function onSocket(req, socket, head) {
  console.log(req.url, socket)
})


var httpServer = opts.httpServer || doorknobServer(opts)
var webSocketServer = opts.webSocketServer || new WebSocketServer({ noServer: true, clientTracking: false })


server.httpServer.listen(8181)

console.log('localhost:8181')



// var http = require('http')
// var WebSocketServer = require('ws').Server
// var websocket = require('websocket-stream')
// var doorknobServer = require('doorknob/server')
