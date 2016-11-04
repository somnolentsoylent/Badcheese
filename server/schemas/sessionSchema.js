var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
  invitedUsers: [
    {
      email: String,
      permission: String
    }
  ],
  imageUrl: String,
  name: { 
    type: String,
    required: true
  },
  private: {
    type: Boolean,
    required: true
  },
  boards: [{type: [Schema.Types.ObjectId], ref: 'Board' }]
});

module.exports = mongoose.model('Session', SessionSchema);