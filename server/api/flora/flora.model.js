'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FloraSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
},{collection:'Flora'});

module.exports = mongoose.model('Flora', FloraSchema);
