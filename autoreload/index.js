"use strict"

/**
 *  程序需要做的事情：
 *     http服务，提供JavaScript文件
 *     websocket服务，监听文件变化，向客户端发送reload消息 
 ***/
var _express = require('express');
var _app = _express();
var _server = require('http').createServer(_app),
    _gulp = require('gulp');

var Event = require('events');
var _gulp = require('gulp'),
    _concat = require('gulp-concat');
var _path = require('path');

module.exports = _watch;

function _watch (_p) {
    _port = _p || 3000;
    
    _server.listen(_port);
    
    console.log('listen on ' + _port);
    
    _gulp.watch(['**/*.css',
                 '**/*.js', 
                 '**/*.ftl', 
                 '**/*.html', 
                 '**/*.ejs'], 
                function () {
                    _event.emit('change');
                }
    );
    
    console.log('watch files');
    
    console.log("<script src='http://localhost:" + _port + "/public/dist/reload.js'></script>")
};

_watch.compress = function () {
    _compress();
}

var _event = new Event();

var _port = 0;

var _target = "";

var _io = require('socket.io')(_server);

_io.on('connection', _onConnection);

_app.use('/public', _express.static(_path.join(__dirname, 'public')));



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

function _compress () {
    console.log('begin:');
    var _arr = [];
    
    _arr.push(_path.join(__dirname, './public/src') + "/socket.io.js");
    _arr.push(_path.join(__dirname, './public/src') + "/main.js");
    
    _gulp.src(_arr)
        .pipe(_concat('reload.js'))
        .pipe(_gulp.dest(_path.join(__dirname, './public/dist/')));
    
    console.log('end!')
}