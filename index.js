var _autoReload = require('./autoreload/index'),
    _getFtlView = require('./freemarker');

exports.arWatch = _autoReload;

exports.arCompress = _autoReload.compress;

exports.getFtlView = _getFtlView;