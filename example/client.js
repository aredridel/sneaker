

var sneaker = require('../')
var stream = sneaker('/yolo')
var through = require('through2')

stream.pipe(through(function(chunk, enc, cb) {
  addChild(chunk.toString())
  cb()
}))

stream.on('end', function() {
  console.log('this stream is over yo')
})

function addChild(text) {
  var div = document.createElement('div')
  div.innerText = text
  document.body.appendChild(div)
}




