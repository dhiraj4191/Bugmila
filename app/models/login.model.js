'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NameSchema = new Schema({
	userid : Number,
  	firstname : String,
  	lastname : String,
  	loginid : String,
  	role : String,
  	password : String
	},
	{
		timestamp : true
	}
);

module.exports = mongoose.model('employees', NameSchema);