app.factory("authenticationSvc", ["$http","$q","$window", "$state", function ($http, $q, $window, $state) {
    var userInfo;

    function login(userName, password) {

        var deferred = $q.defer();

        $http.post("/login", { userName: userName, password: password })
            .then(function (result) {

                userInfo = {
                    accessToken: result.data.loginData.access_token,
                    userName: result.data.loginData.userName,
                    userId : result.data.loginData.userId,
                    role : result.data.loginData.Role
                };

                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                
                deferred.resolve(userInfo);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function logout() {
        var deferred = $q.defer();

        $http({
            method: "POST",
            url: "/logout",
            headers: {
                "access_token": userInfo.accessToken
            }
        }).then(function (result) {
            userInfo = null;
            $window.sessionStorage["userInfo"] = null;
            deferred.resolve("Logged out");
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getUserInfo() {
        return userInfo;
    }

    function init() {
        if ($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    }
    init();

    return {
        login: login,
        logout: logout,
        getUserInfo: getUserInfo
    };
}]);
