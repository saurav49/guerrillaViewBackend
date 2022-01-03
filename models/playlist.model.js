const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: 'User Id is required',
  },

  name: {
    type: String,
    required: 'Playlist name is Required',
    unique: true,
  },

  videoList: [ { type: Schema.Types.ObjectId, ref: 'Video' } ],

}, { versionKey: false });

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = { Playlist };
