

var fakestream = require('fakestream')(500)
var http = require('http')
var ecstatic = require('ecstatic')(__dirname)
var server = http.createServer(ecstatic)
server.listen(3000)

var sneaker = require('../')

sneaker(server, function(stream) {

  var count = 0

  setInterval(function() {
    stream.write(count++ + ' from ws server')
  }, 50)

  setTimeout(function() {
    stream.end()
  }, 3000)


})




