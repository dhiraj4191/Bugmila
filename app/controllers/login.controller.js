
var Users = require("../models/users.model");
var Defects = require("../models/defects.model");
var userdefmap = require("../models/userDefMapping.model");
var jwt = require('jwt-simple');
var auth_helper = require('../helpers/authHelper');

exports.userlogin = function(request, response){
	var userName = request.body.userName;
    var password = request.body.password;

    var userData = {};

    Users.findOne({loginid : userName, password : password})
    	.populate('role')
    	.exec(function(err, userInfo){
    		if(err){
    			return response.send(401, "error");
    		}else{
    			if(userInfo){
    				var loginData = { userName: userName, userId : userInfo.userid, Role : userInfo.role };
	    			var expires = new Date();
			        expires.setDate((new Date()).getDate() + 5);

			        var token = jwt.encode({
			            userName: userName,
			            expires: expires
			        }, request.app.get('jwtTokenSecret'));

			        request.app.get("tokens").push(token);

			        loginData.access_token = token; 
			        userData.loginData = loginData;

			        response.send(200, userData);
    			}else{
    				return response.send(401, "error");
    			}		    			
		    }
    	})


};
