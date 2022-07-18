// dependencies //
const { Schema, model } = require('mongoose');

// User Schema 
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true })

// model
const User = model('User', userSchema);


//export 
module.exports = User;