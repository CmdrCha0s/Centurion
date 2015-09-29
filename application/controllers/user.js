var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.use(function(req, res, next) {
	next();
})

router.post("/login",function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var rememberMe = req.body.rememberMe;

	req.session.loggedIn = true;

	var _state = "success";
	var _msg = "";
	var _url = "/home";
	res.json({ state: _state,
	 		   url: _url,
	 	       msg : _msg
	 	     });
})

module.exports = router;