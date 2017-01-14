//create by lgz
var express=require('express');
var router=express.Router();

router.get('/lostFound', function (req, res) {
    if (req.session.sign) {
        var selectSql="select * from lostFound where gets='NO'";
        globalConnection.query(selectSql,function(err,result,fields){
            if(err){
                console.log('get activity err:' + err) ;
                return ;
            }
            //console.log(result);
            if(result)
            {
                var count=Math.ceil(result.length/10);
                var page=req.session.lostFound_page;
                var page=req.session.lostFound_page;
                var m = page*10 - 10;
                var n = (page - 1) * 10 + 10;
                var type=req.session.type;
                var selectSql = "select announce_id,name,date_format(time,'%Y-%m-%d') as time,place,type,intro,gets,img from lostFound where type="+"'"+type+"'"+" and gets='NO' order by time desc limit " + m + "," + n;
                globalConnection.query(selectSql, function (err, result, fields) {
                    if (err) {
                        console.log('get lostFound err:' + err);
                        return;
                    }
                    //console.log(result);
                    if (result) {
                        res.render('lost', {lostFoundArr: result,page:page,count:count});
                        //res.render('homepage',{activity:"ok"});
                    }
                    else {
                        //res.send('unknown account');
                        res.render('error');
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
        res.redirect('/');
    }
});

router.post('/lostFound', function (req, res) {
    req.session.lostFound_page=req.body.page;
    res.send("ok");
});

router.post('/lost', function (req, res) {
    req.session.type=req.body.type;
    req.session.lostFound_page=1;
    res.send("ok");
});
router.post('/found', function (req, res) {
    req.session.type=req.body.type;
    req.session.lostFound_page=1;
    res.send("ok");
});

module.exports = router;