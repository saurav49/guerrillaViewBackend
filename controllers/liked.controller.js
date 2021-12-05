const { Liked } = require('../models/liked.model');


const getAllLikedVideos = async (res) => {

  let likedVideos = await Liked.find({}).populate('_id');

  likedVideos = likedVideos.map((video) => video._id);
  
  res.json({
    success: true,
    likedVideos,
  })

}

const addVideoToLiked = async (req, res) => {

  const liked = req.body.video;

  const newLikedVideo = new Liked(liked);
  const saveLikedVideo = await newLikedVideo.save();

  res.json({
    success: true,
    saveLikedVideo,
  })

}

const deleteVideoFromLiked = async (req, res) => {

  const { id } = req.params;

  const deletedVideo = await Liked.findByIdAndDelete( id );

  res.json({
    success: true,
    deletedVideo,
  })
   
}

module.exports = { getAllLikedVideos, addVideoToLiked, deleteVideoFromLiked };