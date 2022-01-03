const express = require('express');
const router = express.Router();

const { tryCatchWrapper } = require('../utils');
const { getAllLikedVideos, addVideoToLiked, deleteVideoFromLiked, createNewPlaylist, isUserPresent } = require('../controllers/liked.controller');


// CREATE NEW LIKED DATABASE OF A USER
router.route('/')
.post( async (req, res, next) => {

    const userId = req.body.userId;
    const foundUser = await isUserPresent(userId, res);
    
    if(foundUser) {
      return res.json({
        success: true,
        likedVideos: foundUser,
      })
    }

    await createNewPlaylist(res, userId);
})

router.route('/:userId')
.get( async (req, res, next) => {

  const id = req.params.userId;
  tryCatchWrapper(res, () => getAllLikedVideos(res, id));

})
.post( async (req, res, next) => {

  const id = req.params.userId;  
  tryCatchWrapper(res, () => addVideoToLiked(req, res, id));

})
.delete( async (req, res, next) => {

  const userId = req.params.userId;
  const id = req.body.video;
  tryCatchWrapper(res, () => deleteVideoFromLiked(req, res, userId, id));

});

module.exports = router;
