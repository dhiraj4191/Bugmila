describe('LoginController', function(){

	beforeEach(angular.mock.module('bugMilaApp'));

	var authenticationSvc, $scope, controller, $state, adminInbox = 'adminInbox';

	beforeEach(inject(function($rootScope, $controller, _authenticationSvc_, $q, _$state_, $templateCache){
		authenticationSvc = _authenticationSvc_;
		$scope = $rootScope.$new();
		q = $q;
		$state = _$state_;

		$templateCache.put('public/angular-app/views/inbox.html', '');

		controller = $controller('LoginController', {
			$scope : $scope,
			authenticationSvc : authenticationSvc
		});
	}))

	var loggedInData = {
		role : {
			rolename : "Admin",
			roleid : 1
		},
		accessToken : "123",
		userName : "Admin"
	}

	it('authenticationSvc should exist', function() {
	    expect(authenticationSvc).toBeDefined();
	});

	it('should exist authenticationSvc.getUserInfo()', function(){
		expect(angular.isFunction(authenticationSvc.getUserInfo)).toBe(true)
	});

	it('should exist $scope.login()', function(){
		expect(angular.isFunction($scope.login)).toBe(true)
	});

	it("authenticationSvc.getUserInfo() should send a call and return a response", function(){

		var result;
		spyOn(authenticationSvc, 'getUserInfo').and.callFake(function(){
			return "userInfo";
		})

		$scope.$apply(function(){
			result = authenticationSvc.getUserInfo();
		})

		expect(authenticationSvc.getUserInfo).toHaveBeenCalled();
		expect(result).toEqual("userInfo");
	});

	it("$scope.login() should send a call and change the state", function(){
		
		spyOn(authenticationSvc, 'login').and.callFake(function(){
			var deffered = q.defer();
			deffered.resolve(loggedInData);
			return deffered.promise;
		})

		spyOn($state, 'go');

		expect($scope.userInfo).toBeNull();
		$scope.$apply(function(){
			$scope.login();
		})

		expect(authenticationSvc.login).toHaveBeenCalled();
		expect($scope.userInfo).not.toBeNull();
		expect($state.go).toHaveBeenCalledWith('adminInbox', {}, {reload : true});
	})
})