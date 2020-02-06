'use strict'

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola mundo desde una ruta');
});

var message = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS',
    nickname: 'Bot - Juan' 
}];

io.on('connection', function(socket){
    console.log("El cliente con IP: "+socket.handshake.address+", se ha conectado.");
    
    socket.emit('message', message);

    socket.on('add-message', function(data){
        message.push(data);
        io.sockets.emit('message', message);
    });
});

server.listen(6677, function(){
    console.log('Servidor funcionando en http://localhost:6677');
});