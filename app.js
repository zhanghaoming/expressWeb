var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var mysql = require('mysql');
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

app.use('/', index);
app.use('/users', users);
app.use(require('./routes/list'));

/*app.get('/list', function(req, res){
   res.render('list',
   {
        title:'网站首页',
        movies:[
            {
            _id:1,
            title:"海绵宝宝3D",
            poster: 'http://img31.mtime.cn/mg/2015/11/17/094620.70277104_170X256X4.jpg'
            },
            {
            _id:2,
            title:"星际迷航3",
            poster:'http://img31.mtime.cn/mg/2016/09/01/143653.31713698_170X256X4.jpg'
            },
            {
            _id:3,
            title:"惊天绑架团",
            poster:'http://img31.mtime.cn/mg/2016/07/12/091819.79722823_170X256X4.jpg'
            },
            {
            _id:4,
            title:"爱宠大机密",
            poster:'http://img31.mtime.cn/mg/2016/06/21/093149.12209704_170X256X4.jpg'
            },
            {_id:5,
            title:"冰川时代4",
            poster:'http://img31.mtime.cn/mt/2012/07/19/131845.38602455_170X256X4.jpg'
            }
        ]
    });
});*/

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
