const express = require('express');
const router = express.Router();

const { tryCatchWrapper } = require('../utils');
const { getAllWatchLaterVideos, addVideoToWatchLater, deleteVideoFromWatchLater, isUserPresent, createNewPlaylist } = require('../controllers/watchLater.controller');


// CREATE NEW WATCHLATER DATABASE OF A USER
router.route('/')
.post( async (req, res, next) => {

    const userId = req.body.userId;
    const foundUser = await isUserPresent(userId, res);
    
    if(foundUser) {
      return res.json({
        success: true,
        watchLaterVideos: foundUser,
      })
    }

    await createNewPlaylist(res, userId);
})

router.route('/:userId')
.get( async (req, res, next) => {
  
  const id = req.params.userId;
  tryCatchWrapper(res, () => getAllWatchLaterVideos(res, id))

})
.post( async (req, res, next) => {

  const id = req.params.userId;  
  tryCatchWrapper(res, () => addVideoToWatchLater(req, res, id))

})

router.route('/:userId')
.delete( async (req, res, next) => {

  const userId = req.params.userId;
  const id = req.body.video;
  tryCatchWrapper(res, () => deleteVideoFromWatchLater(res, userId, id))

})

module.exports = router;