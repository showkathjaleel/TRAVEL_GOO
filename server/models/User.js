const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20

  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20
  },
  phone: {
    type: Number,
    required: true,
    min: 10

  },

  ProfilePicture: {
    type: String,
    default: ''
  },
  CoverPicture: {
    type: String,
    default: ''
  },
  following: {
    type: Array,
    default: []
  },
  followers: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isGuide: {
    type: Boolean,
    default: false
  },
  desc: {
    type: String,
    max: 50
  },
  city: {
    type: String,
    max: 50
  },
  from: {
    type: String,
    max: 50
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3]
  },
  savedPosts: {
    type: Array,
    default: []
  }

},
{ timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
