//model/botuser.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var botdetailsSchema = new Schema({
			sid: Number,
			bid: Number,
			intent:String,
			steps:Number,	
            qst: String,
            fld_type: String,
			ans:String,
			is_active: Boolean
});
//export our module to use in server.js
module.exports = mongoose.model('botdetails', botdetailsSchema);