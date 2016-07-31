var _socketIo = require('socket.io'),
    _gulp = require('gulp');

module.exports = function (_server) {
    var _io = _socketIo(_server);
    
    _io.on('connection', function (_socket) {
        console.log('IO Connected!!!');
    });
    
    _gulp.watch([
        '**'
    ], function () {
        _io.emit('reload');
    })
};