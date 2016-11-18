'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-concrete-timestamps');
var autoIncrement = require('mongoose-auto-increment');
var validators = require('mongoose-validators');

autoIncrement.initialize(mongoose);

var RoleSchema = new Schema({
	roleid : {
		type : Number,
      	require : true,
      	validate : validators.isNumeric()
	},
	rolename : {
		type : String,
		require : true,
		validate : validators.isAlphanumeric()
	}
});

RoleSchema.plugin(autoIncrement.plugin, {model : 'roles', field : 'roleid'});
RoleSchema.plugin(timestamps);

module.exports = mongoose.model('roles', RoleSchema);