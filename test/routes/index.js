var _router = require('express').Router();

_router.use('/test', function (_res, _req, _next) {
    _req.json({
        msg: "just for test!!"
    });
});

module.exports = _router;