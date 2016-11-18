'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-concrete-timestamps');
var autoIncrement = require('mongoose-auto-increment');
var validators = require('mongoose-validators');

autoIncrement.initialize(mongoose);

var DefectsSchema = new Schema({
  	defectid : {
      type : Number,
      require : true,
      validate : validators.isNumeric()
    },
  	defectname : {
      type : String,
      require : true
    },
  	owner : {
      type: Number,
      require : true,
      validate : validators.isNumeric()
    },
  	status : {
      type :String,
      require : true,
      validate : validators.isAlpha()
    },
  	createdby : { 
      type : Number,
      require : true,
      validate : validators.isNumeric()
    },
    updatedby : {
      type : Number,
      require : true,
      validate : validators.isNumeric()
    }
});

DefectsSchema.plugin(autoIncrement.plugin, {model : 'defects', field : 'defectid'});
DefectsSchema.plugin(timestamps);

module.exports = mongoose.model('defects', DefectsSchema);