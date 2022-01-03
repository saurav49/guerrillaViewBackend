const mongoose  = require('mongoose');
const { Schema } = mongoose;

const likedSchema = new Schema({

  userId: {
      type: Schema.Types.ObjectId, ref: 'User',
    },
    
 videos: [ { _id: {
    type: Schema.Types.ObjectId, ref: 'Video',
  } } ]

}, { versionKey: false } );

const Liked = mongoose.model('Liked', likedSchema);

module.exports = { Liked };