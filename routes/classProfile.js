
exports.Mail='error';
exports.Code='';
exports.Name='';
exports.Phone='';

exports.init=function(body){
	console.log(body);
	if(body.mail)
	{
		Mail=escape(body.mail);
	}
	if(body.code)
	{
		Code=escape(body.code);
	}
	if(body.name)
	{
		Name=escape(body.name);
	}
	if(body.phone)
	{
		Phone=escape(body.phone);
	}
}