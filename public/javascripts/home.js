//create by lgz
function details_info(obj)
{
	var activity_id=obj.id;
	//var h='/activity?activity_id='+activity_id;
	//alert(h);
	//window.location.href=h;
	var data={'activity_id':activity_id};
	$.ajax({
            type: "Get",
            url: "/activity",
            data: data,
            //datatype: "json",
            //async: false,
            error: function (data,status) {
                window.location.href='/activity';
            },
            success: function (data,status) {
                window.location.href='/activity';
            }
        });
}