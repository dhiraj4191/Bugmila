var express = require ('express');
var app = express();
var router = express.Router();
var reqCtrl = require('../controllers/request_login.controller');
var auth_helper = require('../controllers/auth_helper');

router.post('/api/login',reqCtrl.userlogin);

router.get('/', function(req, res){
	res.sendfile("Home.html");
})

router.post('/api/logout', auth_helper.requiresAuthentication, function(req, res){
	var token= req.headers.access_token;
	console.log("for logout " + req.app.get("tokens"));
    auth_helper.removeFromTokens(req.app.get("tokens"), token);
    res.send(200);
});
module.exports = router;