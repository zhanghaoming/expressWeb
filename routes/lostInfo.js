//create by lgz
var express=require('express');
var router=express.Router();

router.get('/lostInfo', function (req, res) {
    var announce_id=req.session.announce_id;
    console.log('get activity err:' + announce_id);
    //var account_id=req.session.user_id;
    //var page=req.body.page;
    var selectSql="select announce_id,name,date_format(time,'%Y-%m-%d') as time,place,type,intro,gets,img,coord from lostFound where announce_id="+"'"+escape(announce_id)+"'";
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('get announce err:' + err) ;
            return ;
        }
        //console.log(result);
        if(result)
        {
            res.render('lost_detail',{lostInfo:result});
            req.session.reciver_id=result[0].announce_id;
        }
        else
        {
            //res.send('unknown account');
            res.render('error');
        }
    }) ;
});
router.post('/lostInfo', function(req, res) {
    //varA=req.body.activity_id;
    req.session.announce_id = req.body.announce_id;
    console.log(req.session.announce_id);
    res.send('ok');
});

module.exports = router;