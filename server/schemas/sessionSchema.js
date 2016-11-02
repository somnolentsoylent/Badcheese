var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({

  id: Schema.Types.ObjectId,
  invitedUsers: [
    {
      User: {type: Number}, //Schema.Types.ObjectId}, //, ref: 'User'},
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