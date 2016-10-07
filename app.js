var port = 1337;
var express = require('./config/express');
var app = express();
app.set('jwtTokenSecret', '123456ABCDEF');
var tokens = [];
app.set('tokens', tokens);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.connection.once('open', function callback(){
	console.log("connection successful");
});
app.listen(port);
module.exports = app;
console.log('Server running at http://localhost:' + port);