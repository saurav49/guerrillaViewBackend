const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config({ path: "./test.env"});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const { errorHandler } = require('./middlewares/errorHandler');
const { routeHandler } = require('./middlewares/routeHandler');
const { connectToDb } = require('./db/db.connect');
const { authVerify } = require('./utils');

const videoRouter  = require('./routes/videos.router');
const userRouter = require('./routes/users.router');
const watchLaterRouter = require('./routes/watchLater.router');
const historyRouter = require('./routes/history.router');
const likedRouter = require('./routes/liked.router');
const playlistRouter = require('./routes/playlist.router');

connectToDb();

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Guerrilla View Backend',
  })
});

// console.log(authVerify);

app.use('/videos', videoRouter);
app.use('/users', userRouter);
app.use('/watchLater', watchLaterRouter);
app.use('/history', historyRouter);
app.use('/liked', likedRouter);
app.use('/playlist', playlistRouter);

// ROUTE HANDLER
app.use(routeHandler);

// ERROR HANDLER
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log('Guerilla View server started');
});