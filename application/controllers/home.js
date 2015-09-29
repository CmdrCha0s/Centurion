var express = require('express');
var router = express.Router();

router.use("/", function(req, res, next){
    res.render("base-template", {
        config : req.config,
        meta : {description:""}
      }
    );
});

module.exports = router;