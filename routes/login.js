
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
	console.log(req.body);
	var selectSql = "select password from account where email="+"'"+escape(data.name)+"'";
	globalConnection.query(selectSql,function(err,result,fields){
		if(err){
	  		console.log('getUserbyUsername err:' + err) ;
	  		return ;
	  	}
	  	console.log(result);
	  	if(result[0])
        {
          for(var i = 0; i < result.length; i++)
          {
              console.log(JSON.stringify(result));
          }
          if(result[0]['password']==req.body.code)
          {
          	//cookie&session
          	req.session.sign=true;
          	req.session.user=req.body.name;

          	res.cookie('user', req.body.name, {
				maxAge:1000*1000,  httpOnly:true
			});

          	
          	var selectSql='select * from activity';

          	globalConnection.query(selectSql,function(err,result){
          		if(err)
          		{
          			res.render('home',
		          	{
				        activityArr:[]
				    });
          		}
        		var data=result;
        		console.log(data);
        		//此处应该返回data
          		res.render('home',
	          	{
			        activityArr:[]
			    });
          	})
          	
          }
          else
          {
          		res.render('home',
	          	{
			        activityArr:[]
			    });
          }
		}   
		else
		{
			res.send('unknown account');
		}
	}) ;
})

router.get('/login', function (req, res) {
	if(req.session.user)
	{
	    for(var key in req.cookies)
		{
			console.log('cookie: '+key+' '+req.cookies[key]);
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
			console.log('cookie: '+key+' '+req.cookies[key]);
		}
		res.send(req.session.user);
	}
	else
	{
		res.send('no session');
	}
})
module.exports = router;
