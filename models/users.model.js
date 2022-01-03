const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is Required',
    match: [/^[a-zA-Z0-9]/, 'is Invalid'],
    index: true,
  },

  email: {
    type: String,
    unique: true,
    required: 'Email is Required',
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },

  password: {
    type: String,
    required: 'Password is Required',
  }


}, { timestamps: true}, { versionKey: false } );

userSchema.plugin(uniqueValidator, { message: 'already Taken'});

const User =  mongoose.model('User', userSchema);

module.exports = { User };

/*  
notes while creating userModel
 - username and email should be unique and to have regular expression
 - encrypt password before storing (never store plain password)
*/
 