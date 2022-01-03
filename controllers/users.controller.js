const { User } = require('../models/users.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: "../test.env"});


const generateAndGetToken = (res, user) => {

  const privateKey = process.env.SECRET_KEY

  jwt.sign({ userId: user.username }, privateKey, { expiresIn: '24h'},
  function(err, token) {
    if(err) {
      sendError(res, err.message);
    }
    else {
      res.json({
        success: true,
        token,
        user,
      })
    } 
  })

}


const signUpUser = async (req, res) => {

  const user = req.body.user;

  const newUser = new User(user);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10)

  // set user password to hashed password
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const savedUser = await newUser.save();

  return generateAndGetToken(res, savedUser)

}


const loginUser = async (req, res) => {

  const { email, password } = req.body.user;

  const user = await User.findOne({ email });

  if(!user) {
    return res.status(404).json({
      success: false,
      message: "user doesn't already exits"
    })
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if(!isValidPassword) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password! Please try again"
      })
  }

  return generateAndGetToken(res, user);

  // if(user) {
    
  //   const validPassword = await bcrypt.compare(password, user.password);

  //   if(!validPassword) {
      //   return res.status(403).json({
      //   success: false,
      //   message: "Incorrect password! Please try again"
      // })
  //   }


  //   // if(validPassword) {
  //   //   const token = jwt.sign({ userId: user.username }, secret, {
  //   //     expiresIn: '24h'
  //   //   });

  //   //    res.json({
  //   //     success: true,
  //   //     token,
  //   //     username: user.username,
  //   //   })

  //   // } else {
  //   //   res.status(400).json({
  //   //     success: false,
  //   //     message: 'incorrect password, please try again',
  //   //   })
  //   // }

  // } else {
  //   res.status(401).json({
  //     success: false,
  //     message: 'user not found',
  //   })
  // }
}

module.exports = { signUpUser, loginUser };