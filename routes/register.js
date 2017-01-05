var express = require('express');
var router = express.Router();
var registerProfile=require('./mymodule/classProfile');

router.get('/register',function(req,res){
	res.render('register',{title: 'come'});
})

router.post('/register',function(req,res){
	var info=req.body;
	res.render('register',{title: 'come'})

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
		  			console.log(err);
		  		}) ;
		  		return ;
		  	}
		  	if(result)
	        {
	        	console.log(result);
			}   
			
		});
	}
})


module.exports=router;