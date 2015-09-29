var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLess = require('express-less');
var DbClient = require('mariasql');

var app = express();

var router = require('./application/config/router');
var config = require('./application/config/config');

var dbClient = new DbClient({
  host: '127.0.0.1',
  user: 'centDbUser',
  password: '1234',
  db: 'centurion'
});

app.use(express.static(__dirname + '/application'));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());

app.set('trust proxy', 1); // trust first proxy

app.use(session({
  secret: '|&bOk5Xa+7LIRNNN-[f>Lf>9,.rj07n^o[,mY|t*BT[?(@*>,G3CiZfSI=rdi$=A)',
  resave: false,
  saveUninitialized: true
  //cookie: { secure: true }
}));

app.use('/style/less', expressLess(__dirname + '/less', { debug: config.application.env === 'development' }));
app.set('views', __dirname + config.application.views);
app.set('view engine', 'jade');
app.set('env', config.application.env);

app.use(function(req,res,next){
	req.dbClient = dbClient;
    req.config = config; 
    next();
});

app.use('/', router); 

app.listen(80);