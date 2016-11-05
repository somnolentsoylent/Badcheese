// boardSchema.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
  shapes: Object,
  name: {type: String, default: 'Saved Board'},
  date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Board', BoardSchema);