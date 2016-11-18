
app.controller("LoginController", ["$scope", "$location", "$window", "authenticationSvc", "$state",
    function ($scope, $location, $window, authenticationSvc, $state) {
    var self = this;
    $scope.userInfo = null;
    $scope.loginData = {
    };

    if(authenticationSvc.getUserInfo()){
         $scope.userInfo = authenticationSvc.getUserInfo();
        if($scope.userInfo.role == "Admin"){

            $state.go("adminInbox", {}, {reload : true});  

        }else if($scope.userInfo.role == "Tester"){

            $state.go("testerInbox", {}, {reload : true});  

        }else{

            $state.go("devInbox", {}, {reload : true});  

        }
    }else{
        $state.go("login")
    }

    $scope.login = function () {

        authenticationSvc.login($scope.loginData.userName, $scope.loginData.password)
            .then(function (result) {
                $scope.userInfo = result;

                if($scope.userInfo.role.rolename == "Admin"){

                    $state.go("adminInbox", {}, {reload : true});  

                }else if($scope.userInfo.role.rolename == "Tester"){

                    $state.go("testerInbox", {}, {reload : true});  

                }else{

                    $state.go("devInbox", {}, {reload : true});  

                }
                
            }, function (error) {
                $window.alert("Invalid credentials");
                console.log(error);
            });
    };
}]);