const express = require('express');
const router = express.Router();

const { tryCatchWrapper } = require('../utils');
const { deleteVideoFromPlaylist, getAllPlaylist, addNewPlaylist, addVideoToPlaylist, getAllVideosFromPlaylist, deletePlaylist, getAllVids } = require('../controllers/playlist.controller');

router.route('/')
.get( async (req, res, next) => {

  tryCatchWrapper(res, () => getAllPlaylist(req, res));

})
.post( async (req, res, next) => {

  tryCatchWrapper(res, () => addNewPlaylist(req, res));

});

router.route('/playlistVids')
.get( async (req, res, next) => {
  
  tryCatchWrapper(res, () => getAllVids(req, res));
  
})

router.route('/:playlistId')
.post( async (req, res, next) => {

  tryCatchWrapper(res, () => addVideoToPlaylist(req, res));

})
.get( async (req, res, next) => {

  tryCatchWrapper(res, () => getAllVideosFromPlaylist(req, res));

})
.delete( async (req, res, next) => {

  tryCatchWrapper(res, () => deletePlaylist(req, res));

});

router.route('/:playlistId/:videoId')
.delete( async (req, res, next) => {

  tryCatchWrapper(res, () => deleteVideoFromPlaylist(req, res));
  
});


module.exports = router;
