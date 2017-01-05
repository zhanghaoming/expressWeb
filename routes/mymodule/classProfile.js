exports.Email='error';
exports.Password='';
exports.Name='';
exports.Tel='';

exports.init=function(body){
	if(!(body.mail&&body.code&&body.name&&body.phone))
	{
		return false;
	}
	this.Email=body.mail;
	console.log(body.mail);
	this.Password=body.code;
	this.Name=body.name;
	this.Tel=body.phone;
	return true;
}
