//create by lgz
var express=require('express');
var router=express.Router();

router.post('/message', function (req, res) {
    //var announce_id=req.session.announce_id;
    var sender_id=req.session.account_id;
    var reciver_id=req.session.reciver_id;
    var content=req.body.content;
    var sender_name=req.session.user;
    var insertSql="insert into message(content,sender_id,receiver_id,sender_name) value("+"'"+escape(content)+"'"+","+escape(sender_id)+","+escape(reciver_id)+","+"'"+escape(sender_name)+"'"+")";
    globalConnection.query(insertSql,function(err,result,fields){
        if(err){
            console.log('insert into message err:' + err) ;
            return ;
        }
        console.log(result);
        if(result)
        {
            //res.render('homepage',{activityArr:result});
            //res.render('homepage',{activity:"ok"});
            res.send("insert");
        }
        else
        {
            //res.send('unknown account');
            //res.render('error');
            res.send("error");
        }
    }) ;
});

module.exports = router;