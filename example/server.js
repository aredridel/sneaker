

var fakestream = require('fakestream')(500)
var http = require('http')
var ecstatic = require('ecstatic')(__dirname)
var server = http.createServer(ecstatic)
server.listen(3000)

//var sneaker = require('../')
//var websocket = sneaker(function(stream) {
  //console.log(stream)
//})
//websocket.install(server, '/yolo')


sneaker(server, function(stream) {

  //console.log(stream)

  var count = 0

  setInterval(function() {
    stream.write(count++ + 'ws')
  }, 1000)

  //fakestream.pipe(stream)

  //stream.write('just one thign')

  //stream.write('thingy')

})




// ===== the module

var Duplex = require('stream').Duplex
var inherits = require('util').inherits
inherits(WebsocketStream, Duplex)

function WebsocketStream(ws) {
  Duplex.call(this)
  this.ws = ws
}

WebsocketStream.prototype._write = function(chunk, enc, cb) {

  //console.log('got a chunk')
  //console.log(chunk.toString())

  console.log(this.ws.readyState)

  if (this.ws.readyState === 1) {
    this.ws.send(chunk.toString())
    cb()
  }
  else {
    console.log('should be buffering here yo!')
    // push to buffer here
  }

}

WebsocketStream.prototype._read = function(size) {
  console.log('read called with size ' + size)
}

function sneaker(server, cb) {

  // make a ws server attached to a regular http server
  // this will accept ws:// protocol

  var WebSocket = require('ws')
  var WebSocketServer = WebSocket.Server
  var wss = new WebSocketServer({ server: server })

  wss.on('connection', function(con) {

    // the socket returned by ws is a bit weird
    // so we wrap it in an actual stream
    var stream = new WebsocketStream(con)
    cb(stream)
  })
}



