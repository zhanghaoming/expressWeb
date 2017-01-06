var express=require('express');
var router=express.Router();

router.get('/detail',function(req,res)
{
	res.render('activity_detail',
	{
		
		name:'name',
		num_people:1,
		time:'time',
		place:'place',
		type:'type',
		description:'sddsd'
		
	});
})


module.exports = router;
