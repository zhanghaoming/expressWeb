
var Mail='error';
var Code='error';

exports.init=function(body){
	console.log(body);
	if(body.name)
	{
		Mail=body.name;
	}
	if(body.code)
	{
		Code=body.code;
	}
}

exports.return_mail=function(){
	return escape(Mail);
}

exports.return_code=function(){
	return escape(Code);
}