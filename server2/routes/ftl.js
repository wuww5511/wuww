var _express = require('express'),
    _router = _express.Router(),
    _ftl = require('../../freemarker/index'),
    _path = require('path'),
     _cheerio = require('cheerio');

var _commonDataUrl = _path.join(process.cwd(), "./data/data.json");

_router.use(/\S+\.ftl/, function (_req, _res, _next) {
    var _dataUrl = _path.join(process.cwd(), "./data" + _req.originalUrl.slice(0, -3) + "json");
    var _commonData = _getJson(_commonDataUrl);
    console.log(_commonData);
    
    var _data = _getJson(_dataUrl);
    
    Object.assign(_commonData, _data);
    
    console.log(_commonData.title.charCodeAt(0));
    _commonData.title = "汉字";
    _commonData.test = "我是汉字";
    _ftl(process.cwd())._$render('ftl' + _req.originalUrl,
                                 _commonData,
                                 function (_err, _html) {
        if(_err) {
            _res.end(JSON.stringify(_err));
        }
        else {
            var _$ = _cheerio.load(_html);
            if(_$('body').length > 0) {
                _$('body').append('<script src="/server/autoreload/public/src/socket.io.js"></script><script src="/server/autoreload/public/src/main.js"></script>')
            }
            _res.setHeader("Content-Type", "text/html;charset=utf-8");
            _res.end(new Buffer(_$.html()));
        }
    });
});

function _getJson (_url) {
    try{
        delete require.cache[require.resolve(_url)];
        return require(_url);
    }
    catch(_e) {
        console.warn(_e.message);
        return {};
    }
}

module.exports = _router;