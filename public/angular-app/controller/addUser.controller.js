app.controller("AddUserController", ["$scope", "$location", "$window", "authenticationSvc", "$http","$state", "userService", "auth", function ($scope, $location, $window, authenticationSvc, $http, $state, userService, auth) {

	$scope.addUserData = {
		createdBy : auth.userId
	};

    if(userService.roleList){
        $scope.roles = userService.roleList;
    }else{
        userService.getRoles(function(roles){
            $scope.roles = roles;
        })
    }

	var data = $scope.addUserData;

	$scope.saveUser = function(){
		$http.post("/adduser", {data})
            .then(function(result){
                userService.getAllUsers(function(data){
                    $state.go('adminInbox', {}, {reload : true});
                });
            }, function(err){
                alert("error occured");
            });
    }  
}]);