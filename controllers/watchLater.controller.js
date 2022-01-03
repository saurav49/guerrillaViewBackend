const { WatchLater } = require('../models/watchLater.model');
const { User } = require('../models/users.model');

const createNewPlaylist = async (res, userId) => {
  try {
    const watchLater = new WatchLater({ userId });
    const saveWatchLater = await watchLater.save();

    return res.json({
      success: true,
      watchLaterVideos: saveWatchLater,
    })
  } catch(error) {
    return res.json({
      success: false,
      message: error.message,
    })
  }
}


const getAllWatchLaterVideos = async (res, id) => {

  // let watchLaterVideos = await WatchLater.find({}).populate('_id');

  // watchLaterVideos = watchLaterVideos.map((video) => video._id);

  // res.status(200).json({
  //   success: true,
  //   watchLaterVideos,
  // })

  let watchLater = await WatchLater.findOne({ userId: id})
  if(!watchLater) {
    return res.json({
      success: false,
      message: 'User not present'
    })
  }

  watchLater = await WatchLater.findOne({ userId: id}).populate({
    path: "videos", populate: {
      path: "_id",
      model: "Video"
    }
  })

  watchLater = {...watchLater._doc, videos: watchLater._doc.videos.map((video) => video._id)}

  res.json({
    success: true,
    watchLaterVideos: watchLater,
  });

}

const addVideoToWatchLater = async (req, res, id) => {

  // const watchLaterVideo = req.body.video;

  // const newWatchLaterVideo = new WatchLater(watchLaterVideo);
  // const saveWatchLaterVideo = await newWatchLaterVideo.save();

  // res.json({
  //   success: true,
  //   saveWatchLaterVideo,
  // })

  const watchLater = req.body.video;

  const watchLaterVideos = await WatchLater.findOne({ userId: id });
  if(!watchLaterVideos) {
    return res.json({
      success: false,
      message: "User not found",
    })
  }

  watchLaterVideos.videos.push(watchLater);
  await watchLaterVideos.save();

  const populateData = await WatchLater.findOne({ userId: id }).populate({
      path: "videos", populate: {
      path: "_id",
      model: "Video"
    }
  });
  
  res.json({
    success: true,
    saveWatchLaterVideo: {...populateData._doc, videos: populateData._doc.videos.map((video) => video._id)},
  });

}

const deleteVideoFromWatchLater = async (res, userId, id) => {

  // const { id }  = req.params;
  // const videoToBeDeleted = await WatchLater.findByIdAndDelete( id );
  
  // res.json({
  //   success: true,
  //   videoToBeDeleted,
  // })

  const foundUser = await WatchLater.findOne({ userId: userId })

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
    const foundUser = await WatchLater.findOne({ userId });
    return foundUser;
  } catch(error) {
    return res.json({
      success: false,
      message: error.message
    })
  }
}


module.exports = { getAllWatchLaterVideos, addVideoToWatchLater, deleteVideoFromWatchLater, createNewPlaylist, isUserPresent };