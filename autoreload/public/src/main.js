var _socket = io("http://localhost:3000");
    
_socket.on('reload', function () {
    location.reload(true);
});