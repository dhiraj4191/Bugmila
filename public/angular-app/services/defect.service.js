app.factory("defectService", ["$http", "$window", function($http, $window){
	var defectServices = {};

	defectServices.addDefect = function(defectData, cb){
		$http.post("/adddefect", {defectData})
	            .then(function(result){
	            	var userid = JSON.parse($window.sessionStorage["userInfo"]).userId;
	               	defectServices.getTesterDefects(userid, function(data){
	               		return cb("Defect added");	
	               });
	            }, function(err){
	                alert("error occured");
	            });
	}

	defectServices.getTesterDefects = function(userid, cb){
		$http.post('/getTesterDefects', {userid})
			.then(function(defects){
				var defectList = {};
				angular.forEach(defects.data, function(val, key){
					angular.forEach(val, function(val1, key1){
						if(key1 == "defectid"){
							defectList[val1] = val;
						}
					})
				})

				defectServices.defectList = defectList;
				return cb(defectList);
			}, function(err){
				alert("error occured while fetching defects");
			})
	}

	defectServices.updateDefect = function(defectData, cb){

		$http.post('/updateDefect', {defectData})
			.then(function(res){
				return cb("Defect updated");
			}, function(err){
				console.log(err);
				alert("Error occured");
			});
	}

	defectServices.deleteDefect = function(defectid, cb){
		$http.post('/deleteDefect', {defectid})
			.then(function(res){
				delete defectServices.defectList[defectid];
				return cb("Defect deleted");
			}, function(err){
				console.log(err);
				alert("Error occured");
			})
	}

	defectServices.getDeveloperDefects = function(userid, cb){
		$http.post('/getDeveloperDefects', {userid})
			.then(function(defects){
				var defectList = {};

				angular.forEach(defects.data, function(val, key){
					angular.forEach(val, function(val1, key1){
						if(key1 == "defectid"){
							defectList[val1] = val;
						}
					})
				})

				defectServices.devDefectList = defectList;
				return cb(defectList);
			}, function(err){
				alert("error occured while fetching defects");
			})
	}


	return defectServices;
}])