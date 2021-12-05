const { WatchLater } = require('../models/watchLater.model');

const getAllWatchLaterVideos = async (res) => {

  let watchLaterVideos = await WatchLater.find({}).populate('_id');

  watchLaterVideos = watchLaterVideos.map((video) => video._id);

  res.status(200).json({
    success: true,
    watchLaterVideos,
  })

}

const addVideoToWatchLater = async (req, res) => {

  const watchLaterVideo = req.body.video;

  const newWatchLaterVideo = new WatchLater(watchLaterVideo);
  const saveWatchLaterVideo = await newWatchLaterVideo.save();

  res.json({
    success: true,
    saveWatchLaterVideo,
  })

}

const deleteVideoFromWatchLater = async (req, res) => {

  const { id }  = req.params;
  const videoToBeDeleted = await WatchLater.findByIdAndDelete( id );
  
  res.json({
    success: true,
    videoToBeDeleted,
  })

}

module.exports = { getAllWatchLaterVideos, addVideoToWatchLater, deleteVideoFromWatchLater };