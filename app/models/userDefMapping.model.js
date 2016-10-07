'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserDefMappingSchema = new Schema({
  	itemid : Number,
  	Userid : Number,
  	isActive : Boolean
});

module.exports = mongoose.model('employeemapping', UserDefMappingSchema);