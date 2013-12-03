var doorknob = require('doorknob/server')
var AuthSocket = require("../")

var opts = {
  port: 8080,
  devMode: false,
  staticPath: __dirname
}

var doorknobServer = doorknob(opts)

var auth = AuthSocket({
  handler: doorknobServer
})

doorknobServer.listen(opts.port)

console.log('open http://localhost:' + opts.port + '/persona.html')
