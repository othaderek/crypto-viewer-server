const mongoose = require('mongoose');
const validator = require('validator');

// User schema
// Add saved cryptos for watch crypto feature
const userSchema = mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: async function(username) {
        const user = await this.constructor.findOne({ username });
        if(user) {
          if(this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: props => 'The specified username is already in use.'
    },
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
// Hash password
userSchema.pre('save', async function(){
  const user = this

  if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);

  next()
})
// model
const User = mongoose.model('User', userSchema)

module.exports = User;