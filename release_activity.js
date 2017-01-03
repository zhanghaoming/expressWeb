/**
 * Created by Skye on 2016/12/30.
 */
function createActivity() {
    var title = $('#title').val();
    var date = $('#registration-date').val();
    var type = $('#type').val();
    var img = $('#img').val();
    var description = $('#description').val();
    // if ((!title) && (!date) && (!type)) {
    //
    // }
    $.ajax({
        url: '/xxx?title=' + title + '&date' + date + '&type' + type + '&img' + img + '&description' + description,
        type:'post',
        data:{},
        success:function (json) {
            location.reload();
            if(json==null){
                alert("服务器连接失败");
            }
            var activityInfo = eval("("+json+")");
            if(activityInfo.status == 0){
                alert("提交成功");
            }
            else {
                alert("提交失败");
            }
        },
        error:function () {
            alert("无法连接服务器");
        }
    })
}
