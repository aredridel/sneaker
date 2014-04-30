

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

    //if (!self._buffer.length) {
      //self.push(chunk.data)
      //self._buffer.push(chunk.data)
    //}
    //self._buffer.push(chunk.data)

  }


  
}

//WebsocketStream.prototype._write = function(chunk, enc, cb) {
  //console.log('wwrite')
//}

var counter = 5

WebsocketStream.prototype._read = function(size) {

  console.log('read call')

  var chunk = this._buffer.pop()

  if (chunk) {
    this.push(chunk)
  }

}

/*WebsocketStream.prototype._pause = function() {*/
  //console.log('pause implementation')
/*}*/


module.exports = function(path) {
  if (!path) throw new Error('must supply path')
  var url = parse(path).protocol ? path : resolve(window.location.href, path)
  return new WebsocketStream(url)
}
