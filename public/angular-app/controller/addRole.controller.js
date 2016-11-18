app.controller("AddRoleController", ["$scope", "$location", "$window", "authenticationSvc", "$http", /*"auth",*/"$state",
    function ($scope, $location, $window, authenticationSvc, $http,/* auth, */$state) {

	$scope.saveRole = function(){
		var rolename = $scope.rolename;
		$http.post("/addRole", {rolename})
            .then(function(result){
                $state.go('adminInbox');
            }, function(err){
                alert("error occured");
            });
    }  
}]);