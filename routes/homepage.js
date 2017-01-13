//create by lgz
var express=require('express');
var router=express.Router();
//req.session.comment_page=1;

router.get('/homepage', function (req, res) {
    if(req.session.sign)
    {
        var selectSql="select * from activity";
        globalConnection.query(selectSql,function(err,result,fields){
            if(err){
                console.log('get activity err:' + err) ;
                return ;
            }
            //console.log(result);
            if(result)
            {
                var count=Math.ceil(result.length/10);
                var page=req.session.activity_page;
                //var page=1;
                var m=page*10-10;
                var n=(page-1)*10+9;
                //console.log("rows:",m,n);
                var selectSql="select activity_id,name,date_format(time,'%Y-%m-%d') as time,place,type,intro,img from activity order by time desc limit "+m+","+n;
                globalConnection.query(selectSql,function(err,result,fields){
                    if(err){
                        console.log('get activity err:' + err) ;
                        return ;
                    }
                    //console.log(result);
                    if(result)
                    {
                        res.render('home',{activityArr:result,page:page,count:count});
                        //res.render('homepage',{activity:"ok"});
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
                res.render('error');
            }
        }) ;
    }
    else
    {
        res.redirect('/');
    }
});

router.post('/homepage', function (req, res) {
    req.session.activity_page=req.body.page;
    res.send("ok");
});

module.exports = router;