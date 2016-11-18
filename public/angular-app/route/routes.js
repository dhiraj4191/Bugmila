app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('login', {
		url : '/',
		templateUrl : "public/angular-app/views/login.html",
		controller : "LoginController"
	}).state("adminInbox", {
		url : "/adminInbox",
		templateUrl : "public/angular-app/views/adminPanel.html",
		controller : "AdminPanelController",
		resolve : {
			auth : function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                	if(userInfo.role.rolename == "Admin"){
                		return $q.when(userInfo);	
                	}
                    return $q.reject({ access: false });
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
		},
		data : {
			userRole : "Admin"
		}
	}).state("adminInbox.addUser", {
		url : '/addUser',
		templateUrl : "public/angular-app/views/addUser.html",
		controller : "AddUserController",
		resolve : {
			auth : function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                	if(userInfo.role.rolename == "Admin"){
                		return $q.when(userInfo);	
                	}
                    return $q.reject({ access: false });
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
		}
	}).state("adminInbox.addRole", {
		url : '/addRole',
		templateUrl : "public/angular-app/views/addRole.html",
		controller : "AddRoleController",
		resolve : {
			auth : function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                	if(userInfo.role.rolename == "Admin"){
                		return $q.when(userInfo);	
                	}
                    return $q.reject({ access: false });
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
		}
	}).state("testerInbox", {
		url : "/testerInbox",
		templateUrl : "public/angular-app/views/testerInbox.html",
		controller : "TesterInboxController",
		resolve : {
			auth : function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                	if(userInfo.role.rolename == "Tester"){
                		return $q.when(userInfo);	
                	}
                    return $q.reject({ access: false });
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
		}
	}).state("testerInbox.addDefect", {
		url : "/addDefect",
		templateUrl : "public/angular-app/views/addDefect.html",
		controller : "AddDefectController",
		resolve : {
			auth : function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                	if(userInfo.role.rolename == "Tester"){
                		return $q.when(userInfo);	
                	}
                    return $q.reject({ access: false });
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
		}
	}).state("devInbox", {
		url : "/devInbox",
		templateUrl : "public/angular-app/views/devInbox.html",
		controller : "DevInboxController",
		resolve : {
			auth : function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                	if(userInfo.role.rolename == "Developer"){
                		return $q.when(userInfo);	
                	}
                    return $q.reject({ access: false });
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
		}
	})

	$locationProvider.html5Mode(true);
}])