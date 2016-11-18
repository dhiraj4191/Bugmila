app.controller("AdminPanelController", ["$scope", "authenticationSvc", "$state", "userService", "$mdDialog", function ($scope, authenticationSvc, $state, userService, $mdDialog) {

    if(userService.userList){
        $scope.inbox = userService.userList
    }else{
        userService.getAllUsers(function(data){
            $scope.inbox = data;
        })   
    }

    if(userService.roleList){
        $scope.roles = userService.roleList;
    }else{
        userService.getRoles(function(roles){
            $scope.roles = roles;
        })
    }

    $scope.showUsers = function(ev, userid){
       $scope.userData = $scope.inbox[userid];
       var parentEl = angular.element(document.body);
       $mdDialog.show({
        scope : $scope,
        preserveScope : true,
        parent : parentEl,
        targetEvent : ev,
        templateUrl : 'public/angular-app/views/showUserDialog.html'
        })
    }

    $scope.updateUser = function(){
        userService.updateUser($scope.userData, function(res){
            $mdDialog.hide();
            $state.go('adminInbox', {}, {reload : true})
        });
        
    }

    $scope.deleteUser = function(userid){
        userService.deleteUser(userid, function(res){
            $state.go('adminInbox',  {}, {reload : true});
        })
    }

    $scope.addRole = function(){
        $state.go('adminInbox.addRole');
    }

    $scope.cancle = function(){
        $mdDialog.hide();
         $state.go('adminInbox',  {}, {reload : true})
    }

    $scope.logout = function() {
        authenticationSvc.logout()
            .then(function (result) {
                $scope.userInfo = null;
                $state.go("login");
            }, function (error) {
                console.log(error);
            });
    };

    $scope.addUser = function() {
       $state.go("adminInbox.addUser");
    };

    $scope.viewUsers = function() {        
        $state.go("adminInbox");
    };
}]);