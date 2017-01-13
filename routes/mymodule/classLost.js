exports.Name='';
exports.Time='';
exports.Place='';
exports.Type='';
exports.Intro='';
exports.Map='121.221, 31.292';
exports.Bonus=0;

exports.init=function(body){
	if(!(body.name&&body.date&&body.address&&body.type))
	{
		return false;
	}
	this.Name=body.name;
	this.Time=body.date;
	this.Place=body.address;
	this.Type=body.type;
	this.Map=body.map;
	this.Intro=body.description;
	this.Bonus=body.bonus;
	return true;
}
