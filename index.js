

var WebSocket = require('ws')
var WebSocketServer = WebSocket.Server

exports = module.exports = function(cb) {
  var wss = new WebSocketServer({port: 3000})
  wss.on('connection', function(con) {
    cb(con)
  })
}










