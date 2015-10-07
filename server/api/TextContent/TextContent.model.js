'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TextContentSchema = new Schema({
  section: String,
  name: String,
  es:String,
  en:String,
  active: Boolean
},{collection:"TextContent"});

module.exports = mongoose.model('TextContent', TextContentSchema);
