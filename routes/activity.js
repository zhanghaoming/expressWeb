//create by lgz
var express=require('express');
var router=express.Router();
//global.varA=0;
router.get('/activity', function (req, res) {
    if (req.session.sign) {
        var sd = require('silly-datetime');
        var curdate=sd.format(new Date(), 'YYYY-MM-DD');

        var activity_id = req.session.activity_id;
        var selectSql = "select name,date_format(time,'%Y-%m-%d') as time,place,intro,type,num_people,img from activity where activity_id=" + escape(activity_id);
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('get activity err:' + err);
                return;
            }
            //console.log(result);
            if (result) {
                //res.render('activity',{activity:result});
                //res.render('homepage',{activity:"ok"});
                var activity_info = result;
                var selectSql = "select content,comment_id,username from comment where activity_id=" + escape(activity_id);
                globalConnection.query(selectSql, function (err, result, fields) {
                    if (err) {
                        console.log('err:' + err);
                        return;
                    }
                    //console.log(result);
                    if (result) {
                        if(activity_info[0].time < curdate) {
                            res.render('activity_detail', {activity: activity_info, comment: result,states:"已过期"});
                        }
                        else
                        {
                            res.render('activity_detail', {activity: activity_info, comment: result,states:"进行中"});
                        }
                    }
                    else {
                        res.send("error");
                    }
                });
            }
            else {
                //res.send('unknown account');
                res.render('error');
            }
        });
    }
    else
    {
        res.redirect('/');
    }
});
router.post('/activity', function(req, res) {
    if (req.session.sign) {
        req.session.activity_id = req.body.activity_id;
        res.send('ok');
    }
    else
    {
        res.redirect('/');
    }
});

module.exports = router;