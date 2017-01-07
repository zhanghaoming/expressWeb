//create by lgz
var express=require('express');
var router=express.Router();

router.get('/activity', function (req, res) {
    var activity_id=req.body.activity_id;
    //var account_id=req.session.user_id;
    var page=req.body.page;
    var selectSql="select name,time,place,intro,type,num_people,img from activity where activity_id="+activity_id;
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('get activity err:' + err) ;
            return ;
        }
        console.log(result);
        if(result)
        {
            //res.render('activity',{activity:result});
            //res.render('homepage',{activity:"ok"});
            var activity_info=result;
            var selectSql="select content,comment_id, from activity where activity_id="+activity_id;
            globalConnection.query(selectSql,function(err,result,fields){
                if(err){
                    console.log('err:' + err) ;
                    return ;
                }
                console.log(result);
                if(result)
                {
                    //res.render('homepage',{activityArr:result});
                    res.render('homepage',{activity:activity_info,comment:result});
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

router.post('/activity', function (req, res) {
    //var activity_id=req.body.activity_id;
    //var account_id=req.session.user_id;
    //var page=req.body.page;
    var account_id=req.session.user_id;
    var name=req.body.body.name;
    var time=req.body.body.place;
    var intro=req.body.body.intro;
    var type=req.body.body.type;
    var num_people=req.body.body.num_people;
    var img=req.body.body.img;
    var insertSql="insert into activity(name,time,place,intro,type,num_people,img) value("
        +"'"+name+"'"+","
        +"'"+time+"'"+","
        +"'"+intro+"'"+","
        +"'"+type+"'"+","
        +num_people+","
        +"'"+img+"'"+")";
    globalConnection.query(insertSql,function(err,result,fields){
        if(err){
            console.log('get activity err:' + err) ;
            return ;
        }
        console.log(result);
        if(result)
        {
            //res.render('activity',{activity:result});
            //res.render('homepage',{activity:"ok"});
            var selectSql="select activity_id from activity order by time asc limit 1";
            globalConnection.query(selectSql,function(err,result,fields){
                if(err){
                    console.log('get activity err:' + err) ;
                    return ;
                }
                console.log(result);
                if(result)
                {
                    var activity_id=result[0].activity_id;
                    var insertSql="insert into release_activity(account_id,activity_id) value("+account_id+","+activity_id+")";
                    globalConnection.query(insertSql,function(err,result,fields){
                        if(err){
                            console.log('get activity err:' + err) ;
                            return ;
                        }
                        if(result)
                        {
                            res.send("insertOK");
                        }
                    });
                }
                else
                {
                    //res.send('unknown account');
                    res.render('error');
                }
            }) ;
        }
        else
        {
            //res.send('unknown account');
            //res.render('error');
        }
    }) ;
});

module.exports = router;