// boardSchema.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
  shapes: Object,
  name: {type: String, required: true},
  date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Board', BoardSchema);