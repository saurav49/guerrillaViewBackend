const { Playlist } = require('../models/playlist.model');
const _ = require('lodash');

const getAllPlaylist = async (req, res, next) => {

  const allPlaylist = await Playlist.find({});

  res.json({
    success: true,
    allPlaylist,
  });

}

const addNewPlaylist = async (req, res) => {

  const playlist  = req.body.playlist;

  console.log({ playlist });

  const newPlaylist = new Playlist(playlist);
  const saveNewPlaylist = await newPlaylist.save();

  console.log({ saveNewPlaylist });

  res.json({
    success: true,
    saveNewPlaylist,
  });

}

const addVideoToPlaylist = async (req, res) => {

  const { playlistId } = req.params;
  const video  = req.body.video;
  let foundPlaylist = await Playlist.findOne({ _id: playlistId });

  foundPlaylist.videoList.push(video);
  
  const videoAdded = new Playlist(foundPlaylist);
  const savePlaylist = await videoAdded.save();

  console.log({ savePlaylist });


  res.json({
    success: true,
    savePlaylist,
  })

}

const getAllVideosFromPlaylist = async (req, res) => {

  const { playlistId } = req.params;
  const foundPlaylist = await Playlist.findOne({ _id: playlistId }).populate({path:"videoList", populate: { path: "_id", model: "Video" }});

  res.json({
    success: true,
    videoList: foundPlaylist.videoList,
  })

}

const deletePlaylist = async (req, res) => {

  const { playlistId } = req.params;
  const deletedPlaylist = await Playlist.findOneAndDelete({ _id: playlistId });

  res.json({
    success: true,
    deletedPlaylist,
  })
}

const deleteVideoFromPlaylist = async (req, res) => {

  const { playlistId, videoId } = req.params;
  let foundPlaylist = await Playlist.findOne({ _id: playlistId });

  foundPlaylist.videoList.pull(videoId)

  const savePlaylist = await foundPlaylist.save();

  console.log({ savePlaylist });

  res.json({
    success: true,
    savePlaylist,
  });

}

const getAllVids = async (req, res) => {
  const allPlaylistVids = await Playlist.find({}).populate({ path: "videoList", populate: { path: "_id", model: "Video" }});


  res.json({
    success: true,
    allPlaylistVids
  })
}

module.exports = { getAllPlaylist, addNewPlaylist, addVideoToPlaylist, getAllVideosFromPlaylist, deletePlaylist, deleteVideoFromPlaylist, getAllVids };