app.controller("LoginController", ["$scope", "$location", "$window", "authenticationSvc",function ($scope, $location, $window, authenticationSvc) {
    $scope.userInfo = null;
    console.log("in login controller");
    $scope.login = function () {
        console.log("in loging function");
        authenticationSvc.login($scope.userName, $scope.password)
            .then(function (result) {
                $scope.userInfo = result;
                $location.path("/");
            }, function (error) {
                $window.alert("Invalid credentials");
                console.log(error);
            });
    };

    $scope.cancel = function () {
        $scope.userName = "";
        $scope.password = "";
    };
}]);

app.controller("HomeController", ["$scope", "$location", "authenticationSvc", "auth",function ($scope, $location, authenticationSvc, auth, defs) {
    $scope.userInfo = auth;
    $scope.userDefects = auth.userDefects;
    console.log($scope.userDefects);
    $scope.logout = function () {

        authenticationSvc.logout()
            .then(function (result) {
                $scope.userInfo = null;
                $location.path("/login");
            }, function (error) {
                console.log(error);
            });
    };
}]);