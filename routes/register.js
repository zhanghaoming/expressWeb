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
		
		var insertAccount="insert into test.account (user,code) values (" 
		+ "'" + escape(registerProfile.Mail) 
		+ "'" 
		+ ","
		+ "'"
		+ escape(registerProfile.Code) 
		+ "');" ;
		console.log(insertAccount);
		globalConnection.query(insertAccount,function(err,result,fields){
			if(err){
		  		globalConnection.rollback(function(){
		  			console.log(err);
		  		}) ;
		  		return ;
		  	}
		  	if(result)
	        {
	        	console.log(result);
			}   
			var insertProfile="insert into test.profile (name,phone) values (" 
			+ "'" + escape(registerProfile.Name) 
			+ "'" 
			+ ","
			+ "'"
			+ escape(registerProfile.Phone) 
			+ "');";
			globalConnection.query(insertProfile,function(err,result,fields){
				if(err){
			  		globalConnection.rollback(
			  		function(){
			  			console.log(err);
			  		}) ;
			  		return ;
			  	}
			  	if(result)
		        {
		        	console.log(result.insertId);
		        	var insertRela=insertProfile="insert into account_profile (user,profile_id) values (" 
					+ "'" + escape(registerProfile.Mail) 
					+ "'" 
					+ ","
					+ "'"
					+ result.insertId
					+ "');";
					globalConnection.query(insertRela,function(err){
						if(err){
							globalConnection.rollback(
					  		function(){
					  			console.log(err);
					  		}) ;
					  		return ;
						}
					})
				}   
			}) ;
		});
	}

})


module.exports=router;