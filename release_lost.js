/**
 * Created by Bella on 2017/1/7.
 */
$(function () {
    loadScript();
});

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://map.qq.com/api/js?v=2.exp&callback=init";
    document.body.appendChild(script);
}

function init() {
    var myLatlng = new qq.maps.LatLng(39.916527,116.397128);
    var myOptions = {
        zoom: 8,
        center: myLatlng,
        mapTypeId: qq.maps.MapTypeId.ROADMAP
    }
    var map = new qq.maps.Map(document.getElementById("map"), myOptions);
}

function createLost() {
    var name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var address = document.getElementById("address").value;
    var bonus = document.getElementById("bonus").value;
    var type = document.getElementById("type").value;
    var img = document.getElementById("img").value;
    var description = document.getElementById("description").value;
    $.ajax({
        url: '',
        type: 'post',
        data: 'name='+name+'&date='+date+'&address='+address+'&bonus='+bonus+'&type='+type+'&img='+img+'&description='+description,
        success: function(data,status) {
            alert("提交成功！");
        },
        error: function() {
            alert("无法连接服务器");
        }
    });
}