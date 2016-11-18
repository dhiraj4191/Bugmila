app.controller("AddDefectController", ["$scope", "$location", "$window", "authenticationSvc", "$http", "defectService", "$state", "userService", function ($scope, $location, $window, authenticationSvc, $http, defectService, $state, userService) {

        $scope.addDefectData = {
            createdby :  $scope.userInfo.userId,
            updatedby :  $scope.userInfo.userId  
        }

        $scope.userInfo = JSON.parse($window.sessionStorage["userInfo"]);

    	$scope.status = userService.getStatus();

        if(userService.userList){
            $scope.users = userService.userList
        }else{
            userService.getAllUsers(function(data){
                $scope.users = data;
            })   
        }

    	$scope.saveDefect = function(){

            defectService.addDefect($scope.addDefectData, function(){
                alert("Defect Saved");
                $state.go("testerInbox", {}, {reload : true});
            })			
        }
        
	    $scope.logout = function() {

            authenticationSvc.logout()
                .then(function (result) {
                    $scope.userInfo = null;
                    $location.path("/login");
                }, function (error) {
                    console.log(error);
                });
        };

    }]);