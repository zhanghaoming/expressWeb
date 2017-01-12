//create by lgz
var express=require('express');
var router=express.Router();
//global.varA=0;
router.get('/activity', function (req, res) {
    //var activity_id=varA;
    var activity_id=req.session.activity_id;
    //console.log('get activity err:' + activity_id) ;
    //var account_id=req.session.user_id;
    //var page=req.body.page;
    var selectSql="select name,date_format(time,'%Y-%m-%d') as time,place,intro,type,num_people,img from activity where activity_id="+escape(activity_id);
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('get activity err:' + err) ;
            return ;
        }
        //console.log(result);
        if(result)
        {
            //res.render('activity',{activity:result});
            //res.render('homepage',{activity:"ok"});
            var activity_info=result;
            var selectSql="select content,comment_id,username from comment where activity_id="+escape(activity_id);
            globalConnection.query(selectSql,function(err,result,fields){
                if(err){
                    console.log('err:' + err) ;
                    return ;
                }
                //console.log(result);
                if(result)
                {
                    res.render('activity_detail',{activity:activity_info,comment:result});
                    //res.send("insert");
                }
                else
                {
                    //res.send('unknown account');
                    //res.render('error');
                    res.send("error");
                }
            }) ;
        }
        else
        {
            //res.send('unknown account');
            res.render('error');
        }
    }) ;
});
router.post('/activity', function(req, res) {
    //varA=req.body.activity_id;
    req.session.activity_id = req.body.activity_id;
    //console.log(req.session.activity_id);
    res.send('ok');
});

module.exports = router;