var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');

global.homePath = __dirname;
process.env.HOME_PATH = __dirname;

var sessionChecking = require('./routes/sessionChecking');
var sessionAction = require('./routes/sessionAction');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('sessionid'));
app.use(session({
    secret: 'sessionid',//与cookieParser中的一致
    resave: true,//每次请求都重新设置session cookie
    saveUninitialized:true//无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
	}));

/*
*   请求静态资源
*/
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
// app.use('/users', users);


/*
*	自定义，要加在静态请求的前面，因为路由后或请求静态资源后，一次请求响
*	应的生命周期实质上已经结束，加在这后面进行请求处理，没有任何意义。
*/
app.use(sessionChecking);
app.use(sessionAction);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
