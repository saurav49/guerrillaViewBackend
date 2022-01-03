const mongoose = require("mongoose");
const { Schema } = mongoose;

const watchLaterSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId, ref: 'User',
  },

  videos: [ { _id: {
    type: Schema.Types.ObjectId, ref: 'Video',
  } } ]

}, { versionKey: false });

const WatchLater = mongoose.model('WatchLater', watchLaterSchema);

module.exports = { WatchLater };