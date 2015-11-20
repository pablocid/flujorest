'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PropsSchema = new Schema({
  id:{type:String,trim:true},
  string:String,
  array:[String],
  arrayMix:[],
  date:Date,
  number:Number,
  boolean: Boolean,
  html:String,
  lang:String
},{ _id : false });

var MainSchemaSchema = new Schema({
  section:{type:String,required: true,trim:true,lowercase: true},
  properties:[PropsSchema],
  created:{type:Date,default:Date.now},
  updated:{type:Date,default:Date.now},
  status:Boolean
},{collection:'mainSchema'});

module.exports = mongoose.model('MainSchema', MainSchemaSchema);
