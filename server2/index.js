var _express = require('express'),
    _app = _express(),
    _path = require('path'),
    _server = require('http').createServer(_app),
    _io = require('./routes/io');

var _ftlRouter = require('./routes/ftl');

//服务器上存放的文件
_app.use('/server', _express.static(_path.join(__dirname, "..")));


_app.use(_express.static(process.cwd()));

_io(_server);

_app.use(_ftlRouter);

try{
   _app.use(require(_path.join(process.cwd(), "./routes/index"))); 
}
catch(_e) {
    console.warn(_e.message);
}

_server.listen(3000);

         
        