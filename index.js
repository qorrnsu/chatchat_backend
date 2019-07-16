var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/build/'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', function(socket) {
    console.log("One user connected!");
    socket.on('chat message', function(msg) {
      console.log(msg);
      io.emit('chat message', msg);
    });
}); 

http.listen(3000, () => {
  console.log('listening on *:3000');
}); 
