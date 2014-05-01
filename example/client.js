


var sneaker = require('../')
var stream = sneaker('/yolo')
var through = require('through2')

// the .read() way

stream.on('readable', function() {
  var self = this
  console.log('readable is fired')
  // read n chars
  setTimeout(function() {
    var chunk = self.read(8)
    addChild(chunk.toString())
  }, 400)

})

stream.on('end', function() {
  console.log('this stream is over yo')
})


function addChild(text) {
  var div = document.createElement('div')
  div.innerText = text
  document.body.appendChild(div)
}




