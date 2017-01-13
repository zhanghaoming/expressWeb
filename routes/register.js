var express = require('express');
var router = express.Router();
var registerProfile=require('./mymodule/classProfile');

router.get('/register',function(req,res){
	res.render('signup',{
		status:''
	});
})

router.post('/register',function(req,res){
	var info=req.body;
	console.log(req.body);

	if(req.body.code!=req.body.code2)
	{
		res.render('signup',{status: '两次密码不匹配!'});
		return;
	}
	if(registerProfile.init(info))
	{
		/*res.send(registerProfile.Mail);*/
		
		var insertAccount="insert into account (email,password,account_name,tel,credit) values (" 
		+ "'" + escape(registerProfile.Email) 
		+ "'" 
		+ ","
		+ "'" + escape(registerProfile.Password) 
		+ "'" 
		+ ","
		+ "'" + escape(registerProfile.Name) 
		+ "'" 
		+ ","
		+ "'"
		+ escape(registerProfile.Tel) 
		+ "'"
		+ ","
		+ '0'
		+ ");" ;
		console.log(insertAccount);
		globalConnection.query(insertAccount,function(err,result,fields){
			if(err)
			{
		  		globalConnection.rollback(function()
		  		{
		  			res.render('signup',{status: '该邮箱已被注册!'});
		  			console.log(err);
		  		}) ;
		  		return ;
		  	}
		  	if(result)
	        {
	        	console.log(result);
			}   
			res.redirect('/');
		});
	}
	else
	{
		res.render('signup',{status: '用户信息不完整!'});
	}
})


module.exports=router;