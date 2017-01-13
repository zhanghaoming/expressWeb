//create by lgz
var express=require('express');
var router=express.Router();

router.post('/rankList/:email', function (req, res) {
    var email=req.params.email;
    console.log("email:",email);
    var selectSql="select activity_id,name,date_format(time,'%Y-%m-%d') as time,place,type,intro,img from activity order by time desc limit "+m+","+n;
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('get activity err:' + err) ;
            return ;
        }
        //console.log(result);
        if(result)
        {
            res.render('home',{activityArr:result});
            //res.render('homepage',{activity:"ok"});
        }
        else
        {
            //res.send('unknown account');
            res.render('error');
        }
    }) ;
});

module.exports = router;