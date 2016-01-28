var express = require('express');
var app = express();
var server = require('http').createServer(app);

// MongoDB
// ------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:20000/test,mongodb://localhost:20001/test,mongodb://localhost:20002/test', function() {
  console.log('mongodb connected');
});
var ChattingModel = mongoose.model('Chatting', {
  msg: { type: String, require: true },
  date:{ type: Date,   require: true, default: Date.now }
});

// Redis
// ------------------------------
var redis = require('redis');
var subscriber = redis.createClient();
var publisher = redis.createClient();

// Socket.io
// ------------------------------
var io = require('socket.io')(server);
io.on('connection', function (socket) {
  console.log('socket connected');

  subscriber.subscribe('chat');

  // Socket 첫 접속 시
  ChattingModel.find({}, function (err, docs) {
    socket.emit('socket_on', docs);
  });

  socket.on('message', function (row_msg) {
    var msg = JSON.parse(row_msg);

    var chatting = new ChattingModel();
    chatting.msg = msg.message;
    chatting.save(function(err) {
      if (err) return handlError(err);
    })

    publisher.publish('chat', msg.message);
  });

  subscriber.on('message', function (channel, message) {
    socket.emit('message_go', message);
  });

});
io.on('close', function (socket) {
  console.log('socket closed');

  subscriber.unsubscriber();
  subscriber.close();
  publisher.close();
});

// 실행경로
// ------------------------------
app.get('/', function (req, res) {
  res.sendfile('public/index.html');
})

// 서버 :3000 포트로 시작
// ------------------------------
server.listen(3000);
