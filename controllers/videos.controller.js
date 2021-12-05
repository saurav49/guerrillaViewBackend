const { Video } = require('../models/videos.model');


const getAllVideos = async (res) => {

  const videos = await Video.find({});

  res.json({
    success: true,
    videos
  })

}

const addNewVideo = async (req, res) => {

  const newVideo = new Video(req.body);
  const savedVideo = await newVideo.save();

  res.status(201).json({
    success: true,
    video: savedVideo,
  })
}

const addNewNote = async (req, res) => {

  const { videoId,  } = req.params;
  const text  = req.body;

  console.log(text);

  let reqVideo = await Video.findById(videoId);

  reqVideo.notes.push(text);

  const saveVideo = await reqVideo.save();

  res.status(201).json({
    success: true,
    saveVideo
  })
}

const deleteNoteById = async (req, res) => {

  const { videoId, noteId } = req.params;

  let reqdNote = await Video.findOne({ _id: videoId });
  reqdNote.notes.pull(noteId);

  const saveVideo = await reqdNote.save();

  res.json({
    success: true,
    saveVideo,
  })
}

module.exports = { getAllVideos, addNewVideo, addNewNote, deleteNoteById };