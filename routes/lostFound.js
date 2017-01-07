//create by lgz
var express=require('express');
var router=express.Router();

router.get('/lostFound', function (req, res) {
    console.log("test OK");
    //var page=req.session.lostFound_page;
    var page=1;
    var m=page-1;
    var n=(page-1)*10+9;
    //console.log("rows:",m,n);
    var selectSql="select announce_id,name,date_format(time,'%Y-%m-%d') as time,place,type,intro,get,img from lostFound order by time desc limit "+m+","+n;
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('get lostFound err:' + err) ;
            return ;
        }
        console.log(result);
        if(result)
        {
            res.render('lostFound',{lostFoundArr:result});
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