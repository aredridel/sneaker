sneaker
=======

a different take on shoe.

tldr; a streams2 analog of shoe 

wut? why?

[shoe](https://github.com/substack/shoe) is a solid streaming websocket wrapper. I like the way it is set up but almost never need the heavy sockjs fallbacks. It also doesn't deliver a very smart stream to the client. 

[websocket stream](https://github.com/maxogden/websocket-stream) is also great, but it returns a classic style stream (via the `through` module) which doesn't have goodies like the `read()` method, which I like. Thus, here we are. Another websocket streaming wrapper. njoy!

more why: I had a specific use case where I wanted to point a really big stream
to my client. I wanted that client to be able to bit off peices in
a pagination sort of way. In this case streams2 api was compelling for flow
control. I found most of the existing websocket wrappers to be lacking in
this dimension

### server

```
var http = require('http')
var ecstatic = require('ecstatic')(__dirname)
var server = http.createServer(ecstatic)
server.listen(3000)

var sneaker = require('sneaker')

var websocket = sneaker(function(stream) {

})

websocket.install(server, '/yolo')
```

### browser

```
var sneaker = require('sneaker')
var websocket = sneaker('/yolo')

websocket.on('readable', function() {
	var chunk = this.read()
	doSomethingAmazing(chunk)
})

```

### rpc style

todo

### withreconnect

todo


### install

`npm install sneaker`

### wacky idea

it might be pretty easy to use indexedDB inside of the readable stream
implementation to make a larger(r) local cache of the stream.
This might be really cool in some cases....

could also be interesting to package this as a multilevel adapter 

