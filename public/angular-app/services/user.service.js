app.factory("userService", ["$http", function($http){
	var userService = {};

	userService.getAllUsers = function(cb){
		$http.post("/getUsers", {})
			.then(function(users){				
				var userList = {};
				angular.forEach(users.data, function(val, key){
					angular.forEach(val, function(val1, key1){
						if(key1 == "userid"){
							userList[val1] = val;
						}
					})
				})

				userService.userList = userList;

				return cb(userList);	
			});
	};

	userService.getRoles = function(cb){
		$http.post("/getRoles", {})
			.then(function(roles){
				var roleList = {};
				angular.forEach(roles.data, function(val, key){
					angular.forEach(val, function(val1, key1){
						if(key1 == "roleid"){
							roleList[val1] = val;
						}
					})
				});
				userService.roleList = roleList;

				return cb(roleList);
			})
	}

	userService.getStatus = function(){
		
		var status = ["Open", "Closed"];
		userService.status = status;
		return status;
	}

	userService.updateUser = function(updateData, cb){
		$http.post('/updateUser', {updateData})
			.then(function(res){

				return cb("Data updated");
			}, function(err){
				alert("Something went wrong");
			})
	}

	userService.deleteUser = function(userid, cb){
		$http.post("/deleteUser", {userid})
			.then(function(res){
				delete userService.userList[userid]
				cb("user deleted");
			}, function(err){
				alert("Something went wrong");
			})
	}

	return userService
}]);