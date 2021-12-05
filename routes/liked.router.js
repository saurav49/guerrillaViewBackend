const express = require('express');
const router = express.Router();

const { tryCatchWrapper } = require('../utils');
const { getAllLikedVideos, addVideoToLiked, deleteVideoFromLiked } = require('../controllers/liked.controller');


router.route('/')
.get( async (req, res, next) => {

  tryCatchWrapper(res, () => getAllLikedVideos(res));

})
.post( async (req, res, next) => {

  tryCatchWrapper(res, () => addVideoToLiked(req, res));

});

router.route('/:id')
.delete( async (req, res, next) => {

  tryCatchWrapper(res, () => deleteVideoFromLiked(req, res));

});

module.exports = router;
