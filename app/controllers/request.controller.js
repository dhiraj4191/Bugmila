exports.login = function(req, res){
	console.log('Server started successfully....');
	res.render('login/login',{
		title: 'Bugmila',
		loginmesg : ''
	});
};

exports.basepage = function(req, res){
	console.log('base method called...');
	res.end('Ended...');
};

exports.userlogin = function(req, res){
	console.log('user login called...' + req.body.username + '....Pwd : ' + req.body.password);
	res.render('login/login',{
		title : 'BugMila',
		loginmesg: 'Login successfully....'
	});
};