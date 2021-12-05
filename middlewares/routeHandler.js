const routeHandler = (req, res, next) => {

  res.status(404).json({
    success: false,
    message: 'The route that you are looking for could not be found',
  })
};

module.exports = { routeHandler }