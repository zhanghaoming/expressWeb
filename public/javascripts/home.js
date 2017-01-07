//create by lgz
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

function createComment1()
{
	var content = $("#comment").val();
    var data = {"content":content};
	//alert(content);
	$.ajax({
            type: "post",
            url: "/comment",
            data: data,
            error: function (data,status) {
                //window.location.href='/activity';
            },
            success: function (data,status) {
				if("insert"==data)
                {
					window.location.href='/activity';
				}
            }
        });
}