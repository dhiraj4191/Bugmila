'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DefectsSchema = new Schema({
  	defectid : Number,
  	defectname : String,
  	owner : Number,
  	status : String,
  	createdby : Number,
  	createdon : Date,
	},
	{
		timestamp : true
	}
);

module.exports = mongoose.model('defects', DefectsSchema);