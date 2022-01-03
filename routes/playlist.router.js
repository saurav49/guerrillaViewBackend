const express = require('express');
const router = express.Router();

const { tryCatchWrapper } = require('../utils');
const { deleteVideoFromPlaylist, getAllPlaylist, addVideoToPlaylist, getAllVideosFromPlaylist, deletePlaylist, createNewPlaylist, populateVidsFromPlaylistForUser } = require('../controllers/playlist.controller');


// CREATE NEW PLAYLIST DATABASE OF A USER
router.route('/')
.post( async (req, res, next) => {

    const { userId, name, videoId } = req.body.playlistInfo;
    
    if(!userId) {
      return res.json({
        success: true,
        message: 'UserId not present',
      })
    }

    await createNewPlaylist(res, userId, name, videoId);
})

router.route('/getAllVids/:userId')
.get( async (req, res, next) => {

  const id = req.params.userId;

  await populateVidsFromPlaylistForUser(res, id);
  
})

// get all playlist
router.route('/user/:userId')
.get( async (req, res, next) => {

  const id = req.params.userId;
  tryCatchWrapper(res, () => getAllPlaylist(res, id));

})

// add video to a playlist / get all videos from a particular playlist / delete a playlist
router.route('/:playlistId')
.post( async (req, res, next) => {

  const playlistId = req.params.playlistId;
  const video  = req.body.video;

  tryCatchWrapper(res, () => addVideoToPlaylist(res, playlistId, video));

})
.get( async (req, res, next) => {

  const playlistId = req.params.playlistId;
  tryCatchWrapper(res, () => getAllVideosFromPlaylist(res, playlistId));

})
.delete( async (req, res, next) => {

  const playlistId = req.params.playlistId;
  tryCatchWrapper(res, () => deletePlaylist(res, playlistId));

});

// delete a video from a playlist
router.route('/:playlistId/:videoId')
.delete( async (req, res, next) => {

  tryCatchWrapper(res, () => deleteVideoFromPlaylist(req, res));
  
});

module.exports = router;
