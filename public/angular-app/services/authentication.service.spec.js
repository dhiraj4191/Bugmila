describe('Authentication Service', function(){
	var authenticationSvc,
		httpBackend;

	beforeEach(angular.mock.module('bugMilaApp'));

	beforeEach(inject(function($httpBackend, _authenticationSvc_){
			authenticationSvc = _authenticationSvc_;
			httpBackend = $httpBackend;
		})
	)

 	afterEach(function() {
    	httpBackend.verifyNoOutstandingExpectation();
    	httpBackend.verifyNoOutstandingRequest();
  	});

  	it('should exists authenticationSvc', function(){
 		expect(authenticationSvc).toBeDefined();
 	});

 	it('should exists login()', function(){
 		expect(angular.isFunction(authenticationSvc.login)).toBe(true)
 	});

 	it('should exists logout()', function(){
 		expect(angular.isFunction(authenticationSvc.logout)).toBe(true)
 	});

 	it('should exists getUserInfo()', function(){
 		expect(angular.isFunction(authenticationSvc.getUserInfo)).toBe(true)
 	});

 	it('login() should send a call and return a response', function(){

 		var userName = 'admin';
 		var password = 'a';
 		var loginData = {
 			access_token : '1',
 			userName : 'admin',
 			userId : 0,
 			Role : {
 				roleid : 1,
 				rolename : 'Admin'
 			}
 		}

 		var userInfo = {
 			accessToken : loginData.access_token,
 			userName : loginData.userName,
 			userId : loginData.userId,
 			role : loginData.Role
 		}

 		httpBackend
 			.expectPOST('/login', {userName : userName, password: password})
 			.respond(200, {loginData});

 		var result;
 		authenticationSvc.login(userName, password).then(function(res){
 			result = res;
 		})

 		httpBackend.flush();
 		expect(result).toEqual(userInfo);
 	});

 	it('logout() should send a call and return a response', function(){

 		httpBackend
 			.expectPOST('/logout')
 			.respond(200);

 		var result;
 		authenticationSvc.logout().then(function(res){
 			result = res;
 		})

 		httpBackend.flush();
 		expect(result).toEqual("Logged out");
 	});

 	it('getUserInfo() should return userinfo', function(){
 		expect(authenticationSvc.userInfo).toBeUndefined();
 		expect(authenticationSvc.getUserInfo()).toBeNull();
 		authenticationSvc.userInfo = 'fakeUserInfo'
 		expect(authenticationSvc.userInfo).not.toBeUndefined();
 		expect(authenticationSvc.userInfo).toEqual('fakeUserInfo');
 	})

})