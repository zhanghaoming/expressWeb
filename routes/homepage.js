//create by lgz
var express=require('express');
var router=express.Router();

router.get('/homepage', function (req, res) {
    console.log("test OK");
    var page=req.body.page;
    //var page=1;
    var m=page-1;
    var n=(page-1)*10+9;
    console.log("rows:",m,n);
    var selectSql="select activity_id,name,time,place,type,img from activity order by time asc limit "+m+","+n;
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('get activity err:' + err) ;
            return ;
        }
        console.log(result);
        if(result)
        {
            res.render('homepage',{activityArr:result});
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