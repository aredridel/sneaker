
var Duplex = require('stream').Duplex
var inherits = require('util').inherits
inherits(WebsocketStream, Duplex)

module.exports = sneaker

function WebsocketStream(ws) {
  Duplex.call(this)
  this.ws = ws
  this.queue = [];

  var socket = this;
  this.ws.on('message', function (data) {
      socket.push(data);
  });
  this.ws.on('open', function () {
    this.queue.forEach(function(e) {
      this.write(e);
    });
    this.queue = [];
  });
}

WebsocketStream.prototype._write = function(chunk, enc, cb) {
  try {
    if (this.ws.readyState == 0) {
      this.queue.push(chunk);
    } else if (this.ws.readyState == 1) {
      this.ws.send(chunk.toString())
      cb()
    }
    else {
      this.emit('error', 'Invalid state');
    }
  } catch (e) {
    this.emit('error', e);
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









