const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fcmToken: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.add({
  isVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false 
  },
  emailVerificationExpires: {
    type: Date,
    select: false 
  },
  passwordResetToken: {
    type: String,
    select: false 
  },
  passwordResetExpires: {
    type: Date,
    select: false 
  }
});

module.exports = mongoose.model('User', userSchema);