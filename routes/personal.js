var express = require('express');
var router = express.Router();

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
    var lostfoundS=[];
    var account_id=req.session.account_id;
    var selectSql1="select activity_id from release_activity where account_id="+"'"+escape(account_id)+"'";
    globalConnection.query(selectSql1,function(err,result,fields){
        if(err){
            console.log('get activityS err:' + err) ;
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

module.exports = router;