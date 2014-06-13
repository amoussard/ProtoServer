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

    socket.on('action_up', function(){
console.log('action UP');
      emitToObservers('action_up');
    });

    socket.on('action_down', function(){
console.log('action Down');
      emitToObservers('action_down');
    });

    socket.on('action_left', function(){
console.log('action Left');
      emitToObservers('action_left');
    });

    socket.on('action_right', function(){
console.log('action Right');
      emitToObservers('action_right');
    });
  });

  socket.emit('connection_ready');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
