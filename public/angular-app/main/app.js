var app = angular.module("bugMilaApp", ["ui.router", "ngMaterial", "ngMessages"]);

app.run(["$rootScope", "$location", "authenticationSvc", "$state", function ($rootScope, $location, authenticationSvc, $state) {
   
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
		
	})

    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        
    });

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {

        
        	if(error.access == false){
        		alert("You are not authorised !!!");
        		$state.go("login")
        	}else{
        		$state.go("login")
        	}
    });
}]);


