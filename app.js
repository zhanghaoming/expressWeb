var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(express.static('public'));

var mysql = require('mysql');
global.globalConnection=mysql.createConnection({
	host : '123.206.191.216' ,
	user : 'user1' ,
	password : '123456' ,
	database : 'software2016',
	port:'3306'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
resave: true, // don't save session if unmodified
saveUninitialized: false, // don't create session until something stored
secret: 'zdagfagfad'
}));

app.use('/', index);
//app.use('/users', users);
app.use(require('./routes/login'));
app.use(require('./routes/register'));


//lgz's here
app.use(require('./routes/homepage'));
app.use(require('./routes/activity'));
app.use(require('./routes/comment'));
app.use(require('./routes/lostFound'));
app.use(require('./routes/message'));
app.use(require('./routes/lostInfo'));

app.use(require('./routes/releaseActivity'));
app.use(require('./routes/releaseLost'));
app.use(require('./routes/activityDetail'));
app.use(require('./routes/personal'));
app.use(require('./routes/history'));

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

app.listen(3000,function(){
    console.log("请访问http://localhost:3000");
});

module.exports = app;
