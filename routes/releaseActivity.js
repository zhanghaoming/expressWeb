var express=require('express');
var router=express.Router();
var fs = require('fs');
var formidable=require('formidable')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var Activity=require('./mymodule/classActivity');

router.post('/test',multipartMiddleware,function(req,res)
{
	console.log(req.body);
	console.log(req.files);
	if(req.session.user)
	{
		res.send(200);
	}
	else
	{
		res.send(404);
	}
})

router.post('/releaseActivtiy',multipartMiddleware,function(req, res)
{
	console.log(req.body);
	var storePath;
	if(!req.session.user)
	{
		res.redirect('/');
	}
	if(!Activity.init(req.body))
	{
		res.render('/activity');
	}
	//图片上传
	if(req.files.img.name=='')
	{
		storePath='/images/default_activity.jpg';
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
	        var avatarName = '/' + Date.now() + '.' + extName;
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

	    var insertSql="insert into activity(name,time,place,intro,type,img) values ("
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
	        	var insertRelease="insert into release_activity(account_id,activity_id) values ("
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

router.get('/release_activity',function(req,res)
{
	res.render('release_activity');
})
module.exports = router;