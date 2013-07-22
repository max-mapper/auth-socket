var websocket = require('websocket-stream')
var levelup = require('levelup')
var leveljs = require('level-js')
var sublevel = require('level-sublevel')
var replicate = require('level-replicate/msgpack')
var request = require('browser-request')
var persona = require('persona-id')()

var identify = document.getElementById('identify')
var unidentify = document.getElementById('unidentify')
var output = document.getElementById('output')

getSession() 

persona.on('login', function(id) {
  getSession(function(err, profile) {
    window.db = sublevel(levelup('foo', { db: leveljs }))
    var master = replicate(db)
    var socket = websocket('ws://localhost:8181')

    socket.on('open', function() {
      console.log('socket open')
      socket.pipe(master.createStream({tail: true})).pipe(socket)
      socket.on('data', function(c) {
        console.log(c)
      })
    })

    socket.on('error', function(e) {
      console.log('socket error', e)
    })

    socket.on('end', function() {
      console.log('socket end')
    })
  })
})

persona.on('logout', function() { getSession() })

identify.addEventListener('click', function () { persona.identify() })

unidentify.addEventListener('click', function () { persona.unidentify() })

function getSession(cb) {
  request({url: '/_session', json: true}, function(err, resp, profile) {
    if (!persona.id && profile.email) persona.set(profile.email)
    output.innerHTML = JSON.stringify(profile)
    if (cb) cb(err, profile)
  })
}