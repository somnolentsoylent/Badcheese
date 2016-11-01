var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({

  id: Schema.Types.ObjectId,
  invitedUsers: [{
    {
      User: {type: Schema.Types.ObjectId, ref: 'User'},
     Permission: String
    }
  }],
  imageUrl: String,
  name: String,
  host: { type: Schema.Types.ObjectId, ref: 'User' },
  private: Boolean
});

module.exports = mongoose.model('Session', SessionSchema);