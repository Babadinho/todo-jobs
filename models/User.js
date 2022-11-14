const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
    },
    picture: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      select: false,
      min: 6,
      max: 64,
    },
    user_type: {
      type: String,
      enum: ['local', 'google'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
