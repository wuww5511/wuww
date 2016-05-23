var _url = "";

var _scripts = document.getElementsByTagName('script');

var _reg = /^(\S*)\/public\/dist\/reload.js/;

for(var _i = 0; _i < _scripts.length; _i++) {
    if(_reg.test(_scripts[_i].src)){
        _url = RegExp.$1;
        break;
    }
}

console.log(_url);

var _socket = io(_url);
    
_socket.on('reload', function () {
    location.reload(true);
});