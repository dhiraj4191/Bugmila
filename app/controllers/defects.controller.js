var Defects = require("../models/defects.model");

exports.insertDefectsData = function(req, res){
	
	var defectsData = req.body.defectData;

	Defects.nextCount(function(err, count){

		var defect = new Defects({
			defectid : count,
			defectname : defectsData.defectname,
			owner : defectsData.owner,
			status : defectsData.status,
			createdby : defectsData.createdby,
			updatedby : defectsData.updatedby
		});

		defect.save(function (err){
			if(err){
				console.log(err);
				res.send(401, "error occured while saving data");
			}else{
				res.send(200, "data saved successfully");
			}
		});
	});
	
}

exports.getTesterDefects = function(req, res){
	var userId = req.body.userid

	Defects.find({createdby : userId}, {defectid : 1, defectname : 1, owner : 1, status : 1}, function(err, data){
		if(err){
			console.log(err);
			res.send(401, err)
		}else{
			res.send(200, data);
		}
	})
}

exports.getDeveloperDefects = function(req, res){
	var userId = req.body.userid

	Defects.find({owner : userId}, {defectid : 1, defectname : 1, owner : 1, status : 1}, function(err, data){
		if(err){
			console.log(err);
			res.send(401, err)
		}else{
			res.send(200, data);
		}
	})
}


exports.updateDefect = function(req, res){
	var defectId = req.body.defectData.defectid;
	Defects.update({defectid : defectId}, 
		{
			$set : {
				defectname : req.body.defectData.defectname,
				owner : req.body.defectData.owner,
				status : req.body.defectData.status
			}
		}, function(err, data){
		if(err){
			res.send(401, "error occured while updating");
		}else{
			res.send(200, data);
		}
	})
}

exports.deleteDefect = function(req, res){
	var defectId = req.body.defectid;

	Defects.remove({defectid : defectId}, function(err){
		if(err){
			res.send(401, "error occured while deleting user");
		}else{
			res.send(200, "User Deleted");
		}
	})
}