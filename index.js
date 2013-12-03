var path = require('path')

module.exports = AuthSocket

function AuthSocket(opts) {
  if (!(this instanceof AuthSocket)) return new AuthSocket(opts)
  if (!opts) opts = {}
  this.opts = opts
  this.handle = this.opts.handler || defaultHandler
  
  function defaultHandler(req, res, cb) {
    setImmediate(function() {
      // anonymous user
      cb(null, null, req, res)
    })
  }
}

AuthSocket.prototype.upgrade = function (webSocketServer, cb) {
  var handler = this.handle
  return function(req, socket, head) {
    handler(req, socket, function(err, user) {
      // if (opts.closeAnonymous) socket.end()
      webSocketServer.handleUpgrade(req, socket, head, function(conn) {
        cb(err, user, conn)
      })
    })
  }
}
