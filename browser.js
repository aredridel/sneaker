
var resolve = require('url').resolve
var parse = require('url').parse
var format = require('url').format

var Duplex = require('stream').Duplex
var inherits = require('util').inherits
inherits(WebsocketStream, Duplex)

function WebsocketStream(url) {

  var self = this
  Duplex.call(this)
  if (!WebSocket) throw new Error('I cant find a websocket here')

  // make it a ws:// 
  var parts = parse(url)
  parts.protocol = 'ws:'
  var uri = format(parts)

  this.ws = new WebSocket(uri)

  this.ws.onmessage = function(chunk) {
    self.push(chunk.data)
  }

  this.ws.onerror = function(err) {
    self.emit('error', err)
  }

  this.ws.onclose = function() {
    self.emit('end')
    self.emit('close')
  }

}

WebsocketStream.prototype._write = function(chunk, enc, cb) {
  //console.log(chunk.toString())
}

WebsocketStream.prototype._read = function(size) {
  // this can be a noop b/c
  // the ws message events are filling
  // the internal buffer
}

module.exports = function(path) {
  if (!path) throw new Error('must supply path')
  var url = parse(path).protocol ? path : resolve(window.location.href, path)
  return new WebsocketStream(url)
}
