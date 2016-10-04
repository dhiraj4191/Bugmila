exports.login = function(req, res){
	console.log('Server started successfully....');
	res.render('login/login',{
		title: 'Bugmila'
	});
};

exports.basepage = function(req, res){
	console.log('base method called...');
	res.end('Ended...');
}