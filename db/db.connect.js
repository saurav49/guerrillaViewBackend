const mongoose = require('mongoose');
require('dotenv').config({ path: '../test.env'});

const connectToDb = async() => {
  try {
    const response = await mongoose.connect(process.env.DATABASE_URL,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    console.log('Connection Successful To The MongoDB Backend');
  } catch(error) {
    console.log('Something Went Wrong With The MongoDB Connection', error);
  }
}

module.exports = { connectToDb };