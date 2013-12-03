var websocket = require('websocket-stream')
var logger = require('console-stream')

require('console-log').show(true)

var wsurl = 'ws://localhost:8080' + window.location.search // pass along querystring
var socket = websocket(wsurl)
var logInterval

socket.on('open', function() {
  logInterval = setInterval(function() {
    socket.write(+new Date() + '\n')
  }, 500)
})

// stop echoing when server goes down
socket.on('end', function() {
  clearInterval(logInterval)
})

// make socket a global so it's available in the js console
window.socket = socket

socket.pipe(logger())