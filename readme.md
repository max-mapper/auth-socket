# auth-socket

easily add authenticated websockets to your http server + session store

```
npm install auth-socket
```

## example

```
var opts = { port: 8181 }
var server = require('./')(opts, function onSocket(req, socket, head) {
  console.log(req.url, socket)
})

server.httpServer.listen(8181)

console.log('localhost:8181')
```

you can pass in `httpServer` or `webSocketServer` instances in as options. `auth-socket` will handle websocket events and verify them with:

```js
httpServer.doorknob.getProfile(req, function(err, profile) {}
```

TODO make the verification API more generic, right now it is designed to work with [doorknob](https://github.com/maxogden/doorknob)

## license

BSD
