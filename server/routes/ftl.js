var _express = require('express'),
    _router = _express.Router(),
    _path = require('path'),
    _cheerio = require('cheerio');

_router.use(function (_req, _res, _next) {
    var _commonDataFile = _path.join(process.cwd(), 'data.json');
    
    var _file = _req.originalUrl.slice(1),
        _dataFile = _path.join(process.cwd(), _file.slice(0, -3) + "json");
    
    var _commonData = {};
    
    var _data = {};
    
    try{
        delete require.cache[require.resolve(_commonDataFile)];
        _commonData = require(_commonDataFile);
    }
    catch(e){
        console.warn("warn:%s", e.message);
    }
    
    try{
        delete require.cache[require.resolve(_dataFile)];
        _data = require(_dataFile);
    }catch(e){
        console.warn('warn:%s', e.message)
    }
    
    Object.assign(_data, _commonData);
     
    _res.__ftl._$render(_file, _data, function (_err, _html) {
        if(_err){
            _res.end(_err);
            return;
        }
        
        var _$ = _cheerio.load(_html);
        
        _$("head")[0] && _$("head").append("<script src='/public/reload.js'></script>");
        
        _res.end(_$.html());
            
        
    });
});

module.exports = _router;