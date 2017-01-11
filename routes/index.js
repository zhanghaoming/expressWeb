var express = require('express');
var router = express.Router();
var mysql=require('mysql');
/* GET home page. */


router.get('/', function (req, res) {
    if(req.session.user)
    {
        res.redirect('/homepage');
        return ;
    }
  res.render('signin',
   {
        status:''
    });
});

module.exports = router;
