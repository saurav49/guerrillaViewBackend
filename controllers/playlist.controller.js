const { Playlist } = require('../models/playlist.model');

const createNewPlaylist = async (res, userId, name, videoId) => {

  try {
    const playlist = new Playlist({ userId, name });
    const savePlaylist = await playlist.save();


    if(!videoId) {
      return res.json({
        success: true,
        playlists: savePlaylist,
      })
    }

    savePlaylist.videoList.push(videoId);
    await savePlaylist.save();

    return res.json({
      success: false,
      playlists: savePlaylist,
    })

  } catch(error) {
    return res.json({
      success: false,
      message: error.message,
    })
  }
}

const getAllPlaylist = async (res, id) => {
  const allPlaylist = await Playlist.find({ userId: id });

  if(allPlaylist.length === 0) {
    return res.json({
      success: false,
      message: "Playlist not present for the particular user",
    })
  }

  res.json({
    success: true,
    allPlaylist: allPlaylist,
  });

}

const addVideoToPlaylist = async (res, playlistId, video) => {
  let playlist = await Playlist.findOne({ _id: playlistId });


  if(!playlist) {
    return res.json({
      success: false,
      message: 'Playlist not found',
    })
  }

  playlist.videoList.push(video);
  playlist = await playlist.save();
  
  return res.json({
    success: true,
    playlist,
    playlistId,
    videoId: video, 
  })
  
}

const getAllVideosFromPlaylist = async (res, playlistId) => {
  const playlist = await Playlist.findOne({ _id: playlistId });

  if(!playlist) {
    return res.json({
      success: false,
      message: 'Playlist not found',
    })
  }

  const playlistVids = await Playlist.findOne({ _id: playlistId }).populate('videoList');

  return res.json({
    success: true,
    allPlaylistVids: playlistVids.videoList,
    allPlaylistWithVids,
  })
}

const deletePlaylist = async (res, playlistId) => {
  
  const playlist = await Playlist.findOne({ _id: playlistId });

  if(!playlist) {
    return res.json({
      success: false,
      message: 'Playlist not found',
    })
  }

  await Playlist.findByIdAndDelete(playlistId);
  
  return res.json({
    success: true,
    deletedPlaylistId: playlistId,
  })
  
}

const deleteVideoFromPlaylist = async (req, res) => {

  const { playlistId, videoId } = req.params;
  
  const playlist = await Playlist.findOne({ _id: playlistId });

  if(!playlist) {
    return res.json({
      success: false,
      message: 'Playlist not found',
    })
  }

  playlist.videoList.pull(videoId);
  const savePlaylist = await playlist.save();

  res.json({
    success: true,
    savePlaylist,
    playlistId,
    videoId,
  });

}

const populateVidsFromPlaylistForUser = async (res, id) => {
  try {

    const foundUser = await Playlist.findOne({ userId: id });

    if(!foundUser) {
      return res.json({
        success: false,
        message: 'No Playlist Present of that particular User',
      })
    }

    const allPlaylistWithVids = await Playlist.find({ userId: id }).populate('videoList');

    return res.json({
      success: false,
      populatePlaylistVids: allPlaylistWithVids,
    })

  } catch(error) {
    return res.json({
      success: false,
      message: error.message,
    })
  }
  
}


module.exports = { getAllPlaylist, addVideoToPlaylist, getAllVideosFromPlaylist, deletePlaylist, deleteVideoFromPlaylist, createNewPlaylist, populateVidsFromPlaylistForUser };