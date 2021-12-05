const express = require('express');
const router = express.Router();

const { tryCatchWrapper } = require('../utils');
const { getAllVideos, addNewVideo, addNewNote, deleteNoteById } = require('../controllers/videos.controller');

router.route('/')
.get(async(req, res, next) => {     // get all the videos
  
  tryCatchWrapper(res, () => getAllVideos(res))

})
.post(async (req, res, next) => {   // add new video

  tryCatchWrapper(res, () => addNewVideo(req, res))

})

router.route('/notes/:videoId')
.post(async (req, res, next) => {   // add new note

  tryCatchWrapper(res, () => addNewNote(req, res));
  
})

router.route('/notes/:videoId/:noteId')
.delete(async (req, res, next) => {  // delete note

  tryCatchWrapper(res, () => deleteNoteById(req, res));

})

module.exports =  router; 