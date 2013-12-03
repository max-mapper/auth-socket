var http = require("http")
var WebsocketServer = require("ws").Server
var websocketStream = require('websocket-stream')
var ecstatic = require('ecstatic')
var AuthSocket = require("../")
var Router = require('routes-router')

var app = Router()

app.addRoute('*', ecstatic(__dirname))

var auth = AuthSocket({
  handler: function (req, res, cb) {
    if (req.url.match('hello')) cb(null, {name: 'bob'})
    else cb(null, null)
  }
})

var server = http.createServer(app) 
var wss = new WebsocketServer({ noServer: true })

server.on("upgrade", auth.upgrade(wss, function(err, user, conn) {
  var stream = websocketStream(conn)
  stream.write('user: ' + JSON.stringify(user) + '\n')
  // echo party
  stream.pipe(stream)
}))
 
server.listen(3000)
console.log('open http://localhost:3000/socket.html')
