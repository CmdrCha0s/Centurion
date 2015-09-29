var express = require('express');
var router = express.Router();

router.use('/admin', require('../controllers/admin'));
router.use('/', require('../controllers/home'));

router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        application : req.application,
        path : req.path,
        message: err.message,
        error: {}
    });
});

module.exports = router;