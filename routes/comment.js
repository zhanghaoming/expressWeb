//create by lgz
var express=require('express');
var router=express.Router();

router.post('/comment', function (req, res) {
    var activity_id=req.session.activity_id;
    var account_id=req.session.account_id;
    var content=req.body.content;
    var name=req.session.user;
    var insertSql="insert into comment(content,activity_id,account_id,username) value("+"'"+content+"'"+","+activity_id+","+account_id+","+"'"+name+"'"+")";
    globalConnection.query(insertSql,function(err,result,fields){
        if(err){
            console.log('insert into comment err:' + err) ;
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