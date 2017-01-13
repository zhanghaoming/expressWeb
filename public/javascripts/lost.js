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

function sendMessage()
{
	var message = $("#message").val();
	//alert(message);
    var data = {"message":message};
	//alert(content);
	$.ajax({
            type: "post",
            url: "/message",
            data: data,
            error: function (data,status) {
                //window.location.href='/lostInfo';
				//alert('err');
            },
            success: function (data,status) {
				//alert('success');
				if("insert"==data)
                {
					//alert('insert');
					window.location.href='/lostInfo';
				}
            }
        });
}

//**********************next/last for lf*****************************
function nextLF()
{
	var page = $("#lostpage").val();
	var count = $("#count").val();
	if(page<count){
		page++;
		//document.getElementById("lostpage").value=page;
		var data = {"page":page};
		//alert(page);
		$.ajax({
				type: "post",
				url: "/lostFound",
				data: data,
				error: function (data,status) {
					//window.location.href='/lostFound';
				},
				success: function (data,status) {
					//alert(data);
					//alert("修改成功");
					if("ok"==data)
					{
						window.location.href='/lostFound';
					}
				}
			});
	}
	else{
		alert("最后一页");
	}
}
function lastLF()
{
	var page = $("#activity_page").val();
	if(page>1){
		page=page-1;
		document.getElementById("activity_page").value=page;
		var data = {"page":page};
		//alert(page);
		$.ajax({
				type: "post",
				url: "/lostFound",
				data: data,
				error: function (data,status) {
					//window.location.href='/lostFound';
				},
				success: function (data,status) {
					//alert(data);
					//alert("修改成功");
					if("ok"==data)
					{
						window.location.href='/lostFound';
					}
				}
			});
	}
	else{
		alert("第一页");
	}
}

function lostType()
{
	var data = {"type":"lost"};
	$.ajax({
			type: "post",
			url: "/lost",
			data: data,
			error: function (data,status) {
				//window.location.href='/lostFound';
			},
			success: function (data,status) {
				//alert(data);
				//alert("修改成功");
				if("ok"==data)
				{
					window.location.href='/lostFound';
				}
			}
		});
}

function foundType()
{
	var data = {"type":"found"};
	$.ajax({
			type: "post",
			url: "/found",
			data: data,
			error: function (data,status) {
				//window.location.href='/lostFound';
			},
			success: function (data,status) {
				//alert(data);
				//alert("修改成功");
				if("ok"==data)
				{
					window.location.href='/lostFound';
				}
			}
		});
}

function changeState(obj)
{
	var state = obj.value;
	//alert(state);
	if("NO"==state)
	{
		state="YES";
	}
	else if("YES"==state)
	{
		state="NO";
	}
	//alert(state);
	var data = {"state":state};
	$.ajax({
			type: "post",
			url: "/changeState",
			data: data,
			error: function (data,status) {
				//window.location.href='/lostInfo';
			},
			success: function (data,status) {
				//alert(data);
				//alert("修改成功");
				if("ok"==data)
				{
					window.location.href='/lostInfo';
				}
			}
		});
}