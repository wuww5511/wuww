var _express = require('express'),
    _app = _express(),
    _path = require('path'),
    _getView = require('../freemarker/index'),
    _ftl = _getView(process.cwd()),
    _ftlRouter = require('./routes/ftl'),
    _pathRouter = require('./routes/path'),
    _server = require('http').createServer(_app),
    _gulp = require('gulp'),
    Event = require('events');

var _io = require('socket.io')(_server);

var _event = new Event();

_io.on('connection', _onConnection);

_app.set('views', _path.join(__dirname, 'views'));

_app.set('view engine', 'ejs');

_app.use('/public', _express.static(_path.join(__dirname, '../public')));

_app.use(function (_req, _res, _next) {
    _res.__ftl = _ftl;
    _next();
});

_app.use(/\S+\.ftl/, _ftlRouter);

_app.use(_pathRouter);

_gulp.watch([
    '**'
], function () {
    _event.emit("change");
    
});


module.exports = function () {
    _server.listen(3000);
};

function _onConnection (_socket) {
    var _onChange = function () {
        _socket.emit('reload');
    };
    
    _event.on('change', _onChange);
    
    _socket.on('disconnect', function () {
        _event.removeListener('change', _onChange);
    });
}


