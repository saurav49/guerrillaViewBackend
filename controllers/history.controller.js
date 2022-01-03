const { History }  = require('../models/history.model');
const { User } = require('../models/users.model');

const createNewPlaylist = async (res, userId) => {
  try {
    const history = new History({ userId });
    const saveHistory = await history.save();
    
    return res.json({
      success: true,
      historyVideos: saveHistory,
    })
  } catch(error) {
    return res.json({
      success: false,
      message: error.message,
    })
  }
}

const getAllHistoryVideos = async (res, id) => {

  let history = await History.findOne({ userId: id})
  if(!history) {
    return res.json({
      success: false,
      message: 'User not present'
    })
  }


  history = await History.findOne({ userId: id}).populate({
    path: "videos", populate: {
      path: "_id",
      model: "Video"
    }
  })

  history = {...history._doc, videos: history._doc.videos.map((video) => video._id)}

  res.json({
    success: true,
    historyVideos: history,
  });

}

const addVideoToHistory = async (req, res, id) => {

  const historyVideo = req.body.video;

  const foundUser = await History.findOne({ userId: id });
  if(!foundUser) {
    return res.json({
      success: false,
      message: 'User not present',
    })
  }

  const video = foundUser.videos.find(({_id}) => _id == historyVideo._id);

  if(video) {

    const videoToBeDeleted = await foundUser.videos.pull({ _id: video._id });
    if(videoToBeDeleted) {

      foundUser.videos.push(historyVideo);
      await foundUser.save();

      const populateData = await History.findOne({ userId: id }).populate({
        path: "videos", populate: {
          path: "_id",
          model: "Video"
        }
      });

      res.json({
        success: true,
        saveHistoryVideo: {...populateData._doc, videos: populateData._doc.videos.map((video) => video._id)},
      });
    }
  } else {
      foundUser.videos.push(historyVideo);
      await foundUser.save();

      const populateData = await History.findOne({ userId: id }).populate({
        path: "videos", populate: {
          path: "_id",
          model: "Video"
        }
      });

      res.json({
        success: true,
        saveHistoryVideo: {...populateData._doc, videos: populateData._doc.videos.map((video) => video._id)},
      });
  }

}

const deleteVideoFromHistory = async (req, res, userId, id) => {
  const foundUser = await History.findOne({ userId: userId })

  if(!foundUser) {
    return res.json({
      success: false,
      message: 'User not present',
    })
  }

  await foundUser.videos.pull({ _id: id });
  const saveRes = await foundUser.save();

  res.json({
    success: true,
    videoToBeDeleted: saveRes,
  });

}

const isUserPresent =  async (userId, res) => {
  try {
    const foundUser = await History.findOne({ userId });
    return foundUser;
  } catch(error) {
    return res.json({
      success: false,
      message: error.message
    })
  }
}

module.exports = { getAllHistoryVideos, addVideoToHistory, deleteVideoFromHistory, createNewPlaylist, isUserPresent };