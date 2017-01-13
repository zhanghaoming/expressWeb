//create by lgz
var express=require('express');
var router=express.Router();

router.get('/lostInfo', function (req, res) {
    if (req.session.sign) {
        var announce_id = req.session.announce_id;
        //console.log('get activity err:' + announce_id);
        //var account_id=req.session.user_id;
        //var page=req.body.page;
        var selectSql = "select name,date_format(time,'%Y-%m-%d') as time,place,type,intro,gets,img,coord from lostFound where announce_id=" + "'" + escape(announce_id) + "'";
        globalConnection.query(selectSql, function (err, result, fields) {
            if (err) {
                console.log('get announce err:' + err);
                return;
            }
            //console.log(result);
            if (result) {
                var lostinfo = result;
                var selectSql = "select message_id,content,sender_id,receiver_id,sender_name from message where announce_id=" + "'" + escape(announce_id) + "'";
                globalConnection.query(selectSql, function (err, result, fields) {
                    if (err) {
                        console.log('err:' + err);
                        return;
                    }
                    //console.log(result);
                    if (result) {
                        if (result[0].receiver_id == req.session.account_id) {
                            res.render('lost_detail', {lostInfo: lostinfo, message: result});
                        }
                        else {
                            var messageInfo = [];
                            var j = 0;
                            for (var i = 0; i < result.length; i++) {
                                (function (result, messageInfo, i) {
                                    if (result[i].sender_id == req.session.account_id || result[i].sender_id == result[i].receiver_id) {
                                        messageInfo[j] = result[i];
                                        j = j + 1;
                                    }
                                })(result, messageInfo, i);
                            }
                            setTimeout(function () {
                                //console.log("loss:"+messageInfo);
                                res.render('lost_detail', {lostInfo: lostinfo, message: messageInfo});
                            }, 500);
                            //res.render('lost_detail', {lostInfo: lostinfo, message: []});
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
router.post('/lostInfo', function(req, res) {
    if (req.session.sign) {
        req.session.announce_id = req.body.announce_id;
        res.send('ok');
    }
    else
    {
        res.redirect('/');
    }
});

module.exports = router;