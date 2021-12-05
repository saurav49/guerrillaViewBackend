const { History }  = require('../models/history.model');

const getAllHistoryVideos = async (res) => {

  let historyVideos = await History.find({}).populate('_id');

  historyVideos  = historyVideos.map((video) => video._id)

  res.json({
    success: true,
    historyVideos,
  });

}

const addVideoToHistory = async (req, res) => {

  const historyVideo = req.body.video;

  const video = await History.findById(historyVideo._id);

  if(video) {
    const videoToBeDeleted = await History.findByIdAndDelete( video._id );
    if(videoToBeDeleted) {
      const newHistoryVideo = new History(historyVideo);
      const saveHistoryVideo = await newHistoryVideo.save();

      res.json({
        success: true,
        saveHistoryVideo
      });
    }
  } else {
      const newHistoryVideo = new History(historyVideo);
      const saveHistoryVideo = await newHistoryVideo.save();

      res.json({
        success: true,
        saveHistoryVideo
      });
  }

}

const deleteVideoFromHistory = async (req, res) => {

  const { id } = req.params;
  const videoToBeDeleted = await History.findByIdAndDelete( id );

  res.json({
    success: true,
    videoToBeDeleted,
  });

}

module.exports = { getAllHistoryVideos, addVideoToHistory, deleteVideoFromHistory };