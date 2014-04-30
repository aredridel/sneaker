
var resolve = require('url').resolve
var parse = require('url').parse
var format = require('url').format

// should be own file

var Duplex = require('stream').Duplex
var inherits = require('util').inherits
inherits(WebsocketStream, Duplex)

function WebsocketStream(url) {

  var self = this
  Duplex.call(this)
  if (!WebSocket) throw new Error('I cant find a websocket here')

  // naive internal buffer
  // can we put this elsewhere? indexedDB?
  // should we pass in a max buffer size?

  this._buffer = []
  this._max = 10

  // make it a ws:// 
  var parts = parse(url)
  parts.protocol = 'ws:'
  var uri = format(parts)

  this.ws = new WebSocket(uri)

  this.ws.onmessage = function(chunk) {
    self.push(chunk.data)
    // TODO: buffer here
  }

}

WebsocketStream.prototype._write = function(chunk, enc, cb) {
  console.error('duplex not implemented')
}


WebsocketStream.prototype._read = function(size) {
  // TODO: read from buffer here
}

module.exports = function(path) {
  if (!path) throw new Error('must supply path')
  var url = parse(path).protocol ? path : resolve(window.location.href, path)
  return new WebsocketStream(url)
}
