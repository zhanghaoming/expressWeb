var Mail=''
var Code=''

exports.init=function(body){
	if(body.mail)
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
