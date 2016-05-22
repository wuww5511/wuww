"use strict"

/**
 *  程序需要做的事情：
 *     http服务，提供JavaScript文件
 *     websocket服务，监听文件变化，向客户端发送reload消息 
 ***/
var _express = require('express');
var _app = _express();
var _server = require('http').createServer(_app);

var Event = require('events');
var _gulp = require('gulp');
var _path = require('path');

module.exports = function (_port) {
    _server.listen(_port || 3000);
};

var _event = new Event();

_app.use('/public', _express.static(_path.join(__dirname, 'public')));

_app.use('/', function (_req, _res, _next) {
    
   _res.write("<script src='http://localhost:3000/public/src/socket.io.js'></script>");
    _res.write("<script src='http://localhost:3000/public/src/main.js'></script>");
    _res.end();
});

var _io = require('socket.io')(_server);

_io.on('connection', _onConnection);


_gulp.watch('**', function () {
    _event.emit('change');
});




function _onConnection (_socket) {
    
    _socket.emit('accepted');
    
    var _onChange = function () {
        _socket.emit('reload');
    };
    
    _event.on('change', _onChange);
    
    _socket.on('discount', function () {
        _event.removeListener('change', _onChange);
    });
}