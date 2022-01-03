const express = require('express');
const router = express.Router();
const { History }  = require('../models/history.model');

const { tryCatchWrapper } = require('../utils');
const { getAllHistoryVideos, addVideoToHistory, deleteVideoFromHistory, createNewPlaylist, isUserPresent } = require('../controllers/history.controller');

// CREATE NEW HISTORY DATABASE OF A USER
router.route('/')
.post( async (req, res, next) => {

    const userId = req.body.userId;
    const foundUser = await isUserPresent(userId, res);
    
    if(foundUser) {
      return res.json({
        success: true,
        historyVideos: foundUser,
      })
    }

    await createNewPlaylist(res, userId);
})

router.route('/:userId')
.get( async (req, res, next) => {

  const id = req.params.userId;
  tryCatchWrapper(res, () => getAllHistoryVideos(res, id));

})
.post( async (req, res, next) => {

  const id = req.params.userId;  
  tryCatchWrapper(res, () => addVideoToHistory(req, res, id));

})
.delete( async (req, res, next) => {

  const userId = req.params.userId;
  const id = req.body.video;
  tryCatchWrapper(res, () => deleteVideoFromHistory(req, res, userId, id));

})

module.exports = router;