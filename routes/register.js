var express = require('express');
var router = express.Router();

var registerProfile=require('./mymodule/classProfile');

router.post('/register',function(req,res){
	var info=req.body;
	registerProfile.init(info);
	res.send(registerProfile.return_mail());
	/*globalConnection.query(selectSql,function(err,result,fields){
		if(err){
	  		console.log('getUserbyUsername err:' + err) ;
	  		return ;
	  	}
	  	if(result)
        {
          for(var i = 0; i < result.length; i++)
          {
              console.log("%s", result[i].code);
          }
          if(result[0]['code']==req.body.code)
          	res.render('index', { title: 'Hey', message: 'Hello there!'});
          else
          	res.send("fuck");
		}   
	}) ;*/
})


module.exports=router;