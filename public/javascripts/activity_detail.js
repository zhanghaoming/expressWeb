/**
 * Created by Skye on 2016/12/30.
 */
$(function () {
    getActivityDetail();
    getComment();
});

function getActivityDetail() {
    $.ajax({
        url: '/',
        type: 'GET',
        success: function (json) {
            var activityDetails = eval("(" + json + ")");
            $('div.details h3.activity-title').html(activityDetails.title);
            $('div.details h4.time span').html(activityDetails.date);
            $('div.details h4.address span').html(activityDetails.address);
            $('div.details h5.type span').html(activityDetails.type);
            $('div.details h5.status span').html(activityDetails.status);
            $('div.description p').html(activityDetails.description);

        }
    })
}

function getComment() {
    var body = $('.table').find('tbody');
    $.ajax({
        url: '',
        type: 'GET',
        success: function (json) {
            body.html('');
            var comment = eval("(" + json + ")");
            for (var i = 0; i < comment.length; i++) {
                var current = comment[i];
                var tr = $('<tr style="height: 3cm">');
                var td1 = $('<td width="20%">').html(current.user_name);
                var td2 = $('<td width="80%">').html(current.comment);
                tr.append(td1).append(td2);
                body.append(tr);
            }
        },
        error: function () {
            alert("获取活动信息失败——in getComment");
        }
    })
}

function createComment() {
    var comment = $('#comment').val();
    console.log(comment);
    $.ajax({
        url:'',
        type:'GET',
        data:{
            comment: comment
        },
        success:function (json) {
            console.log(json);
            location.reload();
            if(json == null){
                alert("服务器连接失败");
            }
            var commentInfo = eval("("+json+")");
            if(commentInfo.status==0){
                alert("发布成功");
            }
            else {
                alert("发布失败");
            }
        },
        error:function () {

        }
    })
}