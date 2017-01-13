exports.Email='error';
exports.Password='';
exports.Name='';
exports.Tel='';

exports.init=function(body){
	console.log(body);
	if(!(body.email&&body.code&&body.name&&body.phone))
	{
		return false;
	}
	this.Email=body.email;
	this.Password=body.code;
	this.Name=body.name;
	this.Tel=body.phone;
	return true;
}
