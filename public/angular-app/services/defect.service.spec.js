describe('Defect Service', function(){
	var defectService,
		httpBackend;

	beforeEach(angular.mock.module('bugMilaApp'));

	beforeEach(inject(function($httpBackend, _defectService_){
			defectService = _defectService_;
			httpBackend = $httpBackend;
		})
	)

 	afterEach(function() {
    	httpBackend.verifyNoOutstandingExpectation();
    	httpBackend.verifyNoOutstandingRequest();
  	});

 	it('should exists defectService', function(){
 		expect(defectService).toBeDefined();
 	});

 	it('should exists addDefect()', function(){
 		expect(angular.isFunction(defectService.addDefect)).toBe(true)
 	});

 	it('should exists getTesterDefects()', function(){
 		expect(angular.isFunction(defectService.getTesterDefects)).toBe(true)
 	});

 	it('should exists updateDefect()', function(){
 		expect(angular.isFunction(defectService.updateDefect)).toBe(true)
 	});

 	it('should exists deleteDefect()', function(){
 		expect(angular.isFunction(defectService.deleteDefect)).toBe(true)
 	});

 	it('should exists getDeveloperDefects()', function(){
 		expect(angular.isFunction(defectService.getDeveloperDefects)).toBe(true)
 	});

 	it('addDefect() should send a call and return a response', function(){
	 	var defectData = [{
	 			defectid : 1,
	 			defectname : 'def1',
	 			owner : 1,
	 			status : "Open"
	 		}]


	 		httpBackend
	 			.expectPOST('/adddefect', {defectData})
	 			.respond(200);

	 		var result = [];
	 		defectService.addDefect(defectData, function(res){
	 			result = res;
	 		})

	 		httpBackend.flush();
	 		expect(result).toEqual("Defect added");
	 	});

 	it('getTesterDefects() should send a call and return a response', function(){
 		var fakeDefectData = [{
 			defectid : 1,
 			defectname : 'def1',
 			owner : 1,
 			status : "Open"
 		}]

 		var userid = 0;

 		httpBackend
 			.expectPOST('/getTesterDefects', {userid})
 			.respond(200, fakeDefectData);

 		var result = [];
 		defectService.getTesterDefects(userid, function(res){
 			result.push(res[1]);
 		})

 		httpBackend.flush();
 		expect(result).toEqual(fakeDefectData);
 	});

 	it('updateDefect() should send a call and return a response', function(){
 		var defectData = [{
 			defectid : 1,
 			defectname : 'def1',
 			owner : 1,
 			status : "Open"
 		}];

 		httpBackend
 			.expectPOST('/updateDefect', {defectData})
 			.respond(200);

 		var result = [];
 		defectService.updateDefect(defectData, function(res){
 			result = res;
 		})

 		httpBackend.flush();
 		expect(result).toEqual("Defect updated");
 	});

 	it('deleteDefect() should send a call and return a response', function(){
 		var defectid = 1;

 		httpBackend
 			.expectPOST('/deleteDefect', {defectid})
 			.respond(200);

 		var result = [];
 		defectService.deleteDefect(defectid, function(res){
 			result = res;
 		})

 		httpBackend.flush();
 		expect(result).toEqual("Defect deleted");
 	});

 	it('getDeveloperDefects() should send a call and return a response', function(){
 		var fakeDefectData = [{
 			defectid : 1,
 			defectname : 'def1',
 			owner : 1,
 			status : "Open"
 		}]

 		var userid = 0;

 		httpBackend
 			.expectPOST('/getDeveloperDefects', {userid})
 			.respond(200, fakeDefectData);

 		var result = [];
 		defectService.getDeveloperDefects(userid, function(res){
 			result.push(res[1]);
 		})

 		httpBackend.flush();
 		expect(result).toEqual(fakeDefectData);
 	});
 })