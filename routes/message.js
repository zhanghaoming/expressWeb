//create by lgz
var express=require('express');
var router=express.Router();

router.post('/message', function (req, res) {
    var sender_id = req.session.account_id;
    var content = req.body.message;
    var sender_name = req.session.user;
    var announce_id=req.session.announce_id;
    var selectSql="select account_id from release_lost where announce_id="+"'"+escape(announce_id)+"'";
    globalConnection.query(selectSql, function (err, result, fields) {
        if (err) {
            console.log('insert into message err:' + err);
            return;
        }
        //console.log(result);
        if (result) {
            var reciver_id = result[0].account_id;
            //console.log('reciver_id:' + reciver_id);
            //console.log('reciver_id::::' + result[0]);
            //console.log(result);
            var insertSql = "insert into message(content,sender_id,receiver_id,sender_name,announce_id) value(" + "'" + escape(content) + "'" + "," + escape(sender_id) + "," + escape(reciver_id) + "," + "'" + escape(sender_name) + "'" +","+escape(announce_id)+ ")";
            globalConnection.query(insertSql, function (err, result, fields) {
                if (err) {
                    console.log('insert into message err:' + err);
                    return;
                }
                if (result) {
                    res.send("insert");
                }
                else {
                    res.send("error");
                }
            });
        }
        else {
            res.send("error");
        }
    });
});

module.exports = router;