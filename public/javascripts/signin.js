/**
 * Created by Bella on 2017/1/7.
 */
function signin() {
    var username = document.getElementById("username2").value;
    var email = document.getElementById("email2").value;
    var pasw = document.getElementById("pasw").value;
    $.ajax({
        url: '',
        type: 'post',
        data: 'username=' + username + 'email=' + email + 'password=' + pasw,
        success:function (data,status) {
            alert("登录成功！");
            /*if(json==null){
                alert("服务器连接失败");
            }
            var signinInfo = eval("("+json+")");
            if(signinInfo.status == 0){
                alert("登录成功");
            }
            else {
                alert("登录失败");
            }*/
        },
        error:function () {
            alert("无法连接服务器");
        }
    });
}