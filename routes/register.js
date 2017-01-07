var express = require('express');
var router = express.Router();
var registerProfile=require('./mymodule/classProfile');

router.get('/register',function(req,res){
	res.render('register',{title: 'come'});
})

router.post('/register',function(req,res){
	var info=req.body;
	

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
		  			res.render('register',{title: 'false'})
		  			console.log(err);
		  		}) ;
		  		return ;
		  	}
		  	if(result)
	        {
	        	console.log(result);
			}   
			res.render('register',{title: 'ok'})
		});
	}
	else
	{
		res.render('register',{title: 'incomplete information'});

	}
})


module.exports=router;