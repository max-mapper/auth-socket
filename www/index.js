var websocket = require('websocket-stream')
var logger = require('console-stream')

require('console-log').show(true)

var wsurl = 'ws://localhost:3000' + window.location.search
var socket = websocket(wsurl)
var logInterval

socket.on('open', function() {
  logInterval = setInterval(function() {
    socket.write(+new Date() + '\n')
  }, 500)
})

socket.on('end', function() {
  clearInterval(logInterval)
})

window.socket = socket

socket.pipe(logger())