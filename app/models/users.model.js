'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-concrete-timestamps');
var autoIncrement = require('mongoose-auto-increment');
var validators = require('mongoose-validators');

autoIncrement.initialize(mongoose);

var UserSchema = new Schema({
	userid : {
		type : Number,
		message : "Only numbers are required for this field",
		required : true
	},
	loginid : {
		type : String,
		validate : validators.isAlphanumeric()
	},
	name : {
		firstname : {
			type : String,
			required : true,
			validate : validators.isAlpha(),
			required : true
		},
		lastname : {
			type : String,
			validate : validators.isAlpha()
		}
	},
	createdby : {
		type : Number,
		required : true,
		validate : validators.isNumeric()
	},
	role : {
		type :Schema.Types.ObjectId,
		ref : 'roles',
		required : true
	},
	password : {
		type : String,
		required : true
	}
});

UserSchema.plugin(autoIncrement.plugin, {model : 'users', field : 'userid'});
UserSchema.plugin(timestamps);

module.exports = mongoose.model('users', UserSchema);