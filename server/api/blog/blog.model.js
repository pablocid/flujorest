'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PropsSchema = new Schema({
  name: {type:String,required: true},
  value: String,
  descript:String,
  date:Date,
  content:String,
  active: Boolean
});

var BlogSchema = new Schema({
  name: {type:String,required: true},
  info: String,
  title:{type:String,required: true},
  created:{ type: Date, default: Date.now, required: true },
  content:String,
  active: { type: Boolean, default: 'true' },
  properties:[PropsSchema]
});



module.exports = mongoose.model('Blog', BlogSchema);
