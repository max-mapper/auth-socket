var opts = { port: 8181, devMode: true }
var server = require('./')(opts, function onSocket(req, socket, head) {
  console.log(req.url, socket)
})

server.httpServer.listen(8181)

console.log('localhost:8181')