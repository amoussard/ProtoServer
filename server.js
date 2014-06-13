var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io').listen(8080);
var observers = [];

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var emitToObservers = function (event, data) {
    observers.forEach(function(observer) {
      observer.emit(event, data);
    });
};

io.on('connection', function(socket){
console.log('a user connected');
  socket.on('disconnect', function(){
console.log('user disconnected');
  });

  socket.on('connect_observer', function(){
console.log('connect_observer');
    observers.push(socket);
  });

  socket.on('connect_interface', function(){
console.log('connect_interface');

    socket.on('action_a', function(){
console.log('action A');
      emitToObservers('action_a');
    });

    socket.on('action_b', function(){
console.log('action B');
      emitToObservers('action_b');
    });

    socket.on('action_c', function(){
console.log('action C');
      emitToObservers('action_c');
    });
  });

  socket.emit('connection_ready');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
