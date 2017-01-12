var express = require('express');
var router = express.Router();
global.varA=[];
/* GET users listing. */
router.get('/personal', function(req, res, next) {
    var account_id=req.session.account_id;
    var selectSql="select email,account_name,tel,grade,approve,credit from account where account_id="+"'"+escape(account_id)+"'";
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('get announce err:' + err) ;
            return ;
        }
        //console.log(result);
        if(result)
        {
            res.render('personal',{personal:result});
        }
        else
        {
            //res.send('unknown account');
            res.render('error');
        }
    }) ;
});

router.get('/history', function(req, res, next) {
    var activityS=[];
    var activity_Content=[];
    var lostFoundS=[];
    var lostFound_Content=[];
    var account_id=req.session.account_id;
    var selectSql1="select activity_id from release_activity where account_id="+"'"+escape(account_id)+"'";
    globalConnection.query(selectSql1,function(err,result,fields){
        if(err){
            console.log('get activityS err:' + err) ;
            return ;
        }
        if(result)
        {
            activityS=result;
            //console.log(activityS);
            for(var i = 0;i < activityS.length;i++)
            {
                //console.log("ppp",activityS[i].activity_id);
                var selectSql101="select name,date_format(time,'%Y-%m-%d') as time,place,intro,type from activity where activity_id="+activityS[i].activity_id;
                (function(selectSql101, i) {
                    globalConnection.query(selectSql101, function (err, result, fields) {
                        if (err) {
                            console.log('get activityS err:' + err);
                            return;
                        }
                        //console.log(result);
                        if (result) {
                            activity_Content[i] = result[0];
                            console.log("num", i);
                            console.log("activityS", activity_Content[i]);
                        }
                        else {
                            res.render('error');
                        }
                    });
                })(selectSql101,i);
            }
        }
        else
        {
            res.render('error');
        }
    }) ;
    var selectSql2="select announce_id from release_lost where account_id="+"'"+escape(account_id)+"'";
    globalConnection.query(selectSql2,function(err,result,fields){
        if(err){
            console.log('get lostFoundS err:' + err) ;
            return ;
        }
        if(result)
        {
            lostFoundS=result;
            //console.log(lostFoundS);
            for(var i = 0;i < lostFoundS.length;i++)
            {
                //console.log(lostFoundS[i].announce_id);
                var selectSql202 = "select name,date_format(time,'%Y-%m-%d') as time,place,type,intro from lostFound where announce_id=" + "'" + escape(lostFoundS[i].announce_id) + "'";
                (function(selectSql202, i) {
                    globalConnection.query(selectSql202, function (err, result, fields) {
                        if (err) {
                            console.log('get lostFoundS err:' + err);
                            return;
                        }
                        if (result) {
                            lostFound_Content[i] = result[0];
                        }
                        else {
                            res.render('error');
                        }
                    });
                })(selectSql202,i);
            }
        }
        else
        {
            res.render('error');
        }
    }) ;

    setTimeout(function() {
        res.render('history',{activityS:activityS,activity_Content:activity_Content,lostFoundS:lostFoundS,lostFound_Content:lostFound_Content});
    }, 500);
});

module.exports = router;