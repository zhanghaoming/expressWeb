var express = require('express');
var router = express.Router();
var mysql=require('mysql');
/* GET home page. */


router.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

router.get('/list', function(req, res){
   res.render('list',
   {
        title:'网站首页',
        movies:
        [
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
});




module.exports = router;