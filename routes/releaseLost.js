var express=require('express');
var router=express.Router();
var fs = require('fs');
var formidable=require('formidable')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var Activity=require('./mymodule/classLost');

router.post('/releaseLost',multipartMiddleware,function(req, res)
{
	var storePath;
	if(!req.session.user)
	{
		res.redirect('/');
	}
	if(!Activity.init(req.body))
	{
		////////////////////////
		res.render('/activity');
	}
	//图片上传
	if(req.files.img.name=='')
	{
		storePath='/images/default_lost.jpg';
	}
	else
	{
	    var cacheFolder = 'public/images/upload/';
	    var currentUser = req.session.user;
	    var userDirPath =cacheFolder+currentUser;
	    if (!fs.existsSync(userDirPath)) 
	    {
	        fs.mkdirSync(userDirPath);
	    }
	    var displayUrl;
	    console.log(req.files.img.type);
	    var extName = ''; //后缀名
	    switch (req.files.img.type) 
	    {
	        case 'image/pjpeg':
	            extName = 'jpg';
	            break;
	        case 'image/jpeg':
	            extName = 'jpg';
	            break;
	        case 'image/png':
	            extName = 'png';
	            break;
	        case 'image/x-png':
	            extName = 'png';
	            break;
	    }
	    if (extName.length === 0) 
	    {
	        res.send({
	            code: 202,
	            msg: '只支持png和jpg格式图片'
	        });
	        return;
	    }
	    else
	    {
	        var avatarName = '/lf' + Date.now() + '.' + extName;
	        var newPath = userDirPath + avatarName;
	        displayUrl = currentUser + avatarName;

			var readStream=fs.createReadStream(req.files.img.path);
	        var writeStream=fs.createWriteStream(newPath);
	        readStream.pipe(writeStream);
	        readStream.on('end',function(){
	        fs.unlinkSync(req.files.img.path);
	        });
	     	storePath='/images/upload/'+currentUser+avatarName;
	    }

	    var insertSql="insert into lostFound(name,time,place,intro,type,img) values ("
	    + "'" + escape(Activity.Name) 
		+ "'" 
		+ ","
		+ "'" + escape(Activity.Time) 
		+ "'" 
		+ ","
		+ "'" + escape(Activity.Place) 
		+ "'" 
		+ ","
		+ "'" + escape(Activity.Intro) 
		+ "'" 
		+ ","
		+ "'" + escape(Activity.Type) 
		+ "'" 
		+ ","
		+ "'" + storePath 
		+ "'" 
		+ ");"
		console.log(insertSql);
		globalConnection.query(insertSql,function(err,result,fields){
			if(err)
			{
		  		globalConnection.rollback(function()
		  		{
		  			res.send(404);
		  			console.log(err);
		  		}) ;
		  		return ;
		  	}
		  	if(result)
	        {
	        	var insertRelease="insert into release_lost(account_id,announce_id) values ("
			    + "'" + req.session.account_id
				+ "'" 
				+ ","
	        	+ "'" + result.insertId 
				+ "'" 
				+ ");"
				globalConnection.query(insertRelease,function(err)
				{
					if(err)
					{
						globalConnection.rollback(function()
				  		{
				  			res.send(404);
				  			console.log(err);
				  		}) ;
				  		return ;
					}
				})
			}   
			res.sendStatus(200);
		});
	}
})

router.get('/release_lost',function(req,res)
{
	res.render('release_lost');
})
module.exports = router;