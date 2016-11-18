app.filter('dropDownFilter', function(){
	return function(user, role){
		
		var userData = {};
		angular.forEach(user, function(val, key){
			angular.forEach(val, function(val1, key1){
				if(key1 == 'role' && val1.rolename== role){
					userData[val.userid] = val;
				}else{
					return null;
				}
			})
		}) 
		return userData;
	}
})