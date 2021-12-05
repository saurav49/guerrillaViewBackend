const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({

  name : {
    type: String,
    required: 'Playlist name is Required',
    unique: true,
  },

  videoList: [ {_id: { type: Schema.Types.ObjectId, ref: 'Video' } } ],

}, { versionKey: false });

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = { Playlist };
