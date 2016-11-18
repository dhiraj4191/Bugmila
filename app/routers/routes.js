var express = require ('express');
var app = express();
var router = express.Router();
var loginController = require('../controllers/login.controller');
var userController = require('../controllers/user.controller')
var defectController = require('../controllers/defects.controller')
var auth_helper = require('../helpers/authHelper');

router.post('/login',loginController.userlogin);

router.get('/', function(req, res){
	res.sendfile("Home.html");
})

router.post('/logout', auth_helper.requiresAuthentication, function(req, res){
	var token= req.headers.access_token;
	console.log("for logout " + req.app.get("tokens"));
    auth_helper.removeFromTokens(req.app.get("tokens"), token);
    res.send(200);
});

router.post('/adduser', userController.insertUserData);

router.post('/adddefect', defectController.insertDefectsData);

router.post('/getUsers', userController.getUsersList);

router.post('/updateUser', userController.udpateUser);

router.post('/deleteUser', userController.deleteUser);

router.post('/getTesterDefects', defectController.getTesterDefects);

router.post('/getDeveloperDefects', defectController.getDeveloperDefects);

router.post('/updateDefect', defectController.updateDefect);

router.post('/deleteDefect', defectController.deleteDefect);

router.post('/addRole', userController.addRole);

router.post('/getRoles', userController.getRoles);

router.post('/getResponse', function(req, res){
	console.log("hello");
	res.send(200, {"howdy" : "world"});
});

module.exports = router;