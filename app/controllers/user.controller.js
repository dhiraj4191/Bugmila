var Users = require("../models/users.model");
var Roles = require("../models/roles.model");


exports.insertUserData = function(req, res){
	
	var userData = req.body.data;
	//console.log(userData);
	Users.nextCount(function(err, count){

		Roles.find({roleid: userData.role})
			.then(function(roleObj){
				var user = new Users({
				userid : count,
				loginid : userData.loginid,
				name : {
					firstname : userData.fname,
					lastname : userData.lname
				},
				createdby : userData.createdBy,
				role : roleObj[0]._id,
				password : userData.password
			});

			user.save(function (err){
				if(err){
					console.log(err);
					res.send(401, "error occured while saving data");
				}else{
					res.send(200, "data saved successfully");
				}
			});
		})
	});
	
}

exports.getUsersList = function(req, res){

	Users.find({}, {userid : 1, name : 1, role : 1, createdby : 1, createdAt : 1, loginid : 1})
		.populate('role')
		.exec(function(err, usersList){
			if(err){
				return res.send(401, "error occured while fetching users");
			}
			res.send(200, usersList);
		})
};


exports.udpateUser = function(req, res){
	var userId = req.body.updateData.userid;

	Users.update({userid : userId}, 
		{
			$set : {
				name : {
					firstname : req.body.updateData.name.firstname,
					lastname : req.body.updateData.name.lastname
				},
				loginid : req.body.updateData.loginid,
				role : req.body.updateData.role
			}
		}, function(err, data){
		if(err){
			res.send(401, "error occured while updating");
		}else{
			res.send(200, data);
		}
	})
}

exports.deleteUser = function(req, res){
	var userId = req.body.userid;

	Users.remove({userid : userId}, function(err){
		if(err){
			res.send(401, "error occured while deleting user");
		}else{
			res.send(200, "User Deleted");
		}
	})
}


exports.addRole = function(req, res){
	Roles.nextCount(function(err, count){
		var role = new Roles({
			roleid : count,
			rolename : req.body.rolename
		})

		role.save(function (err){
			if(err){
				console.log(err);
				res.send(401, "error occured while saving roles");
			}else{
				res.send(200, "role added successfully");
			}
		});
	})
}

exports.getRoles = function(req, res){
	Roles.find({})
		.then(function(roles){
			res.send(200, roles);
		})
}