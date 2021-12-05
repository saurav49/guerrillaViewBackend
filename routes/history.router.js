const express = require('express');
const router = express.Router();

const { tryCatchWrapper } = require('../utils');
const { getAllHistoryVideos, addVideoToHistory, deleteVideoFromHistory } = require('../controllers/history.controller');

router.route('/')
.get( async (req, res, next) => {

  tryCatchWrapper(res, () => getAllHistoryVideos(res));

})
.post( async (req, res, next) => {

  tryCatchWrapper(res, () => addVideoToHistory(req, res));

})

router.route('/:id')
.delete( async (req, res, next) => {

  tryCatchWrapper(res, () => deleteVideoFromHistory(req, res));

})

module.exports = router;