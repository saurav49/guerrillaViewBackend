const express = require('express');
const router = express.Router();

const { tryCatchWrapper } = require('../utils');
const { signUpUser, loginUser } = require('../controllers/users.controller');

router.route('/signup')
.post(async (req, res, next) => {  // signup for new user

  tryCatchWrapper(res, () => signUpUser(req, res));

})


router.route('/login')
.post(async (req, res, next) => {  // login user

  tryCatchWrapper(res, () => loginUser(req, res));
  
})

module.exports =  router; 