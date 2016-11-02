var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
  invitedUsers: [
    {
      User: Number, //{type: Schema.Types.ObjectId, ref: 'User'},
     Permission: String
    }
  ],
  imageUrl: String,
  name: { 
    type: String,
    required: true
  },
  host: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    // required: true
  },
  private: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Session', SessionSchema);