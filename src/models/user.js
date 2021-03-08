const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
  }
})
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Unable to login')

  return user
}
// Hash password
userSchema.pre('save', async function(next){
  const user = this

  if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);

  next()
})
// model
const User = mongoose.model('User', userSchema)

module.exports = User;