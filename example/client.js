


var sneaker = require('../')
var stream = sneaker('/yolo')
var through = require('through2')


// classic way

stream.on('data', function(chunk) {
  addChild(chunk.toString())
})

//setTimeout(function() {
  //console.log('calling client pause')
  //stream.pause()
//}, 500)

// the .read() way

//stream.on('readable', function() {
  //// read n chars
  //var chunk = this.read(8)
  //addChild(chunk.toString())
//})

// the 'flowing' way (disables the read() method)

/*stream.pipe(through(function(chunk, enc, cb) {*/
  //console.log('chunk!')
  //console.log(chunk.toString())
  //document.body.innerHTML = chunk.toString()
  //setTimeout(cb, 1000)
/*}))*/

//var ts = through(function(chunk, enc, cb) {

//})

//ts.pause()

//console.log(ts)

function addChild(text) {
  var div = document.createElement('div')
  div.innerText = text
  document.body.appendChild(div)
}




