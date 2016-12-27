
/* GET users listing. */
var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var connection = mysql.createConnection({
	host : 'localhost' ,
	user : 'root' ,
	password : 'zxcvbnm123' ,
	database : 'test',
	port:'3306'
});

router.post('/login',function(req,res)
{
	var data=req.body;
	for(var key in req.cookies)
	{
		console.log(key);
		console.log(req.cookies[key]);
	}
	console.log(escape(data.name));
	var selectSql = "select code from codestore where user="+"'"+escape(data.name)+"'";
	connection.query(selectSql,function(err,result,fields){
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
          	res.send("ok");
          else
          	res.send("fuck");
		}   
	}) ;
	connection.end();
})

module.exports = router;
