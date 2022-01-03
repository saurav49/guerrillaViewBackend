const { Liked } = require('../models/liked.model');
const { User } = require('../models/users.model');

const createNewPlaylist = async (res, userId) => {
  try {
    const liked = new Liked({ userId });
    const saveLiked = await liked.save();

    return res.json({
      success: true,
      likedVideos: saveLiked,
    })
  } catch(error) {
    return res.json({
      success: false,
      message: error.message,
    })
  }
}

const getAllLikedVideos = async (res, id) => {

  // let likedVideos = await Liked.find({}).populate('_id');

  // likedVideos = likedVideos.map((video) => video._id);
  
  // res.json({
  //   success: true,
  //   likedVideos,
  // })

  let likedVideos = await Liked.findOne({ userId: id });
  if(!likedVideos) {
    return res.json({
      success: false,
      message: 'User not found',
    })
  }

   likedVideos = await Liked.findOne({ userId: id}).populate({
    path: "videos", populate: {
      path: "_id",
      model: "Video"
    }
  })

  likedVideos = {...likedVideos._doc, videos: likedVideos._doc.videos.map((video) => video._id)}

  res.json({
    success: true,
    likedVideos: likedVideos,
  });

}

const addVideoToLiked = async (req, res, id) => {

  // const liked = req.body.video;

  // const newLikedVideo = new Liked(liked);
  // const saveLikedVideo = await newLikedVideo.save();

  // res.json({
  //   success: true,
  //   saveLikedVideo,
  // })

  const liked = req.body.video;

  const likedVideos = await Liked.findOne({ userId: id });
  if(!likedVideos) {
    return res.json({
      success: false,
      message: "User not found",
    })
  }

  likedVideos.videos.push(liked);
  await likedVideos.save();

  const populateData = await Liked.findOne({ userId: id }).populate({
      path: "videos", populate: {
      path: "_id",
      model: "Video"
    }
  });
  
  res.json({
    success: true,
    saveLikedVideo: {...populateData._doc, videos: populateData._doc.videos.map((video) => video._id)},
  });
  
}

const deleteVideoFromLiked = async (req, res, userId, id) => {

  // const { id } = req.params;

  // const deletedVideo = await Liked.findByIdAndDelete( id );

  // res.json({
  //   success: true,
  //   deletedVideo,
  // })

  const foundUser = await Liked.findOne({ userId: userId })

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
    const foundUser = await Liked.findOne({ userId });
    return foundUser;
  } catch(error) {
    return res.json({
      success: false,
      message: error.message
    })
  }
}

module.exports = { getAllLikedVideos, addVideoToLiked, deleteVideoFromLiked, createNewPlaylist, isUserPresent };