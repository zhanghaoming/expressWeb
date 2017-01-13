
/* GET users listing. */
var express=require('express');
var router=express.Router();
/*var mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost' ,
user : 'root' ,
password : 'zxcvbnm123' ,
database : 'test',
port:'3306'
});*/

router.post('/login',function(req,res)
{
	var data=req.body;
	//console.log(req.body);
	var selectSql = "select * from account where email="+"'"+escape(data.Username)+"'";
	globalConnection.query(selectSql,function(err,result,fields){
		if(err){
	  		console.log('getUserbyUsername err:' + err) ;
	  		return ;
	  	}
	  	if(result[0]) {
            if (result[0]['password'] == req.body.Password) {
                //cookie&session
                req.session.sign = true;
                req.session.user = req.body.Username;
                //console.log(result[0]);
                req.session.account_id = result[0]['account_id'];
                req.session.activity_page = 1;
                req.session.lostFound_page=1;
                req.session.type="found";

                res.cookie('user', req.body.Username, {
                    maxAge: 1000 * 1000, httpOnly: true
                });
                res.redirect("/homepage");
            }
          else
		  {
                res.render('signin',{status:"密码错误哦"});
          }
        }
        else
		{
            res.render('signin',{status:"用户不存在"});
		}
    });


})

router.get('/login', function (req, res) {
	if(req.session.user)
	{
		//console.log(req.session.account_id);
	    for(var key in req.cookies)
		{
			//console.log('cookie: '+key+' '+req.cookies[key]);
			
		}
		res.render('index',
		          	{
				        title:'fail',
				        message:'kk',
				        movie:[]
				    });
	}
	else
	{
		res.send('no session');
	}
    
})

router.get('/session',function(req,res,next)
{
	if(req.session.sign)
	{
	    for(var key in req.cookies)
		{
			//console.log('cookie: '+key+' '+req.cookies[key]);
		}
		res.send(req.session.user);
	}
	else
	{
		res.send('no session');
	}
})

router.get('/signout', function (req, res) {
    res.clearCookie();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
