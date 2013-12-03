var persona = require('persona-id')()
var request = require('browser-request')

var identify = document.getElementById('identify')
var unidentify = document.getElementById('unidentify')
var output = document.getElementById('output')

getSession() 

persona.on('login', function(id) {
  getSession(function(err, profile) {
    console.log('id, err, profile:', id, err, profile)
  })
})

persona.on('logout', function() { getSession() })

identify.addEventListener('click', function () { persona.identify() })

unidentify.addEventListener('click', function () { persona.unidentify() })

function getSession(cb) {
  request({url: '/_profile', json: true}, function(err, resp, profile) {
    if (!persona.id && profile.email) persona.set(profile.email)
    output.innerHTML = JSON.stringify(profile)
    if (cb) cb(err, profile)
  })
}