//create by lgz
var express=require('express');
var router=express.Router();

router.get('/rank=:email', function (req, res) {
    var email=req.params.email;
    //console.log("email:",email);
    var selectSql="select account_name,credit,email from account where email="+"'"+escape(email)+"'";
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('get rank err:' + err) ;
            return ;
        }
        //console.log(result);
        if(result[0])
        {
            res.send(result);
        }
        else
        {
            res.send('no such a email');
        }
    }) ;
});

router.get('/ranklist=:credit', function (req, res) {
    var credit=req.params.credit;
    //console.log("email:",email);
    var selectSql="select account_name,credit,email from account where credit >="+"'"+escape(credit)+"'";
    globalConnection.query(selectSql,function(err,result,fields){
        if(err){
            console.log('get ranklist err:' + err) ;
            return ;
        }
        //console.log(result);
        if(result[0])
        {
            res.send(result);
        }
        else
        {
            res.send('no conform to the standard');
        }
    }) ;
});

module.exports = router;