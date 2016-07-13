var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use('/bower_components', express.static(path.join(__dirname, '..', 'bower_components')));
// app.use(express.static(path.join(__dirname, '..', 'bower_components')));
app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, '..', 'client/index.html'));
  // res.sendFile('/server/server.js')
})

io.on('connection', function(socket) {
  console.log('connected');
  socket.on('finishTest', function(winner) {
    console.log('finished in server');
    // io.emit('finishTest');
    console.log(winner);
    socket.broadcast.emit('finishTest', winner);
  });

  socket.on('startTest', function() {
    console.log('starting');
    socket.broadcast.emit('startTest');
  });

  socket.on('block', function() {
    console.log('blocking');
    socket.broadcast.emit('block');
  })

  socket.on('insertion', function() {
    console.log('inserting');
    socket.broadcast.emit('insertion');
  })
});

http.listen(process.env.PORT || 3000, function() {
  console.log('listening on 3000');
});