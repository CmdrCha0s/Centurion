var express = require('express');
var express = require('../models/user');

var router = express.Router();

router.post("/login", function(req, res, next){
    res.render("admin-base-template", {
        config : req.config,
      }
    );
});

router.use(function(req, res, next) {
    res.render("admin-base-template", {
    	loggedIn : false,
    	user: {},
        config : req.config,
      }
    );
})

module.exports = router;