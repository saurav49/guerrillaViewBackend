const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId, ref: 'User',
  },

  videos: [ { _id: {
    type: Schema.Types.ObjectId, ref: 'Video',
  } } ]

}, { versionKey: false });

const History = mongoose.model('History', historySchema);

module.exports = { History };

