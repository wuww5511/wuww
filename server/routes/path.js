var _express = require('express'),
    _router = _express.Router();

_router.get("/", function (_req, _res, _next) {
    //_res.end(_req.originalUrl);
    _next();
});

module.exports = _router;