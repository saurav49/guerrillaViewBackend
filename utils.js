const tryCatchWrapper = async (res, callback, statusCode = 500) => {
  try {
    await callback();
  } catch(error) {
    res.status(statusCode).json({
      success: true,
      message: error.message,
    })
  }
}

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './test.env' });

const authVerify = (req, res, next) => {

  const secret = process.env.SECRET_KEY;

  const token = req.headers.authorization;

  console.log({ token });

  try {

    const decode = jwt.verify(token, secret);
    console.log({ decode });
    // req.user = { userId: decode.username };
    return next();

  } catch(error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized access, please add the token',
    })
  }
}

module.exports = { tryCatchWrapper, authVerify };