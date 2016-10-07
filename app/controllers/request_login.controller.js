
var employees = require("../models/login.model");
var defects = require("../models/defects.model");
var userdefmap = require("../models/userDefMapping.model");
var jwt = require('jwt-simple');
var auth_helper = require('../controllers/auth_helper');
//app.set('jwtTokenSecret', '123456ABCDEF');

exports.userlogin = function(request, response){
	var userName = request.body.userName;
    var password = request.body.password;
    console.log("here : " + request.app.get("tokens"));
    
	employees.find({loginid : userName, password : password}, function(err, data){
		if(err){
			res.send({auth : "error occured"});
		}else{
			console.log(data);
			if(Object.keys(data).length > 0){
				var expires = new Date();
		        expires.setDate((new Date()).getDate() + 5);
		        var token = jwt.encode({
		            userName: userName,
		            expires: expires
		        }, request.app.get('jwtTokenSecret'));

		        request.app.get("tokens").push(token);

	        	test(function(data1){
	        		console.log("aaaaaaa     "+ data1);
	        		var x = { access_token: token, userName: userName, userDefects : data1};
	         		response.send(200, x);
	         	});
        		
			}else{
				response.send(401, "Invalid credentials");
			}
		}
	});
};
 



var test = function(cc){
	defects.find({owner : 1}, function(err, data){
		if(err){
			return cc(err);
		}else{
			console.log("defects found : " + data);
			if(Object.keys(data).length > 0){
				return cc(data);
			}else{
				return cc(data);
			}
		}
	});
}
