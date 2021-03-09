const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const Schema = mongoose.Schema;
// User schema
// Add saved cryptos for watch crypto feature
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})
// Generate json auth tokens on sign up and sign in
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user.id.toString()}, process.env.SECRET);
  user.tokens = user.tokens.concat({token: token})
  await user.save()
  return token;
}

// Find credentials class method
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Unable to login')

  return user
}
// Hash password before password is saved to user instance
userSchema.pre('save', async function(next){
  const user = this

  if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);

  next()
})
// model
const User = mongoose.model('User', userSchema)

module.exports = User;