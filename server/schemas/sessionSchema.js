var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
  invitedUsers: [
    {
      User: {type: Schema.Types.ObjectId, ref: 'User'},
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
    ref: 'User'
    // required: true
  },
  private: {
    type: Boolean,
    required: true
  },
  boards: [{type: [Schema.Types.ObjectId], ref: 'Board' }]
});

module.exports = mongoose.model('Session', SessionSchema);