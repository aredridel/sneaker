
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

  // make it a ws:// 
  var parts = parse(url)
  parts.protocol = 'ws:'
  var uri = format(parts)

  this.ws = new WebSocket(uri)

  this.ws.onmessage = function(chunk) {
    // this makes the stream usable
    // but fires a bunch of readable events
    // we need a way to fill the internal buffer appropriately
    self.push(chunk.data)
  }

  this.ws.onerror = function(err) {
    self.emit('error', err)
  }

  this.ws.onclose = function() {
    self.emit('end')
  }

}

WebsocketStream.prototype._write = function(chunk, enc, cb) {
  console.error('duplex not implemented')
}

// this case is unique b/c the underlying source
// aka the websocket stream can't be read immediately
// thus, we can start pulling from the buffer until
// we have something

WebsocketStream.prototype._read = function(size) {
  console.log('read!')
  //this.push(null)
  //var chunk = this._buffer.pop()
  // TODO: read from buffer here
}

module.exports = function(path) {
  if (!path) throw new Error('must supply path')
  var url = parse(path).protocol ? path : resolve(window.location.href, path)
  return new WebsocketStream(url)
}
