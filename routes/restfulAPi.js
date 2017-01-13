//create by lgz
var express=require('express');
var router=express.Router();

router.post('/rank/:email', function (req, res) {
    var email=req.params.email;
    //console.log("email:",email);
    var selectSql="select account_name,credit,tel from account where email="+"'"+email+"'";
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

module.exports = router;