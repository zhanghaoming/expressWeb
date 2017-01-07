/**
 * Created by Bella on 2017/1/7.
 */
$(function () {
    getLostDetail();
    getLostComment();
});

function getLostDetail() {
    $.ajax({
        url: '',
        type: 'get',
        success: function (json) {
            var lostDetails = eval("(" + json + ")");
            $('div.details h1.lost-title').html(lostDetails.title);
            $('div.details h2.lost-owner span').html(lostDetails.username);
            $('div.details h3.time span').html(lostDetails.date);
            $('div.details h3.address span').html(lostDetails.address);
            $('div.details h3.type span').html(lostDetails.type);
            $('div.details h3.bonus span').html(lostDetails.bonus);
            $('div.description p').html(lostDetails.description);
        }
    });
}

function getLostComment() {
    var body = $('.table tbody');
    $.ajax({
        url: '',
        type: 'get',
        success: function (json) {
            body.html('');
            var comment = eval("(" + json + ")");
            for (var i = 0; i < comment.length; i++) {
                var current = comment[i];
                var tr = $('<tr style="height: 3cm">');
                var td1 = $('<td width="20%">').html(current.username);
                var td2 = $('<td width="80%">').html(current.comment);
                body.append(tr);
                tr.append(td1).append(td2);
            }
        },
        error: function () {
            alert("获取评论信息失败");
        }
    });
}

function createLostComment() {
    var comment = document.getElementById("comment").value;
    console.log(comment);
    $.ajax({
        url:'',
        type:'post',
        data: 'comment='+comment,
        success:function (json) {
            console.log(json);
            alert("发布评论消息成功！");
            /*if(json == null){
                alert("服务器连接失败");
            }
            var commentInfo = eval("("+json+")");
            if(commentInfo.status==0){
                alert("发布成功");
            }
            else {
                alert("发布失败");
            }*/
        },
        error:function () {
            alert("发布评论消息失败");
        }
    })
}