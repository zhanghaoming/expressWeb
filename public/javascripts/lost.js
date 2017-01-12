//create by lgz
function lost_info(obj)
{
	var announce_id=obj.id;
	var data={'announce_id':announce_id};
	//alert(announce_id);
	//alert(data);
	$.ajax({
            type: "post",
            url: "/lostInfo",
            data: data,
            //datatype: "json",
            //async: false,
            error: function (data,status) {
				//alert('err');
                window.location.href='/lostInfo';
            },
            success: function (data,status) {
				//alert('ok');
                window.location.href='/lostInfo';
            }
        });
}
function details_info(obj)
{
	var activity_id=obj.id;
	var data={'activity_id':activity_id};
	//alert(activity_id);
	//alert(data);
	$.ajax({
            type: "post",
            url: "/activity",
            data: data,
            //datatype: "json",
            //async: false,
            error: function (data,status) {
				//alert('err');
                window.location.href='/activity';
            },
            success: function (data,status) {
				//alert('ok');
                window.location.href='/activity';
            }
        });
}