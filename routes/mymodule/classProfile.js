exports.Mail='error';
exports.Code='';
exports.Name='';
exports.Phone='';

exports.init=function(body){
	if(!(body.mail&&body.code&&body.name&&body.phone))
	{
		return false;
	}
	this.Mail=body.mail;
	console.log(body.mail);
	this.Code=body.code;
	this.Name=body.name;
	this.Phone=body.phone;
	return true;
}
