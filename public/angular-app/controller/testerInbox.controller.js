app.controller("TesterInboxController", ["$scope", "userService", "$window", "$location", "$state", "defectService", "$mdDialog", "authenticationSvc", function ($scope, userService, $window, $location, $state, defectService, $mdDialog, authenticationSvc) {

        $scope.userInfo = JSON.parse($window.sessionStorage["userInfo"])
        $scope.statusList = userService.getStatus();

        if(userService.userList){
            $scope.userList = userService.userList
        }else{
            userService.getAllUsers(function(data){
                $scope.userList = data;
            })   
        }

        if(defectService.defectList){
            $scope.inbox = defectService.defectList;
        }else{
            defectService.getTesterDefects($scope.userInfo.userId, function(defects){
                $scope.inbox = defects;
            });
        }

        $scope.adddefect = function(){
            $state.go("testerInbox.addDefect");
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

        $scope.viewDefects = function(){
             $state.go("testerInbox", {}, {reload : true});
        }

        $scope.updateDefect = function(){
            defectService.updateDefect($scope.defectData, function(){
                $mdDialog.hide();
                $state.go("testerInbox", {}, {reload : true});
            });            
        }

        $scope.deleteDefect = function(defectId){
            defectService.deleteDefect(defectId, function(){
                $state.go("testerInbox");
            });
        }

        $scope.cancle = function(){
            $mdDialog.hide();
            $state.go("testerInbox", {}, {reload : true});
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