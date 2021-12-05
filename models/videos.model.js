
const  mongoose  = require('mongoose');
const { Schema } = mongoose;
  

const videoSchema = new Schema({

  id: {
    type: String,
    required: 'Id is Required',
    unique: true,
  },

  name: {
    type: String,
    trim: true,
    required: 'Video Name is Required',
  },

  desc: {
    type: String,
    trim: true,
    required: 'Video Description is Required',
  },

  category: {
    type: String,
    trim: true,
    required: 'Video Category is Required',
  },

  avatar: {
    type: String,
    trim: true,
    required: 'Image URL is Required',
  },

  notes: [ 
    { 
      note: { type: String, trim: true },
    }
  ]

}, { versionKey: false });

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video };


