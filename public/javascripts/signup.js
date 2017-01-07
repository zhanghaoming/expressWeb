/**
 * Created by Bella on 2017/1/7.
 */
function signup() {
    validPassw(this);
    var username = document.getElementById("username1").value;
    var email = document.getElementById("email1").value;
    var pasw = document.getElementById("pasw1").value;
    $.ajax({
        url: '',
        type: 'post',
        data: 'username=' + username + 'email=' + email + 'password=' + pasw,
        success:function (data,status) {
            alert("注册成功！");
            /*if(json==null){
                alert("服务器连接失败");
            }
            var signupInfo = eval("("+json+")");
            if(signupInfo.status == 0){
                alert("注册成功");
            }
            else {
                alert("注册失败");
            }*/
        },
        error:function () {
            alert("无法连接服务器");
        }
    });
}

function validPassw() {
    var pasw1 = document.getElementById("pasw1");
    var pasw2 = document.getElementById("pasw2");
    if(pasw1.value!=pasw2.value){
        alert("密码输入有误！");
    }
}