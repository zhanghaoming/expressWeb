exports.Name='';
exports.Time='';
exports.Place='';
exports.Type='';
exports.Intro='';

exports.init=function(body){
	if(!(body.title&&body.registration_date&&body.address&&body.type))
	{
		return false;
	}
	this.Name=body.title;
	this.Time=body.registration_date;
	this.Place=body.address;
	this.Type=body.type;
	this.Intro=body.description;
	return true;
}