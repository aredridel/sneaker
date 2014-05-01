sneaker
=======

shoe's older, hipper estranged cousin

### server

```javascript
var sneaker = require('../')

sneaker(anHttpServer, function(stream) {
  fakestream.pipe(stream)
})
```

### browser

```javascript
var sneaker = require('sneaker')
var websocket = sneaker('/yolo')

websocket.on('readable', function() {
	var chunk = this.read()
	doSomethingAmazing(chunk)
})
```

### install

`npm install sneaker`

wut? why?

[shoe](https://github.com/substack/shoe) is a solid streaming websocket wrapper. I like the way it is set up but almost never need the heavy sockjs fallbacks. It also doesn't deliver a very smart stream to the client. 

[websocket stream](https://github.com/maxogden/websocket-stream) is also great, but it returns a classic style stream (via the `through` module) which doesn't have goodies like the `read()` method, which I like. Thus, here we are. Another websocket streaming wrapper. njoy!

more why: I had a specific use case where I wanted to point a really big stream
to my client. I wanted that client to be able to bit off peices in
a pagination sort of way. In this case streams2 api was compelling for flow
control. I found most of the existing websocket wrappers to be lacking in
this dimension

