var express=require('express');
var router=express.Router();
var fs = require('fs');
var formidable=require('formidable')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


router.post('/testa',multipartMiddleware,function(req,res)
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
  //       fs.renameSync(req.files.img.path, newPath, function(err) {
		// if(err){
		// 	throw err;
		// }
		// //删除临时文件
		// fs.unlink(req.files.img.path, function(){
		// 	if(err) {
		// 		throw err;
		// 	}
		// 	//将当前的用户写到会话中
		// 	req.session.user = currentUser;
		// 	/*req.flash('path', targetPath);*/
		// 	res.send(200);
		// 	})
		// }); //重命名

		var readStream=fs.createReadStream(req.files.img.path);
        var writeStream=fs.createWriteStream(newPath);
        readStream.pipe(writeStream);
        readStream.on('end',function(){
        fs.unlinkSync(req.files.img.path);
        });
     
    }

})

router.get('/activity',function(req,res)
{
	res.render('release_activity');
})
module.exports = router;