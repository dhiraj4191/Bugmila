describe('Users Service', function(){
	
	var userService,
		httpBackend;

	beforeEach(angular.mock.module('bugMilaApp'));

	beforeEach(inject(function($httpBackend, _userService_){
			userService = _userService_;
			httpBackend = $httpBackend;
		})
	)

 	afterEach(function() {
    	httpBackend.verifyNoOutstandingExpectation();
    	httpBackend.verifyNoOutstandingRequest();
  	});

	//Checks whether userService is defined in user.service.js
	it('userService should exist', function() {
	    expect(userService).toBeDefined();
	});

	//check whether getAllUsers Function exists
	it('should exist getAllUsers()', function(){
		expect(angular.isFunction(userService.getAllUsers)).toBe(true)
	});

	it('should exist getRoles()', function(){
		expect(angular.isFunction(userService.getRoles)).toBe(true)
	});

	it('should exist getStatus()', function(){
		expect(angular.isFunction(userService.getStatus)).toBe(true)
	});	

	it('should exist updateUser()', function(){
		expect(angular.isFunction(userService.updateUser)).toBe(true)
	});

	it('should exist updateUser()', function(){
		expect(angular.isFunction(userService.updateUser)).toBe(true)
	});

	it('getAllUsers() should send a call and return a response', function(){
		var fakeData = [{
			userid : 0,
			name : {
				firstname : "admin",
				lastname : "admin"
			},
			role : {
				roleid : 0,
				rolename : "Admin"
			},
			createdby : 0,
			loginid : "admin"
		}];
		httpBackend
			.expectPOST('/getUsers', {})
			.respond(200, fakeData);

		var result=[];
		userService.getAllUsers(function(data){
			result.push(data[fakeData[0].userid]);
		});
		
		httpBackend.flush();
		expect(result).toEqual(fakeData);
		
	});

	it('getRoles() should send a call and return a response', function(){
		var fakeRoleData = [{
			roleid : 0,
			rolename : "Admin"	
		}];
		httpBackend
			.expectPOST('/getRoles', {})
			.respond(200, fakeRoleData);

		var result = [];
		userService.getRoles(function(roles){
			result.push(roles[fakeRoleData[0].roleid]);
		});

		httpBackend.flush();
		expect(result).toEqual(fakeRoleData);
	})

	it('getStatus() should return a value', function(){
		var status = ["Open", "Closed"];
		var result = userService.getStatus();
		expect(result).toEqual(status);
		expect(result[0]).toEqual("Open");
		expect(result[1]).toEqual("Closed");
	})
	

	it('updateUser() should send a call and return a response', function(){
		var updateData = [{
			roleid : 0,
			rolename : "Admin"	
		}];
		httpBackend
			.expectPOST('/updateUser', {updateData})
			.respond(200);
		var result;
		userService.updateUser(updateData, function(res){
			result = res;
		});

		httpBackend.flush();
		expect(result).toEqual("Data updated");
	})

	it('deleteUser() should send a call and return a response', function(){
		var userid = 0
		httpBackend
			.expectPOST('/deleteUser', {userid})
			.respond(200);
		var result;
		userService.deleteUser(userid, function(res){
			result = res;
		});

		httpBackend.flush();
		expect(result).toEqual("user deleted");
	})
});