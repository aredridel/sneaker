

var fakestream = require('fakestream')(10)
var http = require('http')
var ecstatic = require('ecstatic')(__dirname)
var server = http.createServer(ecstatic)
server.listen(3000)

var sneaker = require('../')

sneaker(server, function(stream) {

  fakestream.pipe(stream)

  setTimeout(function() {
    stream.end()
  }, 1000)

})




