const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  username: {
    type: String,
    required: [true, "You can not leave the username field empty."],
    unique: true,
    trim: true,
    minlength: 3,
    max: 15
  },
  password: {
    type: String,
    required: [true, "You can not leave the password field empty."]
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super_admin'],
    required: true,
    default: 'user'
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
}, { timestamps: true });

userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password'))
    next()
  bcrypt.hash(user.password, 10, (err, passwordHash) => {
    if (err)
      next(err)
    user.password = passwordHash
    next()
  })
})

userSchema.methods.comparePassword = function (password, cb) {
  var user = this
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err)
      cb(err)
    else {
      if (!isMatch)
        cb(null, isMatch)
      cb(null, user)
    }
  })
}

module.exports = mongoose.model('User', userSchema)