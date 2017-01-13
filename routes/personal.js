var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/personal', function(req, res, next) {
    if (req.session.sign){
        var account_id = req.session.account_id;
        var selectSql = "select email,account_name,tel,grade,approve,credit from account where account_id=" + "'" + escape(account_id) + "'";
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('get announce err:' + err);
                return;
            }
            //console.log(result);
            if (result) {
                res.render('personal', {personal: result});
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

router.post('/personal', function(req, res, next) {
    var account_id=req.session.account_id;
    var tel=req.body.tel;
    var updateSql="update account set tel="+"'"+escape(tel)+"'"+"where account_id="+"'"+escape(account_id)+"'";
    globalConnection.query(updateSql,function(err,result,fields){
        if(err){
            console.log('get announce err:' + err) ;
            return ;
        }
        if(result)
        {
            console.log("hello");
            var selectSql="select email,account_name,tel,grade,approve,credit from account where account_id="+"'"+escape(account_id)+"'";
            globalConnection.query(selectSql,function(err,result,fields){
                if(err){
                    console.log('get announce err:' + err) ;
                    return ;
                }
                if(result)
                {
                    res.send('update');
                }
                else
                {
                    res.render('error');
                }
            }) ;
        }
        else
        {
            res.render('error');
        }
    }) ;
});

module.exports = router;