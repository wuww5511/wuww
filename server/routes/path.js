var _express = require('express'),
    _router = _express.Router();

_router.get(/\S*/, function (_req, _res, _next) {
    _res.end(_req.originalUrl);
});

module.exports = _router;