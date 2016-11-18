describe('AdminPanelController', function(){
	
	beforeEach(angular.mock.module('bugMilaApp'));

	var authenticationSvc, $state, userService, $mdDialog;

	beforeEach(inject(function($rootScope, $controller, _authenticationSvc_, _$state_, _userService_, $templateCache){
			$scope = $rootScope.$new();
			authenticationSvc = _authenticationSvc_;
			userService = _userService_;
			$state = _$state_;

			$templateCache.put('public/angular-app/views/inbox.html', '');

			controller = $controller('AdminPanelController', {
				$scope : $scope,
				authenticationSvc : authenticationSvc,
				userService : userService,
				$state : $state
			})
		}
	));

	it('authenticationSvc should exist', function() {
	    expect(authenticationSvc).toBeDefined();
	});

	it('userService should exist', function() {
	    expect(userService).toBeDefined();
	});

	it('should exist userService.getAllUsers()', function(){
		expect(angular.isFunction(userService.getAllUsers)).toBe(true)
	});

	it('should exist userService.getRoles()', function(){
		expect(angular.isFunction(userService.getRoles)).toBe(true)
	});

	it('should exist $scope.showUsers()', function(){
		expect(angular.isFunction($scope.showUsers)).toBe(true)
	});

	it('should exist $scope.updateUser()', function(){
		expect(angular.isFunction($scope.updateUser)).toBe(true)
	});

	it('should exist $scope.deleteUser()', function(){
		expect(angular.isFunction($scope.updateUser)).toBe(true)
	});

	it('should exist $scope.addUser()', function(){
		expect(angular.isFunction($scope.addUser)).toBe(true)
	});

	it('should exist $scope.addRole()', function(){
		expect(angular.isFunction($scope.addRole)).toBe(true)
	});

	it('should exist $scope.cancle()', function(){
		expect(angular.isFunction($scope.cancle)).toBe(true)
	});

	it('should exist $scope.logout()', function(){
		expect(angular.isFunction($scope.logout)).toBe(true)
	});

	it('should exist $scope.viewUsers()', function(){
		expect(angular.isFunction($scope.viewUsers)).toBe(true)
	});
})