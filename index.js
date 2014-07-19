
var Duplex = require('stream').Duplex
var inherits = require('util').inherits
inherits(WebsocketStream, Duplex)

module.exports = sneaker

function WebsocketStream(ws) {
  Duplex.call(this)
  this.ws = ws

  var socket = this;
  this.ws.on('message', function (data) {
      socket.push(data);
  });
}

WebsocketStream.prototype._write = function(chunk, enc, cb) {
  if (this.ws.readyState === 1) {
    this.ws.send(chunk.toString())
    cb()
  }
  else {
    console.error('TODO add server-side buffering')
    this.ws.send(chunk.toString())
    cb()
  }
}

WebsocketStream.prototype._read = function(size) {

}

WebsocketStream.prototype.end = function(data) {
  this.ws.close()
  this.emit('close')
}

function sneaker(server, cb) {
  var WebSocket = require('ws')
  var WebSocketServer = WebSocket.Server
  var wss = new WebSocketServer({ server: server })
  wss.on('connection', function(con) {
    var stream = new WebsocketStream(con)
    cb(stream)
  })
  // TODO: handle connection errors, timeouts here
}









