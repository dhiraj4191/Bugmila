app.controller("DevInboxController", ["$scope","$window", "$location","authenticationSvc", "$state", "defectService", "$mdDialog", "userService", function ($scope, $window, $location, authenticationSvc, $state, defectService, $mdDialog, userService) {

        $scope.userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        $scope.statusList = userService.getStatus();

        if(userService.userList){
            $scope.userList = userService.userList
        }else{
            userService.getAllUsers(function(data){
                $scope.userList = data;
            })   
        }

        if(defectService.devDefectList){
            $scope.inbox = defectService.devDefectList;
        }else{
            defectService.getDeveloperDefects($scope.userInfo.userId, function(devDefects){
                $scope.inbox = devDefects;
            });    
        }

        $scope.showDefect = function(ev, defectid){
           $scope.defectData = $scope.inbox[defectid];
           var parentEl = angular.element(document.body);
           $mdDialog.show({
            scope : $scope,
            preserveScope : true,
            parent : parentEl,
            targetEvent : ev,
            templateUrl : 'public/angular-app/views/showDefectDialog.html'
            })
        }

        $scope.updateDefect = function(){
            defectService.updateDefect($scope.defectData, function(){
                $mdDialog.hide();
                $state.go("devInbox", {}, {reload : true});
            });            
        }

        $scope.cancle = function(){
            $mdDialog.hide();
            $state.go("devInbox", {}, {reload : true});
        }


        $scope.logout = function(){
            authenticationSvc.logout()
                .then(function (result) {
                    $scope.userInfo = null;
                    $state.go("login")
                }, function (error) {
                    console.log(error);
                });
        }
}]);