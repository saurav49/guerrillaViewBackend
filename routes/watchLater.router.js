const express = require('express');
const router = express.Router();

const { tryCatchWrapper } = require('../utils');
const { getAllWatchLaterVideos, addVideoToWatchLater, deleteVideoFromWatchLater } = require('../controllers/watchLater.controller');


router.route('/')
.get( async (req, res, next) => {
  
  tryCatchWrapper(res, () => getAllWatchLaterVideos(res))

})
.post( async (req, res, next) => {

  tryCatchWrapper(res, () => addVideoToWatchLater(req, res))

})

router.route('/:id')
.delete( async (req, res, next) => {

  tryCatchWrapper(res, () => deleteVideoFromWatchLater(req, res))

})

module.exports = router;