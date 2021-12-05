const { User } = require('../models/users.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signUpUser = async (req, res) => {

  const user = req.body.user;

  const newUser = new User(user);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10)

  // set user password to hashed password
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const savedUser = await newUser.save();

  res.json({
    success: true,
    savedUser,
  })

}


const loginUser = async (req, res) => {

  const secret = 'D8oU0W0+7AsE1q7E39/cVoqtIZnKUDUAi+ylG+y0FVF20h1xz3nlDISL5fj0MUf6kAKjUjDMM2LuKtONokkNZ4Z5mzLomxYS+lCNmM6ul3K+1J7w/0SDCQMq+m4ddsDdcEG5Fcx7ImKZDoHJ7fWfW1zHG6y0p3lpwV2JraTYkCai6+7KV8+bAAWhZs7xLEij5qHLjo34JQAhMkXjOA4aFTnSzxLqpUxF2yhbT/LVhFSe06BA2echAufkb7DEAyHv+2BNa/Botod97EFzCt0rmFi84NYUHZpTZXb1xfmgfZI1oGnZ1Ox4glw7HarKvQiQh6ZFGmv9Gu2q+JM2lhrNLA==';

  const { email, password } = req.body.user;

  const user = await User.findOne({ email });

  if(user) {
    
    const validPassword = await bcrypt.compare(password, user.password);

    if(validPassword) {
      const token = jwt.sign({ userId: user.username }, secret, {
        expiresIn: '24h'
      });

       res.json({
        success: true,
        token,
        username: user.username,
      })

    } else {
      res.status(400).json({
        success: false,
        message: 'incorrect password, please try again',
      })
    }

  } else {
    res.status(401).json({
      success: false,
      message: 'user not found',
    })
  }
}

module.exports = { signUpUser, loginUser };