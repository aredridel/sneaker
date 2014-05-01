

var sneaker = require('../')
var stream = sneaker('/yolo')
var through = require('through2')

//stream.pipe(through(function(chunk, enc, cb) {
  //addChild(chunk.toString())
  //cb()
//}))


setInterval(function() {
  var chunk = stream.read(100)
  chunk = chunk || 'empty'
  console.log(chunk.toString())
  console.log(stream._readableState.buffer.length)
}, 500)

stream.on('end', function() {
  console.log('this stream is over yo')
})

stream.on('drain', function() {
  console.log('drain has been called@@@@###')
})

function addChild(text) {
  var div = document.createElement('div')
  div.innerText = text
  document.body.appendChild(div)
}




